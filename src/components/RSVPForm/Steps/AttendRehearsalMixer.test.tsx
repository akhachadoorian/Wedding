import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GuestParty, RSVPDraft } from "../types";
import { StepTestHarness } from "./testUtils";
import AttendRehearsalMixer from "./AttendRehearsalMixer";

const jane = { fullName: "Jane Doe", firstName: "Jane", lastName: "Doe" };
const jamie = { fullName: "Jamie Doe", firstName: "Jamie", lastName: "Doe" };

const singleGuestParty: GuestParty = { id: "p1", guest1: jane };
const twoGuestParty: GuestParty = { id: "p2", guest1: jane, guest2: jamie };

afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
});

describe("AttendRehearsalMixer", () => {
    it("routes to step -2 (attending thank-you) via overrideNext once fully answered", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200 }));
        const goToStep = vi.fn();
        const draft: RSVPDraft = { attendance: { guest1: "attending" } };

        render(
            <StepTestHarness party={singleGuestParty} initialDraft={draft} goToStep={goToStep} step={5}>
                <AttendRehearsalMixer />
            </StepTestHarness>,
        );

        fireEvent.click(screen.getByRole("radio", { name: "Attending" }));
        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        await vi.waitFor(() => {
            expect(goToStep).toHaveBeenCalledWith(-2);
        });
    });

    it("blocks Next for a two-guest party until both have answered", () => {
        const draft: RSVPDraft = { attendance: { guest1: "attending", guest2: "attending" } };

        render(
            <StepTestHarness party={twoGuestParty} initialDraft={draft} goToStep={vi.fn()} step={5}>
                <AttendRehearsalMixer />
            </StepTestHarness>,
        );

        const nextButton = screen.getByRole("button", { name: "Next" });
        expect(nextButton).toBeDisabled();

        const [guest1Radio] = screen.getAllByRole("radio", { name: "Attending" });
        fireEvent.click(guest1Radio);

        expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    });
});
