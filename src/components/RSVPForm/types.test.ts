import { describe, expect, it } from "vitest";
import {
    STEP_FIVE_TEXT,
    STEP_FOUR_TEXT,
    STEP_ONE_TEXT,
    STEP_THREE_TEXT,
    STEP_TWO_TEXT,
} from "./content";
import {
    buildDraftFromParty,
    determineFullPartyComing,
    determineGuestComing,
    getPartyFromId,
    getStepText,
    GuestParty,
    hasAnsweredQuestion,
    isStayingAtHotel,
    partyGuestCount,
    renderFieldsForGuest,
    RSVPDraft,
} from "./types";

// getFindMatchingGuests is intentionally not tested here: it has no call sites
// anywhere else in the codebase (verified via grep) and appears to be dead code,
// superseded by findMatchingGuestsByPrefix in Steps/SearchingLive.tsx. Worth
// deleting in a follow-up rather than testing.

const guest1 = { fullName: "Jane Doe", firstName: "Jane", lastName: "Doe" };
const guest2 = { fullName: "John Doe", firstName: "John", lastName: "Doe" };

const singleGuestParty: GuestParty = { id: "1", guest1 };
const twoGuestParty: GuestParty = { id: "2", guest1, guest2 };

describe("getStepText", () => {
    const cases = [
        { step: 1, expected: STEP_ONE_TEXT },
        { step: 2, expected: STEP_TWO_TEXT },
        { step: 3, expected: STEP_THREE_TEXT },
        { step: 4, expected: STEP_FOUR_TEXT },
        { step: 5, expected: STEP_FIVE_TEXT },
    ] as const;

    for (const { step, expected } of cases) {
        it(`returns the matching text for step ${step}`, () => {
            expect(getStepText(step)).toBe(expected);
        });
    }
});

describe("getPartyFromId", () => {
    const guests = [singleGuestParty, twoGuestParty];

    it("returns null when guests is null", () => {
        expect(getPartyFromId(null, "1")).toBeNull();
    });

    it("returns null when partyId is null", () => {
        expect(getPartyFromId(guests, null)).toBeNull();
    });

    it("returns null when no party matches the id", () => {
        expect(getPartyFromId(guests, "does-not-exist")).toBeNull();
    });

    it("returns the matching party", () => {
        expect(getPartyFromId(guests, "2")).toBe(twoGuestParty);
    });
});

describe("isStayingAtHotel", () => {
    it.each(["homewoodSuites", "hyattPlace", "acHotel"] as const)(
        "returns true for hotel key %s",
        (hotel) => {
            expect(isStayingAtHotel(hotel)).toBe(true);
        },
    );

    it.each(["other", "notSure"] as const)("returns false for alternate key %s", (alt) => {
        expect(isStayingAtHotel(alt)).toBe(false);
    });

    it("returns false when undefined", () => {
        expect(isStayingAtHotel(undefined)).toBe(false);
    });
});

describe("partyGuestCount", () => {
    it("returns 1 for a single-guest party", () => {
        expect(partyGuestCount(singleGuestParty)).toBe(1);
    });

    it("returns 2 for a two-guest party", () => {
        expect(partyGuestCount(twoGuestParty)).toBe(2);
    });
});

