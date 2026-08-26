import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GuestParty, RSVPDraft } from "../types";
import { StepTestHarness } from "./testUtils";
import MealSelection from "./MealSelection";

const jane = { fullName: "Jane Doe", firstName: "Jane", lastName: "Doe" };
const jamie = { fullName: "Jamie Doe", firstName: "Jamie", lastName: "Doe" };

const twoGuestOneDecliningParty: GuestParty = { id: "p2", guest1: jane, guest2: jamie };
const twoGuestBothAttendingParty: GuestParty = { id: "p3", guest1: jane, guest2: jamie };

describe("MealSelection", () => {
    it("only renders meal fields for attending guests", () => {
        const draft: RSVPDraft = { attendance: { guest1: "attending", guest2: "declining" } };

        render(
            <StepTestHarness
                party={twoGuestOneDecliningParty}
                initialDraft={draft}
                goToStep={vi.fn()}
                step={3}
            >
                <MealSelection />
            </StepTestHarness>,
        );

        expect(screen.getByRole("heading", { name: "Jane Doe" })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Jamie Doe" })).not.toBeInTheDocument();
    });

    it("selecting a meal option and typing dietary notes updates the guest's draft", () => {
        const draft: RSVPDraft = { attendance: { guest1: "attending" } };

        render(
            <StepTestHarness party={{ id: "p1", guest1: jane }} initialDraft={draft} goToStep={vi.fn()} step={3}>
                <MealSelection />
            </StepTestHarness>,
        );

        const steakOption = screen.getByRole("radio", { name: /pepper seared sirloin steak/i });
        fireEvent.click(steakOption);
        expect(steakOption).toBeChecked();

        const dietaryNotes = screen.getByLabelText(/dietary notes/i) as HTMLTextAreaElement;
        fireEvent.change(dietaryNotes, { target: { value: "No dairy" } });
        expect(dietaryNotes.value).toBe("No dairy");
    });

    it("keeps Next disabled until every attending guest has selected an entree (dietary notes are optional)", () => {
        const draft: RSVPDraft = { attendance: { guest1: "attending", guest2: "attending" } };

        render(
            <StepTestHarness
                party={twoGuestBothAttendingParty}
                initialDraft={draft}
                goToStep={vi.fn()}
                step={3}
            >
                <MealSelection />
            </StepTestHarness>,
        );

        const nextButton = screen.getByRole("button", { name: "Next" });
        expect(nextButton).toBeDisabled();

        const [guest1Steak, guest2Steak] = screen.getAllByRole("radio", {
            name: /pepper seared sirloin steak/i,
        });

        fireEvent.click(guest1Steak);
        expect(nextButton).toBeDisabled();

        fireEvent.click(guest2Steak);
        expect(nextButton).not.toBeDisabled();
    });
});
