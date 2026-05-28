import { NonEmptyArray } from "./utility";

export type guest = {
    firstName: string;
    lastName?: string;
    placeholder?: boolean; // true for unknown plus-ones ("& Wife", "& BF")
}

export type party = {
    guests: NonEmptyArray<guest>;
    label?: string; // for group/role entries like "The Fishers", "DJ"
}

export type guestList = party[];
