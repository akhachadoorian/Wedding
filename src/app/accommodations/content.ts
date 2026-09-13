import { ImageOverlayHeroProps } from "@/layout/ImageOverlayHero/ImageOverlayHero";
import { SplitInfoProps } from "../../components/SplitInfo/SplitInfo";
import { TextOnlyHeroProps } from "../../layout/TextOnlyHero/TextOnlyHero";
import { NonEmptyArray } from "../../types/utility";
import {
    BusIcon,
    LetterCirclePIcon,
    MapTrifoldIcon,
} from "@phosphor-icons/react";
import { DEFAULT_IMAGE } from "@/data/defaultImage";
import { CardGridProps } from "@/components/CardGrid/CardGrid";
import { CopyOnlyProps } from "@/components/CopyOnly/CopyOnly";

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
            text: "Transport Details",
            link: "/accommodations#transportation",
            decoration: {
                type: "arrow",
            },
        },
    ],
};

// #endregion

// #region --- Hotels -----------------------------------------------

const hotelsCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Where to Stay",
    header: "We recommend staying in Jacksonville",
    body: "The venue is located in Green Cove Springs, a beautiful area without hotels nearby. We recommend staying in Jacksonville — just a short drive away — where we've reserved room blocks at three convenient hotels. ",
};

// TODO: determine if buttons or modal
const hotelCards: CardGridProps = {
    cards: [
        {
            text: {
                title: "Homewood Suites",
                body: "10434 Midtown Parkway, Jacksonville, Florida 32246",
            },
            cardType: {
                type: "modal",
                modalSettings: {
                    modalID: "homewood-modal",
                    modalContent: {
                        header: "Homewood Suites",
                        content: [
                            {
                                title: "Address",
                                body: "10434 Midtown Parkway, Jacksonville, Florida 32246",
                                button: {
                                    text: "book now",
                                    link: "https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=JAXHWHW&groupCode=CHWKPW&arrivaldate=2026-10-30&departuredate=2026-11-01&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT",
                                    target: "_blank",
                                },
                            },
                            {
                                title: "Group Code",
                                body: "CHWKPW",
                            },
                        ],
                    },
                },
            },
        },
        {
            text: {
                // eyebrow: "Jacksonville / St. Johns Town Center",
                title: "Hyatt Place",
                body: "4742 Town Center Parkway, Jacksonville, FL 32246",
            },
            cardType: {
                type: "modal",
                modalSettings: {
                    modalID: "hyatt-modal",
                    modalContent: {
                        header: "Hyatt Place",
                        content: [
                            {
                                title: "Address",
                                body: "4742 Town Center Parkway, Jacksonville, FL 32246",
                                button: {
                                    text: "book now",
                                    link: "https://www.hyatt.com/shop/rooms/jaxzs?checkinDate=2026-10-30&checkoutDate=2026-11-01&rooms=1&adults=1&kids=0&corp_id=G-PAKH&accessibilityCheck=false",
                                    target: "_blank",
                                },
                            },
                            {
                                title: "Group Code",
                                body: "G-PAKH",
                            },
                        ],
                    },
                },
            },
        },
        {
            text: {
                // eyebrow: "Jacksonville / St. Johns Town Center",
                title: "AC Hotel",
                body: "5323 Big Island Drive Jacksonville, FL, 32246",
            },
            cardType: {
                type: "modal",
                modalSettings: {
                    modalID: "ac-hotel-modal",
                    modalContent: {
                        header: "AC Hotel",
                        content: [
                            {
                                title: "Address",
                                body: "5323 Big Island Drive Jacksonville, FL, 32246",
                                button: {
                                    text: "book now",
                                    link: "https://www.marriott.com/event-reservations/reservation-link.mi?id=1769721428537&key=GRP&app=resvlink&_branch_match_id=1523737832059623201&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi3OyczLtgdK2ALZZSCOWmaKraG5maW5kaGJkYWpsbladmqlrXtQgFpdUWpaKlB3Xnp8UlF%2BeXFqka1zRlF%2BbioAZ5DLjmAAAAA%3D",
                                    target: "_blank",
                                },
                            },
                            {
                                title: "Group Code",
                                body: "GRP",
                            },
                        ],
                    },
                },
            },
        },
    ],
};

// const hotelCards: ArtDecoCardGridProps = {
//     cards: [
//         {
//             icon: "sunrise",
//             title: "Homewood Suites by Hilton",
//             subtitle: "Jacksonville / St. Johns Town Center",
//             body: "10434 Midtown Parkway, Jacksonville, Florida 32246",
//             btnSettings: {
//                 type: "link",
//                 text: "Book a room",
//                 link: "https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=JAXHWHW&groupCode=CHWKPW&arrivaldate=2026-10-30&departuredate=2026-11-01&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT",
//                 target: "_blank",
//             },
//         },
//         {
//             icon: "rounded",
//             title: "Hyatt Place",
//             subtitle: "Jacksonville / St. Johns Town Center",
//             body: "4742 Town Center Parkway, Jacksonville, FL 32246",
//             btnSettings: {
//                 type: "link",
//                 text: "Book a room",
//                 link: "https://www.hyatt.com/shop/rooms/jaxzs?checkinDate=2026-10-30&checkoutDate=2026-11-01&rooms=1&adults=1&kids=0&corp_id=G-PAKH&accessibilityCheck=false",
//                 target: "_blank",
//             },
//         },
//         {
//             icon: "fan",
//             title: "AC Hotel",
//             subtitle: "Jacksonville / St. Johns Town Center",
//             body: "5323 Big Island Drive Jacksonville, FL, 32246",
//             btnSettings: {
//                 type: "link",
//                 text: "Book a room",
//                 link: "https://www.marriott.com/event-reservations/reservation-link.mi?id=1769721428537&key=GRP&app=resvlink&_branch_match_id=1523737832059623201&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi3OyczLtgdK2ALZZSCOWmaKraG5maW5kaGJkYWpsbladmqlrXtQgFpdUWpaKlB3Xnp8UlF%2BeXFqka1zRlF%2BbioAZ5DLjmAAAAA%3D",
//                 target: "_blank",
//             },
//         },
//     ],
// };

const hotels = {
    copyOnly: hotelsCopyOnly,
    hotelCards: hotelCards,
};

// #endregion
// #region ----- Transportation -----------------------------------------------

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

const transportationCopy: Omit<CopyOnlyProps, "styleOptions"> = {
    eyebrow: "Getting There",
    header: "Transportation to & From the Venue",
    body: "Complimentary shuttle buses will run between the hotels listed above and the venue. If you'd like to take the bus,  please indicate this in your RSVP, along with which hotel you'll be picked up from and returned to, so we can plan accordingly.",
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
                        body: "The bus will start picking up guests at 3:30pm. The hotel pick up order wil be available later.",
                    },
                    {
                        title: "Return From the Venue",
                        body: "The bus will depart from the venue at 10:30pm. The hotel drop off order will be available later.",
                    },
                ],
            },
        },
        {
            type: "modal",
            text: "Venue parking",
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
        {
            type: "link",
            text: "View Venue Details",
            link: "/details#venue",
            decoration: {
                type: "arrow",
            },
            target: "_self",
        },
    ],
};

// #endregion
// ----- Content -----------------------------------------------

const accommodationsContent = {
    hero: hero,
    transportation: transportationCopy,
    hotels: hotels,
};

export default accommodationsContent;
