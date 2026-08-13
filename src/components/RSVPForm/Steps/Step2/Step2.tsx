import { cn } from "@/utils/cn";
import { GuestParty, Guests, StepProps } from "../../types";
import { RSVPStepVertical } from "../RSVPStep";
import { buttonColorVariants } from "@/components/Buttons/button.variants";
import { BTN_TEXT_CLASSES } from "@/components/Buttons/Button";

interface Step2Props extends StepProps {
    // guests: GuestParty | null;
    // partyId: string | null;
    party: GuestParty | null;
}

export default function StepTwo({ party, draft, setDraft }: Step2Props) {
    // return error if null?
    if (party === null) return null; // todo: display error

    // Get party
    const { guest1, guest2 } = party;

    const handleGuest1Updates = (coming: boolean) => {
        console.log("guest 1 update")
        setDraft((prev) => ({
            ...prev,
            attendance: { ...prev.attendance, guest1: coming },
        }));
    };

    const guest1Answer = draft.attendance.guest1; // boolean | undefined


    return (
        <RSVPStepVertical currStep={2}>
            {/* Wedding RSVP */}
            <div className="w-full">
                <div className="flex flex-col gap-200 border-b pb-200 mb-200">
                    {/* TODO: details */}
                    <p className="eyebrow">Event details</p>
                    <h3 className="heading-s">Wedding Ceremony & Reception</h3>
                </div>

                <div className="">
                    {/* Guest 1 */}
                    <div className="flex justify-between items-center gap-200">
                        <h4>
                            {guest1.firstName} {guest1.lastName}
                        </h4>

                        {/* toggle */}
                        <RSVPSwitch handleClick={handleGuest1Updates} selected={guest1Answer} />
                    </div>

                    {/* Guest 2 */}
                </div>
            </div>

            {/* Rehearsal Mixer */}
            {/* <div className="">
                
            </div> */}
        </RSVPStepVertical>
    );
}

interface RSVPSwitchProps {
    handleClick: (value: boolean) => void;
    selected: boolean | undefined;
}

function RSVPSwitch({ handleClick, selected }: RSVPSwitchProps) {
    return (
        <div className="rsvp_switch_group relative flex border border-cream p-100">
            <span
                className={cn(
                    "rsvp_switch_group-thumb",
                    selected === false && "rsvp_switch_group-thumb-no",
                )}
                style={{ opacity: selected === undefined ? 0 : 1 }}
                aria-hidden="true"
            />

            <RSVPSwitchBtn handleClick={() => handleClick(true)} text="Yes" isActive={selected === true} />

            <RSVPSwitchBtn handleClick={() => handleClick(false)} text="No" isActive={selected === false} />
        </div>
    );
}

interface RSVPSwitchBtnProps {
    handleClick: () => void;
    text: string;
    isActive: boolean
}

function RSVPSwitchBtn({ handleClick, text, isActive }: RSVPSwitchBtnProps) {
    return (
        <button
                className={cn(
                    "rsvp_switch",
                    "relative flex-1 justify-center",
                    buttonColorVariants({ size: "small" }),
                )}
                onClick={handleClick}
            >
                <p className={cn(BTN_TEXT_CLASSES, "rsvp_switch-text", isActive ? 'text-cabernet' : "text-cream")}>{text}</p>
            </button>
    )
}
