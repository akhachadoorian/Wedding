import { YesNoBooleanSwitch } from "../FormInputs";
import { useRSVPForm } from "../RSVPFormContext";
import {
    getQuestionAnswerParty,
    hasAnsweredQuestion,
    partyGuestCount,
    Responses,
    RSVP_KEY_BY_STEP,
    RSVPDraftKey
} from "../types";
import {
    GuestLabelInputWrapper,
    RSVPNavButtons,
    RSVPStepVertical,
} from "./RSVPStep";
import { useHandleGuestUpdate } from "./useHandleGuestUpdate";
import { useStepSubmit } from "./useStepSubmit";

function determineNotComing(answer: Responses | null, hasTwoGuests: boolean) {
    if (hasTwoGuests) {
        const g1Coming = answer?.guest1 && !answer.guest1;
        const g2Coming = answer?.guest2 && !answer.guest2;

        return g1Coming && g2Coming;
    }

    return !answer?.guest1;
}

// const STEP_TWO_DRAFT_KEY = 'attendance'
const STEP_NUM = 2
const KEY: RSVPDraftKey = RSVP_KEY_BY_STEP[STEP_NUM] 

export default function StepTwo() {
    const { party, draft } = useRSVPForm();
    // return error if null?
    if (party === null) return null; // todo: display error

    // Get party
    const { guest1, guest2 } = party;

    // console.log(`guest1: ${guest1} guest2: ${guest2}`);

    // const handleGuestUpdate = (guestKey: GuestKey, coming: boolean) => {
    //     // console.log("draft ", draft);
    //     setDraft((prev) => ({
    //         ...prev,
    //         attendance: { ...prev.attendance, [guestKey]: coming },
    //     }));
    //     // console.log("draft ", draft);
    // };
    const { handleGuestUpdate } = useHandleGuestUpdate();


    const answers = getQuestionAnswerParty(draft, "attendance");

    // const guest1Answer = draft.attendance?.guest1; // boolean | undefined
    // const guest2Answer = draft.attendance?.guest2;

    // todo: is next disabled?
    // unanswered
    // const hasTwoGuests = guest1 !== undefined && guest2  !== undefined;
    // const hasTwoGuests = partyGuestCount(party) === 2 ? true : false;
    // console.log("hasTwoGuests", hasTwoGuests);

    const allAnswered = hasAnsweredQuestion(party, draft, "attendance");
    const notComing = determineNotComing(
        answers,
        partyGuestCount(party) === 2 ? true : false,
    );
    // console.log("allAnswered", allAnswered);
    // console.log("notComing", notComing);

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

    return (
        <RSVPStepVertical currStep={STEP_NUM}>
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-500"
            >
                {/* Wedding RSVP */}
                <div className="w-full">
                    <div className="flex flex-col gap-200 border-b pb-200 mb-200">
                        {/* TODO: details and fix switch*/}
                        <p className="eyebrow">Event details</p>
                        <h3 className="heading-s">
                            Wedding Ceremony & Reception
                        </h3>
                    </div>

                    <div className="">
                        {/* Guest 1 */}
                        <GuestLabelInputWrapper guest={guest1}>
                            <YesNoBooleanSwitch
                                name={"attendance-guest1"}
                                onChange={(coming) =>
                                    handleGuestUpdate(KEY, "guest1", coming)
                                }
                                currValue={answers?.guest1}
                            />
                        </GuestLabelInputWrapper>

                        {/* Guest 2 */}
                        {guest2 && (
                            <GuestLabelInputWrapper guest={guest2}>
                                <YesNoBooleanSwitch
                                    name={"attendance-guest2"}
                                    onChange={(coming) =>
                                        handleGuestUpdate(KEY, "guest2", coming)
                                    }
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