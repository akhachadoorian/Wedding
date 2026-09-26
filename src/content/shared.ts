import { ModalButtonSettings } from "@/types/buttons";
import { LetterCirclePIcon } from "@phosphor-icons/react";
import { EVENT } from "./event";

/** Venue parking info — used on Details (venue captions) and Accommodations (transportation). */
export const parkingModalButton: ModalButtonSettings = {
    type: "modal",
    text: "Venue Parking",
    decoration: {
        type: "icon",
        icon: LetterCirclePIcon,
    },
    modalID: "parking_modal",
    modalContent: {
        header: "Parking",
        content: [
            {
                title: "Grass Lot Parking",
                body: `Free parking is available in the grass lot connected to ${EVENT.venue.name}, conveniently located right next to the venue for easy access.`,
            },
            {
                title: "On-Street Parking",
                body: "On-street parking and public parking along Spring Park are both available and just a short walk from the venue.",
            },
            {
                title: "City Hall Parking",
                body: "City Hall is just across the street from the venue. Per the venue, guests are welcome to park in their lot as the building is closed on Saturdays.",
            },
        ],
    },
};

/** Reminder shown on Details (venue) and Accommodations (transportation). */
export const rideshareNote =
    "Just a reminder that rideshares, while available to the venue, will be very difficult to find — if you can even find one — for the trip back. Please plan accordingly.";
