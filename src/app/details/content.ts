import { AccordionGridProps } from "@/components/Accordions/Accordions";
import { CardGridProps } from "@/components/CardGrid/CardGrid";
import { FrameCardGridProps } from "@/components/CardGrid/FrameCardGrid";
import { MiniCardData } from "@/components/CardGrid/MiniCardGrid";
import { CopyOnlyProps } from "@/components/CopyOnly/CopyOnly";
import { SimpleTableProps } from "@/components/SimpleTable/SimpleTable";
import { SmallTextGridProps } from "@/components/SmallTextGrid/SmallTextGrid";
import { SplitInfoProps } from "@/components/SplitInfo/SplitInfo";
import { TimelineElementProps } from "@/components/Timeline/Timeline";
import { WatermarkTextProps } from "@/components/WatermarkText/WatermarkText";
import { DEFAULT_IMAGE } from "@/data/defaultImage";
import { ImageOverlayHeroProps } from "@/layout/ImageOverlayHero/ImageOverlayHero";
import { TextOnlyHeroProps } from "@/layout/TextOnlyHero/TextOnlyHero";
import { CustomImageProps } from "@/types/images";
import { NonEmptyArray } from "@/types/utility";
import {
    Icon,
    LetterCirclePIcon,
    MapTrifoldIcon,
    VanIcon,
} from "@phosphor-icons/react";
import {
    ButtonProps,
    ButtonSettingProps,
    ModalSettings,
} from "../../types/buttons";

// #region --- Hero ---

const heroText: Omit<TextOnlyHeroProps, "loaded" | "styleOptions"> = {
    eyebrow: "The Details",
    header: "Your Guide to the Day",
    body: "Everything from venue details to the evening timeline — so you arrive knowing exactly what to expect.",
    buttons: [
        {
            type: "link",
            text: "Venue Details",
            link: "/details#venue",
            target: "_self",
            decoration: {
                type: "arrow",
            },
        },
        {
            type: "link",
            text: "View Timeline",
            link: "/details#timeline",
            target: "_self",
            decoration: {
                type: "arrow",
            },
        },

        {
            type: "link",
            text: "FAQs",
            link: "/details#faqs",
            target: "_self",
            decoration: {
                type: "arrow",
            },
        },
    ],
};

const hero: Omit<ImageOverlayHeroProps, "loaded" | "styleOptions"> = {
    image: {
        ...DEFAULT_IMAGE,
        imgPositionResponsive: {
            desktop: "center 25%",
            mobile: "35% center",
        },
    },
    eyebrow: "The Details",
    header: "When & Where",
    body: "The venue, the timeline, what to wear, and the extra details around the weekend — everything you need to know.",
    buttons: [
        {
            type: "link",
            text: "Venue Details",
            link: "/details#venue",
            target: "_self",
            decoration: {
                type: "arrow",
            },
        },
        // {
        //     type: "link",
        //     text: "View Timeline",
        //     link: "/details#timeline",
        //     target: "_self",
        //     decoration: {
        //         type: "arrow",
        //     },
        // },
    ],
};

// #endregion ---

// #region --- ---

const dateTime: WatermarkTextProps = {
    watermarkText: "October 31st",
    subheader: "We're getting married",
};

// #endregion ---

// #region --- Summary / Venue ---

