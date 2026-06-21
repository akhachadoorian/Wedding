"use client";

import { useEffect, useRef, useState } from "react";
import { useTooltip } from "../../GlobalTooltip/GlobalTooltip";

import { useFadeInChildren } from "../../../hooks/useFadeIn";
import useScrollRevealAnimation from "./useScrollRevealAnimation";
import { ArrowDownIcon } from "@phosphor-icons/react";

import "./ScrollRevealHero.scss";
import Diamond from "../../../components/Diamond/Diamond";
import Image, { ImageProps } from "next/image";
import { DEFAULT_IMAGE, DEFAULT_IMAGE_DISNEY, DEFAULT_IMAGE_ENGAGEMENT, DEFAULT_IMAGE_GRADUATION, DEFAULT_IMAGE_SUNGLASSES,  } from "@/data/defaultImage";

export type DecoBorder = 'simple' | 'double' | 'odd-corner' | 'even-corner' | 'corner' | 'diamond';

export type ScrollRevealHeroImageProps = ImageProps & {
    caption?: string;
    aspectRatio?: 'landscape' | 'portrait' | 'square'; 
}

export type SideImageConfig = ScrollRevealHeroImageProps & { borderStyle?: DecoBorder };


export type ScrollRevealHeroProps = {
    /** Center card image. Defaults to the primary couple photo. */
    mainImage?: ScrollRevealHeroImageProps;
    /** Art deco border style for the center card. */
    centerBorderStyle?: DecoBorder;
    /** Up to 4 flanking photos merged with defaults; each can have its own borderStyle. */
    sideImages?: Array<SideImageConfig>;
    /** Heading rendered over the card (e.g. couple's names). */
    header?: string;
    /** Hides the horizontal rule and scroll arrow at the bottom of the card. */
    hideScrollHint?: boolean;
    /** Label displayed next to the scroll arrow. */
    scrollHintMessage?: string;
    /** Message displayed at the bottom of screen after the scroll effect.*/
    endScrollMessage?: string;
    /** Message displayed at the bottom of screen after the scroll effect.*/
    endScrollMessageMobile?: string;
};

// #region --- Default Images ----------------------

const DEFAULT_IMAGE_SR: ScrollRevealHeroImageProps = {
    src: DEFAULT_IMAGE.src,
    alt: DEFAULT_IMAGE.alt,
    width: DEFAULT_IMAGE.width,
    height: DEFAULT_IMAGE.height,

    caption: DEFAULT_IMAGE.caption, 
    aspectRatio: 'landscape'
};

const DEFAULT_IMAGE_ENGAGEMENT_SR: ScrollRevealHeroImageProps = {
    src: DEFAULT_IMAGE_ENGAGEMENT.src,
    alt: DEFAULT_IMAGE_ENGAGEMENT.alt,
    width: DEFAULT_IMAGE_ENGAGEMENT.width,
    height: DEFAULT_IMAGE_ENGAGEMENT.height,

    caption: DEFAULT_IMAGE_ENGAGEMENT.caption, 
    aspectRatio: 'landscape'
};

const DEFAULT_IMAGE_GRADUATION_SR: ScrollRevealHeroImageProps = {
    src: DEFAULT_IMAGE_GRADUATION.src,
    alt: DEFAULT_IMAGE_GRADUATION.alt,
    width: DEFAULT_IMAGE_GRADUATION.width,
    height: DEFAULT_IMAGE_GRADUATION.height,

    caption: DEFAULT_IMAGE_GRADUATION.caption, 
    aspectRatio: 'square'
};

const DEFAULT_IMAGE_SUNGLASSES_SR: ScrollRevealHeroImageProps = {
    src: DEFAULT_IMAGE_SUNGLASSES.src,
    alt: DEFAULT_IMAGE_SUNGLASSES.alt,
    width: DEFAULT_IMAGE_SUNGLASSES.width,
    height: DEFAULT_IMAGE_SUNGLASSES.height,

    caption: DEFAULT_IMAGE_SUNGLASSES.caption, 
    aspectRatio: 'square'
};

const DEFAULT_IMAGE_DISNEY_SR: ScrollRevealHeroImageProps = {
    src: DEFAULT_IMAGE_DISNEY.src,
    alt: DEFAULT_IMAGE_DISNEY.alt,
    width: DEFAULT_IMAGE_DISNEY.width,
    height: DEFAULT_IMAGE_DISNEY.height,

    caption: DEFAULT_IMAGE_DISNEY.caption, 
    aspectRatio: 'portrait'
};

