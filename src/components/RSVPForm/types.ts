import { WithHTMLProps } from "@/types/props";
import { STEP_ONE_TEXT, STEP_TWO_TEXT } from "./content";


export const HEADER_MAP = {
    "Party ID": "id",
    "Last Name Guest 1": "lastNameG1",
    "First Name Guest 1": "firstNameG1",
    "Last Name Guest 2": "lastNameG2",
    "First Name Guest 2": "firstNameG2",
} as const satisfies Record<string, string>;

export type MappedHeaderKey = (typeof HEADER_MAP)[keyof typeof HEADER_MAP];

export type GuestEntry = Record<MappedHeaderKey, string>;

export type Guests = GuestEntry[];

export function mapGuestData(data: string[][]): Guests | null {
    if (data.length === 0 || data.length === 1) return null;
    // remove headers
    const headers = data[0];
    const keys = headers.map(
        (h) => HEADER_MAP[h as keyof typeof HEADER_MAP] ?? h,
    );
    // * debug
    // console.log("headers ", headers);    
    // console.log("keys ", keys);

    const guests = data.slice(1);
    // * debug
    // console.log("guests ", guests);

    // TODO: determine if lowercase okay?
    const map = guests
        .map(
            (row) =>
                Object.fromEntries(
                    keys.map((h, i) => [h, row[i]?.toLowerCase()]),
                ) as GuestEntry,
        )
        .filter((guest) => guest.firstNameG1?.trim() && guest.lastNameG1?.trim());

    // * debug
    // console.log("map ", map);

    return map;
}



export function getFindMatchingGuests(
    guests: Guests | null,
    firstName: string,
    lastName: string,
): Guests | null {
    if (guests === null) return null;

    const exactMatches = guests.filter(
        (p) =>
            (p.firstNameG1 === firstName && p.lastNameG1 === lastName) ||
            (p.firstNameG2 === firstName && p.lastNameG2 === lastName),
    );

    if (exactMatches.length > 0) return exactMatches;

    const matches = guests.filter(
        (g) =>
            g.firstNameG1 === firstName ||
            g.lastNameG1 === lastName ||
            g.firstNameG2 === firstName ||
            g.lastNameG2 === lastName,
    );

    if (matches.length > 0) return matches;

    return null;
}

export type RSVPStepTextProps = WithHTMLProps & {
    stepNumber: number;
    title: string;
    body?: string;
};


export type RSVPStepProps = WithHTMLProps  & {
    children: React.ReactNode
    currStep: StepTextKeys;
    // steps: RSVPStepTextProps[]
}

export const STEP_TEXT_MAP = {
    1: STEP_ONE_TEXT,
    2: STEP_TWO_TEXT
} as const satisfies Record<number, RSVPStepTextProps>

export type StepTextKeys = keyof typeof STEP_TEXT_MAP

export function getStepText(currStep: StepTextKeys): RSVPStepTextProps {
    return STEP_TEXT_MAP[currStep];
}