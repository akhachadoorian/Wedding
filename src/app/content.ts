import { PhotoCollageProps } from "@/components/PhotoCollage/PhotoCollage";
import { WatermarkTextProps } from "@/components/WatermarkText/WatermarkText";
import {
    DEFAULT_IMAGE_DISNEY,
    DEFAULT_IMAGE_ENGAGEMENT,
    DEFAULT_IMAGE_GRADUATION,
    DEFAULT_IMAGE_MaxAlexJules,
    DEFAULT_IMAGE_MaxHoldingBucky,
    DEFAULT_IMAGE_SUNGLASSES,
} from "@/data/defaultImage";
import { GothHeroProps } from "@/layout/GothHero/GothHero";
import { CardGridProps } from "@/components/CardGrid/CardGrid";
import { CopyOnlyProps } from "@/components/CopyOnly/CopyOnly";

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

const welcomeWatermarkText: WatermarkTextProps = {
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
    mainImage: DEFAULT_IMAGE_ENGAGEMENT,
    leftSideImages: [
        DEFAULT_IMAGE_MaxAlexJules,
        DEFAULT_IMAGE_GRADUATION,
    ],
    rightSideImages: [
        {
            ...DEFAULT_IMAGE_MaxHoldingBucky,
            imgPositionResponsive: {
                desktop: "center 15%",
            },
        },
        DEFAULT_IMAGE_DISNEY, // 
    ],
};

// #endregion ----------------------------------------------------------

// ----- Quick Links -----------------------------------------------
const qlCopyOnly: Omit<CopyOnlyProps, "className" | "styleOptions"> = {
    // eyebrow: "We've got you covered",
    // header: "Everything from the ceremony to where to stay, all in one place",
    eyebrow: "quick links",
    header: "Everything you need, in one place"
};

const qlCardGrid: CardGridProps = {
    cards: [
        {
            text: {
                eyebrow: "The Day",
                title: "Details",
                body: "Ceremony time, timeline, and what to expect on the day",
            },
            cardType: {
                type: "link",
                linkSettings: {
                    link: "/details",
                    target: "_self",
                },
            },
        },
        {
            text: {
                eyebrow: "Accommodations",
                title: "Stay & Travel",
                body: "Hotel blocks, parking, and getting to The Clay Theatre",
                // letter: "A"
            },
            cardType: {
                type: "link",
                linkSettings: {
                    link: "/accommodations",
                    target: "_self",
                },
            },
        },
        {
            text: {
                eyebrow: "RSVP",
                title: "You're Invited",
                body: "Let us know if you are able to come!",
                // letter: "i"
            },
            cardType: {
                type: "link",
                linkSettings: {
                    link: "/rsvp",
                    target: "_self",
                },
            },
        },
    ],
};

const quickLinks = {
    copyOnly: qlCopyOnly,
    cardGrid: qlCardGrid,
};

// ----- Content -----------------------------------------------
const homeContent = {
    hero: hero,
    welcome: welcome,
    ourStory: ourStory,
    quickLinks: quickLinks,
};

export default homeContent;
