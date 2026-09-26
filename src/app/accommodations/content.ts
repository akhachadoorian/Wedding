import { CardGridProps } from "@/components/CardGrid/CardGrid";
import { arrowLink, heroImage, hotelCard } from "@/content/builders";
import { EVENT } from "@/content/event";
import { HOTELS } from "@/content/hotels";
import { parkingModalButton, rideshareNote } from "@/content/shared";
import { ComingSoonPageContent, ComingSoonSectionContent, CopyContent, HeroContent } from "@/content/types";
import { BusIcon } from "@phosphor-icons/react";

// #region --- Hero ---

const hero: HeroContent = {
    image: heroImage,
    eyebrow: "Accommodations",
    header: "Hotels & Transportation",
    body: "We've reserved hotel blocks in Jacksonville and arranged a complimentary bus to the venue. Here's what to know about hotels, parking, and getting there.",
    buttons: [
        arrowLink("See Hotels", "/accommodations#hotels"),
        arrowLink("Transport Details", "/accommodations#transportation"),
    ],
};

// #endregion ---

// #region --- Hotels ---

const hotelsIntro: CopyContent = {
    eyebrow: "Where to Stay",
    header: "We recommend staying in Jacksonville",
    body: `The venue is located in Green Cove Springs, a beautiful area without hotels nearby. We recommend staying in Jacksonville — just a short drive away — where we've reserved room blocks at three convenient hotels.`,
};

const hotelCards: CardGridProps = {
    cards: Object.entries(HOTELS).map(([key, hotel]) => hotelCard(key, hotel)),
};

// #endregion ---

// #region --- Transportation ---

const transportationIntro: CopyContent = {
    eyebrow: "Getting There",
    header: "Transportation to & From the Venue",
    body: "Complimentary shuttle buses will run between the hotels listed above and the venue. If you'd like to take the bus, please indicate this in your RSVP, along with which hotel you'll be picked up from and returned to, so we can plan accordingly.",
    buttons: [
        {
            type: "modal",
            text: "Bus Schedule",
            decoration: {
                type: "icon",
                icon: BusIcon,
            },
            modalID: "bus_schedule_modal",
            modalContent: {
                header: "Bus Schedule",
                content: [
                    {
                        title: "More Information Coming Soon",
                        body: "A more detailed bus schedule will be available after the RSVPs are complete.",
                    },
                    {
                        title: "To the Venue",
                        body: "The bus will start picking up guests at 3:30pm. The hotel pick up order will be available later.",
                    },
                    {
                        title: "Return From the Venue",
                        body: `The bus will depart from the venue at ${EVENT.wedding.end}. The hotel drop off order will be available later.`,
                    },
                ],
            },
        },
        parkingModalButton,
        arrowLink("View Venue Details", "/details#venue"),
    ],
};

// #endregion ---

// #region --- Coming Soon ---

const comingSoon = {
    page: {
        pageTitle: "Accommodations",
        body: "This page will have information related to the hotel blocks and transportation to the venue.",
    },
    transportation: {
        eyebrow: "More to Come",
        title: "Transportation section coming soon!",
        body: "It will contain information regarding how to get to and from the venue, venue parking, and the arranged bus service.",
    },
} satisfies { page: ComingSoonPageContent; transportation: ComingSoonSectionContent };

// #endregion ---

// #region --- Content ---

const accommodationsContent = {
    hero,
    hotels: {
        intro: hotelsIntro,
        cards: hotelCards,
    },
    transportation: {
        intro: transportationIntro,
        note: rideshareNote,
    },
    comingSoon,
};

export default accommodationsContent;

// #endregion ---
