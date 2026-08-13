import { GuestParty, Guests } from "../../types";
import { RSVPStepVertical } from "../RSVPStep";

interface Step2Props {
    // guests: GuestParty | null;
    // partyId: string | null;
    party: GuestParty
}

export default function StepTwo({ party }: Step2Props) {
    // return error if null?
    if  (party === null) return null; // todo: display error

    // Get party
    const {guest1, guest2} = party

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
                    <div className="">
                        <h4>{guest1.firstName} {guest1.lastName}</h4>

                        {/* toggle */}
                    </div>

                    {/* Guest 2 */}
                </div>
            </div>

            {/* Rehearsal Mixer */}
            {/* <div className="">
                
            </div> */}
        </RSVPStepVertical>
    )
}


function RSVPSwitch() {
    
}