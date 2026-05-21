import { BusIcon, LetterCirclePIcon, MapTrifoldIcon } from "@phosphor-icons/react";
import { SplitInfoProps } from "../../components/SplitInfo/SplitInfo";
import { TextOnlyHeroProps } from "../../layout/TextOnlyHero/TextOnlyHero";

// ----- Hero -----------------------------------------------


const hero: Omit<TextOnlyHeroProps, "loaded" | "styleOptions"> = {
    eyebrow: 'Accommodations',
    header: "Where to Stay & How to Get There",
    body: "The venue is in Green Cove Springs, a beautiful small town about 30 minutes south of Jacksonville.  Below you'll find our hotel recommendations, transportation details, and everything else you need to feel prepared for the weekend."
}

// ----- Hotels -----------------------------------------------


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
        {
            eyebrow: "Bus Service",
            header: "We've Arranged a Bus",
            body: "To make the night as easy as possible, we've arranged a bus running between the hotel blocks and the venue.",
            buttons: [
                {
                    type: 'modal',
                    text: 'View Schedule',
                    decoration: {
                        type: 'icon',
                        icon: BusIcon
                    },
                    modalID: 'bus_modal',
                    modalContent: {
                        header: 'Bus Schedule',
                        content: [ // TODO: update content
                            {
                               title: 'Lorem ipsum dolor',
                               body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.',
                            },
                        //     {
                        //        title: 'On-Street Parking',
                        //        body: 'On-street parking and public parking along Spring Park are both available and just a short walk from the venue.',
                        //     },
                        //     {
                        //        title: 'City Hall Parking',
                        //        body: 'City Hall is just across the street from the venue. Per the venue, guests are welcome to park in their lot as the building is closed on Saturdays.',
                        //     },
                        ]
                    }
                }
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
    transportation: transportation
};

export default accommodationsContent;