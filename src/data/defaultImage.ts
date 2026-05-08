import { ImageProps } from "../types/images";

export const DEFAULT_IMAGE: ImageProps = {
    src: "/images/MaxAndAlex.jpg",
    alt: "Max and Alex posed on a bridge in Epcot's Japan pavilion.",
    caption: "Epcot's Japan pavilion during engagement trip.",
};

export const IMAGE_ENGAGEMENT: ImageProps = {
    src: "/images/Engagement.jpg",
    alt: "Max proposing to Alex in the Japan Garden in Epcot.",
    caption: "Max proposing to Alex in the Japan Garden in Epcot",
};

export const IMAGE_GRADUATION: ImageProps = {
    src: "/images/Graduation.jpg",
    alt: "Max and Alex at Max's college graduation.",
    caption: "Max's Graduation",
};

export const IMAGE_SUNGLASSES: ImageProps = {
    src: "/images/Sunglasses.jpg",
    alt: "",
    caption: "",
};

export const IMAGE_DISNEY: ImageProps = {
    src: "/images/Disney.jpg",
    alt: "Max and Alex kissing in front of the Disney castle.",
    caption: "Disney Trip",
};

export const DEFAULT_SIDE_IMAGES: ImageProps[] = [
    IMAGE_ENGAGEMENT,
    IMAGE_GRADUATION,
    IMAGE_SUNGLASSES,
    IMAGE_DISNEY,
];

export const fillDefaultImages = (count: number): ImageProps[] =>
    Array.from({ length: count }, () => DEFAULT_IMAGE);