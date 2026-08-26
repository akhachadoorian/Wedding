import { NextRequest, NextResponse } from "next/server";
import {
    AirtableRecord,
    // createRecords,
    findRecordByNumberField,
    getRecord,
    updateRecord,
} from "@/lib/airtable";
import { GUESTS_TABLE, GuestFields, PARTIES_TABLE, PartyFields } from "@/lib/airtableSchema";
import {
    ALTERNATE_HOTEL_LABELS,
    Guest,
    GuestKey,
    GuestParty,
    HOTEL_LABELS,
    MEAL_LABELS,
    MealValues,
    RidingBus,
} from "@/components/RSVPForm/types";

function isValidGuest(value: unknown): value is Guest {
    return (
        typeof value === "object" &&
        value !== null &&
        typeof (value as Guest).firstName === "string" &&
        typeof (value as Guest).lastName === "string"
    );
}

function isAnsweredAttendance(value: unknown): value is "attending" | "declining" {
    return value === "attending" || value === "declining";
}

function isAnsweredRidingBus(value: unknown): value is "riding" | "declining" {
    return value === "riding" || value === "declining";
}

const MEAL_VALUES = Object.keys(MEAL_LABELS) as MealValues[];
const ALL_HOTEL_LABELS = { ...HOTEL_LABELS, ...ALTERNATE_HOTEL_LABELS };
const HOTEL_KEYS = Object.keys(ALL_HOTEL_LABELS) as (keyof typeof ALL_HOTEL_LABELS)[];

function isValidMealValue(value: unknown): value is MealValues {
    return typeof value === "string" && (MEAL_VALUES as string[]).includes(value);
}

function isValidHotelKey(value: unknown): value is keyof typeof ALL_HOTEL_LABELS {
    return typeof value === "string" && (HOTEL_KEYS as string[]).includes(value);
}

/** Everything we're prepared to write back to a single guest's Airtable record. */
type GuestUpdate = {
    attending: boolean;
    mealChoice?: MealValues;
    dietaryNotes?: string;
    stayingAt?: GuestFields["stayingAt"];
    ridingBus?: RidingBus;
    rehearsalMixer?: boolean;
};

function buildGuestFieldsUpdate(update: GuestUpdate, updatedAt: string): Partial<GuestFields> {
    return {
        attending: update.attending ? "attending" : "declining",
        ...(update.mealChoice !== undefined ? { mealChoice: update.mealChoice } : {}),
        ...(update.dietaryNotes !== undefined ? { dietaryNotes: update.dietaryNotes } : {}),
        ...(update.stayingAt !== undefined ? { stayingAt: update.stayingAt } : {}),
        ...(update.ridingBus !== undefined ? { ridingBus: update.ridingBus } : {}),
        ...(update.rehearsalMixer !== undefined
            ? { rehearsalMixer: update.rehearsalMixer ? "attending" : "declining" }
            : {}),
        updatedOn: updatedAt,
    };
}

type ValidationResult =
    | { ok: true; party: GuestParty; guests: Partial<Record<GuestKey, GuestUpdate>> }
    | {
          ok: false;
          error: string;
          partyId: string | null;
          party: GuestParty | null;
      };

function validateRsvpBody(body: unknown): ValidationResult {
    const invalid = (
        error: string,
        partyId: string | null = null,
        party: GuestParty | null = null,
    ): ValidationResult => ({ ok: false, error, partyId, party });

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

    const { attendance, meal, transportation, rehearsalMixer } = draft as Record<string, unknown>;

    if (typeof attendance !== "object" || attendance === null) {
        return invalid("draft.attendance is required", id, validParty);
    }

    const { guest1: g1Attending, guest2: g2Attending } = attendance as Record<string, unknown>;

    if (!isAnsweredAttendance(g1Attending)) {
        return invalid("draft.attendance.guest1 is required", id, validParty);
    }

    if (validParty.guest2 && !isAnsweredAttendance(g2Attending)) {
        return invalid("draft.attendance.guest2 is required", id, validParty);
    }

    const guestKeys: GuestKey[] = validParty.guest2 ? ["guest1", "guest2"] : ["guest1"];
    const attendingByGuest: Record<GuestKey, boolean> = {
        guest1: g1Attending === "attending",
        guest2: g2Attending === "attending",
    };

    const meals = (typeof meal === "object" && meal !== null ? meal : {}) as Record<string, unknown>;
    const transportations = (
        typeof transportation === "object" && transportation !== null ? transportation : {}
    ) as Record<string, unknown>;
    const rehearsalMixers = (
        typeof rehearsalMixer === "object" && rehearsalMixer !== null ? rehearsalMixer : {}
    ) as Record<string, unknown>;

    const guests: Partial<Record<GuestKey, GuestUpdate>> = {};

    for (const key of guestKeys) {
        const attending = attendingByGuest[key];

        if (!attending) {
            guests[key] = { attending };
            continue;
        }

        const guestMeal = meals[key];
        if (typeof guestMeal !== "object" || guestMeal === null) {
            return invalid(`draft.meal.${key} is required`, id, validParty);
        }
        const { selectedEntree, dietaryNotes } = guestMeal as Record<string, unknown>;
        if (!isValidMealValue(selectedEntree)) {
            return invalid(`draft.meal.${key}.selectedEntree is required`, id, validParty);
        }
        if (dietaryNotes !== undefined && typeof dietaryNotes !== "string") {
            return invalid(`draft.meal.${key}.dietaryNotes must be a string`, id, validParty);
        }

        const guestTransportation = transportations[key];
        if (typeof guestTransportation !== "object" || guestTransportation === null) {
            return invalid(`draft.transportation.${key} is required`, id, validParty);
        }
        const { ridingBus: guestRidingBus, stayingAt } = guestTransportation as Record<string, unknown>;
        if (!isAnsweredRidingBus(guestRidingBus)) {
            return invalid(`draft.transportation.${key}.ridingBus is required`, id, validParty);
        }
        if (!isValidHotelKey(stayingAt)) {
            return invalid(`draft.transportation.${key}.stayingAt is required`, id, validParty);
        }

        const guestRehearsalMixer = rehearsalMixers[key];
        if (!isAnsweredAttendance(guestRehearsalMixer)) {
            return invalid(`draft.rehearsalMixer.${key} is required`, id, validParty);
        }

        guests[key] = {
            attending,
            mealChoice: selectedEntree,
            ...(typeof dietaryNotes === "string" ? { dietaryNotes } : {}),
            ridingBus: guestRidingBus,
            stayingAt,
            rehearsalMixer: guestRehearsalMixer === "attending",
        };
    }

    return { ok: true, party: validParty, guests };
}

