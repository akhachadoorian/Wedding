import { RequireX } from "@/types/utility";
import { CustomImageProps } from "../types/images";

export const DEFAULT_IMAGE: CustomImageProps = {
    src: "/images/DipShot.jpg",
    alt: "Max dipping Alex and kissing.",
    caption: "Engagement", 
    width: 696,
    height: 522
};

export const DEFAULT_IMAGE_ENGAGEMENT: CustomImageProps = {
    src: "/images/Engagement.jpg",
    alt: "Max proposing to Alex in the Japan Garden in Epcot.",
    caption: "Max proposing to Alex in the Japan Garden in Epcot",
    width: 282,
    height: 320
};

export const DEFAULT_IMAGE_GRADUATION: CustomImageProps = {
    src: "/images/Graduation.jpg",
    alt: "Max and Alex at Max's college graduation.",
    caption: "Max's Graduation",
    width: 282,
    height: 320
};

export const DEFAULT_IMAGE_SUNGLASSES: CustomImageProps = {
    src: "/images/Sunglasses.jpg",
    alt: "",
    caption: "",
    width: 282,
    height: 188
};

export const DEFAULT_IMAGE_DISNEY: CustomImageProps = {
    src: "/images/Disney.jpg",
    alt: "Max and Alex kissing in front of the Disney castle.",
    caption: "Disney Trip",
    width: 282,
    height: 188
};


export const fillDefaultImages = (count: number): CustomImageProps[] =>
    Array.from({ length: count }, () => DEFAULT_IMAGE);