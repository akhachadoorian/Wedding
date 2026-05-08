"use client";

import { useEffect, useRef, useState } from "react";

import { DEFAULT_IMAGE, DEFAULT_SIDE_IMAGES } from "../../data/defaultImage";
import { useFadeInChildren } from "../../hooks/useFadeIn";
import { ImageProps } from "../../types/images";
import useScrollRevealAnimation from "./useScrollRevealAnimation";
import { ArrowDownIcon } from "@phosphor-icons/react";

import "./ScrollRevealHero.scss";

export type ScrollRevealHeroProps = {
    /** Center card image. Defaults to the primary couple photo. */
    mainImage?: ImageProps;
    /** Up to 4 flanking photos merged with defaults; captions appear on hover. */
    sideImages?: Array<ImageProps>;
    /** Heading rendered over the card (e.g. couple's names). */
    header?: string;
    /** Hides the horizontal rule and scroll arrow at the bottom of the card. */
    hideScrollHint?: boolean;
    /** Label displayed next to the scroll arrow. */
    scrollHintMessage?: string;
    /** Message displayed at the bottom of screen after the scroll effect.*/
    endScrollMessage?: string;

    // leftImages?: Array<ImageProps>; 
};

/**
 * Full-screen hero that scroll-shrinks into a portrait card while side images fly in.
 * Scroll animation is owned by `useScrollRevealAnimation`; this component handles layout,
 * tooltip state, and fade-in on mount.
 */
export default function ScrollRevealHero({ mainImage = DEFAULT_IMAGE, sideImages = DEFAULT_SIDE_IMAGES, header = "Alex & Max", hideScrollHint = true, scrollHintMessage, endScrollMessage }: ScrollRevealHeroProps) {
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
    const [tooltip, setTooltip] = useState<{ x: number; y: number; caption: string } | null>(null);

    const makeMouseHandlers = (caption: string) => ({
        onMouseMove: (e: React.MouseEvent) => {
            if (!caption) return;
            setTooltip({ x: e.clientX, y: e.clientY, caption });
        },
        onMouseLeave: () => setTooltip(null),
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

    const imgs = [ ...sideImages, ...DEFAULT_SIDE_IMAGES,].slice(0, 4);

    return (
        <section ref={sectionRef} className="scroll_reveal_hero">
            <div ref={ref} className="scroll_reveal_hero-sticky">
                {/* Card — centered via flex, sized by GSAP */}
                <div className=" scroll_reveal_hero-center">
                    <div ref={cardRef} className="scroll_reveal_hero-center-card mwc-animate">
                        <div className="img-holder">
                            <img src={mainImage.src} alt={mainImage.alt} className="scroll_reveal_hero-card-img img-bw" />
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
                </div>

                {/* Side images layer — outside card, not clipped by card's overflow */}
                <div className="scroll_reveal_hero-sides">
                    {/* Left column */}
                    <div className="scroll_reveal_hero-sides-left scroll_reveal_hero-sides-col">
                        <div ref={sideL0} className={`scroll_reveal_hero-sides-img img-holder img-${imgs[0].aspectRatio ?? 'square'}`} {...makeMouseHandlers(imgs[0].caption ?? "")}>
                            <img src={imgs[0].src} alt={imgs[0].alt ?? ""} className="img-bw" />
                            <div className="img-overlay"></div>
                        </div>

                        <div ref={sideL1} className={`scroll_reveal_hero-sides-img img-holder img-${imgs[1].aspectRatio ?? 'square'}`} {...makeMouseHandlers(imgs[1].caption ?? "")}>
                            <img src={imgs[1].src} alt={imgs[1].alt ?? ""} className="img-bw" />
                            <div className="img-overlay"></div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="scroll_reveal_hero-sides-right scroll_reveal_hero-sides-col">
                        <div ref={sideR0} className={`scroll_reveal_hero-sides-img img-holder img-${imgs[2].aspectRatio ?? 'square'}`} {...makeMouseHandlers(imgs[2].caption ?? "")}>
                            <img src={imgs[2].src} alt={imgs[2].alt ?? ""} className="img-bw" />
                            <div className="img-overlay"></div>
                        </div>
                        <div ref={sideR1} className={`scroll_reveal_hero-sides-img img-holder img-${imgs[3].aspectRatio ?? 'square'}`} {...makeMouseHandlers(imgs[3].caption ?? "")}>
                            <img src={imgs[3].src} alt={imgs[3].alt ?? ""} className="img-bw" />
                            <div className="img-overlay"></div>
                        </div>
                    </div>

                    {endScrollMessage && (
                        <p ref={hoverHintRef} className="scroll_reveal_hero-hover-hint">
                            {endScrollMessage}
                        </p>
                    )}
                </div>
            </div>

            {tooltip && (
                <div className="scroll_reveal_hero-tooltip" style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}>
                    {tooltip.caption}
                </div>
            )}
        </section>
    );
}
