import { Switch } from "../FormInputs";
import {
    ATTENDING_OPTION,
    DECLINING_OPTION,
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

const STEP_NUM = 5;

const KEY = RSVP_KEY_BY_STEP[STEP_NUM];

export default function AttendRehearsalMixer() {
    const stepAnswers = useStepAnswers(KEY);
    if (!stepAnswers) return null;

    const { guest1, guest2, answers, allAnswered } = stepAnswers;
    const { handleGuestUpdate } = useHandleGuestUpdate();
    const overrideNext = allAnswered
        ? { disabled: false, coming: true }
        : undefined;
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
                <div className="w-full overflow-hidden flex flex-col gap-700">
                    <div className="flex flex-col gap-500">
                        {/* Guest 1 */}
                        <GuestLabelInputWrapper guest={guest1} layout="row">
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
                            <GuestLabelInputWrapper
                                guest={guest2}
                                layout="row"
                                className="border-t border-gray pt-500"
                            >
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

                <RSVPNavButtons
                    back={{ disabled: false }}
                    next={{ disabled: !allAnswered }}
                    submitting={submitting}
                />
            </form>
        </RSVPStepVertical>
    );
}
