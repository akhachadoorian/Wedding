import { Attendance, HotelStrings, MealValues } from "@/components/RSVPForm/types";

export const PARTIES_TABLE = "Parties";
export const GUESTS_TABLE = "Guests";

export type GuestFields = {
    firstName: string;
    lastName: string;
    fullName: string;

    attending?: Attendance

    mealChoice?: MealValues;
    dietaryNotes?: string;

    hotel?: HotelStrings

    updatedOn?: string;
};

export type PartyFields = {
    id: number;
    // Linked Guests records, in the order they were added to the party
    // (first = guest1, second = guest2).
    guests: string[];
};
