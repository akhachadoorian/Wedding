import { CopyOnlyProps } from "@/components/CopyOnly/CopyOnly";
import { DashedCopyGridProps } from "@/components/DashedCopy/DashedCopy";
import { DrinkCardGridProps } from "@/components/DrinkCardGrid/DrinkCardGrid";
import { SmallTextProps } from "@/components/SmallTextGrid/SmallTextGrid";
import { PhotoCollageProps } from "@/components/PhotoCollage/PhotoCollage";
import { WatermarkTextProps } from "@/components/WatermarkText/WatermarkText";
import {
    DEFAULT_IMAGE_GRADUATION,
    DEFAULT_IMAGE_MaxAlexJules,
    DEFAULT_IMAGE_MaxHoldingBucky,
    DEFAULT_IMAGE_SUNGLASSES,
} from "@/data/defaultImage";
import { GothHeroProps } from "@/layout/GothHero/GothHero";
import { ScrollRevealHeroProps } from "@/layout/archive/ScrollRevealHero/ScrollRevealHero";

// ----- Hero -----------------------------------------------

const hero: Omit<GothHeroProps, "loaded"> = {
    // header: '',
    img: {
        src: "/images/DipShot.jpg",
        alt: "Max dipping Alex and kissing.",
        imgPositionResponsive: {
            desktop: "center 25%",
            mobile: "35% center",
        },
    },
    eyebrows: {
        left: "October 31st, 2026\nCeremony at 5pm",
        right: "The Clay Theatre\nGreen Cove, Fl",
    },
};

// #region --- Overview --------------------------------
const welcomeCopyOnly: Omit<CopyOnlyProps, "className" | "styleOptions"> = {
    eyebrow: "We're getting married",
    header: "Til Death Do Us Part",
    buttons: [
        {
            type: "link",
            text: "View Full Details",
            link: "/details",
        },
    ],
};


const welcomeWatermarkText: Omit<WatermarkTextProps, "loaded"> = {
    watermarkText: "October 31st",
    subheader: "We're getting married",
    captions: {
        left: {
            lines: ["The Clay Theatre", "Green Cove, Fl"],
            button: {
                type: "link",
                link: "/details#venue",
                text: "View Venue Details",
                decoration: {
                    type: "arrow",
                },
            },
        },
        center: {
            lines: ["Doors open at 4:30pm", "Ceremony at 5pm"],
            button: {
                type: "link",
                link: "/details#timeline",
                text: "View Timeline",
                decoration: {
                    type: "arrow",
                },
            },
        },
        right: {
            lines: ["RSVP by", "October 1st"],
            button: {
                type: "link",
                link: "/rsvp",
                text: "RSVP Now",
                decoration: {
                    type: "arrow",
                },
            },
        },
    },
};

const welcome = {
    copyOnly: welcomeCopyOnly,
    welcomeWatermarkText: welcomeWatermarkText,
};

// #endregion --------------------------------

// #region --- Our Story --------------------------------

const ourStory: PhotoCollageProps = {
    header: "Our Story",
    mainImage: {
        src: "/images/Engagement.jpg",
        alt: "Max proposing to Alex at Epcot",
        caption: "Max proposing to Alex at Epcot ",
        fill: true
    },
    leftSideImages: [
        DEFAULT_IMAGE_GRADUATION,
        DEFAULT_IMAGE_MaxAlexJules, //TODO: make about how jules is how we meet
    ],
    rightSideImages: [
        {
            ...DEFAULT_IMAGE_MaxHoldingBucky,
            imgPositionResponsive: {
                desktop: "center 15%",
            },
        },
        DEFAULT_IMAGE_SUNGLASSES, // * first of many disney trips?
    ],
};

// #endregion ----------------------------------------------------------

// ----- Quick Links -----------------------------------------------
const qlCopyOnly: Omit<CopyOnlyProps, "className" | "styleOptions"> = {
    eyebrow: "We've got you covered",
    header: "Everything from the ceremony to where to stay, all in one place",
};

