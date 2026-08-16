import { SubmitEvent, useState } from "react";
import { useRSVPForm } from "../RSVPFormContext";
import { submitRSVP } from "../api";
import { OverrideProps, resolveNextStep } from "./RSVPStep";

/** Steps -1 and -2 are the decline/attending thank-you screens — reaching either means the flow is done. */
const TERMINAL_STEPS = [-1, -2];

interface UseStepSubmitOptions {
    /** Whether the step's fields are complete enough to advance. Guards Enter-to-submit as well as the Next button. */
    canAdvance: boolean;
    /** Branches navigation away from `step + 1` (e.g. skipping to a decline thank-you step). */
    overrideNext?: OverrideProps;
    /** Optional step-specific side effect to run before advancing. Throw to keep the user on the step. Runs in addition to, not instead of, the automatic RSVP submission on terminal transitions. */
    onSubmit?: () => Promise<void> | void;
}

interface UseStepSubmitResult {
    handleSubmit: (e: SubmitEvent) => void;
    submitting: boolean;
    error: string | null;
}

export function useStepSubmit({
    canAdvance,
    overrideNext,
    onSubmit,
}: UseStepSubmitOptions): UseStepSubmitResult {
    const { step, goToStep, party, draft } = useRSVPForm();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!canAdvance || submitting) return;

        setError(null);

        const nextStep = resolveNextStep(step, overrideNext);
        const isTerminal = TERMINAL_STEPS.includes(nextStep);

        if (onSubmit || isTerminal) {
            setSubmitting(true);
            try {
                if (onSubmit) await onSubmit();

                // Reaching a terminal step (however this step got there — a normal
                // Next or an override like "not coming") means the RSVP is final.
                if (isTerminal) {
                    if (!party) throw new Error("Missing guest party — please start over.");
                    await submitRSVP(party, draft);
                }
            } catch (err) {
                console.error("Step submission error:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong. Please try again.",
                );
                setSubmitting(false);
                return;
            }
            setSubmitting(false);
        }

        goToStep(nextStep);
    };

    return { handleSubmit, submitting, error };
}
