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
import { useState, useRef, useEffect } from "react";
import "./PhotoCollage.scss";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import mergeRefs from "@/hooks/mergeRefs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    const [touchedIdx, setTouchedIdx] = useState<number | null>(null); // TODO: add mobile touch functionality
    const { makeMouseHandlers } = useTooltip();

    const makeTouchHandlers = (idx: number) => ({
        onTouchStart: (e: React.TouchEvent) => {
            e.stopPropagation();
            setTouchedIdx((prev) => (prev === idx ? null : idx));
        },
    });

    let styleClasses = styleOptions.textBehind ? "photo_collage-text_behind" : "photo_collage-text_front";

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
                <div ref={headerParallaxRef} className="photo_collage-header_top">
                    <h2 className="photo_collage-text mwc-animate">{header}</h2>
                </div>
            )}

            <div className="photo_collage-imgs">
                {/* Left Column */}
                {leftSideImages && (
                    <div className="photo_collage-imgs-left photo_collage-imgs-side">
                        {leftSideImages.map((img, idx) => (
                            <PhotoCollageImageHolder
                                key={idx}
                                className={`photo_collage-img photo_collage-img-${idx === 0 ? "tall" : "long"} mwc-animate`}
                                img={img}
                                makeMouseHandlers={makeMouseHandlers}
                            />
                        ))}
                    </div>
                )}

                {/* Center Image */}
                <PhotoCollageImageHolder
                    className="photo_collage-imgs-main mwc-animate"
                    img={mainImage}
                    makeMouseHandlers={makeMouseHandlers}
                    // makeTouchHandlers={makeTouchHandlers}
                />

                {/* Right Column */}
                {rightSideImages && (
                    <div className="photo_collage-imgs-right photo_collage-imgs-side">
                        {rightSideImages.map((img, idx) => (
                            <PhotoCollageImageHolder
                                key={idx}
                                className={`photo_collage-img photo_collage-img-${idx === 0 ? "long" : "tall"} mwc-animate`}
                                img={img}
                                makeMouseHandlers={makeMouseHandlers}
                            />
                        ))}
                    </div>
                )}
            </div>

            {(header && !styleOptions.headerTop) && (
                <div ref={headerParallaxRef} className="photo_collage-header_bottom">
                    <h2 className="photo_collage-text mwc-animate">{header}</h2>
                </div>
            )}
        </div>
    );
}

function PhotoCollageImageHolder({
    img,
    hideOverlay = false,
    className,
    makeMouseHandlers,
    // makeTouchHandlers
}: {
    img: CustomImageProps;
    hideOverlay?: boolean;
    className?: string;
    makeMouseHandlers: ReturnType<typeof useTooltip>["makeMouseHandlers"];
    // makeTouchHandlers: (idx: number) => { onTouchStart: (e: React.TouchEvent) => void };
}) {
    return (
        <div
            className={`img-holder photo_collage-img ${className ?? ""}`}
            {...(img.caption
                ? makeMouseHandlers({ type: "text", caption: img.caption })
                : "")}
        >
            <Image {...img} className="img-bw" />

            {!hideOverlay && <div className="img-overlay" />}
        </div>
    );
}
