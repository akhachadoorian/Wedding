import { NextRequest, NextResponse } from "next/server";
import {
    AirtableRecord,
    // createRecords,
    findRecordByField,
    getRecord,
    updateRecord,
} from "@/lib/airtable";
import { Guest, GuestKey, GuestParty } from "@/components/RSVPForm/types";

const PARTIES_TABLE = "Parties";
const GUESTS_TABLE = "Guests";
// const LOGS_TABLE = "Logs"; // TODO: re-enable once a Logs table exists

type GuestFields = {
    "First Name": string;
    "Last Name": string;
    Attending?: "Yes" | "No";
};

type PartyFields = {
    "Party ID": string;
    "Guest 1": string[];
    "Guest 2"?: string[];
    "Updated At"?: string;
};

// TODO: re-enable once a Logs table exists
// type LogType =
//     | "First Submission"
//     | "Edit"
//     | "Validation Error"
//     | "Not Found"
//     | "Airtable Error";
//
// async function appendLogRows(
//     partyId: string | null,
//     party: GuestParty | null,
//     attendance: Partial<Record<GuestKey, boolean>> | null,
//     type: LogType | ((guestKey: GuestKey) => LogType),
// ) {
//     const timestamp = new Date().toISOString();
//
//     const resolveType = (guestKey: GuestKey) =>
//         typeof type === "function" ? type(guestKey) : type;
//
//     const rows: Record<string, string | boolean>[] = [];
//
//     if (party && attendance) {
//         (["guest1", "guest2"] as const).forEach((key) => {
//             const guest = party[key];
//             const attending = attendance[key];
//             if (!guest || attending === undefined) return;
//             rows.push({
//                 "Party ID": partyId ?? "",
//                 "Guest Name": `${guest.firstName} ${guest.lastName}`.trim(),
//                 Attending: attending ? "Yes" : "No",
//                 Timestamp: timestamp,
//                 Type: resolveType(key),
//             });
//         });
//     }
//
//     if (rows.length === 0) {
//         rows.push({
//             "Party ID": partyId ?? "",
//             Timestamp: timestamp,
//             Type: resolveType("guest1"),
//         });
//     }
//
//     try {
//         await createRecords(LOGS_TABLE, rows);
//     } catch (err) {
//         console.error("Failed to append to Logs table:", err);
//     }
// }

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
        // await appendLogRows(null, null, null, "Airtable Error");
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
        // await appendLogRows(validation.partyId, validation.party, validation.attendance, "Validation Error");
        return NextResponse.json(
            { success: false, error: validation.error },
            { status: 400 },
        );
    }

    const { party, attendance } = validation;
    const partyId = party.id;

    let partyRecord: AirtableRecord<PartyFields>;
    let guest1Record: AirtableRecord<GuestFields>;
    let guest2Record: AirtableRecord<GuestFields> | null = null;
    const priorAttending: Partial<Record<GuestKey, string | undefined>> = {};

    try {
        const found = await findRecordByField<PartyFields>(PARTIES_TABLE, "Party ID", partyId);

        if (!found) {
            // await appendLogRows(partyId, party, attendance, "Not Found");
            return NextResponse.json(
                { success: false, error: "Party not found" },
                { status: 404 },
            );
        }

        partyRecord = found;

        const guest1Id = partyRecord.fields["Guest 1"]?.[0];
        const guest2Id = partyRecord.fields["Guest 2"]?.[0];

        if (!guest1Id) {
            // await appendLogRows(partyId, party, attendance, "Not Found");
            return NextResponse.json(
                { success: false, error: "Party not found" },
                { status: 404 },
            );
        }

        guest1Record = await getRecord<GuestFields>(GUESTS_TABLE, guest1Id);
        priorAttending.guest1 = guest1Record.fields.Attending;

        if (guest2Id) {
            guest2Record = await getRecord<GuestFields>(GUESTS_TABLE, guest2Id);
            priorAttending.guest2 = guest2Record.fields.Attending;
        }
    } catch (err) {
        console.error("POST /api/rsvp lookup error:", err);
        // await appendLogRows(partyId, party, attendance, "Airtable Error");
        return NextResponse.json(
            { success: false, error: "Failed to look up party" },
            { status: 500 },
        );
    }

    const updatedAt = new Date().toISOString();

    try {
        await updateRecord<GuestFields>(GUESTS_TABLE, guest1Record.id, {
            Attending: attendance.guest1 ? "Yes" : "No",
        });

        if (guest2Record && party.guest2) {
            await updateRecord<GuestFields>(GUESTS_TABLE, guest2Record.id, {
                Attending: attendance.guest2 ? "Yes" : "No",
            });
        }

        await updateRecord<PartyFields>(PARTIES_TABLE, partyRecord.id, {
            "Updated At": updatedAt,
        });
    } catch (err) {
        console.error("POST /api/rsvp update error:", err);
        // await appendLogRows(partyId, party, attendance, "Airtable Error");
        return NextResponse.json(
            { success: false, error: "Failed to update attendance" },
            { status: 500 },
        );
    }

    // await appendLogRows(partyId, party, attendance, (guestKey) =>
    //     priorAttending[guestKey] ? "Edit" : "First Submission",
    // );

    return NextResponse.json({ success: true, partyId, updatedAt });
}
