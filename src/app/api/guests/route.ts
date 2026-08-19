import { NextRequest, NextResponse } from "next/server";
import { listRecords } from "@/lib/airtable";
import { GUESTS_TABLE, GuestFields, PARTIES_TABLE, PartyFields } from "@/lib/airtableSchema";
import { GuestParty, Guests } from "@/components/RSVPForm/types";

async function getGuests(): Promise<Guests> {
    const [guestRecords, partyRecords] = await Promise.all([
        listRecords<GuestFields>(GUESTS_TABLE),
        listRecords<PartyFields>(PARTIES_TABLE),
    ]);

    const guestById = new Map(
        guestRecords.map((r) => [
            r.id,
            { firstName: r.fields.firstName, lastName: r.fields.lastName },
        ]),
    );

    return partyRecords.reduce<Guests>((parties, record) => {
        const [guest1Id, guest2Id] = record.fields.Guests ?? [];
        const guest1 = guest1Id ? guestById.get(guest1Id) : undefined;
        if (!guest1) return parties;

        const guest2 = guest2Id ? guestById.get(guest2Id) : undefined;

        const party: GuestParty = {
            id: String(record.fields.Id),
            guest1,
            ...(guest2 ? { guest2 } : {}),
        };
        parties.push(party);
        return parties;
    }, []);
}

// Testing error
export async function GET(request: NextRequest) {
    // Dev-only escape hatch to exercise the error flow: /api/guests?error=1
    if (process.env.NODE_ENV !== "production" && request.nextUrl.searchParams.has("error")) {
        return NextResponse.json({ error: "Forced error for testing" }, { status: 500 });
    }

    try {
        const data = await getGuests();
        return NextResponse.json(data);
    } catch (err) {
        console.error("GET /api/guests error:", err);
        return NextResponse.json({ error: "Failed to fetch guests" }, { status: 500 });
    }
}
