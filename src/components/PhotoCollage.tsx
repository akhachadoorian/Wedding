import {
    DEFAULT_IMAGE,
    DEFAULT_IMAGE_DISNEY,
    DEFAULT_IMAGE_ENGAGEMENT,
    DEFAULT_IMAGE_GRADUATION,
    DEFAULT_IMAGE_SUNGLASSES,
} from "@/data/defaultImage";
import { useTooltip } from "@/layout/GlobalTooltip";
import { CustomImageProps } from "@/types/images";
import { WithHTMLProps } from "@/types/props";
import { RequireX } from "@/types/utility";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import mergeRefs from "@/hooks/mergeRefs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ToolTipHoverImageHolder } from "./ImageHolder";
import { useFitHeadline } from "@/hooks/useFitHeadline";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

const SIDE_COLUMN =
    "flex flex-row gap-col-gutter md:flex-col md:justify-center md:flex-[1_1_281px] md:py-col-gutter";

const IMG_SHAPE = {
    tall: "w-full aspect-square md:aspect-[136/151]",
    long: "w-full aspect-[3/2] md:aspect-[94/61]",
};

export type PhotoCollageProps = WithHTMLProps & {
    header?: string;

    mainImage?: CustomImageProps;
    leftSideImages?: RequireX<CustomImageProps, 2>;
    rightSideImages?: RequireX<CustomImageProps, 2>;
    styleOptions?: {
        headerTop: boolean;
        textBehind: boolean;
        reverseImageShapes?: boolean;
    };
};

const DEFAULT_STYLE_OPTIONS = {
    headerTop: true,
    textBehind: false,
    reverseImageShapes: false,
};

const DEFAULT_LEFT_IMAGES: RequireX<CustomImageProps, 2> = [
    DEFAULT_IMAGE_ENGAGEMENT,
    DEFAULT_IMAGE_SUNGLASSES,
];

const DEFAULT_RIGHT_IMAGES: RequireX<CustomImageProps, 2> = [
    DEFAULT_IMAGE_DISNEY,
    DEFAULT_IMAGE_GRADUATION,
];

export default function PhotoCollage({
    header,
    mainImage = DEFAULT_IMAGE,
    leftSideImages = DEFAULT_LEFT_IMAGES,
    rightSideImages = DEFAULT_RIGHT_IMAGES,
    styleOptions = DEFAULT_STYLE_OPTIONS,

    className,
    ref,
    ...htmlProps
}: PhotoCollageProps) {
    const { makeMouseHandlers } = useTooltip();

    // Stacks the fitted header either behind or in front of the photos.
    const [textZ, imgsZ] = styleOptions.textBehind ? ["z-1", "z-2"] : ["z-2", "z-1"];

    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

    const { containerRef, textRef, headlineStyle, ready } = useFitHeadline();

    const headerParallaxRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = headerParallaxRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            mm.add("(min-width: 800px)", () => {
                gsap.fromTo(
                    el,
                    { y: 0 },
                    {
                        y: 30,
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    },
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            {...htmlProps}
            className={className}
            ref={mergeRefs(animRef, ref)}
        >
            {header && styleOptions.headerTop && (
                <div
                    ref={mergeRefs(headerParallaxRef, containerRef)}
                    className="md:-mb-20"
                >
                    <h2
                        ref={textRef}
                        style={headlineStyle}
                        className={cn("relative md:text-center mwc-animate", textZ)}
                    >
                        {ready && header}
                    </h2>
                </div>
            )}

            <div
                className={cn(
                    "relative flex flex-col gap-col-gutter md:flex-row",
                    "[&_img]:transition-all [&_img]:duration-300 [&_img]:ease-in-out [&_.img-overlay]:transition-all [&_.img-overlay]:duration-300 [&_.img-overlay]:ease-in-out",
                    imgsZ,
                )}
            >
                {/* Left Column */}
                {leftSideImages && (
                    <div className={cn(SIDE_COLUMN, "items-end")}>
                        {leftSideImages.map((img, idx) => {
                            const tallIndex = styleOptions.reverseImageShapes
                                ? 1
                                : 0;
                            return (
                                <ToolTipHoverImageHolder
                                    key={idx}
                                    className={cn(IMG_SHAPE[idx === tallIndex ? "tall" : "long"], "mwc-animate")}
                                    img={img}
                                    makeMouseHandlers={makeMouseHandlers}
                                />
                            );
                        })}
                    </div>
                )}

                {/* Center Image */}
                <ToolTipHoverImageHolder
                    className="aspect-[10/8] md:flex-[3_1_696px] md:aspect-auto mwc-animate"
                    img={mainImage}
                    makeMouseHandlers={makeMouseHandlers}
                />

                {/* Right Column */}
                {rightSideImages && (
                    <div className={cn(SIDE_COLUMN, "items-start")}>
                        {rightSideImages.map((img, idx) => {
                            const longIndex = styleOptions.reverseImageShapes
                                ? 1
                                : 0;
                            return (
                                <ToolTipHoverImageHolder
                                    key={idx}
                                    className={cn(IMG_SHAPE[idx === longIndex ? "long" : "tall"], "mwc-animate")}
                                    img={img}
                                    makeMouseHandlers={makeMouseHandlers}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            {/* {(header && !styleOptions.headerTop) && (
                <div ref={headerParallaxRef} className="photo_collage-header_bottom">
                    <h2 ref={useFitTextRef}  className="photo_collage-text mwc-animate">{header}</h2>
                </div>
            )} */}
        </div>
    );
}
