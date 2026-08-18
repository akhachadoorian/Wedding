import { WithHTMLProps } from "@/types/props";
import { InvertRecord, NonEmptyArray } from "@/types/utility";
import { STEP_ONE_TEXT, STEP_THREE_TEXT, STEP_TWO_TEXT } from "./content";
import { ExpandedTextValueOptions } from "./FormInputs";

export const HEADER_MAP = {
    "Party ID": "id",
    "Last Name Guest 1": "lastNameG1",
    "First Name Guest 1": "firstNameG1",
    "Last Name Guest 2": "lastNameG2",
    "First Name Guest 2": "firstNameG2",
} as const satisfies Record<string, string>;

export type MappedHeaderKey = (typeof HEADER_MAP)[keyof typeof HEADER_MAP];

export type GuestParty1 = Record<MappedHeaderKey, string>;

export type Guest = {
    firstName: string;
    lastName: string;
};

export type GuestParty = {
    id: string;
    guest1: Guest;
    guest2?: Guest;
};

export type GuestKey = keyof Omit<GuestParty, "id">; // "guest1" | "guest2"

export type Guests = GuestParty[];

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

    // index lookups so we're not dependent on column order
    const idIdx = keys.indexOf("id");
    const lastNameG1Idx = keys.indexOf("lastNameG1");
    const firstNameG1Idx = keys.indexOf("firstNameG1");
    const lastNameG2Idx = keys.indexOf("lastNameG2");
    const firstNameG2Idx = keys.indexOf("firstNameG2");

    // TODO: determine if lowercase okay?
    // const map = guests
    //     .map(
    //         (row) =>
    //             Object.fromEntries(
    //                 keys.map((h, i) => [h, row[i]?.toLowerCase()]),
    //             ) as GuestParty1,
    //     )
    //     .filter(
    //         (guest) => guest.firstNameG1?.trim() && guest.lastNameG1?.trim(),
    //     );

    const map2 = guests.map((row) => {
        const firstNameG1 = row[firstNameG1Idx];
        const lastNameG1 = row[lastNameG1Idx];
        const firstNameG2 = row[firstNameG2Idx];
        const lastNameG2 = row[lastNameG2Idx];

        return {
            id: row[idIdx],
            guest1: {
                firstName: firstNameG1,
                lastName: lastNameG1,
            },
            guest2:
                firstNameG2 || lastNameG2
                    ? { firstName: firstNameG2, lastName: lastNameG2 }
                    : undefined,
        } as GuestParty;
    });

    // * debug
    // console.log("map ", map);
    // console.log("map2 ", map2);

    return map2;
}

export function getFindMatchingGuests(
    guests: Guests | null,
    firstName: string,
    lastName: string,
): Guests | null {
    if (guests === null) return null;
    // console.log("guests ", guests)

    const exactMatches = guests.filter(
        (p) =>
            (p.guest1.firstName?.toLowerCase() === firstName.toLowerCase() &&
                p.guest1.lastName?.toLowerCase() === lastName.toLowerCase()) ||
            (p.guest2?.firstName?.toLowerCase() === firstName.toLowerCase() &&
                p.guest2?.lastName?.toLowerCase() === lastName.toLowerCase()),
    );

    // console.log("exactMatches ", exactMatches);
    if (exactMatches.length > 0) return exactMatches;

    const matches = guests.filter(
        (g) =>
            g.guest1.firstName?.toLowerCase() === firstName.toLowerCase() ||
            g.guest1.lastName?.toLowerCase() === lastName.toLowerCase() ||
            g.guest2?.firstName?.toLowerCase() === firstName.toLowerCase() ||
            g.guest2?.lastName?.toLowerCase() === lastName.toLowerCase(),
    );

    // console.log("matches ", matches);
    if (matches.length > 0) return matches;

    return null;
}

export type RSVPStepTextProps = WithHTMLProps & {
    stepNumber: number;
    eyebrow?: string;
    title: string;
    body?: string;
};

