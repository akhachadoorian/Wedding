import {
    RadioButtons,
    SwitchField,
} from "../FormInputs";
import { useRSVPForm } from "../RSVPFormContext";
import {
    getQuestionAnswerParty,
    Guest,
    GuestKey,
    hasAnsweredQuestion,
    HOTEL_OPTIONS,
    isStayingAtHotel,
    RSVP_KEY_BY_STEP,
    Transportation,
} from "../types";
import {
    GuestLabelInputWrapper,
    RSVPNavButtons,
    RSVPStepVertical,
} from "./RSVPStep";
import { useHandleGuestUpdate } from "./useHandleGuestUpdate";
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
    console.log("allAnswered", allAnswered)

    return (
        <RSVPStepVertical currStep={STEP_NUM}>
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-500"
            >
                <div className="flex flex-col gap-500 divide-y divide-gray">
                    <StepFourInputs
                        guest={guest1}
                        guestKey="guest1"
                        answer={answers?.guest1}
                    />

                    {guest2 && (
                        <StepFourInputs
                            guest={guest2}
                            guestKey="guest2"
                            answer={answers?.guest2}
                        />
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

interface StepFourInputsProps {
    guest: Guest;
    guestKey: GuestKey;
    answer: Transportation | undefined;
}

function StepFourInputs({ guest, guestKey, answer }: StepFourInputsProps) {
    const hotelInputName = `hotel-${guestKey}`;
    const takingBusInputName = `taking_bus-${guestKey}`;

    const { handleGuestFieldUpdate } = useHandleGuestUpdate();

    const canTakeBus = isStayingAtHotel(answer?.stayingAt)

    return (
        <div className="">
            <GuestLabelInputWrapper guest={guest}>
                <div className="flex flex-col gap-500">
                    <RadioButtons
                        label="Meal"
                        name={hotelInputName}
                        options={HOTEL_OPTIONS}
                        onChange={(value) => {
                            handleGuestFieldUpdate(
                                KEY,
                                guestKey,
                                "stayingAt",
                                value,
                            );
                            if (!isStayingAtHotel(value)) {
                                handleGuestFieldUpdate(
                                    KEY,
                                    guestKey,
                                    "takingBus",
                                    false,
                                );
                            }
                        }}
                        currValue={answer?.stayingAt}
                    />

                    <SwitchField
                        label="Will you use the complimentary shuttle to/from the venue?"
                        note="Please note: You must be staying at the three listed hotels"
                        switchProps={{
                            name: takingBusInputName,
                            onChange: (value) =>
                                handleGuestFieldUpdate(
                                    KEY,
                                    guestKey,
                                    "takingBus",
                                    value,
                                ),
                            option_1: { label: "Yes", value: true },
                            option_2: { label: "No", value: false },
                            currValue: answer?.takingBus,
                            disabled: !canTakeBus
                        }}
                    />
                </div>
            </GuestLabelInputWrapper>
        </div>
    );
}
