import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { vi } from "vitest";
import { RSVPFormProvider } from "@/components/RSVPForm/RSVPFormContext";
import { GuestParty, RSVPDraft } from "@/components/RSVPForm/types";

interface StepTestHarnessProps {
    party: GuestParty | null;
    initialDraft: RSVPDraft;
    goToStep: (step: number) => void;
    step?: number;
    /** Defaults to `[party]` (or `null` when there's no party). Override for steps like
     * SearchingLive that need a guest list independent of the current party. */
    guests?: GuestParty[] | null;
    setParty?: Dispatch<SetStateAction<GuestParty | null>>;
    children: ReactNode;
}

/** Minimal RSVPFormProvider wrapper for rendering a single RSVPForm step in isolation,
 * with a real (stateful) draft so step components can read back their own updates. */
export function StepTestHarness({
    party,
    initialDraft,
    goToStep,
    step = 2,
    guests,
    setParty = vi.fn(),
    children,
}: StepTestHarnessProps) {
    const [draft, setDraft] = useState<RSVPDraft>(initialDraft);

    return (
        <RSVPFormProvider
            value={{
                step,
                goToStep,
                draft,
                setDraft,
                guests: guests !== undefined ? guests : party ? [party] : null,
                party,
                setParty,
                refetchGuests: vi.fn(async () => {}),
            }}
        >
            {children}
        </RSVPFormProvider>
    );
}
