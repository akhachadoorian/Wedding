import { CopyOnlyProps } from "@/components/CopyOnly/CopyOnly";
import { DashedCopyGridProps } from "@/components/DashedCopy/DashedCopy";
import { DrinkCardGridProps } from "@/components/DrinkCardGrid/DrinkCardGrid";
import { GothHeroProps } from "@/layout/GothHero/GothHero";
import { ScrollRevealHeroProps } from "@/layout/ScrollRevealHero/ScrollRevealHero";

// ----- Hero -----------------------------------------------
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

const hero: Omit<GothHeroProps, 'loaded'> = {
    // header: '',
    img: {
        src: '/images/DipShot.jpg',
        alt: 'Max dipping Alex'
    },
    eyebrows: {
        left: "October 31st, 2026\nCeremony at 5pm",
        right: "The Clay Theatre\nJacksonville, Fl"
    }
}


// #region --- Overview --------------------------------

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



const welcomeCopyOnly: Omit<CopyOnlyProps, "className" | "styleOptions"> = {
    eyebrow: "We're getting married",
    // header: "Together with their families, **Alex & Max** joyfully invite you to share in the celebration of their marriage.",
    header: "Til Death Do Us Part",
    // buttons: {
        buttons: [
            {
                type: 'link',
                text: 'View Full Details',
                link: '/details'
            }
        ]
    // }
};

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

const welcome = {
    copyOnly: welcomeCopyOnly,
    dashedCopyGrid: welcomeDashedGrid,
};

// #endregion --------------------------------


// #region --- Our Story --------------------------------

const ourStory = {
    header: 'Our Story',
    mainImage: {
        src: "/images/DipShot.jpg",
        alt: "Max dipping Alex and kissing.",
        caption: "Engagement ", 
        width: 696,
        height: 522
    },

}

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
                { type: "martini", rotate: "large", rotateNeg: true, hoverHeight: "high" },
                { type: "highball", rotate: "small", rotateNeg: false, hoverHeight: "low" },
            ],
        },
        {
            eyebrow: "Accommodations",
            title: "Stay & Travel",
            body: "Hotel blocks, parking, and getting to The Clay Theatre",
            link: "/accommodations",
            target: "_self",
            drinks: [
                { type: "cocktail", rotate: "medium", rotateNeg: false, hoverHeight: "medium" },
                { type: "whiskey", rotate: "large", rotateNeg: true, hoverHeight: "high" },
            ],
        },
        {
            eyebrow: "RSVP",
            title: "You're Invited",
            body: "Let us know if you are able to come!",
            link: "/rsvp",
            target: "_self",
            drinks: [
                { type: "coupe", rotate: "medium", rotateNeg: false, hoverHeight: "medium" },
                { type: "margarita", rotate: "large", rotateNeg: true, hoverHeight: "high" },
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