export async function POST(request: NextRequest) {
    // Dev-only escape hatch to exercise the error flow: /api/rsvp?error=1
    if (process.env.NODE_ENV !== "production" && request.nextUrl.searchParams.has("error")) {
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
        return NextResponse.json(
            { success: false, error: validation.error },
            { status: 400 },
        );
    }

    const { party, guests } = validation;
    const partyId = party.id;
    console.log("validated guests", JSON.stringify(guests, null, 2));

    let partyRecord: AirtableRecord<PartyFields>;
    let guest1Record: AirtableRecord<GuestFields>;
    let guest2Record: AirtableRecord<GuestFields> | null = null;

    // Get previous values
    const priorAttending: Partial<Record<GuestKey, string | undefined>> = {};
    const priorMealChoice: Partial<Record<GuestKey, string | undefined>> = {};
    const priorDietaryNotes: Partial<Record<GuestKey, string | undefined>> = {};
    const priorStayingAt: Partial<Record<GuestKey, string | undefined>> = {};
    const priorRidingBus: Partial<Record<GuestKey, string | undefined>> = {};
    const priorRehearsalMixer: Partial<Record<GuestKey, string | undefined>> = {};
    // const prior: Partial<Record<GuestKey, string | undefined>> = {};

    const numericPartyId = Number(partyId);

    try {
        const found = Number.isFinite(numericPartyId)
            ? await findRecordByNumberField<PartyFields>(PARTIES_TABLE, "Id", numericPartyId)
            : null;

        if (!found) {
            return NextResponse.json(
                { success: false, error: "Party not found" },
                { status: 404 },
            );
        }

        partyRecord = found;

        const [guest1Id, guest2Id] = partyRecord.fields.guests ?? [];

        if (!guest1Id) {
            return NextResponse.json(
                { success: false, error: "Party not found" },
                { status: 404 },
            );
        }

        guest1Record = await getRecord<GuestFields>(GUESTS_TABLE, guest1Id);
        console.log("guest1Record", guest1Record)
        priorAttending.guest1 = guest1Record.fields.attending;
        priorMealChoice.guest1 = guest1Record.fields.mealChoice
        priorDietaryNotes.guest1 = guest1Record.fields.dietaryNotes
        priorStayingAt.guest1 = guest1Record.fields.stayingAt
        priorRidingBus.guest1 = guest1Record.fields.ridingBus
        priorRehearsalMixer.guest1 = guest1Record.fields.rehearsalMixer

        if (guest2Id) {
            guest2Record = await getRecord<GuestFields>(GUESTS_TABLE, guest2Id);
            priorAttending.guest2 = guest2Record.fields.attending;
            priorMealChoice.guest2 = guest2Record.fields.mealChoice
            priorDietaryNotes.guest2 = guest2Record.fields.dietaryNotes
            priorStayingAt.guest2 = guest2Record.fields.stayingAt
            priorRidingBus.guest2 = guest2Record.fields.ridingBus
            priorRehearsalMixer.guest2 = guest2Record.fields.rehearsalMixer
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
        await updateRecord<GuestFields>(
            GUESTS_TABLE,
            guest1Record.id,
            buildGuestFieldsUpdate(guests.guest1!, updatedAt),
        );

        if (guest2Record && party.guest2 && guests.guest2) {
            await updateRecord<GuestFields>(
                GUESTS_TABLE,
                guest2Record.id,
                buildGuestFieldsUpdate(guests.guest2, updatedAt),
            );
        }
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
