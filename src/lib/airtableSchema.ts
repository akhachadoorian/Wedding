export const PARTIES_TABLE = "Parties";
export const GUESTS_TABLE = "Guests";

export type GuestFields = {
    firstName: string;
    lastName: string;
    attending?: "Attending" | "Not Attending" | "Unknown";
    updatedOn?: string;
};

export type PartyFields = {
    Id: number;
    // Linked Guests records, in the order they were added to the party
    // (first = guest1, second = guest2).
    Guests: string[];
};