const DEFAULT_SIDE_IMAGES = [DEFAULT_IMAGE_ENGAGEMENT_SR, DEFAULT_IMAGE_GRADUATION_SR, DEFAULT_IMAGE_SUNGLASSES_SR, DEFAULT_IMAGE_DISNEY_SR];

// const IMAGE_ENGAGEMENT: ScrollRevealHeroImageProps = {
//     src: IMAGE_ENGAGEMENT.src,
//     alt: "Max proposing to Alex in the Japan Garden in Epcot.",
//     caption: "Max proposing to Alex in the Japan Garden in Epcot",
//     aspectRatio: 'portrait',
//     width: 282,
//     height: 320
// };

// const IMAGE_GRADUATION: ScrollRevealHeroImageProps = {
//     src: "/images/Graduation.jpg",
//     alt: "Max and Alex at Max's college graduation.",
//     caption: "Max's Graduation",
//     aspectRatio: 'square',
//     width: 282,
//     height: 320
// };

// const IMAGE_SUNGLASSES: ScrollRevealHeroImageProps = {
//     src: "/images/Sunglasses.jpg",
//     alt: "",
//     caption: "",
//     aspectRatio: 'square',
//     width: 282,
//     height: 188
// };

// const IMAGE_DISNEY: ScrollRevealHeroImageProps = {
//     src: "/images/Disney.jpg",
//     alt: "Max and Alex kissing in front of the Disney castle.",
//     caption: "Disney Trip",
//     aspectRatio: 'portrait',
//     width: 282,
//     height: 188
// };

// const DEFAULT_SIDE_IMAGES: ScrollRevealHeroImageProps[] = [
//     IMAGE_ENGAGEMENT,
//     IMAGE_GRADUATION,
//     IMAGE_SUNGLASSES,
//     IMAGE_DISNEY,
// ];

// #endregion -------------------------------------------------


/**
 * Full-screen hero that scroll-shrinks into a portrait card while side images fly in.
 * Scroll animation is owned by `useScrollRevealAnimation`; this component handles layout,
 * tooltip state, and fade-in on mount.
 */
