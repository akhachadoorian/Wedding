import { NextRequest, NextResponse } from "next/server";
import { listRecords } from "@/lib/airtable";
import { GuestParty, Guests } from "@/components/RSVPForm/types";

const GUESTS_TABLE = "Guests";
const PARTIES_TABLE = "Parties";

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

async function getGuests(): Promise<Guests> {
    const [guestRecords, partyRecords] = await Promise.all([
        listRecords<GuestFields>(GUESTS_TABLE),
        listRecords<PartyFields>(PARTIES_TABLE),
    ]);

    const guestById = new Map(
        guestRecords.map((r) => [
            r.id,
            { firstName: r.fields["First Name"], lastName: r.fields["Last Name"] },
        ]),
    );

    return partyRecords.reduce<Guests>((parties, record) => {
        const guest1Id = record.fields["Guest 1"]?.[0];
        const guest2Id = record.fields["Guest 2"]?.[0];
        const guest1 = guest1Id ? guestById.get(guest1Id) : undefined;
        if (!guest1) return parties;

        const guest2 = guest2Id ? guestById.get(guest2Id) : undefined;

        const party: GuestParty = {
            id: record.fields["Party ID"],
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
