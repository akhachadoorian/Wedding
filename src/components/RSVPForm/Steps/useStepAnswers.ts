import { useEffect } from "react";
import { useRSVPForm } from "../RSVPFormContext";
import {
    Guest,
    GuestParty,
    RSVPDraft,
    RSVPDraftKey,
    getQuestionAnswerParty,
    hasAnsweredQuestion,
    renderFieldsForGuest,
} from "../types";

type StepAnswersOptions = {
    /** Step 2 (attendance) has no prior gating question — both guests always render. */
    skipGating?: boolean;
};

type StepAnswers<K extends RSVPDraftKey> = {
    party: GuestParty;
    guest1: Guest;
    guest2: Guest | undefined;
    answers: NonNullable<RSVPDraft[K]> | null;
    renderGuestOne: boolean;
    renderGuestTwo: boolean;
    allAnswered: boolean;
};

/**
 * Shared per-step answer tracking for the RSVP wizard. Centralizes the
 * "which guest(s) are eligible to answer this question" + "is this step
 * complete" logic that every answer-collecting step needs, and self-heals
 * instead of rendering blank when a prerequisite is missing: redirects to
 * step 1 if there's no party yet, or step 2 if attendance hasn't resolved
 * which guest(s) should even see this step.
 */
export function useStepAnswers<K extends RSVPDraftKey>(
    key: K,
    options: StepAnswersOptions = {},
): StepAnswers<K> | null {
    const { party, draft, goToStep } = useRSVPForm();
    const gating = party && !options.skipGating
        ? renderFieldsForGuest(draft, party)
        : { renderGuestOne: true, renderGuestTwo: true };
    const noGuestsEligible = party !== null && !gating.renderGuestOne && !gating.renderGuestTwo;

    useEffect(() => {
        if (party === null) goToStep(1);
        else if (noGuestsEligible) goToStep(2);
    }, [party, noGuestsEligible, goToStep]);

    if (party === null || noGuestsEligible) return null; // redirecting

    return {
        party,
        guest1: party.guest1,
        guest2: party.guest2,
        answers: getQuestionAnswerParty(draft, key),
        renderGuestOne: gating.renderGuestOne,
        renderGuestTwo: gating.renderGuestTwo,
        allAnswered: hasAnsweredQuestion(party, draft, key, gating),
    };
}
