import { CustomImageProps } from "@/types/images";

/**
 * Every photo used on the site. Reference as `IMAGES.engagement`, etc.
 * Spread and override `imgPositionResponsive` where a page needs a different crop.
 */
export const IMAGES = {
    dipShot: {
        src: "/images/DipShot.jpg",
        alt: "Max dipping Alex and kissing.",
        caption: "Engagement",
        fill: true,
    },
    engagement: {
        src: "/images/Engagement.jpg",
        alt: "Max proposing to Alex in the Japan Garden in Epcot.",
        caption: "Max proposed to Alex in the Japan Garden in Epcot",
        fill: true,
    },
    graduation: {
        src: "/images/Graduation.jpg",
        alt: "Max and Alex at Max's college graduation.",
        caption: "We graduated from the University of Alabama together",
        fill: true,
    },
    sunglasses: {
        src: "/images/Sunglasses.jpg",
        alt: "",
        caption: "",
        fill: true,
    },
    disney: {
        src: "/images/Disney.jpg",
        alt: "Max and Alex kissing in front of the Disney castle.",
        caption: "One of many Disney Trips",
        fill: true,
    },
    maxHoldingBucky: {
        src: "/images/MaxHoldingBucky.jpg",
        alt: "Max holding our white, fluffy cat named Bucky",
        caption: "Max holding his toddler, Bucky (our second cat)",
        fill: true,
    },
    maxAlexJules: {
        src: "/images/MaxAlexJulesInCar.jpg",
        alt: "Alex, Max, and Jules in the car.",
        caption: "It all started when Max came over to meet Jules",
        width: 2880,
        height: 2160,
    },
    buckyJules: {
        src: "/images/BuckyJules.jpg",
        alt: "Our cats Bucky and Jules cuddling in a car together.",
        fill: true,
    },
} satisfies Record<string, CustomImageProps>;

/** Fallback image for components when none is passed. */
export const DEFAULT_IMAGE: CustomImageProps = IMAGES.dipShot;
