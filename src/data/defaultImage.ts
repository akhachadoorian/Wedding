import { RequireX } from "@/types/utility";
import { CustomImageProps } from "../types/images";

export const DEFAULT_IMAGE: CustomImageProps = {
    src: "/images/DipShot.jpg",
    alt: "Max dipping Alex and kissing.",
    caption: "Engagement",
    fill: true,
    // width: 696,
    // height: 522,
};

export const fillDefaultImages = (count: number): CustomImageProps[] =>
    Array.from({ length: count }, () => DEFAULT_IMAGE);


export const DEFAULT_IMAGE_ENGAGEMENT: CustomImageProps = {
    src: "/images/Engagement.jpg",
    alt: "Max proposing to Alex in the Japan Garden in Epcot.",
    caption: "Max proposing to Alex in the Japan Garden in Epcot",
    fill: true,
    // width: 282,
    // height: 320,
};

export const DEFAULT_IMAGE_GRADUATION: CustomImageProps = {
    src: "/images/Graduation.jpg",
    alt: "Max and Alex at Max's college graduation.",
    caption: "Max and Alex meet at the University of Alabama",
    fill: true,
    // width: 282,
    // height: 320,
};

export const DEFAULT_IMAGE_SUNGLASSES: CustomImageProps = {
    src: "/images/Sunglasses.jpg",
    alt: "",
    caption: "",
    fill: true,
    // width: 282,
    // height: 188,
};

export const DEFAULT_IMAGE_DISNEY: CustomImageProps = {
    src: "/images/Disney.jpg",
    alt: "Max and Alex kissing in front of the Disney castle.",
    caption: "Disney Trip",
    fill: true,
    width: 282,
    height: 188,
};

export const DEFAULT_IMAGE_MaxBuck: CustomImageProps = {
    src: "/images/MaxBucky.jpg",
    alt: "Max holding our white, fluffy cat named Bucky",
    caption: "",
    fill: true,
    // width: 2160,
    // height: 2880,
};

export const DEFAULT_IMAGE_MaxHoldingBucky: CustomImageProps = {
    src: "/images/MaxHoldingBucky.jpg",
    alt: "Max holding our white, fluffy cat named Bucky",
    caption: "Max holding his son, Bucky.",
    fill: true,
    // width: 2160,
    // height: 2880,
    // imgPositionResponsive: {
    //     desktop: "center 15%",
    // },
};

export const DEFAULT_IMAGE_MaxAlexJules: CustomImageProps = {
    src: "/images/MaxAlexJulesInCar.jpg",
    alt: "Alex, Max, and Jules in the car.",
    caption: "Juliet was the reason we met.",
    width: 2880,
    height: 2160,
};
