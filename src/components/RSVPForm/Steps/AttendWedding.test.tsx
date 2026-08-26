import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GuestParty, RSVPDraft } from "../types";
import { StepTestHarness } from "./testUtils";
import AttendWedding from "./AttendWedding";

const jane = { fullName: "Jane Doe", firstName: "Jane", lastName: "Doe" };
const jamie = { fullName: "Jamie Doe", firstName: "Jamie", lastName: "Doe" };

const singleGuestParty: GuestParty = { id: "p1", guest1: jane };
const twoGuestParty: GuestParty = { id: "p2", guest1: jane, guest2: jamie };

const emptyDraft: RSVPDraft = { attendance: {} };

afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
});

describe("AttendWedding", () => {
    it("renders one Switch for a single-guest party", () => {
        render(
            <StepTestHarness party={singleGuestParty} initialDraft={emptyDraft} goToStep={vi.fn()}>
                <AttendWedding />
            </StepTestHarness>,
        );

        expect(screen.getAllByRole("radiogroup")).toHaveLength(1);
    });

    it("renders two Switches for a two-guest party", () => {
        render(
            <StepTestHarness party={twoGuestParty} initialDraft={emptyDraft} goToStep={vi.fn()}>
                <AttendWedding />
            </StepTestHarness>,
        );

        expect(screen.getAllByRole("radiogroup")).toHaveLength(2);
    });

    it("routes to step -1 (decline thank-you) when the only guest declines", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200 }));
        const goToStep = vi.fn();

        render(
            <StepTestHarness party={singleGuestParty} initialDraft={emptyDraft} goToStep={goToStep}>
                <AttendWedding />
            </StepTestHarness>,
        );

        fireEvent.click(screen.getByRole("radio", { name: "Declining" }));
        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        await vi.waitFor(() => {
            expect(goToStep).toHaveBeenCalledWith(-1);
        });
    });

    it("routes to step 3 (meal) when the guest attends", () => {
        const goToStep = vi.fn();

        render(
            <StepTestHarness party={singleGuestParty} initialDraft={emptyDraft} goToStep={goToStep}>
                <AttendWedding />
            </StepTestHarness>,
        );

        fireEvent.click(screen.getByRole("radio", { name: "Attending" }));
        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        expect(goToStep).toHaveBeenCalledWith(3);
    });
});
