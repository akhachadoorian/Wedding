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
    
    // Get party
    const { guest1, guest2 } = party;
    const answers = getQuestionAnswerParty(draft, KEY);

    const allAnswered = hasAnsweredQuestion(party, draft, KEY);
     const { handleSubmit } = useStepSubmit({
        canAdvance: allAnswered,
    });

    return (
        <RSVPStepVertical currStep={STEP_NUM}>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-500">
                <div className="flex flex-col gap-500 divide-y divide-gray">
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
                    <RadioButtons label='Meal' name={mealInputName} options={MEAL_OPTIONS} onChange={(value) => handleGuestFieldUpdate(KEY, guestKey, 'selectedEntree', value)} currValue={answer?.selectedEntree} />


                    <TextArea name={dietaryInputName} label="Dietary Notes" placeholder="Allergic to dairy" /> 
                    {/* FIXME: fix placeholder */}
                </div>
            </GuestLabelInputWrapper>
        </div>
    )
}