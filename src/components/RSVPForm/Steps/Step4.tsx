import { useRSVPForm } from "../RSVPFormContext";
import {
    getQuestionAnswerParty,
    hasAnsweredQuestion,
    RSVP_KEY_BY_STEP,
} from "../types";
import { RSVPNavButtons, RSVPStepVertical } from "./RSVPStep";
import { useStepSubmit } from "./useStepSubmit";

const STEP_NUM = 4;

const KEY = RSVP_KEY_BY_STEP[STEP_NUM];

export default function StepFour() {
    const { party, draft } = useRSVPForm();
    if (party === null) return null; // todo: display error

    // Get party
    const { guest1, guest2 } = party;
    const answers = getQuestionAnswerParty(draft, KEY);

    const allAnswered = hasAnsweredQuestion(party, draft, KEY);
    const { handleSubmit } = useStepSubmit({
        canAdvance: allAnswered,
    });

    return (
        <RSVPStepVertical currStep={STEP_NUM}>
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-500"
            >
                <div className="flex flex-col gap-500"></div>

                <RSVPNavButtons
                    back={{ disabled: false }}
                    next={{ disabled: !allAnswered }}
                />
            </form>
        </RSVPStepVertical>
    );
}
