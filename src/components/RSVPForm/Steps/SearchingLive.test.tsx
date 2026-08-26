import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GuestParty } from "../types";
import { StepTestHarness } from "./testUtils";
import SearchRSVPLive from "./SearchingLive";

const jane = { fullName: "Jane Doe", firstName: "Jane", lastName: "Doe" };
const bob = { fullName: "Bob Smith", firstName: "Bob", lastName: "Smith" };

const janeParty: GuestParty = { id: "p1", guest1: jane };
const bobParty: GuestParty = { id: "p2", guest1: bob };

function renderSearch(guests: GuestParty[], goToStep: (step: number) => void) {
    const setParty = vi.fn();

    render(
        <StepTestHarness
            party={null}
            guests={guests}
            initialDraft={{ attendance: {} }}
            goToStep={goToStep}
            step={1}
            setParty={setParty}
        >
            <SearchRSVPLive />
        </StepTestHarness>,
    );

    return { setParty };
}

describe("SearchingLive", () => {
    it("prompts to keep typing below the minimum search length", () => {
        renderSearch([janeParty], vi.fn());

        fireEvent.change(screen.getByLabelText(/search by name/i), { target: { value: "J" } });

        expect(screen.getByText(/keep typing your name to search/i)).toBeInTheDocument();
    });

    it("shows a pending state immediately after typing, before the debounce settles", () => {
        renderSearch([janeParty], vi.fn());

        fireEvent.change(screen.getByLabelText(/search by name/i), { target: { value: "Jane" } });

        expect(screen.getByText(/searching/i)).toBeInTheDocument();
    });

    it("shows matching results once the debounce settles", async () => {
        renderSearch([janeParty, bobParty], vi.fn());

        fireEvent.change(screen.getByLabelText(/search by name/i), { target: { value: "Jane" } });

        expect(
            await screen.findByRole("button", { name: /this is us/i }, { timeout: 2000 }),
        ).toBeInTheDocument();
        expect(screen.queryByText(/bob smith/i)).not.toBeInTheDocument();
    });

    it("shows a no-matches message when nothing matches", async () => {
        renderSearch([janeParty], vi.fn());

        fireEvent.change(screen.getByLabelText(/search by name/i), { target: { value: "Zzzz" } });

        expect(
            await screen.findByText(/no matches yet/i, undefined, { timeout: 2000 }),
        ).toBeInTheDocument();
    });

    it("selecting a result seeds the party and advances to step 2", async () => {
        const goToStep = vi.fn();
        const { setParty } = renderSearch([janeParty], goToStep);

        fireEvent.change(screen.getByLabelText(/search by name/i), { target: { value: "Jane" } });
        const selectButton = await screen.findByRole(
            "button",
            { name: /this is us/i },
            { timeout: 2000 },
        );
        fireEvent.click(selectButton);

        expect(setParty).toHaveBeenCalledWith(janeParty);
        expect(goToStep).toHaveBeenCalledWith(2);
    });
});
