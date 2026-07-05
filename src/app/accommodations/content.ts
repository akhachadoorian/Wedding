import { ImageOverlayHeroProps } from "@/layout/ImageOverlayHero/ImageOverlayHero";
import {
    ArtDecoCardGridProps,
    ArtDecoCardProps,
} from "../../components/ArtDecoCardGrid/ArtDecoCardGrid";
import { CopyOnlyProps } from "../../components/CopyOnly/CopyOnly";
import { SplitInfoProps } from "../../components/SplitInfo/SplitInfo";
import { TextOnlyHeroProps } from "../../layout/TextOnlyHero/TextOnlyHero";
import { NonEmptyArray } from "../../types/utility";
import {
    BusIcon,
    LetterCirclePIcon,
    MapTrifoldIcon,
} from "@phosphor-icons/react";
import { DEFAULT_IMAGE } from "@/data/defaultImage";

// #region --- Hero -----------------------------------------------

// const heroV1: Omit<TextOnlyHeroProps, "loaded" | "styleOptions"> = {
//     eyebrow: "Accommodations",
//     header: "Where to Stay & How to Get There",
//     body: "The venue is in Green Cove Springs, a beautiful small town about 30 minutes south of Jacksonville.  Below you'll find our hotel recommendations, transportation details, and everything else you need to feel prepared for the weekend.",
// };

const hero: Omit<ImageOverlayHeroProps, "loaded" | "styleOptions"> = {
    image: {
        ...DEFAULT_IMAGE,
        imgPositionResponsive: {
            desktop: "center 25%",
            mobile: "35% center",
        },
    },
    eyebrow: "Accommodations",
    header: "Hotels & Transportation",
    body: "We've reserved hotel blocks in Jacksonville and arranged a complimentary bus to the venue. Here's what to know about hotels, parking, and getting there.",
    buttons: [
        {
            type: "link",
            text: "See Hotels",
            link: "/accommodations#hotels",
            decoration: {
                type: "arrow",
            },
        },
        {
            type: "link",
            text: "Transportation Details",
            link: "/accommodations#transportation",
            decoration: {
                type: "arrow",
            },
        },
    ],
};

// #endregion

// --- Hotels -----------------------------------------------

const hotelsCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Where to Stay",
    header: "We recommend staying in Jacksonville",
    body: "The venue is located in Green Cove Springs, a beautiful area without hotels nearby. We recommend staying in Jacksonville — just a short drive away — where we've reserved room blocks at three convenient hotels. ",
};

const hotelCards: ArtDecoCardGridProps = {
    cards: [
        {
            icon: "sunrise",
            title: "Homewood Suites by Hilton",
            subtitle: "Jacksonville / St. Johns Town Center",
            body: "10434 Midtown Parkway, Jacksonville, Florida 32246",
            btnSettings: {
                type: "link",
                text: "Book a room",
                link: "https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=JAXHWHW&groupCode=CHWKPW&arrivaldate=2026-10-30&departuredate=2026-11-01&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT",
                target: "_blank",
            },
        },
        {
            icon: "rounded",
            title: "Hyatt Place",
            subtitle: "Jacksonville / St. Johns Town Center",
            body: "4742 Town Center Parkway, Jacksonville, FL 32246",
            btnSettings: {
                type: "link",
                text: "Book a room",
                link: "https://www.hyatt.com/shop/rooms/jaxzs?checkinDate=2026-10-30&checkoutDate=2026-11-01&rooms=1&adults=1&kids=0&corp_id=G-PAKH&accessibilityCheck=false",
                target: "_blank",
            },
        },
        {
            icon: "fan",
            title: "AC Hotel",
            subtitle: "Jacksonville / St. Johns Town Center",
            body: "5323 Big Island Drive Jacksonville, FL, 32246",
            btnSettings: {
                type: "link",
                text: "Book a room",
                link: "https://www.marriott.com/event-reservations/reservation-link.mi?id=1769721428537&key=GRP&app=resvlink&_branch_match_id=1523737832059623201&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi3OyczLtgdK2ALZZSCOWmaKraG5maW5kaGJkYWpsbladmqlrXtQgFpdUWpaKlB3Xnp8UlF%2BeXFqka1zRlF%2BbioAZ5DLjmAAAAA%3D",
                target: "_blank",
            },
        },
    ],
};

const hotels = {
    copyOnly: hotelsCopyOnly,
    hotelCards: hotelCards,
};

// ----- Transportation -----------------------------------------------

const transportationIntro: SplitInfoProps["intro"] = {
    upperText: {
        eyebrow: "Transportation",
        header: "Getting To & From the Venue",
        body: "Everything you need to know — from where to park to getting home safely at the end of the night.",
    },

    lowerText: {
        header: "Rideshare warning",
        body: "Please keep in mind that while you may be able to get an Uber or another rideshare service to the venue, we have been informed that it is very difficult to get an Uber back into Jacksonville.",
    },
};

const transportationContent: SplitInfoProps["content"] = {
    content: [
        {
            eyebrow: "The Venue",
            header: "The Clay Theatre Parking",
            body: "Several free parking options are available right at The Clay Theatre. ",
            buttons: [
                {
                    type: "link",
                    text: "View Directions",
                    link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhIIARAuGEMYrwEYxwEYgAQYigUyDQgCEC4YgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyBggEEEUYOTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDE1NjRqMGo0qAIAsAIB&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KZ00Fx6y0OWIMRYGQ-r5b-pC&daddr=326+Walnut+St,+Green+Cove+Springs,+FL+32043",
                    target: "_blank" as const,
                    decoration: {
                        type: "icon",
                        icon: MapTrifoldIcon,
                    },
                },
                {
                    type: "modal",
                    text: "parking",
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
                                body: "Free parking is available in the grass lot connected to Clay Theatre, conveniently located right next to the venue for easy access.",
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
                },
            ],
        },
        {
            eyebrow: "Bus Service",
            header: "We've Arranged a Bus",
            body: "To make the night as easy as possible, we've arranged a bus running between the hotel blocks and the venue.",
            buttons: [
                {
                    type: "modal",
                    text: "View Schedule",
                    decoration: {
                        type: "icon",
                        icon: BusIcon,
                    },
                    modalID: "bus_modal",
                    modalContent: {
                        header: "Bus Schedule",
                        content: [
                            // TODO: update content
                            {
                                title: "Bus Schedule is coming soon!",
                                body: "",
                            },
                            //     {
                            //        title: 'On-Street Parking',
                            //        body: 'On-street parking and public parking along Spring Park are both available and just a short walk from the venue.',
                            //     },
                            //     {
                            //        title: 'City Hall Parking',
                            //        body: 'City Hall is just across the street from the venue. Per the venue, guests are welcome to park in their lot as the building is closed on Saturdays.',
                            //     },
                        ],
                    },
                },
            ],
        },
    ],
};

const transportation: SplitInfoProps = {
    intro: transportationIntro,
    content: transportationContent,
};

// ----- Content -----------------------------------------------

const accommodationsContent = {
    hero: hero,
    transportation: transportation,
    hotels: hotels,
};

export default accommodationsContent;
