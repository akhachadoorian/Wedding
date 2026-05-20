import { AccordionsProps } from "../../components/Accordions/Accordions";
import { CopyOnlyProps } from "../../components/CopyOnly/CopyOnly";
import { SimpleTableProps } from "../../components/SimpleTable/SimpleTable";
import { SplitInfoProps } from "../../components/SplitInfo/SplitInfo";
import { TextOnlyHeroProps } from "../../layout/TextOnlyHero/TextOnlyHero";
import { LetterCirclePIcon, MapTrifoldIcon, VanIcon } from "@phosphor-icons/react";
import { ButtonProps } from "../../types/buttons";
import { SmallTextGridProps } from "../../components/SmallText/SmallText";

// ----- Hero -----------------------------------------------
// const hero: Omit<SmallTextTagHeroProps, "loaded"> = {
//     eyebrow: "The Details",
//     heading: "Your Guide to the Day",
//     body: "Everything from venue details to the evening timeline — so you arrive knowing exactly what to expect.",
//     smallTextTag1: {
//         eyebrow: "Date",
//         title: "October 31st, 2026",
//         body: "Ceremony at 5 PM",
//     },
//     smallTextTag2: {
//         eyebrow: "Location",
//         title: "Clay Theatre",
//         body: "Green Cove Springs, FL",
//     },
// };

const hero: Omit<TextOnlyHeroProps, "loaded" | "styleOptions"> = {
    eyebrow: "The Details",
    header: "Your Guide to the Day",
    body: "Everything from venue details to the evening timeline — so you arrive knowing exactly what to expect.",
    buttons: [
        // {
        //     text: "Venue Details",
        //     link: "/details#venue",
        //     target: "_self",
        //     decoration: {
        //         type: 'arrow',
        //     }
        // },
        { 
            type: 'link',
            text: "View Timeline",
            link: "/details#timeline",
            target: "_self",
            decoration: {
                type: 'arrow',
            }
        },

        {
            type: 'link',
            text: "FAQs",
            link: "/details#faqs",
            target: "_self",
            decoration: {
                type: 'arrow',
            }
        },
    ],
};

// ----- Summary / Venue -----------------------------------------------

// const venue: Omit<MediaWithCopyProps, "media_side" | "headingSize"> = {
//     eyebrow: "The Venue",
//   header: "The Clay Theatre",
//   subtitle: "326 Walnut St, Green Cove Springs, FL 32043",
//   body: "We are so excited to celebrate with you at The Clay Theatre, a beautifully restored historic venue nestled in downtown Green Cove Springs.",

//   img: {
//     src: "/images/ClayTheatre.jpg",
//   },
//   note: {
//     icon: "warning",
//     title: "Rideshare warning",
//     body: "Please keep in mind that while you may be able to get an Uber or another rideshare service to the venue, we have been informed that it is very difficult to get an Uber back into Jacksonville.",
//   },
// };
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

const venue: SplitInfoProps["content"] = {
    content: [
        {
            eyebrow: "The Venue",
            header: "The Clay Theatre",
            subtitle: "326 Walnut St, Green Cove Springs, FL 32043",
            body: "We are so excited to celebrate with you at The Clay Theatre, a beautifully restored historic venue nestled in downtown Green Cove Springs.",
            buttons: [
                {
                    type: 'link',
                    text: "View Directions",
                    link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhIIARAuGEMYrwEYxwEYgAQYigUyDQgCEC4YgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyBggEEEUYOTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDE1NjRqMGo0qAIAsAIB&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KZ00Fx6y0OWIMRYGQ-r5b-pC&daddr=326+Walnut+St,+Green+Cove+Springs,+FL+32043",
                    target: "_blank" as const,
                    decoration: {
                        type: "icon",
                        icon: MapTrifoldIcon,
                    },
                },
                {
                    type: 'link',
                    text: "Transportation",
                    link: "/accommodations#transportation",
                    target: "_self" as const,
                    decoration: {
                        type: "icon",
                        icon: VanIcon,
                    },
                },
                {
                    type: 'modal',
                    text: 'parking',
                    decoration: {
                        type: 'icon',
                        icon: LetterCirclePIcon
                    },
                    modalID: 'parking_modal',
                    modalContent: {
                        header: 'Parking',
                        content: [
                            {
                               title: 'Grass Lot Parking',
                               body: 'Free parking is available in the grass lot connected to Clay Theatre, conveniently located right next to the venue for easy access.',
                            },
                            {
                               title: 'On-Street Parking',
                               body: 'On-street parking and public parking along Spring Park are both available and just a short walk from the venue.',
                            },
                            {
                               title: 'City Hall Parking',
                               body: 'City Hall is just across the street from the venue. Per the venue, guests are welcome to park in their lot as the building is closed on Saturdays.',
                            },
                        ]
                    }
                }
            ],
        },
        
    ],
};

