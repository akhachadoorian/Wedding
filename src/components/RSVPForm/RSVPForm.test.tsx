import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { GuestParty } from "./types";

// AnimatePresence/motion.div are mocked as passthrough components: RSVPForm's
// step transitions otherwise keep the exiting step's DOM mounted during its
// 280ms exit animation, which makes RTL queries ambiguous (two steps' worth of
// DOM present at once) and ties tests to animation timing that isn't part of
// what these tests verify.
vi.mock("motion/react", async () => {
    const React = await import("react");
    const MOTION_ONLY_PROPS = ["variants", "initial", "animate", "exit", "transition", "layout", "mode"];

    const passthrough = (tag: string) => {
        const Component = React.forwardRef((props: Record<string, unknown>, ref) => {
            const domProps = { ...props };
            for (const key of MOTION_ONLY_PROPS) delete domProps[key];
            const { children, ...rest } = domProps;
            return React.createElement(tag, { ...rest, ref }, children as React.ReactNode);
        });
        Component.displayName = `MockMotion(${tag})`;
        return Component;
    };

    return {
        AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
        motion: new Proxy(
            {},
            {
                get: (_target, tag: string) => passthrough(tag),
            },
        ),
    };
});

const mockRefetchGuests = vi.fn();
let mockGuestsState: {
    guests: GuestParty[] | null;
    guestsLoading: boolean;
    guestsError: string | null;
};

vi.mock("../../hooks/useGuests", () => ({
    default: () => ({ ...mockGuestsState, refetchGuests: mockRefetchGuests }),
}));

import RSVPForm from "./RSVPForm";

const jane = { fullName: "Jane Doe", firstName: "Jane", lastName: "Doe" };
const jamie = { fullName: "Jamie Doe", firstName: "Jamie", lastName: "Doe" };

const singleGuestParty: GuestParty = { id: "p1", guest1: jane };
const twoGuestParty: GuestParty = { id: "p2", guest1: jane, guest2: jamie };

function setGuests(guests: GuestParty[]) {
    mockGuestsState = { guests, guestsLoading: false, guestsError: null };
}

// Interactions in this suite go through fireEvent rather than @testing-library/user-event:
// user-event's extra pointer/keyboard event simulation (hover/pointerdown/pointerup, per-keystroke
// timing) triggered spurious remounts and lost keystrokes somewhere in this component's dependency
// tree (Button/Radix slot machinery, most likely) that fireEvent's direct event dispatch does not.
async function searchAndSelect(query: string) {
    const input = screen.getByLabelText(/search by name/i);
    fireEvent.change(input, { target: { value: query } });
    const selectButton = await screen.findByRole(
        "button",
        { name: /this is us/i },
        { timeout: 2000 },
    );
    fireEvent.click(selectButton);
}

function guestSection(name: string): HTMLElement {
    const heading = screen.getByRole("heading", { name });
    const section = heading.closest("div");
    if (!section) throw new Error(`Could not find section for guest ${name}`);
    return section;
}

beforeEach(() => {
    mockRefetchGuests.mockReset();
    setGuests([singleGuestParty]);
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
});

