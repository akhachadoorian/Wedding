import { WithHTMLProps } from "@/types/props";
import { InvertRecord, NonEmptyArray, TextValueOption } from "@/types/utility";
import {
    STEP_FIVE_TEXT,
    STEP_FOUR_TEXT,
    STEP_ONE_TEXT,
    STEP_THREE_TEXT,
    STEP_TWO_TEXT,
} from "./content";
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
    body?: string | {left?: string, center?: string, right: string};
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
    5: STEP_FIVE_TEXT,
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

export const ATTENDING_OPTION = { text: "Attending", value: "attending" } as const satisfies TextValueOption;
export const DECLINING_OPTION = { text: "Declining", value: "declining" } as const satisfies TextValueOption;
export const UNKNOWN_OPTION = { text: "Unknown", value: "unknown" } as const satisfies TextValueOption;

export const ATTENDANCE_OPTIONS = [ATTENDING_OPTION, DECLINING_OPTION, UNKNOWN_OPTION] as const satisfies NonEmptyArray<TextValueOption>;


export type Attendance = (typeof ATTENDANCE_OPTIONS)[number]["value"];

export type AttendanceOption = TextValueOption<Attendance>;

type AttendanceResponse = Partial<Record<GuestKey, Attendance>>;

// #region --- Radio Option Builder ---

function buildOptions<V extends string>(
    labels: Record<V, string>,
    subtext: Record<V, string>,
): NonEmptyArray<ExpandedTextValueOptions<V>> {
    return Object.entries<string>(labels).map(([value, text]) => ({
        value: value as V,
        text,
        subtext: subtext[value as V],
    })) as NonEmptyArray<ExpandedTextValueOptions<V>>;
}

// #endregion ---

// #region --- Meal ---

export type MealValues = "steak" | "chicken" | "salmon";

export const MEAL_LABELS = {
    chicken: "Herb Roasted French Style Chicken Breast",
    steak: "Pepper Seared Sirloin Steak",
    salmon: "Chili Garlic Salmon Seared",
} as const satisfies Record<MealValues, string>;

const MEAL_SUBTEXT = {
    chicken: "with Jus Lié",
    steak: "with Horseradish Cream",
    salmon: "with an Asian Trinity* a house specialty",
} as const satisfies Record<MealValues, string>;

export const MEAL_OPTIONS = buildOptions(MEAL_LABELS, MEAL_SUBTEXT);

export type Meal = {
    selectedEntree: MealValues;
    dietaryNotes?: string;
};

type WeddingMealResponse = Partial<Record<GuestKey, Meal>>;

// #endregion ---

// #region --- Hotel ---

const HOTEL_OPTS = ["homewoodSuites", "hyattPlace", "acHotel"] as const;
type HotelOpts = (typeof HOTEL_OPTS)[number];

type AlternateHotelOpts = "notSure" | "other";
export type HotelValues = HotelOpts | AlternateHotelOpts;

export const HOTEL_LABELS = {
    homewoodSuites: "Homewood Suites By Hilton",
    hyattPlace: "Hyatt Place",
    acHotel: "AC Hotel",
} as const satisfies Record<HotelOpts, string>;

const HOTEL_SUBTEXT = {
    homewoodSuites: "10434 Midtown Parkway,\nJacksonville, Florida 32246",
    hyattPlace: "4742 Town Center Parkway,\nJacksonville, FL 32246",
    acHotel: "5323 Big Island Drive,\nJacksonville, FL, 32246",
} as const satisfies Record<HotelOpts, string>;

export const HOTEL_OPTIONS = buildOptions(HOTEL_LABELS, HOTEL_SUBTEXT);

export const ALTERNATE_HOTEL_LABELS = {
    other: "Another Hotel/Accommodation",
    notSure: "Not Sure Yet",
} as const satisfies Record<AlternateHotelOpts, string>;

const ALTERNATE_HOTEL_SUBTEXT = {
    other: "Please arrange your own transport",
    notSure: "Lorem ipsum dolor sit amet",
} as const satisfies Record<AlternateHotelOpts, string>;

export const ALTERNATE_HOTEL_OPTIONS = buildOptions(
    ALTERNATE_HOTEL_LABELS,
    ALTERNATE_HOTEL_SUBTEXT,
);

export type HotelStrings =
    | (typeof HOTEL_LABELS)[keyof typeof HOTEL_LABELS]
    | (typeof ALTERNATE_HOTEL_LABELS)[keyof typeof ALTERNATE_HOTEL_LABELS];