export type RSVPStepProps = WithHTMLProps & {
    children: React.ReactNode;
    currStep: StepTextKeys;
    // steps: RSVPStepTextProps[]
};

export const STEP_TEXT_MAP = {
    1: STEP_ONE_TEXT,
    2: STEP_TWO_TEXT,
    3: STEP_THREE_TEXT
} as const satisfies Record<number, RSVPStepTextProps>;

export type StepTextKeys = keyof typeof STEP_TEXT_MAP;

export function getStepText(currStep: StepTextKeys): RSVPStepTextProps {
    return STEP_TEXT_MAP[currStep];
}

export function getPartyFromId(
    guests: Guests | null,
    partyId: string | null,
): GuestParty | null {
    if (guests === null || partyId === null) return null;
    return guests?.find((g) => g.id === partyId) ?? null;
}

type AttendanceResponse = Partial<Record<GuestKey, boolean>>;

// FIXME: add subtext and another area for more text?


export const MEAL_OPTIONS: NonEmptyArray<ExpandedTextValueOptions> = [
    {
        text: 'Pepper Seared Sirloin Steak',
        value: 'steak',
        subtext: 'with Jus Lié',
        note: 'Cooked medium rare'
    }
]

export type Meal = {
    selectedEntree: 'steak' | 'chicken' | 'fish'
    dietaryNotes?: string;
}

type WeddingMealResponse = Partial<Record<GuestKey, Meal>>;

type BusHotel = {
    hotel: 'opt1' // FIXME: add options
    takingBus: boolean
}

type TransportationResponse = Partial<Record<GuestKey, BusHotel>>;

type RehearsalMixerResponse = Partial<Record<GuestKey, boolean>>;

export type Responses = AttendanceResponse | WeddingMealResponse | TransportationResponse | RehearsalMixerResponse

export type RSVPDraft = {
    attendance: AttendanceResponse // {} // todo: determine if empty record or something else
    meal?: WeddingMealResponse;
    transportation?: TransportationResponse
    rehearsalMixer?: RehearsalMixerResponse // todo: add dinner?
};

export type RSVPDraftKey = keyof RSVPDraft

export const RSVP_STEP_BY_KEY = {
  attendance: 2,
  meal: 3,
  transportation: 4,
  rehearsalMixer: 5,
} as const satisfies Record<RSVPDraftKey, number>;

export const RSVP_KEY_BY_STEP = Object.fromEntries(
  Object.entries(RSVP_STEP_BY_KEY).map(([key, step]) => [step, key])
) as InvertRecord<typeof RSVP_STEP_BY_KEY>;

// export const RSVP_KEY_BY_STEP: Map<number, RSVPDraftKey> = new Map(
//   Object.entries(RSVP_STEP_BY_KEY).map(([key, step]) => [step, key as RSVPDraftKey])
// );

export function partyGuestCount(party: GuestParty) {
    // const hasTwo = party.guest1 && party.guest2
    return party.guest1 && party.guest2 ? 2 : 1
}

export function hasAnsweredQuestion(party: GuestParty, draft: RSVPDraft, key: RSVPDraftKey): boolean {
    const value = draft[key];
    if (!value) return false;

    const guest1Answered = value.guest1 !== undefined;
    const guest2Answered = !party.guest2 || value.guest2 !== undefined;
    return guest1Answered && guest2Answered;
}

export function getQuestionAnswerParty<K extends RSVPDraftKey>(draft: RSVPDraft, key: K): NonNullable<RSVPDraft[K]> | null {
    const value = draft[key];
    if (!value) return null

    return value
}

// export function getQuestionAnswerGuest(guest: 'guest1' | 'guest2', draft: RSVPDraft, key: RSVPDraftKey)   {
//     const value = draft[key];
//     if (!value || value === null) null

//     return value?[guest]
// }