import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GuestParty, RSVPDraft } from "../types";
import { StepTestHarness } from "@/testing/rsvpFormTestUtils";
import Transportation from "./Transportation";

const jane = { fullName: "Jane Doe", firstName: "Jane", lastName: "Doe" };
const singleGuestParty: GuestParty = { id: "p1", guest1: jane };
const attendingDraft: RSVPDraft = { attendance: { guest1: "attending" } };

describe("Transportation", () => {
    it("reveals hotel options once the shuttle is accepted", () => {
        render(
            <StepTestHarness party={singleGuestParty} initialDraft={attendingDraft} goToStep={vi.fn()} step={4}>
                <Transportation />
            </StepTestHarness>,
        );

        expect(screen.queryByRole("radio", { name: /homewood suites/i })).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("radio", { name: "Yes" }));

        expect(screen.getByRole("radio", { name: /homewood suites/i })).toBeInTheDocument();
    });

    it("declining the shuttle hides hotel options, shows the rideshare warning, and auto-completes the answer (auto-sets stayingAt to 'other')", () => {
        render(
            <StepTestHarness party={singleGuestParty} initialDraft={attendingDraft} goToStep={vi.fn()} step={4}>
                <Transportation />
            </StepTestHarness>,
        );

        fireEvent.click(screen.getByRole("radio", { name: "No" }));

        expect(screen.queryByRole("radio", { name: /homewood suites/i })).not.toBeInTheDocument();
        expect(screen.getByText(/rideshare warning/i)).toBeInTheDocument();

        // Declining alone (without picking a hotel) is enough to complete the answer,
        // because Transportation auto-sets stayingAt: 'other' when the bus is declined.
        expect(screen.getByRole("button", { name: "Next" })).not.toBeDisabled();
    });

    it("selecting a hotel marks it as checked and completes the answer", () => {
        render(
            <StepTestHarness party={singleGuestParty} initialDraft={attendingDraft} goToStep={vi.fn()} step={4}>
                <Transportation />
            </StepTestHarness>,
        );

        fireEvent.click(screen.getByRole("radio", { name: "Yes" }));
        const hyattOption = screen.getByRole("radio", { name: /hyatt place/i });
        fireEvent.click(hyattOption);

        expect(hyattOption).toBeChecked();
        expect(screen.getByRole("button", { name: "Next" })).not.toBeDisabled();
    });
});