export function isStayingAtHotel(answer?: HotelValues): boolean {
    if (!answer) return false;

    return (HOTEL_OPTS as readonly string[]).includes(answer);
}

// #endregion ---

export type RidingBus = 'riding' | 'declining' | 'unknown'

export type Transportation = {
    stayingAt: HotelValues;
    ridingBus: RidingBus;
};

type TransportationResponse = Partial<Record<GuestKey, Transportation>>;

type RehearsalMixerResponse = Partial<Record<GuestKey, Attendance>>;

export type Responses =
    | AttendanceResponse
    | WeddingMealResponse
    | TransportationResponse
    | RehearsalMixerResponse;

export type RSVPDraft = {
    attendance: AttendanceResponse; // {} // todo: determine if empty record or something else
    meal?: WeddingMealResponse;
    transportation?: TransportationResponse;
    rehearsalMixer?: RehearsalMixerResponse; // todo: add dinner?
};

export type RSVPDraftKey = keyof RSVPDraft;

export const RSVP_STEP_BY_KEY = {
    attendance: 2,
    meal: 3,
    transportation: 4,
    rehearsalMixer: 5,
} as const satisfies Record<RSVPDraftKey, number>;

export const RSVP_KEY_BY_STEP = Object.fromEntries(
    Object.entries(RSVP_STEP_BY_KEY).map(([key, step]) => [step, key]),
) as InvertRecord<typeof RSVP_STEP_BY_KEY>;

// export const RSVP_KEY_BY_STEP: Map<number, RSVPDraftKey> = new Map(
//   Object.entries(RSVP_STEP_BY_KEY).map(([key, step]) => [step, key as RSVPDraftKey])
// );

export function partyGuestCount(party: GuestParty) {
    // const hasTwo = party.guest1 && party.guest2
    return party.guest1 && party.guest2 ? 2 : 1;
}

function isGuestAnswerComplete(key: RSVPDraftKey, value: unknown): boolean {
    if (value === undefined) return false;

    if (key === "transportation") {
        const transportation = value as Transportation;
        if (transportation.ridingBus === undefined) return false;

        if (transportation.ridingBus && !transportation.stayingAt) return false;
    }

    return true;
}

export function hasAnsweredQuestion(
    party: GuestParty,
    draft: RSVPDraft,
    key: RSVPDraftKey,
    renders: RenderFieldsForGuest
): boolean {
    const value = draft[key];
    if (!value) return false;

    const { renderGuestOne, renderGuestTwo } = renders

    // let guest1Answered, guest2Answered;

    const guest1Answered = renderGuestOne ? isGuestAnswerComplete(key, value.guest1) : true
    console.log("guest1Answered", guest1Answered)
    
    const guest2Answered = renderGuestTwo && party.guest2 !== undefined ? isGuestAnswerComplete(key, value.guest2) : true
        console.log("guest2Answered", guest2Answered)
    return guest1Answered && guest2Answered;
}

export function getQuestionAnswerParty<K extends RSVPDraftKey>(
    draft: RSVPDraft,
    key: K,
): NonNullable<RSVPDraft[K]> | null {
    const value = draft[key];
    if (!value) return null;

    return value;
}

export function determineFullPartyComing(
    answer: Responses | null,
    party: GuestParty,
) {
    const { guest2 } = party;

    const g1NotComing = answer?.guest1 === "declining";
    const g2NotComing = !guest2 || answer?.guest2 === "declining";

    return g1NotComing && g2NotComing;
}

export function determineGuestComing(guestKey: GuestKey, draft: RSVPDraft): boolean | undefined {
    const answers = getQuestionAnswerParty(draft, "attendance");
    if (answers === null) return undefined

    return answers[guestKey] === 'declining' ? false : true 
}

// type RenderFieldsForGuest: Record<GuestKey, >
type RenderFieldsForGuest = {
    renderGuestOne: boolean,
    renderGuestTwo: boolean
}

export function renderFieldsForGuest(draft: RSVPDraft, party: GuestParty):RenderFieldsForGuest {
    const G1 = determineGuestComing('guest1', draft)

    const G2 = party.guest2 && determineGuestComing('guest2', draft)

    return {
        renderGuestOne: G1 ?? false,
        renderGuestTwo: G2 ?? false
    }
}