export default function ScrollRevealHero({ mainImage = DEFAULT_IMAGE, centerBorderStyle, sideImages = DEFAULT_SIDE_IMAGES, header = "Alex & Max", hideScrollHint = true, scrollHintMessage, endScrollMessage, endScrollMessageMobile }: ScrollRevealHeroProps) {
    // ----- GSAP References ---------------------------
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    // const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const sideL0 = useRef<HTMLDivElement>(null);
    const sideL1 = useRef<HTMLDivElement>(null);
    const sideR0 = useRef<HTMLDivElement>(null);
    const sideR1 = useRef<HTMLDivElement>(null);
    const hoverHintRef = useRef<HTMLParagraphElement>(null);

    // ----- State Variables ---------------------------
    const [scrolled, setScrolled] = useState(false);
    const [touchedIdx, setTouchedIdx] = useState<number | null>(null);
    const { makeMouseHandlers } = useTooltip();

    const makeTouchHandlers = (idx: number) => ({
        onTouchStart: (e: React.TouchEvent) => {
            e.stopPropagation();
            setTouchedIdx((prev) => (prev === idx ? null : idx));
        },
    });

    const ref = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

    useScrollRevealAnimation({ sectionRef, cardRef, textRef, sideL0, sideL1, sideR0, sideR1, hoverHintRef });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const clearTouch = () => setTouchedIdx(null);
        document.addEventListener("touchstart", clearTouch);
        return () => document.removeEventListener("touchstart", clearTouch);
    }, []);

    const imgs: SideImageConfig[] = [...sideImages, ...DEFAULT_SIDE_IMAGES].slice(0, 4);

    return (
        <section ref={sectionRef} className="scroll_reveal_hero">
            <div ref={ref} className="scroll_reveal_hero-sticky">
                {/* LEFT COLUMN */}
                <div className="scroll_reveal_hero-sides-left scroll_reveal_hero-sides-col">
                    <div ref={sideL0} className={`scroll_reveal_hero-sides-img img-holder img-${imgs[0].aspectRatio ?? "square"}${touchedIdx === 0 ? " is-touched" : ""}${imgs[0].borderStyle ? ` deco-border--${imgs[0].borderStyle}` : ''}`} {...makeMouseHandlers(imgs[0].caption ?? "")} {...makeTouchHandlers(0)}>
                        <Image src={imgs[0].src} alt={imgs[0].alt ?? ""} className="img-bw" />
                        <div className="img-overlay"></div>
                        {imgs[0].caption && <p className="scroll_reveal_hero-caption">{imgs[0].caption}</p>}
                    </div>

                    <div ref={sideL1} className={`scroll_reveal_hero-sides-img img-holder img-${imgs[1].aspectRatio ?? "square"}${touchedIdx === 1 ? " is-touched" : ""}${imgs[1].borderStyle ? ` deco-border--${imgs[1].borderStyle}` : ''}`} {...makeMouseHandlers(imgs[1].caption ?? "")} {...makeTouchHandlers(1)}>
                        <Image src={imgs[1].src} alt={imgs[1].alt ?? ""} className="img-bw" />
                        <div className="img-overlay"></div>
                        {imgs[1].caption && <p className="scroll_reveal_hero-caption">{imgs[1].caption}</p>}
                    </div>
                </div>

                {/* CENTER COLUMN */}
                <div className=" scroll_reveal_hero-center">
                    <div ref={cardRef} className={`scroll_reveal_hero-center-card mwc-animate${centerBorderStyle ? ` deco-border--${centerBorderStyle}` : ''}`}>
                        <div className="img-holder">
                            <Image src={mainImage.src} alt={mainImage.alt} className="scroll_reveal_hero-card-img img-bw" />
                            <div className="img-overlay"></div>
                        </div>

                        <div ref={textRef} className="scroll_reveal_hero-center-text">
                            <h1 className="scroll_reveal_hero-center-text-header mwc-animate">{header}</h1>

                            {/* Scroll hint */}
                            {!hideScrollHint && (
                                <div className="scroll_reveal_hero-center-text-hint mwc-animate">
                                    <div className="scroll_reveal_hero-bounce">
                                        <ArrowDownIcon color="var(--cream-500)" size={18} />
                                    </div>
                                    {scrollHintMessage && <p className="scroll_reveal_hero-hint-text">{scrollHintMessage}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* {endScrollMessage && (
                        <p ref={hoverHintRef} className="scroll_reveal_hero-hover-hint">
                            {endScrollMessage}
                        </p>
                    )} */}

                    {/* {(endScrollMessage || endScrollMessageMobile) && ( */}
                        {/* // <div ref={hoverHintRef} className="scroll_reveal_hero-hover-hint"> */}
                            {/* <div className="line"></div>

                            <Diamond 
                                color="--gold-500" 
                                size={{size: {minSize: 10, desiredSize: 12, maxSize: 14}}}
                            /> */}

                            {/* {endScrollMessage && <p className="desktop">{endScrollMessage}</p>} */}

                            {/* {endScrollMessageMobile && <p className="mobile">{endScrollMessageMobile}</p>} */}

                            {/* <Diamond 
                                color="--gold-500" 
                                size={{size: {minSize: 10, desiredSize: 12, maxSize: 14}}}
                            />

                            <div className="line"></div> */}
                        {/* </div> */}
                    {/* )} */}
                </div>

                {/* RIGHT COLUMN */}
                <div className="scroll_reveal_hero-sides-right scroll_reveal_hero-sides-col">
                    <div ref={sideR0} className={`scroll_reveal_hero-sides-img img-holder img-${imgs[2].aspectRatio ?? "square"}${touchedIdx === 2 ? " is-touched" : ""}${imgs[2].borderStyle ? ` deco-border--${imgs[2].borderStyle}` : ''}`} {...makeMouseHandlers(imgs[2].caption ?? "")} {...makeTouchHandlers(2)}>
                        <Image src={imgs[2].src} alt={imgs[2].alt ?? ""} className="img-bw" />
                        <div className="img-overlay"></div>
                        {imgs[2].caption && <p className="scroll_reveal_hero-caption">{imgs[2].caption}</p>}
                    </div>
                    <div ref={sideR1} className={`scroll_reveal_hero-sides-img img-holder img-${imgs[3].aspectRatio ?? "square"}${touchedIdx === 3 ? " is-touched" : ""}${imgs[3].borderStyle ? ` deco-border--${imgs[3].borderStyle}` : ''}`} {...makeMouseHandlers(imgs[3].caption ?? "")} {...makeTouchHandlers(3)}>
                        <Image src={imgs[3].src} alt={imgs[3].alt ?? ""} className="img-bw" />
                        <div className="img-overlay"></div>
                        {imgs[3].caption && <p className="scroll_reveal_hero-caption">{imgs[3].caption}</p>}
                    </div>
                </div>
            </div>
            

        </section>
    );
}