describe("hasAnsweredQuestion", () => {
    it("returns false when the draft has no value for this key", () => {
        const draft: RSVPDraft = { attendance: {} };
        expect(
            hasAnsweredQuestion(singleGuestParty, draft, "meal", {
                renderGuestOne: true,
                renderGuestTwo: false,
            }),
        ).toBe(false);
    });

    it("returns true once guest1 has answered a non-transportation question", () => {
        const draft: RSVPDraft = { attendance: { guest1: "attending" } };
        expect(
            hasAnsweredQuestion(singleGuestParty, draft, "attendance", {
                renderGuestOne: true,
                renderGuestTwo: false,
            }),
        ).toBe(true);
    });

    it("transportation: false when ridingBus is unanswered", () => {
        const draft: RSVPDraft = {
            attendance: {},
            transportation: { guest1: { ridingBus: undefined as never, stayingAt: undefined as never } },
        };
        expect(
            hasAnsweredQuestion(singleGuestParty, draft, "transportation", {
                renderGuestOne: true,
                renderGuestTwo: false,
            }),
        ).toBe(false);
    });

    it("transportation: false when ridingBus is answered but stayingAt is missing", () => {
        const draft: RSVPDraft = {
            attendance: {},
            transportation: { guest1: { ridingBus: "riding", stayingAt: undefined as never } },
        };
        expect(
            hasAnsweredQuestion(singleGuestParty, draft, "transportation", {
                renderGuestOne: true,
                renderGuestTwo: false,
            }),
        ).toBe(false);
    });

    it("transportation: true once both ridingBus and stayingAt are answered", () => {
        const draft: RSVPDraft = {
            attendance: {},
            transportation: { guest1: { ridingBus: "riding", stayingAt: "homewoodSuites" } },
        };
        expect(
            hasAnsweredQuestion(singleGuestParty, draft, "transportation", {
                renderGuestOne: true,
                renderGuestTwo: false,
            }),
        ).toBe(true);
    });

    it("requires both guests answered when renderGuestTwo is true", () => {
        const draft: RSVPDraft = { attendance: { guest1: "attending" } };
        expect(
            hasAnsweredQuestion(twoGuestParty, draft, "attendance", {
                renderGuestOne: true,
                renderGuestTwo: true,
            }),
        ).toBe(false);

        const fullDraft: RSVPDraft = { attendance: { guest1: "attending", guest2: "declining" } };
        expect(
            hasAnsweredQuestion(twoGuestParty, fullDraft, "attendance", {
                renderGuestOne: true,
                renderGuestTwo: true,
            }),
        ).toBe(true);
    });

    it("skips the guest2 check entirely when party.guest2 is undefined, even if renderGuestTwo is true", () => {
        const draft: RSVPDraft = { attendance: { guest1: "attending" } };
        expect(
            hasAnsweredQuestion(singleGuestParty, draft, "attendance", {
                renderGuestOne: true,
                renderGuestTwo: true,
            }),
        ).toBe(true);
    });
});

describe("determineFullPartyComing", () => {
    it("single-guest party declining -> true", () => {
        expect(determineFullPartyComing({ guest1: "declining" }, singleGuestParty)).toBe(true);
    });

    it("single-guest party attending -> false", () => {
        expect(determineFullPartyComing({ guest1: "attending" }, singleGuestParty)).toBe(false);
    });

    it("two-guest party both declining -> true", () => {
        expect(
            determineFullPartyComing({ guest1: "declining", guest2: "declining" }, twoGuestParty),
        ).toBe(true);
    });

    it("two-guest party one attending -> false", () => {
        expect(
            determineFullPartyComing({ guest1: "declining", guest2: "attending" }, twoGuestParty),
        ).toBe(false);
    });

    it("unanswered (null) -> false, not true, since neither guest has explicitly declined", () => {
        expect(determineFullPartyComing(null, singleGuestParty)).toBe(false);
    });
});

describe("determineGuestComing", () => {
    it("returns undefined when there is no attendance answer recorded at all", () => {
        const draft: RSVPDraft = { attendance: undefined as never };
        expect(determineGuestComing("guest1", draft)).toBeUndefined();
    });

    it("returns false only when the guest explicitly declined", () => {
        const draft: RSVPDraft = { attendance: { guest1: "declining" } };
        expect(determineGuestComing("guest1", draft)).toBe(false);
    });

    it("returns true when the guest explicitly attended", () => {
        const draft: RSVPDraft = { attendance: { guest1: "attending" } };
        expect(determineGuestComing("guest1", draft)).toBe(true);
    });

    it("quirk: returns true for a guest with no explicit answer yet, as long as the attendance object exists (only an explicit 'declining' flips it to false)", () => {
        const draft: RSVPDraft = { attendance: {} };
        expect(determineGuestComing("guest2", draft)).toBe(true);
    });
});

