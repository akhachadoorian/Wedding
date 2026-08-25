import { RadioButtons, TextArea } from "../FormInputs";
import { Guest, GuestKey, Meal, MEAL_OPTIONS, RSVP_KEY_BY_STEP } from "../types";
import { GuestLabelInputWrapper, RSVPNavButtons, RSVPStepVertical } from "./RSVPStep";
import { useHandleGuestUpdate } from "./useHandleGuestUpdate";
import { useStepAnswers } from "./useStepAnswers";
import { useStepSubmit } from "./useStepSubmit";
import { cn } from "@/utils/cn";

const STEP_NUM = 3
const KEY = RSVP_KEY_BY_STEP[STEP_NUM]

export default function MealSelection() {
    const stepAnswers = useStepAnswers(KEY);
    if (!stepAnswers) return null;

    const { guest1, guest2, answers, renderGuestOne, renderGuestTwo, allAnswered } = stepAnswers;
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