const watermarkVenue: WatermarkTextProps = {
    watermarkText: "Clay Theatre",
    subheader: "the Venue",
    captions: {
        left: {
            lines: ["SHUTTLE SERVICE", "FOR CERTAIN HOTELS"],
            button: {
                type: "link",
                text: "Transportation",
                link: "/accommodations#transportation",
                target: "_self" as const,
                decoration: {
                    type: "icon",
                    icon: VanIcon,
                },
            },
        },
        center: {
            lines: ["326 Walnut St", "Green Cove Springs, FL 32043"],
            button: {
                type: "link",
                text: "View Directions",
                link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhIIARAuGEMYrwEYxwEYgAQYigUyDQgCEC4YgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyBggEEEUYOTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDE1NjRqMGo0qAIAsAIB&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KZ00Fx6y0OWIMRYGQ-r5b-pC&daddr=326+Walnut+St,+Green+Cove+Springs,+FL+32043",
                target: "_blank" as const,
                decoration: {
                    type: "icon",
                    icon: MapTrifoldIcon,
                },
            },
        },
        right: {
            lines: ["VENUE PARKING", "INFORMATION"],
            button: {
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
        },
    },
};

const date: SplitInfoProps["intro"] = {
    upperText: {
        eyebrow: "Wedding Day",
        header: "October 31st, 2026",
        body: "Saturday · Halloween",
    },

    lowerText: {
        header: "Rideshare warning",
        body: "Please keep in mind that while you may be able to get an Uber or another rideshare service to the venue, we have been informed that it is very difficult to get an Uber back into Jacksonville.",
    },
};

const venueContent: SplitInfoProps["content"] = {
    content: [
        {
            eyebrow: "The Venue",
            header: "The Clay Theatre",
            subtitle: "326 Walnut St, Green Cove Springs, FL 32043",
            body: "We are so excited to celebrate with you at The Clay Theatre, a beautifully restored historic venue nestled in downtown Green Cove Springs.",
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
                    type: "link",
                    text: "Transportation",
                    link: "/accommodations#transportation",
                    target: "_self" as const,
                    decoration: {
                        type: "icon",
                        icon: VanIcon,
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
    ],
};

const summary: SplitInfoProps = {
    intro: date,
    content: venueContent,
};

const venueCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "The Venue",
    header: "The Clay Theatre",
    subtitle: "326 Walnut St, Green Cove Springs, FL 32043",
    body: "We are so excited to celebrate with you at The Clay Theatre, a beautifully restored historic venue nestled in downtown Green Cove Springs.",
};

const venueCards: CardGridProps = {
    cards: [
        {
            text: {
                title: "Directions",
                body: "Get directions straight to the venue.",
            },
            cardType: {
                type: "link",
                linkSettings: {
                    link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhIIARAuGEMYrwEYxwEYgAQYigUyDQgCEC4YgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyBggEEEUYOTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDE1NjRqMGo0qAIAsAIB&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KZ00Fx6y0OWIMRYGQ-r5b-pC&daddr=326+Walnut+St,+Green+Cove+Springs,+FL+32043",
                    target: "_blank",
                },
            },
        },
        {
            text: {
                title: "Transportation",
                body: "Parking, the shuttle, and rideshare info for getting to and from the venue.",
            },
            cardType: {
                type: "link",
                linkSettings: {
                    link: "/accommodations#transportation",
                    target: "_self",
                },
            },
        },
        {
            text: {
                title: "Parking",
                body: "Free lots and on-street options within walking distance.",
            },
            cardType: {
                type: "modal",
                modalSettings: {
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
            },
        },
    ],
};

const venueWarning = {
    eyebrow: "Rideshare Warning",
    body: "Please keep in mind that while you may be able to get an Uber or another rideshare service to the venue, we have been informed that it is very difficult to get an Uber back into Jacksonville.",
};

const venue = {
    copyOnly: venueCopyOnly,
    cardGrid: venueCards,
    warning: venueWarning,
};

// --- Venue (copy-focused variation) ---
// Same venue content/actions as `venue`, but as one CopyOnly block with a
// compact button row instead of a CardGrid, so the venue copy stays the
// visual focus rather than three large cards.

const venueCopyFocused: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "The Venue",
    header: "The Clay Theatre",
    subtitle: "326 Walnut St, Green Cove Springs, FL 32043",
    body: "We are so excited to celebrate with you at The Clay Theatre, a beautifully restored historic venue nestled in downtown Green Cove Springs.",
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
            type: "link",
            text: "Transportation",
            link: "/accommodations#transportation",
            target: "_self" as const,
            decoration: {
                type: "icon",
                icon: VanIcon,
            },
        },
        {
            type: "modal",
            text: "Parking",
            decoration: {
                type: "icon",
                icon: LetterCirclePIcon,
            },
            modalID: "parking_modal_copy_focused",
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
};

const venueFocused = {
    copyOnly: venueCopyFocused,
    warning: venueWarning,
};

// --- Venue (framed photo variation) ---
// A photo-led treatment: the venue photograph in a cabernet double-border
// frame alongside the copy, with the three actions rendered as slim
// icon+text links (not buttons or cards) split by diamond dividers.

const venueFramedImage: CustomImageProps = {
    src: "/images/ClayTheatre.jpg",
    alt: "The Clay Theatre, a historic theater venue in downtown Green Cove Springs.",
    fill: true,
};

const venueFramedCopy = {
    eyebrow: "The Venue",
    header: "The Clay Theatre",
    subtitle: "326 Walnut St, Green Cove Springs, FL 32043",
    body: "We are so excited to celebrate with you at The Clay Theatre, a beautifully restored historic venue nestled in downtown Green Cove Springs.",
};

const venueFramedActions: ButtonSettingProps[] = [
    {
        type: "link",
        text: "Directions",
        link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhIIARAuGEMYrwEYxwEYgAQYigUyDQgCEC4YgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyBggEEEUYOTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDE1NjRqMGo0qAIAsAIB&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KZ00Fx6y0OWIMRYGQ-r5b-pC&daddr=326+Walnut+St,+Green+Cove+Springs,+FL+32043",
        target: "_blank",
        decoration: {
            type: "icon",
            icon: MapTrifoldIcon,
        },
    },
    {
        type: "link",
        text: "Transportation",
        link: "/accommodations#transportation",
        target: "_self",
        decoration: {
            type: "icon",
            icon: VanIcon,
        },
    },
    {
        type: "modal",
        text: "Parking",
        decoration: {
            type: "icon",
            icon: LetterCirclePIcon,
        },
        modalID: "parking_modal_framed",
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
];

const venueFramed = {
    image: venueFramedImage,
    copy: venueFramedCopy,
    actions: venueFramedActions,
    warning: venueWarning,
};

// --- Venue (icon mini-card variation) ---
// Small bordered icon cards (no big background letter, no cabernet fill) so
// they read distinctly from both `venueCards`'s Card/CardGrid look and the
// shrunk-card override used in the side-cards layout.

export type VenueMiniCard = {
    icon: Icon;
    title: string;
    body: string;
    action:
        | { type: "link"; link: string; target?: "_blank" | "_self" }
        | {
              type: "modal";
              modalID: string;
              modalContent: ModalSettings["modalContent"];
          };
};

const venueMiniCards: NonEmptyArray<MiniCardData> = [
    {
        icon: MapTrifoldIcon,
        title: "Directions",
        body: "Get directions straight to the venue.",
        cardType: {
            type: "link",

            linkSettings: {
                link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhIIARAuGEMYrwEYxwEYgAQYigUyDQgCEC4YgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyBggEEEUYOTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDE1NjRqMGo0qAIAsAIB&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KZ00Fx6y0OWIMRYGQ-r5b-pC&daddr=326+Walnut+St,+Green+Cove+Springs,+FL+32043",
                target: "_blank",
            },
        },
    },
    {
        icon: VanIcon,
        title: "Transportation",
        body: "Parking, the shuttle, and rideshare info for getting to and from the venue.",
        cardType: {
            type: "link",
            linkSettings: {
                link: "/accommodations#transportation",
                target: "_self",
            },
        },
    },
    {
        icon: LetterCirclePIcon,
        title: "Parking",
        body: "Free lots and on-street options within walking distance.",
        cardType: {
            type: "modal",
            modalSettings: {
                modalID: "parking_modal_mini",
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
        },
    },
];

// #endregion ---

// #region --- Timeline ---

const timelineCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Wedding Day",
    header: "Day of Schedule",
    body: "From first look to last dance — here's how our day will unfold.",
};

const timelineElements: NonEmptyArray<TimelineElementProps> = [
    {
        time: "4:30 PM",
        title: "Guest Arrival",
        body: "Arrive a little early to say hello and find your spot before things get started.",
    },
    {
        time: "5:00 PM",
        title: "Ceremony Starts",
        body: "Please be seated as we begin the ceremony and exchange our vows.",
    },
    {
        time: "5:30 PM",
        title: "Cocktail Hour",
        body: "Time to unwind. Grab a cocktail and enjoy the company.",
    },
    {
        time: "6:30 PM",
        title: "Reception & Dinner",
        body: "Take your seat — dinner, toasts, and celebration are about to begin.",
    },
    // {
    //     time: "",
    //     title: "Cutting Cake",
    //     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus."
    // },
    // {
    //     time: "",
    //     title: "First Dances",
    //     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus."
    // },
    {
        time: "10:30 PM",
        title: "Reception Ends",
        body: "That's a wrap! Thank you for dancing the night away with us.",
    },
];

const timeline = {
    copyOnly: timelineCopyOnly,
    elements: timelineElements,
};

const timelineTable: SimpleTableProps = {
    rows: [
        {
            row: [
                {
                    type: "time",
                    time: "4:30 PM",
                },
                {
                    type: "title",
                    title: "Guest Arrival",
                },
                {
                    type: "body",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
                },
            ],
        },
        {
            row: [
                {
                    type: "time",
                    time: "5:00 PM",
                },
                {
                    type: "title",
                    title: "I Do",
                },
                {
                    type: "body",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
                },
            ],
        },
        {
            row: [
                {
                    type: "time",
                    time: "6:00 PM",
                },
                {
                    type: "title",
                    title: "Cocktail Hour",
                },
                {
                    type: "body",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
                },
            ],
        },
        {
            row: [
                {
                    type: "time",
                    time: "7:00 PM",
                },
                {
                    type: "title",
                    title: "Dinner",
                },
                {
                    type: "body",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
                },
            ],
        },
        // {
        //     row: [
        //         {
        //             type: 'time',
        //             time: ''
        //         },
        //         {
        //             type: 'Title',
        //             title: ''
        //         },
        //         {
        //             type: 'body',
        //             body: ''
        //         },
        //     ]
        // },
    ],
};

const timelineTableContent = {
    copyOnly: timelineCopyOnly,
    simpleTable: timelineTable,
};

// #endregion ---

// #region --- Dress Code ---

const dressCodeCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Dress Code",
    header: "What to Wear",
    subtitle: "Black Tie Optional",
    body: "Black Tie Optional invites formal attire, but with a little more room to breathe than traditional black tie.",
};

const dressCodeCards: FrameCardGridProps = {
    frameCards: [
        {
            title: "Ladies",
            subtitle: "Floor-Length Gowns",
            body: "As the bride will be wearing black, we kindly ask that our lovely ladies avoid this color.",
        },
        {
            title: "Gentlemen",
            subtitle: "Tuxedo or Dark Formal Suit",
            body: "Please wear a tuxedo or a dark, formal suit (black, navy, or charcoal) with a tie.",
        },
    ],
};

const dressCode = {
    copyOnly: dressCodeCopyOnly,
    frameCards: dressCodeCards,
};

// #endregion ---

// #region --- Rehearsal ---

const rehearsalCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "The evening before",
    header: "Rehearsal Mixer ",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};

const rehearsalSmallTextGrid: SmallTextGridProps = {
    smallText: [
        {
            eyebrow: "Time",
            title: "8:30 PM - 11 PM",
        },
        {
            eyebrow: "Date",
            title: "October 30th, 2026",
        },
        {
            eyebrow: "Location",
            title: "Maggiano’s Little Italy",
        },
        {
            eyebrow: "Attire",
            title: "Casual",
        },
    ],
};

const rehearsalButton: ButtonProps = {
    btnSettings: {
        type: "link",
        text: "View Directions",
        link: "https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=Kdf6yjxXteWIMdVw3e0vrM0V&daddr=St.+Johns+Town+Center,+10367+Mid+Town+Pkwy,+Jacksonville,+FL+32246",
        target: "_blank",
        decoration: {
            type: "arrow",
        },
    },
};

const rehearsalMixer = {
    copyOnly: rehearsalCopyOnly,
    smallTextGrid: rehearsalSmallTextGrid,
    button: rehearsalButton,
};

// #endregion ---

// #region --- FAQs ---

const fAQsCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Frequently Asked Questions",
    header: "Got Questions?",
    body: "We've rounded up the answers to the most common questions — from attire to parking to what to expect on the day.",
};

