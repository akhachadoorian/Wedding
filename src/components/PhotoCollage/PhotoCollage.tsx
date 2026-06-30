import {
    DEFAULT_IMAGE,
    DEFAULT_IMAGE_DISNEY,
    DEFAULT_IMAGE_ENGAGEMENT,
    DEFAULT_IMAGE_GRADUATION,
    DEFAULT_IMAGE_SUNGLASSES,
} from "@/data/defaultImage";
import { useTooltip } from "@/layout/GlobalTooltip/GlobalTooltip";
import { CustomImageProps } from "@/types/images";
import { WithHTMLProps } from "@/types/props";
import { RequireX } from "@/types/utility";
import Image from "next/image";
import { useRef, useEffect } from "react";
import "./PhotoCollage.scss";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import mergeRefs from "@/hooks/mergeRefs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFitText } from "@/hooks/useFitText";
import { ToolTipHoverImageHolder } from "../ImageHolder/ImageHolder";

gsap.registerPlugin(ScrollTrigger);

export type PhotoCollageProps = WithHTMLProps & {
    header?: string;

    mainImage?: CustomImageProps;
    leftSideImages?: RequireX<CustomImageProps, 2>;
    rightSideImages?: RequireX<CustomImageProps, 2>;
    styleOptions?: {
        headerTop: boolean;
        textBehind: boolean;
    };
};

const DEFAULT_STYLE_OPTIONS = {
    headerTop: true,
    textBehind: false,
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

    let styleClasses = styleOptions.textBehind ? "photo_collage-text_behind" : "photo_collage-text_front";

    const useFitTextRef = useFitText<HTMLHeadingElement>({ mobile: true });
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", { stagger: 0.15, y: 24 });

    const headerParallaxRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = headerParallaxRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            mm.add("(min-width: 800px)", () => {
                gsap.fromTo(el,
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
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            {...htmlProps}
            className={`photo_collage ${styleClasses} ${className ?? ""}`}
            ref={mergeRefs(animRef, ref)}
        >
            {(header && styleOptions.headerTop) && (
                <div 
                ref={headerParallaxRef} 
                className="photo_collage-header_top"
                >
                    <h2 ref={useFitTextRef} className="photo_collage-text mwc-animate">{header}</h2>
                </div>
            )}

            <div className="photo_collage-imgs">
                {/* Left Column */}
                {leftSideImages && (
                    <div className="photo_collage-imgs-left photo_collage-imgs-side">
                        {leftSideImages.map((img, idx) => (
                            <ToolTipHoverImageHolder
                                key={idx}
                                className={`photo_collage-img photo_collage-img-${idx === 0 ? "tall" : "long"} mwc-animate`}
                                img={img}
                                makeMouseHandlers={makeMouseHandlers}
                                // makeTouchHandlers={makeTouchHandlers}
                            />
                        ))}
                    </div>
                )}

                {/* Center Image */}
                <ToolTipHoverImageHolder
                    className="photo_collage-imgs-main mwc-animate"
                    img={mainImage}
                    makeMouseHandlers={makeMouseHandlers}
                />

                {/* Right Column */}
                {rightSideImages && (
                    <div className="photo_collage-imgs-right photo_collage-imgs-side">
                        {rightSideImages.map((img, idx) => (
                            <ToolTipHoverImageHolder
                                key={idx}
                                className={`photo_collage-img photo_collage-img-${idx === 0 ? "long" : "tall"} mwc-animate`}
                                img={img}
                                makeMouseHandlers={makeMouseHandlers}
                                // makeTouchHandlers={makeTouchHandlers}
                            />
                        ))}
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
