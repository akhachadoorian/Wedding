import { Switch } from "../FormInputs";
import {
    ATTENDING_OPTION,
    DECLINING_OPTION,
    determineFullPartyComing,
    RSVP_KEY_BY_STEP
} from "../types";
import {
    GuestLabelInputWrapper,
    RSVPNavButtons,
    RSVPStepVertical,
} from "./RSVPStep";
import { useHandleGuestUpdate } from "./useHandleGuestUpdate";
import { useStepAnswers } from "./useStepAnswers";
import { useStepSubmit } from "./useStepSubmit";

const STEP_NUM = 2;
const KEY = RSVP_KEY_BY_STEP[STEP_NUM];

export default function AttendWedding() {
    const stepAnswers = useStepAnswers("attendance", { skipGating: true });
    if (!stepAnswers) return null;

    const { party, guest1, guest2, answers, allAnswered } = stepAnswers;
    const { handleGuestUpdate } = useHandleGuestUpdate();

    const notComing = determineFullPartyComing(answers, party);

    const overrideNext =
        allAnswered && notComing
            ? {
                  // text: 'submit',
                  disabled: false,
                  coming: false,
              }
            : undefined;

    console.log("allAnswered", allAnswered)

    const { handleSubmit, submitting } = useStepSubmit({
        canAdvance: allAnswered,
        overrideNext,
    });

   

    return (
        <RSVPStepVertical currStep={STEP_NUM}>
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-500"
            >
                {/* Wedding RSVP */}
                <div className="w-full overflow-hidden flex flex-col gap-700">
                    <div className="flex flex-col gap-700">
                        {/* Guest 1 */}
                        <GuestLabelInputWrapper guest={guest1} layout="row" >
                            <Switch
                                name={"attendance-guest1"}
                                onChange={(value) =>
                                    handleGuestUpdate(KEY, "guest1", value)
                                }
                                option_1={ATTENDING_OPTION}
                                option_2={DECLINING_OPTION}
                                currValue={answers?.guest1}
                            />
                        </GuestLabelInputWrapper>

                        {/* Guest 2 */}
                        {guest2 && (
                            <GuestLabelInputWrapper guest={guest2} layout="row" className="border-t border-gray pt-700">
                                <Switch
                                    name={"attendance-guest2"}
                                    onChange={(value) =>
                                        handleGuestUpdate(KEY, "guest2", value)
                                    }
                                    option_1={ATTENDING_OPTION}
                                    option_2={DECLINING_OPTION}
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
                    submitting={submitting}
                />
            </form>
        </RSVPStepVertical>
    );
}
