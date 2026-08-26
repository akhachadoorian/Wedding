import { act, renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RSVPFormProvider } from "../RSVPFormContext";
import { GuestParty, RSVPDraft } from "../types";

vi.mock("../api", () => ({
    submitRSVP: vi.fn(),
}));

import { submitRSVP } from "../api";
import { useStepSubmit } from "./useStepSubmit";

const mockSubmitRSVP = vi.mocked(submitRSVP);

const jane = { fullName: "Jane Doe", firstName: "Jane", lastName: "Doe" };
const party: GuestParty = { id: "p1", guest1: jane };
const draft: RSVPDraft = { attendance: { guest1: "declining" } };

function makeWrapper(goToStep: (step: number) => void) {
    return function Wrapper({ children }: { children: ReactNode }) {
        return (
            <RSVPFormProvider
                value={{
                    step: 2,
                    goToStep,
                    draft,
                    setDraft: vi.fn(),
                    guests: [party],
                    party,
                    setParty: vi.fn(),
                    refetchGuests: vi.fn(async () => {}),
                }}
            >
                {children}
            </RSVPFormProvider>
        );
    };
}

const fakeEvent = { preventDefault: vi.fn() } as unknown as Parameters<
    ReturnType<typeof useStepSubmit>["handleSubmit"]
>[0];

afterEach(() => {
    vi.clearAllMocks();
});

describe("useStepSubmit", () => {
    it("is a no-op when canAdvance is false", async () => {
        const goToStep = vi.fn();
        const { result } = renderHook(
            () => useStepSubmit({ canAdvance: false, overrideNext: { disabled: false, coming: false } }),
            { wrapper: makeWrapper(goToStep) },
        );

        await act(async () => {
            await result.current.handleSubmit(fakeEvent);
        });

        expect(goToStep).not.toHaveBeenCalled();
        expect(mockSubmitRSVP).not.toHaveBeenCalled();
    });

    it("calls submitRSVP exactly once on reaching a terminal step, then advances", async () => {
        mockSubmitRSVP.mockResolvedValue(undefined);
        const goToStep = vi.fn();
        const { result } = renderHook(
            () => useStepSubmit({ canAdvance: true, overrideNext: { disabled: false, coming: false } }),
            { wrapper: makeWrapper(goToStep) },
        );

        await act(async () => {
            await result.current.handleSubmit(fakeEvent);
        });

        expect(mockSubmitRSVP).toHaveBeenCalledTimes(1);
        expect(mockSubmitRSVP).toHaveBeenCalledWith(party, draft);
        expect(goToStep).toHaveBeenCalledWith(-1);
    });

    it("does not advance to a non-terminal step (submitRSVP only fires on reaching -1/-2)", async () => {
        const goToStep = vi.fn();
        const { result } = renderHook(() => useStepSubmit({ canAdvance: true }), {
            wrapper: makeWrapper(goToStep),
        });

        await act(async () => {
            await result.current.handleSubmit(fakeEvent);
        });

        expect(mockSubmitRSVP).not.toHaveBeenCalled();
        expect(goToStep).toHaveBeenCalledWith(3);
    });

    it("sets error and does not advance when submitRSVP rejects", async () => {
        mockSubmitRSVP.mockRejectedValue(new Error("network down"));
        const goToStep = vi.fn();
        const { result } = renderHook(
            () => useStepSubmit({ canAdvance: true, overrideNext: { disabled: false, coming: false } }),
            { wrapper: makeWrapper(goToStep) },
        );

        await act(async () => {
            await result.current.handleSubmit(fakeEvent);
        });

        expect(goToStep).not.toHaveBeenCalled();
        expect(result.current.submitting).toBe(false);
        expect(result.current.error).toBe("network down");
    });
});
