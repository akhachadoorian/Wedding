import { cn } from "@/utils/cn";
import { Switch } from "../FormInputs";
import { useRSVPForm } from "../RSVPFormContext";
import {
    Attendance,
    determineNotComing,
    getQuestionAnswerParty,
    hasAnsweredQuestion,
    partyGuestCount,
    Responses,
    RSVP_KEY_BY_STEP,
} from "../types";
import {
    GuestLabelInputWrapper,
    RSVPNavButtons,
    RSVPStepVertical,
} from "./RSVPStep";
import { useHandleGuestUpdate } from "./useHandleGuestUpdate";
import { useStepSubmit } from "./useStepSubmit";

// const STEP_TWO_DRAFT_KEY = 'attendance'
const STEP_NUM = 2;
const KEY = RSVP_KEY_BY_STEP[STEP_NUM];

export default function AttendWedding() {
    const { party, draft } = useRSVPForm();
    // return error if null?
    if (party === null) return null; // todo: display error

    // Get party
    const { guest1, guest2 } = party;
    const { handleGuestUpdate } = useHandleGuestUpdate();

    const answers = getQuestionAnswerParty(draft, "attendance");


    const allAnswered = hasAnsweredQuestion(party, draft, "attendance");
    const notComing = determineNotComing(answers, party);

    const overrideNext =
        allAnswered && notComing
            ? {
                  // text: 'submit',
                  disabled: false,
                  coming: false,
              }
            : undefined;

    const { handleSubmit } = useStepSubmit({
        canAdvance: allAnswered,
        overrideNext,
    });

    const eyebrowClass =
        "flex-1 font-sans text-xs md:text-md uppercase font-normal leading-[140%] tracking-[1px] md:tracking-[2px] ";

    const option_1: { label: string; value: Attendance } = {
        label: 'Attending',
        value: 'Attending',
    }

    const option_2: { label: string; value: Attendance } = {
        label: 'Declining',
        value: 'Declining',
    }

    return (
        <RSVPStepVertical currStep={STEP_NUM}>
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-500"
            >
                {/* Wedding RSVP */}
                <div className="w-full overflow-hidden flex flex-col gap-500">
                    <div className="flex flex-col gap-200 min-w-0 ">
                        <div className="flex gap-(--layout-column-gutter) px-200 min-w-0">
                            <p className={cn(eyebrowClass, "min-w-0")}>
                                Saturday
                                <br />
                                October 31st
                            </p>
                            <p className={cn(eyebrowClass, "text-center min-w-0")}>
                                The Clay Theatre
                                <br />
                                Green Cove, Fl{" "}
                            </p>
                            <p className={cn(eyebrowClass, "text-right min-w-0")}>
                                Ceremony 5:00 PM
                                <br />
                                Until 10:30 PM
                            </p>
                        </div>

                        <h3 className="font-sans! text-xl font-semibold leading-normal tracking-[1.4px] uppercase text-center">
                            Wedding Ceremony & Reception
                        </h3>
                    </div>

                    <div className="flex flex-col gap-500">
                        {/* Guest 1 */}
                        <GuestLabelInputWrapper guest={guest1} layout="row" >
                            <Switch
                                name={"attendance-guest1"}
                                onChange={(value) =>
                                    handleGuestUpdate(KEY, "guest1", value)
                                }
                                option_1={option_1}
                                option_2={option_2}
                                currValue={answers?.guest1}
                            />
                        </GuestLabelInputWrapper>

                        {/* Guest 2 */}
                        {guest2 && (
                            <GuestLabelInputWrapper guest={guest2} layout="row" className="border-t border-gray pt-500">
                                <Switch
                                    name={"attendance-guest2"}
                                    onChange={(value) =>
                                        handleGuestUpdate(KEY, "guest2", value)
                                    }
                                    option_1={option_1}
                                    option_2={option_2}
                                    currValue={answers?.guest2}
                                />
                            </GuestLabelInputWrapper>
                        )}
                    </div>
                </div>

                {/* Back / Next */}
                <RSVPNavButtons
                    back={{ disabled: false }}
                    next={{ disabled: !allAnswered }}
                    overrideNext={overrideNext}
                />
            </form>
        </RSVPStepVertical>
    );
}