const summary: SplitInfoProps = {
    intro: date,
    content: venue,
};

// ----- Timeline -----------------------------------------------

const timelineCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Wedding Day",
    header: "Day of Schedule",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};

const timelineTable: SimpleTableProps = {
    rows: [
        {
            row: [
                {
                    type: 'time',
                    time: '4:30 PM'
                },
                {
                    type: 'title',
                    title: 'Guest Arrival'
                },
                {
                    type: 'body',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.'
                },
            ]
        },
        {
            row: [
                {
                    type: 'time',
                    time: '5:00 PM'
                },
                {
                    type: 'title',
                    title: 'I Do'
                },
                {
                    type: 'body',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.'
                },
            ]
        },
        {
            row: [
                {
                    type: 'time',
                    time: '6:00 PM'
                },
                {
                    type: 'title',
                    title: 'Cocktail Hour'
                },
                {
                    type: 'body',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.'
                },
            ]
        },
        {
            row: [
                {
                    type: 'time',
                    time: '7:00 PM'
                },
                {
                    type: 'title',
                    title: 'Dinner'
                },
                {
                    type: 'body',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.'
                },
            ]
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
    ]
}

const timeline = {
    copyOnly: timelineCopyOnly,
    simpleTable: timelineTable
};

// ----- Dress Code -----------------------------------------------

const dressCodeCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Dress Code",
    header: "What to Wear",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};

const dressCode = {
    copyOnly: dressCodeCopyOnly,
};

// ----- Wedding Party -----------------------------------------------

const weddingPartyCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Wedding Party",
    header: "The People Behind the Big Day",
    body: "Every great love story has an incredible supporting cast. Meet the special people who will be standing right there with us as we say I do.",
};

const weddingParty = {
    copyOnly: weddingPartyCopyOnly,
};

// ----- Rehearsal -----------------------------------------------

const rehearsalCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "The evening before",
    header: "Rehearsal Mixer ",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
}

const rehearsalSmallTextGrid:SmallTextGridProps = {
    smallText: [
        {
            eyebrow: 'Time',
            title: '8:30 PM - 11 PM',
            alignment: {
                desktop: 'left'
            }
        },
        {
            eyebrow: 'Date',
            title: 'October 30th, 2026',
            alignment: {
                desktop: 'left'
            }
        },
        {
            eyebrow: 'Location',
            title: 'Maggiano’s Little Italy',
            alignment: {
                desktop: 'left'
            }
        },
        {
            eyebrow: 'Attire',
            title: 'Casual',
            alignment: {
                desktop: 'left'
            }
        },
    ]
}

const rehearsalButton:ButtonProps = {
    btnSettings: {
        type: 'link',
        text: 'View Directions',
        link: 'https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=Kdf6yjxXteWIMdVw3e0vrM0V&daddr=St.+Johns+Town+Center,+10367+Mid+Town+Pkwy,+Jacksonville,+FL+32246',
        target: '_blank',
        decoration: {
            type: 'arrow',
        }
    }
}

const rehearsalMixer = {
    copyOnly: rehearsalCopyOnly,
    smallTextGrid: rehearsalSmallTextGrid,
    button: rehearsalButton
}


// ----- FAQs -----------------------------------------------

const fAQsCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "FAQs",
    header: "Frequently Asked Questions",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};

const fAQItemsAccordions: Omit<AccordionsProps, "className"> = {
    accordions: [
        {
            question: "Are children allowed?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
        },
        {
            question: "Lorem ipsum",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
        },
    ],
};

const faqs = {
    copyOnly: fAQsCopyOnly,
    accordions: fAQItemsAccordions,
};

// ----- Content -----------------------------------------------

const detailsContent = {
    hero: hero,
    summary: summary,
    timeline: timeline,
    dressCode: dressCode,
    weddingParty: weddingParty,
    rehearsalMixer: rehearsalMixer,
    faqs: faqs,
};

export default detailsContent;
