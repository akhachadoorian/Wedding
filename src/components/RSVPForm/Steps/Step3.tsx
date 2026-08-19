import { guest } from "@/types/guestList";
import { RadioButtons, TextArea } from "../FormInputs";
import { useRSVPForm } from "../RSVPFormContext";
import { getQuestionAnswerParty, Guest, GuestKey, hasAnsweredQuestion, Meal, MEAL_OPTIONS, RSVP_KEY_BY_STEP, RSVPDraftKey } from "../types";
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


    // Get party
    const { guest1, guest2 } = party;
    const answers = getQuestionAnswerParty(draft, "meal");

    const allAnswered = hasAnsweredQuestion(party, draft, KEY);
    console.log("allAnswered", allAnswered)

    return (
        <RSVPStepVertical currStep={STEP_NUM}>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-500">
                <div className="flex flex-col gap-500">
                    {/* Guest 1 */}
                    <StepThreeInputs guest={guest1} guestKey="guest1" answer={answers?.guest1}/>

                    {guest2 && (
                       <StepThreeInputs guest={guest2} guestKey="guest2" answer={answers?.guest2}/>
                    )}
                </div>

                <RSVPNavButtons back={{disabled: false}} next={{disabled: !allAnswered}}  />
            </form>
        </RSVPStepVertical>
    )
}

interface StepThreeInputsProps {
    guest: Guest
    guestKey: GuestKey
    answer: Meal | undefined
}

function StepThreeInputs({guest, guestKey, answer}:StepThreeInputsProps) {
    const mealInputName = `meal-${guestKey}`
    const dietaryInputName = `dietary-${guestKey}`

    const { handleGuestFieldUpdate } = useHandleGuestUpdate();

    return (
        <div className="">
            <GuestLabelInputWrapper guest={guest}>
                <div className="flex flex-col gap-500">
                    {/* FIXME: FIX THE VALUE type cast */}
                    <RadioButtons label='Meal' name={mealInputName} options={MEAL_OPTIONS} onChange={(value: string) => handleGuestFieldUpdate(KEY, guestKey, 'selectedEntree', value as Meal['selectedEntree'])} currValue={answer?.selectedEntree} />


                    <TextArea name={dietaryInputName} label="Dietary Notes" placeholder="Allergic to dairy" /> 
                    {/* FIXME: fix placeholder */}
                </div>
            </GuestLabelInputWrapper>
        </div>
    )
}