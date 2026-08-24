import { YesNoBooleanSwitchField } from "../FormInputs";
import { useRSVPForm } from "../RSVPFormContext";
import {
    getQuestionAnswerParty,
    hasAnsweredQuestion,
    RSVP_KEY_BY_STEP,
} from "../types";
import { RSVPNavButtons, RSVPStepVertical } from "./RSVPStep";
import { useHandleGuestUpdate } from "./useHandleGuestUpdate";
import { useStepSubmit } from "./useStepSubmit";

const STEP_NUM = 5;

const KEY = RSVP_KEY_BY_STEP[STEP_NUM];

export default function StepFive() {
    const { party, draft } = useRSVPForm();
    if (party === null) return null; // todo: display error

    // Get party
    const { guest1, guest2 } = party;
    const answers = getQuestionAnswerParty(draft, KEY);

    const { handleGuestUpdate } = useHandleGuestUpdate();

    const allAnswered = hasAnsweredQuestion(party, draft, KEY);
    const overrideNext = allAnswered
        ? { disabled: false, coming: true }
        : undefined;
    const { handleSubmit } = useStepSubmit({
        canAdvance: allAnswered,
        overrideNext,
    });

    return (
        <RSVPStepVertical currStep={STEP_NUM}>
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-500"
            >
                <div className="flex flex-col gap-500 divide-y divide-gray">
                    <YesNoBooleanSwitchField layout="row" switchProps={{
                        name: "rehearsalMixer-guest1",
                        onChange:(value) =>
                                handleGuestUpdate(
                                    KEY,
                                    'guest1',
                                    value,
                                ),
                        currValue: answers?.guest1
                    }} />

       
                           {guest2 && (
                            <YesNoBooleanSwitchField layout="row" switchProps={{
                        name: "rehearsalMixer-guest2",
                        onChange:(value) =>
                                handleGuestUpdate(
                                    KEY,
                                    'guest2',
                                    value,
                                ),
                        currValue: answers?.guest2
                    }} />
                           )}
                       </div>

                <RSVPNavButtons
                    back={{ disabled: false }}
                    next={{ disabled: !allAnswered }}
                />
            </form>
        </RSVPStepVertical>
    );
}
