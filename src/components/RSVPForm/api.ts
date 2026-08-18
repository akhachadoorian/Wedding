import { GuestParty, RSVPDraft } from "./types";

export async function submitRSVP(party: GuestParty, draft: RSVPDraft): Promise<void> {
    const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ party, draft }),
    });

    if (!res.ok) throw new Error(`Failed to submit RSVP: ${res.status}`);
}