describe("buildDraftFromParty", () => {
    it("seeds a full draft from every previously-saved field", () => {
        const party: GuestParty = {
            id: "1",
            guest1: {
                ...guest1,
                attending: "attending",
                mealChoice: "steak",
                dietaryNotes: "no dairy",
                ridingBus: "riding",
                stayingAt: "homewoodSuites",
                rehearsalMixer: "attending",
            },
        };

        const draft = buildDraftFromParty(party);

        expect(draft).toEqual({
            attendance: { guest1: "attending" },
            meal: { guest1: { selectedEntree: "steak", dietaryNotes: "no dairy" } },
            transportation: { guest1: { ridingBus: "riding", stayingAt: "homewoodSuites" } },
            rehearsalMixer: { guest1: "attending" },
        });
    });

    it("leaves meal/transportation/rehearsalMixer undefined for a guest who has only answered attendance", () => {
        const party: GuestParty = {
            id: "1",
            guest1: { ...guest1, attending: "declining" },
        };

        const draft = buildDraftFromParty(party);

        expect(draft.attendance).toEqual({ guest1: "declining" });
        expect(draft.meal).toBeUndefined();
        expect(draft.transportation).toBeUndefined();
        expect(draft.rehearsalMixer).toBeUndefined();
    });

    it("has no guest2 keys anywhere for a guest1-only party", () => {
        const party: GuestParty = {
            id: "1",
            guest1: {
                ...guest1,
                attending: "attending",
                mealChoice: "steak",
                ridingBus: "riding",
                stayingAt: "homewoodSuites",
                rehearsalMixer: "attending",
            },
        };

        const draft = buildDraftFromParty(party);

        expect(draft.attendance.guest2).toBeUndefined();
        expect(draft.meal?.guest2).toBeUndefined();
        expect(draft.transportation?.guest2).toBeUndefined();
        expect(draft.rehearsalMixer?.guest2).toBeUndefined();
    });

    it("does not seed transportation at all when ridingBus is set but stayingAt is missing", () => {
        const party: GuestParty = {
            id: "1",
            guest1: { ...guest1, ridingBus: "riding" },
        };

        const draft = buildDraftFromParty(party);

        expect(draft.transportation).toBeUndefined();
    });
});

describe("renderFieldsForGuest", () => {
    it("treats an unanswered guest1 as eligible to render, per the determineGuestComing default-to-coming quirk", () => {
        const draft: RSVPDraft = { attendance: {} };
        expect(renderFieldsForGuest(draft, singleGuestParty)).toEqual({
            renderGuestOne: true,
            renderGuestTwo: false,
        });
    });

    it("returns guest1 false once guest1 has explicitly declined", () => {
        const draft: RSVPDraft = { attendance: { guest1: "declining" } };
        expect(renderFieldsForGuest(draft, singleGuestParty)).toEqual({
            renderGuestOne: false,
            renderGuestTwo: false,
        });
    });

    it("returns guest1 true, guest2 false when guest1 attends and there is no guest2", () => {
        const draft: RSVPDraft = { attendance: { guest1: "attending" } };
        expect(renderFieldsForGuest(draft, singleGuestParty)).toEqual({
            renderGuestOne: true,
            renderGuestTwo: false,
        });
    });

    it("returns both true when both guests attend", () => {
        const draft: RSVPDraft = { attendance: { guest1: "attending", guest2: "attending" } };
        expect(renderFieldsForGuest(draft, twoGuestParty)).toEqual({
            renderGuestOne: true,
            renderGuestTwo: true,
        });
    });

    it("returns guest1 true, guest2 false when guest2 declines", () => {
        const draft: RSVPDraft = { attendance: { guest1: "attending", guest2: "declining" } };
        expect(renderFieldsForGuest(draft, twoGuestParty)).toEqual({
            renderGuestOne: true,
            renderGuestTwo: false,
        });
    });
});
