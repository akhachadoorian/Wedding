import { guest } from "@/types/guestList";
import { RadioButtons, TextArea } from "../FormInputs";
import { useRSVPForm } from "../RSVPFormContext";
import { getQuestionAnswerParty, Guest, GuestKey, hasAnsweredQuestion, Meal, MEAL_OPTIONS, renderFieldsForGuest, RSVP_KEY_BY_STEP, RSVPDraftKey } from "../types";
import { GuestLabelInputWrapper, RSVPNavButtons, RSVPStepVertical } from "./RSVPStep";
import { useHandleGuestUpdate } from "./useHandleGuestUpdate";
import { useStepSubmit } from "./useStepSubmit";
import { cn } from "@/utils/cn";

const STEP_NUM = 3
const KEY = RSVP_KEY_BY_STEP[STEP_NUM] 

export default function MealSelection() {
    const { party, draft } = useRSVPForm();
    if (party === null) return null; // todo: display error
    
    // Get party
    const { guest1, guest2 } = party;
    const answers = getQuestionAnswerParty(draft, KEY);
    const {renderGuestOne, renderGuestTwo} = renderFieldsForGuest(draft, party) // todo: if both undefined error

    const allAnswered = hasAnsweredQuestion(party, draft, KEY, {renderGuestOne, renderGuestTwo})
    console.log("allAnswered", allAnswered)

     const { handleSubmit } = useStepSubmit({
        canAdvance: allAnswered,
    });

    return (
        <RSVPStepVertical currStep={STEP_NUM}>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-500">
                <div className="flex flex-col gap-700">
                    {renderGuestOne && (<StepThreeInputs guest={guest1} guestKey="guest1" answer={answers?.guest1}/>)}

                    {guest2 && renderGuestTwo && (
                       <StepThreeInputs guest={guest2} guestKey="guest2" answer={answers?.guest2} className={renderGuestOne ? "border-t border-gray pt-700" : ""}/>
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
    className?: string
}

function StepThreeInputs({guest, guestKey, answer,className}:StepThreeInputsProps) {
    const mealInputName = `meal-${guestKey}`
    const dietaryInputName = `dietary-${guestKey}`

    const { handleGuestFieldUpdate } = useHandleGuestUpdate();

    return (
        <div className={cn(className)}>
            <GuestLabelInputWrapper guest={guest} centerHeader={true}>
                <div className="flex flex-col gap-500">
                    <RadioButtons label='Select a Meal' name={mealInputName} options={MEAL_OPTIONS} onChange={(value) => handleGuestFieldUpdate(KEY, guestKey, 'selectedEntree', value)} currValue={answer?.selectedEntree} note="All entrees are served with a side of mash potatoes and green beans." />

                    {/* <hr className="w-full border-0 border-t border-gray" /> */}

                    <TextArea name={dietaryInputName} label="Dietary Notes" placeholder="e.g. Dairy-free, vegan, gluten intolerance" rows={3} /> 
                </div>
            </GuestLabelInputWrapper>
        </div>
    )
}