import { RadioButtons } from "../FormInputs";
import { useRSVPForm } from "../RSVPFormContext";
import { getQuestionAnswerParty, Meal, MEAL_OPTIONS, RSVP_KEY_BY_STEP, RSVPDraftKey } from "../types";
import { GuestLabelInputWrapper, RSVPNavButtons, RSVPStepVertical } from "./RSVPStep";
import { useHandleGuestUpdate } from "./useHandleGuestUpdate";
import { useStepSubmit } from "./useStepSubmit";

// todo: better way?
// const STEP_THREE_DRAFT_KEY = 'meal'
const STEP_NUM = 3

const KEY = RSVP_KEY_BY_STEP[STEP_NUM] 

export default function StepThree() {
    const { party, draft } = useRSVPForm();
    if (party === null) return null; // todo: display error
    // RSVP submission now happens automatically in useStepSubmit whenever the
    // resolved next step is terminal (-1/-2) — no need to POST here directly.
    // TODO: gate canAdvance on real Step3 fields, and route the final "coming"
    // step to -2 (via overrideNext or otherwise) once Step3 is the last step.
    const { handleSubmit } = useStepSubmit({
        canAdvance: true,
    });

    const { handleGuestUpdate, handleGuestFieldUpdate } = useHandleGuestUpdate();

    // Get party
    const { guest1, guest2 } = party;
    const answers = getQuestionAnswerParty(draft, "meal");
    
    return (
        <RSVPStepVertical currStep={STEP_NUM}>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-500">
                <div className="">
                    {/* Guest 1 */}
                    <GuestLabelInputWrapper guest={guest1}>
                        {/* FIXME: FIX THE VALUE type cast */}
                        <RadioButtons label='Meal' name="meal-guest1" options={MEAL_OPTIONS} onChange={(value: string) => handleGuestFieldUpdate(KEY, 'guest1', 'selectedEntree', value as Meal['selectedEntree'])} currValue={answers?.guest1?.selectedEntree} />
                    </GuestLabelInputWrapper>

                </div>

                <RSVPNavButtons back={{disabled: false}} next={{disabled: true}}  />
            </form>
        </RSVPStepVertical>
    )
}

