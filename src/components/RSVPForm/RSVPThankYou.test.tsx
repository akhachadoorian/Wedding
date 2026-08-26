import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RSVPFormProvider } from "./RSVPFormContext";
import RSVPThankYou from "./RSVPThankYou";
import { FORM_THANK_YOU } from "./content";

function renderThankYou(coming: boolean, overrides: Partial<Parameters<typeof RSVPFormProvider>[0]["value"]> = {}) {
    const goToStep = vi.fn();
    const setDraft = vi.fn();
    const setParty = vi.fn();
    const refetchGuests = vi.fn(async () => {});

    render(
        <RSVPFormProvider
            value={{
                step: coming ? -2 : -1,
                goToStep,
                draft: { attendance: {} },
                setDraft,
                guests: null,
                party: null,
                setParty,
                refetchGuests,
                ...overrides,
            }}
        >
            <RSVPThankYou coming={coming} />
        </RSVPFormProvider>,
    );

    return { goToStep, setDraft, setParty, refetchGuests };
}

describe("RSVPThankYou", () => {
    it("renders the attending copy when coming is true", () => {
        renderThankYou(true);
        expect(screen.getByText(FORM_THANK_YOU.yes.header)).toBeInTheDocument();
    });

    it("renders the declining copy when coming is false", () => {
        renderThankYou(false);
        expect(screen.getByText(FORM_THANK_YOU.no.header)).toBeInTheDocument();
    });

    it("resets party, draft, and step, and refetches guests when Return to Start is clicked", () => {
        const { goToStep, setDraft, setParty, refetchGuests } = renderThankYou(true);

        fireEvent.click(screen.getByRole("button", { name: /return to start/i }));

        expect(setParty).toHaveBeenCalledWith(null);
        expect(setDraft).toHaveBeenCalledWith({ attendance: {} });
        expect(goToStep).toHaveBeenCalledWith(1);
        expect(refetchGuests).toHaveBeenCalledTimes(1);
    });
});