// TODO: reorder and add btns
const fAQItemsAccordions: AccordionGridProps = {
    accordions: [
        {
            question: "Are children allowed?",
            answer: "We love your little ones, but we've decided to keep our wedding adults-only. We hope this gives you a chance to relax and enjoy the night too!",
        },
        {
            question: "What time should I arrive?",
            answer: "Doors open to the venue at 4:30pm and the ceremony starts at 5pm. If you are traveling from Jacksonville, estimate 30-45 minutes for travel.",
        },
        {
            question: "Is the ceremony and reception at the same location?",
            answer: "Yes, both the ceremony and the reception will take place at the Clay Theatre. The ceremony will be in the outside courtyard and the reception will be inside the main building.",
        },
        {
            question: "Can I bring a plus-one?",
            answer: "Please refer to your invitation — it will indicate whether a plus-one is included. If you have questions, feel free to reach out to us directly.",
        },
        {
            question: "What's the RSVP deadline?",
            answer: "Please submit your RSVP by October 1st — our caterer needs a final headcount by this date. If you submit earlier, you're able to update your submission up until then.",
        },
        {
            question: "What should I wear?",
            answer: "Black tie optional. Gentlemen: tuxedo or dark, formal suit. Ladies: floor-length gowns — as Alex will be wearing black, we ask guests avoid that color.",
        },
        {
            question: "Is there parking at the venue?",
            answer: "There is multiple parking options at the venue. If you're staying at one of our partner hotels, a shuttle will run to and from The Clay Theatre — details are on the Accommodations page.",
        },
        {
            question: "Is there a gift registry?",
            answer: "Your presence is the only gift we need. For those who've asked, we're registered — details are on the Registry page.",
            button: {
                type: 'link',
                text: "View Registry Page",
                link: '/registry',
                target: '_self',
                decoration: {
                    type: 'arrow'
                }
            }
        },
    ],
};

const faqs = {
    copyOnly: fAQsCopyOnly,
    accordions: fAQItemsAccordions,
};

// #endregion ---

// #region --- Content ---

const detailsContent = {
    hero: hero,
    dateTime: dateTime,
    venue: venue,
    venueFocused: venueFocused,
    venueFramed: venueFramed,
    venueMiniCards: venueMiniCards,
    summary: summary,
    watermarkVenue: watermarkVenue,
    timeline: timeline,
    timelineTable: timelineTableContent,
    dressCode: dressCode,
    rehearsalMixer: rehearsalMixer,
    faqs: faqs,
};

export default detailsContent;

// #endregion ---
