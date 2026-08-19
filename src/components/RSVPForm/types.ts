import { WithHTMLProps } from "@/types/props";
import { InvertRecord, NonEmptyArray } from "@/types/utility";
import { STEP_FIVE_TEXT, STEP_FOUR_TEXT, STEP_ONE_TEXT, STEP_THREE_TEXT, STEP_TWO_TEXT } from "./content";
import { ExpandedTextValueOptions } from "./FormInputs";

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
    3: STEP_THREE_TEXT,
    4: STEP_FOUR_TEXT,
    5: STEP_FIVE_TEXT
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


export const MEAL_OPTIONS: NonEmptyArray<ExpandedTextValueOptions<MealValues>> = [
    {
        text: 'Herb Roasted French Style Chicken Breast',
        value: 'Chicken' as const,
        subtext: 'with Jus Lié',
        // note: 'Cooked medium rare'
    },
    {
        text: 'Pepper Seared Sirloin Steak',
        value: 'Steak' as const,
        subtext: 'with Horseradish Cream',
        note: 'Cooked medium rare'
    },
    {
        text: 'Chili Garlic Salmon Seared',
        value: 'Salmon' as const,
        subtext: 'with an Asian Trinity* a house specialty',
        // note: 'Cooked medium rare'
    },
]

export type MealValues = 'Steak' | 'Chicken' | 'Salmon'

export type Meal = {
    selectedEntree: MealValues
    dietaryNotes?: string;
}

type WeddingMealResponse = Partial<Record<GuestKey, Meal>>;

// export type Hotels = 'Homewood' | 'Hyatt' | 'AC' | 'N/A'

type HotelValues = 'homewoodSuites' | 'hyattPlace' | 'acHotel' | 'notSure' | 'other'

export const HOTEL_LABELS = {
    homewoodSuites: 'Homewood Suites By Hilton',
    hyattPlace: 'Hyatt Place',
    acHotel: 'AC Hotel',
    notSure: 'Not Sure Yet',
    other: 'N/A',
} as const satisfies Record<HotelValues, string>;

export type HotelStrings = (typeof HOTEL_LABELS)[keyof typeof HOTEL_LABELS];

export const HOTEL_OPTIONS: NonEmptyArray<ExpandedTextValueOptions<HotelValues>> =
    Object.entries(HOTEL_LABELS).map(([value, text]) => ({ value, text })) as NonEmptyArray<ExpandedTextValueOptions<HotelValues>>;

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