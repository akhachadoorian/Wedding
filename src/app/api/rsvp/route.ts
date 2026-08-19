import { NextRequest, NextResponse } from "next/server";
import { getSheetsClient, getSpreadsheetId } from "@/lib/googleSheets";
import { Guest, GuestKey, GuestParty } from "@/components/RSVPForm/types";

const RSVP_ROW_RANGE = "RSVPs!A:F";
const LOG_RANGE = "Logs!A:F";

type LogType =
    | "First Submission"
    | "Edit"
    | "Validation Error"
    | "Not Found"
    | "Sheets Error";

async function appendLogRows(
    partyId: string | null,
    party: GuestParty | null,
    attendance: Partial<Record<GuestKey, boolean>> | null,
    type: LogType | ((guestKey: GuestKey) => LogType),
) {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 8);

    const resolveType = (guestKey: GuestKey) =>
        typeof type === "function" ? type(guestKey) : type;

    const rows: (string | boolean)[][] = [];

    if (party && attendance) {
        (["guest1", "guest2"] as const).forEach((key) => {
            const guest = party[key];
            const attending = attendance[key];
            if (!guest || attending === undefined) return;
            rows.push([
                partyId ?? "",
                `${guest.firstName} ${guest.lastName}`.trim(),
                attending,
                date,
                time,
                resolveType(key),
            ]);
        });
    }

    if (rows.length === 0) {
        rows.push([partyId ?? "", "", "", date, time, resolveType("guest1")]);
    }

    try {
        const sheets = getSheetsClient();
        await sheets.spreadsheets.values.append({
            spreadsheetId: getSpreadsheetId(),
            range: LOG_RANGE,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            requestBody: { values: rows },
        });
    } catch (err) {
        console.error("Failed to append to Log sheet:", err);
    }
}

function isValidGuest(value: unknown): value is Guest {
    return (
        typeof value === "object" &&
        value !== null &&
        typeof (value as Guest).firstName === "string" &&
        typeof (value as Guest).lastName === "string"
    );
}

type ValidationResult =
    | { ok: true; party: GuestParty; attendance: Partial<Record<GuestKey, boolean>> }
    | {
          ok: false;
          error: string;
          partyId: string | null;
          party: GuestParty | null;
          attendance: Partial<Record<GuestKey, boolean>> | null;
      };

function validateRsvpBody(body: unknown): ValidationResult {
    const invalid = (
        error: string,
        partyId: string | null = null,
        party: GuestParty | null = null,
        attendance: Partial<Record<GuestKey, boolean>> | null = null,
    ): ValidationResult => ({ ok: false, error, partyId, party, attendance });

    if (typeof body !== "object" || body === null) {
        return invalid("Request body must be an object");
    }

    const { party, draft } = body as Record<string, unknown>;

    if (typeof party !== "object" || party === null) {
        return invalid("party is required");
    }

    const { id, guest1, guest2 } = party as Record<string, unknown>;

    if (typeof id !== "string" || id.trim() === "") {
        return invalid("party.id is required", typeof id === "string" ? id : null);
    }

    if (!isValidGuest(guest1)) {
        return invalid("party.guest1 is required", id);
    }

    if (guest2 !== undefined && !isValidGuest(guest2)) {
        return invalid("party.guest2 is invalid", id);
    }

    const validParty: GuestParty = {
        id,
        guest1,
        ...(guest2 !== undefined ? { guest2 } : {}),
    };

    if (typeof draft !== "object" || draft === null) {
        return invalid("draft is required", id, validParty);
    }

    const { attendance } = draft as Record<string, unknown>;

    if (typeof attendance !== "object" || attendance === null) {
        return invalid("draft.attendance is required", id, validParty);
    }

    const { guest1: g1Attending, guest2: g2Attending } = attendance as Record<string, unknown>;

    if (typeof g1Attending !== "boolean") {
        return invalid("draft.attendance.guest1 is required", id, validParty);
    }

    if (validParty.guest2 && typeof g2Attending !== "boolean") {
        return invalid("draft.attendance.guest2 is required", id, validParty);
    }

    return {
        ok: true,
        party: validParty,
        attendance: {
            guest1: g1Attending,
            ...(typeof g2Attending === "boolean" ? { guest2: g2Attending } : {}),
        },
    };
}

export async function POST(request: NextRequest) {
    // Dev-only escape hatch to exercise the error flow: /api/rsvp?error=1
    if (process.env.NODE_ENV !== "production" && request.nextUrl.searchParams.has("error")) {
        await appendLogRows(null, null, null, "Sheets Error");
        return NextResponse.json(
            { success: false, error: "Forced error for testing" },
            { status: 500 },
        );
    }

    let body: unknown = null;
    try {
        body = await request.json();
    } catch {
        // fall through to validation error below
    }

    const validation = validateRsvpBody(body);
    if (!validation.ok) {
        await appendLogRows(validation.partyId, validation.party, validation.attendance, "Validation Error");
        return NextResponse.json(
            { success: false, error: validation.error },
            { status: 400 },
        );
    }

    const { party, attendance } = validation;
    const partyId = party.id;

    let sheets: ReturnType<typeof getSheetsClient>;
    let spreadsheetId: string;
    let row: number;
    const priorAttending: Partial<Record<GuestKey, string>> = {};

    try {
        sheets = getSheetsClient();
        spreadsheetId = getSpreadsheetId();

        const idColumn = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: RSVP_ROW_RANGE,
        });
        console.log("idColumn", idColumn)
        const rows = idColumn.data.values ?? [];
        console.log("rows", rows)
        const idx = rows.findIndex((r) => r[0] === partyId);
        console.log("idx", idx)

        if (idx === -1) {
            await appendLogRows(partyId, party, attendance, "Not Found");
            return NextResponse.json(
                { success: false, error: "Party not found" },
                { status: 404 },
            );
        }

        row = idx + 2; // +2: range starts at row 2, array is 0-indexed
        const existingRow = rows[idx];
        priorAttending.guest1 = existingRow[2] ?? "";
        priorAttending.guest2 = existingRow[4] ?? "";
    } catch (err) {
        console.error("POST /api/rsvp lookup error:", err);
        await appendLogRows(partyId, party, attendance, "Sheets Error");
        return NextResponse.json(
            { success: false, error: "Failed to look up party" },
            { status: 500 },
        );
    }

    const updatedAt = new Date().toISOString();

    try {
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `RSVP!B${row}:F${row}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [
                        `${party.guest1.firstName} ${party.guest1.lastName}`.trim(),
                        attendance.guest1 ?? "",
                        party.guest2
                            ? `${party.guest2.firstName} ${party.guest2.lastName}`.trim()
                            : "",
                        party.guest2 ? attendance.guest2 ?? "" : "",
                        updatedAt,
                    ],
                ],
            },
        });
    } catch (err) {
        console.error("POST /api/rsvp update error:", err);
        await appendLogRows(partyId, party, attendance, "Sheets Error");
        return NextResponse.json(
            { success: false, error: "Failed to update attendance" },
            { status: 500 },
        );
    }

    await appendLogRows(partyId, party, attendance, (guestKey) =>
        priorAttending[guestKey] ? "Edit" : "First Submission",
    );

    return NextResponse.json({ success: true, partyId, updatedAt });
}