describe("RSVPForm — loading and error states", () => {
    it("renders a loading indicator while guests are loading", () => {
        mockGuestsState = { guests: null, guestsLoading: true, guestsError: null };
        render(<RSVPForm />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("renders the error UI and retries via the Refresh page button", () => {
        mockGuestsState = { guests: null, guestsLoading: false, guestsError: "boom" };
        render(<RSVPForm />);

        expect(screen.getByText("boom")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: /refresh page/i }));
        expect(mockRefetchGuests).toHaveBeenCalledTimes(1);
    });
});

describe("RSVPForm — step 1", () => {
    it("renders the search input once guests resolve successfully", () => {
        render(<RSVPForm />);
        expect(screen.getByLabelText(/search by name/i)).toBeInTheDocument();
    });
});

describe("RSVPForm — full happy path (single guest, attending)", () => {
    it("walks search -> attend -> meal -> transportation -> rehearsal mixer -> submit -> thank you", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
        vi.stubGlobal("fetch", fetchMock);

        render(<RSVPForm />);
        await searchAndSelect("Jane");

        // Step 2: attendance
        expect(await screen.findByRole("radio", { name: "Attending" })).toBeInTheDocument();
        fireEvent.click(screen.getByRole("radio", { name: "Attending" }));
        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        // Step 3: meal
        expect(await screen.findByText(/what's on the menu/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole("radio", { name: /pepper seared sirloin steak/i }));
        fireEvent.change(screen.getByLabelText(/dietary notes/i), {
            target: { value: "No dairy" },
        });
        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        // Step 4: transportation
        expect(await screen.findByText(/riding the bus/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole("radio", { name: "Yes" }));
        fireEvent.click(await screen.findByRole("radio", { name: /homewood suites by hilton/i }));
        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        // Step 5: rehearsal mixer
        expect(await screen.findByText(/join us friday/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole("radio", { name: "Attending" }));
        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        // Terminal: thank you (attending)
        expect(await screen.findByText(/you're all set/i)).toBeInTheDocument();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe("/api/rsvp");
        expect(init.method).toBe("POST");
        const body = JSON.parse(init.body);
        expect(body.party.id).toBe("p1");
        expect(body.draft).toEqual({
            attendance: { guest1: "attending" },
            meal: { guest1: { selectedEntree: "steak", dietaryNotes: "No dairy" } },
            transportation: { guest1: { ridingBus: "riding", stayingAt: "homewoodSuites" } },
            rehearsalMixer: { guest1: "attending" },
        });
    });
});

describe("RSVPForm — decline-early-exit branch", () => {
    it("declining at step 2 skips straight to the decline thank-you screen", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
        vi.stubGlobal("fetch", fetchMock);

        render(<RSVPForm />);
        await searchAndSelect("Jane");

        fireEvent.click(await screen.findByRole("radio", { name: "Declining" }));
        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        expect(await screen.findByText(/we'll miss you/i)).toBeInTheDocument();
        // Meal/transportation/rehearsal-mixer copy should never have appeared.
        expect(screen.queryByText(/what's on the menu/i)).not.toBeInTheDocument();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const body = JSON.parse(fetchMock.mock.calls[0][1].body);
        expect(body.draft).toEqual({ attendance: { guest1: "declining" } });
    });
});

describe("RSVPForm — two-guest party", () => {
    it("renders both guests at step 2 and blocks advancing until both have answered", async () => {
        setGuests([twoGuestParty]);
        render(<RSVPForm />);
        await searchAndSelect("Jane Doe");

        expect(await screen.findByRole("heading", { name: "Jane Doe" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Jamie Doe" })).toBeInTheDocument();

        const nextButton = screen.getByRole("button", { name: "Next" });
        expect(nextButton).toBeDisabled();

        fireEvent.click(within(guestSection("Jane Doe")).getByRole("radio", { name: "Attending" }));
        expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();

        fireEvent.click(within(guestSection("Jamie Doe")).getByRole("radio", { name: "Declining" }));
        expect(screen.getByRole("button", { name: "Next" })).not.toBeDisabled();
    });
});

describe("RSVPForm — return to start", () => {
    it("resets to step 1 and refetches guests from the thank-you screen", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200 }));

        render(<RSVPForm />);
        await searchAndSelect("Jane");
        fireEvent.click(await screen.findByRole("radio", { name: "Declining" }));
        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        expect(await screen.findByText(/we'll miss you/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: /return to start/i }));

        expect(await screen.findByLabelText(/search by name/i)).toBeInTheDocument();
        expect(mockRefetchGuests).toHaveBeenCalled();
    });
});

describe("RSVPForm — submit in flight", () => {
    it("shows Submitting… and disables Next while the RSVP write is pending", async () => {
        let resolveFetch: (value: { ok: boolean; status: number }) => void;
        const pending = new Promise((resolve) => {
            resolveFetch = resolve;
        });
        vi.stubGlobal("fetch", vi.fn().mockReturnValue(pending));

        render(<RSVPForm />);
        await searchAndSelect("Jane");
        fireEvent.click(await screen.findByRole("radio", { name: "Declining" }));
        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        const submittingButton = await screen.findByRole("button", { name: /submitting/i });
        expect(submittingButton).toBeDisabled();

        resolveFetch!({ ok: true, status: 200 });
        expect(await screen.findByText(/we'll miss you/i)).toBeInTheDocument();
    });
});

describe("RSVPForm — failed submission (documents an existing gap, not desired behavior)", () => {
    it("does not surface any error message to the user when the RSVP submission fails", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));

        render(<RSVPForm />);
        await searchAndSelect("Jane");
        fireEvent.click(await screen.findByRole("radio", { name: "Declining" }));
        fireEvent.click(screen.getByRole("button", { name: "Next" }));

        // useStepSubmit's `error` state is only ever console.error'd and stored —
        // RSVPNavButtons only consumes `submitting`, so nothing renders it.
        // The wizard just silently stays on step 2 with the Next button re-enabled.
        await vi.waitFor(() => {
            expect(screen.getByRole("button", { name: "Next" })).not.toBeDisabled();
        });
        expect(screen.queryByText(/we'll miss you/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/failed/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
    });
});
