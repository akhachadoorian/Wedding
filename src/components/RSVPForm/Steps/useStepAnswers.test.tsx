import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ReactNode } from "react";
import { RSVPFormProvider } from "../RSVPFormContext";
import { GuestParty, RSVPDraft } from "../types";
import { useStepAnswers } from "./useStepAnswers";

const jane = { fullName: "Jane Doe", firstName: "Jane", lastName: "Doe" };
const singleGuestParty: GuestParty = { id: "p1", guest1: jane };

function makeWrapper(options: {
    goToStep: (step: number) => void;
    party: GuestParty | null;
    draft: RSVPDraft;
}) {
    return function Wrapper({ children }: { children: ReactNode }) {
        return (
            <RSVPFormProvider
                value={{
                    step: 3,
                    goToStep: options.goToStep,
                    draft: options.draft,
                    setDraft: vi.fn(),
                    guests: options.party ? [options.party] : null,
                    party: options.party,
                    setParty: vi.fn(),
                    refetchGuests: vi.fn(async () => {}),
                }}
            >
                {children}
            </RSVPFormProvider>
        );
    };
}

describe("useStepAnswers", () => {
    it("redirects to step 1 when there is no party yet", () => {
        const goToStep = vi.fn();

        const { result } = renderHook(() => useStepAnswers("meal"), {
            wrapper: makeWrapper({ goToStep, party: null, draft: { attendance: {} } }),
        });

        expect(goToStep).toHaveBeenCalledWith(1);
        expect(result.current).toBeNull();
    });

    it("redirects to step 2 when no guest is eligible to answer this question", () => {
        const goToStep = vi.fn();
        // Single-guest party that has explicitly declined attendance: renderGuestOne is
        // false and there is no guest2, so nobody is eligible for a later question.
        const draft: RSVPDraft = { attendance: { guest1: "declining" } };

        const { result } = renderHook(() => useStepAnswers("meal"), {
            wrapper: makeWrapper({ goToStep, party: singleGuestParty, draft }),
        });

        expect(goToStep).toHaveBeenCalledWith(2);
        expect(result.current).toBeNull();
    });

    it("returns the composed answers object for a normal, eligible party", () => {
        const draft: RSVPDraft = {
            attendance: { guest1: "attending" },
            meal: { guest1: { selectedEntree: "steak" } },
        };

        const { result } = renderHook(() => useStepAnswers("meal"), {
            wrapper: makeWrapper({ goToStep: vi.fn(), party: singleGuestParty, draft }),
        });

        expect(result.current).not.toBeNull();
        expect(result.current?.party).toBe(singleGuestParty);
        expect(result.current?.renderGuestOne).toBe(true);
        expect(result.current?.renderGuestTwo).toBe(false);
        expect(result.current?.allAnswered).toBe(true);
        expect(result.current?.answers).toEqual({ guest1: { selectedEntree: "steak" } });
    });
});