const drinkGrid: DrinkCardGridProps = {
    drinkCards: [
        {
            eyebrow: "The Day",
            title: "Details",
            body: "Ceremony time, timeline, and what to expect on the day",
            link: "/details",
            target: "_self",
            drinks: [
                {
                    type: "martini",
                    rotate: "large",
                    rotateNeg: true,
                    hoverHeight: "high",
                },
                {
                    type: "highball",
                    rotate: "small",
                    rotateNeg: false,
                    hoverHeight: "low",
                },
            ],
        },
        {
            eyebrow: "Accommodations",
            title: "Stay & Travel",
            body: "Hotel blocks, parking, and getting to The Clay Theatre",
            link: "/accommodations",
            target: "_self",
            drinks: [
                {
                    type: "cocktail",
                    rotate: "medium",
                    rotateNeg: false,
                    hoverHeight: "medium",
                },
                {
                    type: "whiskey",
                    rotate: "large",
                    rotateNeg: true,
                    hoverHeight: "high",
                },
            ],
        },
        {
            eyebrow: "RSVP",
            title: "You're Invited",
            body: "Let us know if you are able to come!",
            link: "/rsvp",
            target: "_self",
            drinks: [
                {
                    type: "coupe",
                    rotate: "medium",
                    rotateNeg: false,
                    hoverHeight: "medium",
                },
                {
                    type: "margarita",
                    rotate: "large",
                    rotateNeg: true,
                    hoverHeight: "high",
                },
            ],
        },
    ],
};

const quickLinks = {
    copyOnly: qlCopyOnly,
    drinkGrid: drinkGrid,
};

// ----- Content -----------------------------------------------
const homeContent = {
    hero: hero,
    welcome: welcome,
    ourStory: ourStory,
    quickLinks: quickLinks,
};

export default homeContent;

// #region --- ARCHIVE -----------------------------------------------

const welcomeDashedGrid: DashedCopyGridProps = {
    dashedCopy: [
        {
            leftCopy: "Saturday, October 31st, 2026",
            rightCopy: "Guests arrive at 4:30 PM",
            link: "/details#timeline",
            tooltipCaption: "View the timeline",
        },
        // {
        //     leftCopy: "Ceremony starts at 5:00 PM",
        //     rightCopy: "Reception ends at 10:30 PM",
        // },
        {
            leftCopy: "The Clay Theatre",
            rightCopy: "Green Cove Springs, Florida",
            link: "/details#venue",
            tooltipCaption: "Venue details",
        },
        // {
        //     leftCopy: "Rehearsal Mixer",
        //     rightCopy: "Green Cove Springs, Florida",
        //     link: "/details#rehearsal-mixer",
        //     tooltipCaption: "View the rehearsal mixer details",
        // },
    ],
};

const welcomeSmallText: Array<SmallTextProps> = [
    {
        eyebrow: "when",
        title: "October 31st, 2026",
        subtitle: "Guests arrive at 4:30 PM",
        button: {
            type: "link",
            link: "/details#timeline",
            text: "View the Timeline",
        },
    },
];

// const hero: ScrollRevealHeroProps = {
//     header: "Alex & Max",
//     hideScrollHint: false,
//     scrollHintMessage: "Scroll for details",
//     endScrollMessage: "Hover on images for more!",
//     endScrollMessageMobile: "Touch the images for more!",
//     sideImages: [
//         {
//             src: "/images/Engagement.jpg",
//             alt: "Max proposing to Alex in the Japan Garden in Epcot",
//             caption: "Max proposing to Alex in the Japan Garden in Epcot",
//             borderStyle: 'simple',
//             aspectRatio: "portrait"
//         },
//         {
//             src: "/images/Graduation.jpg",
//             alt: "Max and Alex at Max's college graduation",
//             caption: "Max's Graduation",
//             borderStyle: 'double',
//             aspectRatio: "square"
//         },
//         {
//             src: "/images/Sunglasses.jpg",
//             alt: "",
//             caption: "",
//             borderStyle: 'corner',
//             aspectRatio: "square"

//         },
//         {
//             src: "/images/Disney.jpg",
//             alt: "Max and Alex kissing in front of the Disney castle",
//             caption: "Disney Trip",
//             borderStyle: 'diamond',
//             aspectRatio: "portrait"
//         },
//     ],
// };

// const welcomeCopyOnly: Omit<CopyOnlyProps, "className" | "styleOptions"> = {
//     eyebrow: "We're getting married",
//     header: "Once upon a time, we found each other, and now we're counting down the days until we say **I do**. We would be thrilled to have you join us in this next chapter.",
// };

// const welcomeDashedGrid: DashedCopyGridProps = {
//     dashedCopy: [
//         {
//             leftCopy: "Saturday, October 31st, 2026",
//             rightCopy: "Guests arrive at 4:30 PM",
//             link: '/details#timeline',
//             tooltipCaption: 'View the timeline'
//         },
//         // {
//         //   leftCopy: "Ceremony – Reception",
//         //   rightCopy: "5:00 PM – 10:30 PM",
//         // },
//         {
//             leftCopy: "The Clay Theatre",
//             rightCopy: "Green Cove Springs, Florida",
//         },
//     ],
// };

// #endregion -----------------------------------------------
