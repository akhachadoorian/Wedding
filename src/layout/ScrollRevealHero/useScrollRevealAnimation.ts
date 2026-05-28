'use client';

import { useLayoutEffect, useEffect, RefObject, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { px } from "motion";

gsap.registerPlugin(ScrollTrigger);

/** Portrait card width at rest (px) — must match `$end-w` in ScrollRevealHero.scss */
// const END_W = 529;
const END_W = "clamp(529px, 363.736vw, 629px)";
/** Portrait card height at rest (px) — must match `$end-h` in ScrollRevealHero.scss */
// const END_H = 735.2;
const END_H = "clamp(735px, 51.042vw, 835px)";
/** Card border-radius at start (px) */
// const END_R = 16;
const START_R = 6;
/** Card border-radius at rest (px) */
// const END_R = 16;
const END_R = 6;
/** Card translateY at rest (px) */
const END_Y = 0;
/** Total scroll distance (px) over which the animation plays — must match `$scroll-px` in ScrollRevealHero.scss */
const SCROLL_PX = 1200;

/**
 * DOM refs consumed by the scroll-reveal animation, all sourced from `ScrollRevealHero`.
 */
export type ScrollRevealRefs = {
    /** Hero `<section>` element — used as the ScrollTrigger trigger and animation context root. */
    sectionRef: RefObject<HTMLElement | null>;
    /** Full-bleed card that animates from fullscreen to a portrait card on scroll. */
    cardRef: RefObject<HTMLDivElement | null>;
    /** Text overlay that fades out at the start of the scroll sequence. */
    textRef: RefObject<HTMLDivElement | null>;
    /** Left column, back image layer — flies in from the left on scroll. */
    sideL0: RefObject<HTMLDivElement | null>;
    /** Left column, front image layer — flies in from the left with a stagger. */
    sideL1: RefObject<HTMLDivElement | null>;
    /** Right column, back image layer — flies in from the right on scroll. */
    sideR0: RefObject<HTMLDivElement | null>;
    /** Right column, front image layer — flies in from the right with a stagger. */
    sideR1: RefObject<HTMLDivElement | null>;
    /** Hover hint paragraph that fades in near the end of the scroll sequence. */
    hoverHintRef: RefObject<HTMLParagraphElement | null>;
};

/**
 * Drives the scroll-scrubbed hero animation (desktop ≥750px only).
 *
 * - Card shrinks from fullscreen → portrait card
 * - Text overlay fades out
 * - Side image columns fly in diagonally
 * - Nav bar transitions from transparent/wide → dark pill
 *
 * Takes over `.navigation-wrapper` CSS transitions for the duration of the hero;
 * restores them on cleanup so the nav behaves normally on other pages.
 *
 * @param refs - DOM refs sourced from `ScrollRevealHero`
 * @param refs.sectionRef - Hero section; ScrollTrigger trigger and animation context root
 * @param refs.cardRef - Full-bleed card that shrinks to a portrait card on scroll
 * @param refs.textRef - Text overlay that fades out at the start of the animation
 * @param refs.sideL0 - Left column, back image layer; flies in from the left
 * @param refs.sideL1 - Left column, front image layer; flies in with a stagger
 * @param refs.sideR0 - Right column, back image layer; flies in from the right
 * @param refs.sideR1 - Right column, front image layer; flies in with a stagger
 * @param refs.hoverHintRef - Hover hint that fades in at the end of the sequence
 * @returns {void}
 */
export default function useScrollRevealAnimation({
    sectionRef,
    cardRef,
    textRef,
    sideL0,
    sideL1,
    sideR0,
    sideR1,
    hoverHintRef,
}: ScrollRevealRefs) {
    // ----- State Variables ---------------------------
    let [width, setWidth] = useState(window.innerWidth);
    let [height, setHeight] = useState(window.innerHeight);

    // ----- Use Effect ---------------------------
    /**
     * Syncs the screen width and height with the state variables
     * 
     * @example When the screen width is reduced, `width` and `height` are set resulting in the useLayout to be re-rendered
     */
    useEffect(() => {
        const onResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", onResize);

        // Cleanup function
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const card = cardRef.current;
        const text = textRef.current;


        if (!section || !card || !text) return;

        const navEl = document.querySelector<HTMLElement>(".navigation-wrapper");
        // Disable CSS transition while GSAP owns these properties
        if (navEl) navEl.style.transition = "none";

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 750px)", () => {
                // ── Initial states ────────────────────────────────────────────────────────
                const PAD = 32; // --space-400
                gsap.set(card, { width: width - PAD * 2, height: height - PAD * 2, borderRadius: START_R, y: 0 });

                // gsap.set(overlay, { opacity: 0.22 });
                gsap.set(text, { opacity: 1 });

                gsap.set([sideL0.current, sideL1.current], { x: -575, y: 400, scale: 0.96, autoAlpha: 0 });
                gsap.set([sideR0.current, sideR1.current], { x: 575, y: 400, scale: 0.96, autoAlpha: 0 });
                gsap.set(hoverHintRef.current, { autoAlpha: 0, y: 6 });

                if (navEl) {
                    // gsap.set(navEl, {
                    //     background: "transparent",
                    //     borderColor: "transparent",
                    //     boxShadow: "none",
                    //     top: "16px",
                    //     maxWidth: 1600,
                    //     width: width - PAD * 2
                    // });
                }

                // ── Scroll-scrubbed timeline ──────────────────────────────────────────────
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: `+=${SCROLL_PX}`,
                        scrub: 1.2,
                        pin: false,
                        invalidateOnRefresh: true,
                    },
                });

                tl.to(text, { opacity: 0, ease: "none", duration: 0.2 }, 0);
                // tl.to(overlay, { opacity: 1, ease: "none" }, 0);

                tl.to(
                    card,
                    { width: END_W, height: END_H, borderRadius: END_R, y: END_Y, ease: "power2.inOut" },
                    0,
                );

                if (navEl) {
                    tl.to(
                        navEl,
                        {
                            backgroundColor: "var(--black-900)",
                            borderColor: "var(--black-850)",
                            boxShadow: "0 3px 6px rgba(16,17,17,0.34), 0 10px 10px rgba(16,17,17,0.30), 0 23px 14px rgba(16,17,17,0.18)",
                            maxWidth: 870,
                            top: "0px",
                            ease: "power2.inOut",
                        },
                        0,
                    );
                }

                tl.to(
                    [sideL0.current, sideL1.current],
                    { x: 0, y: 0, scale: 1, autoAlpha: 1, ease: "power2.out", stagger: 0.1 },
                    0.1,
                );

                tl.to(
                    [sideR0.current, sideR1.current],
                    { x: 0, y: 0, scale: 1, autoAlpha: 1, ease: "power2.out", stagger: 0.1 },
                    0.3,
                );

                tl.to(hoverHintRef.current, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.15 }, 0.5);
            });

            return () => mm.revert();
        }, section);

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);
        return () => {
            // Restore CSS transition so the nav behaves normally on other pages
            if (navEl) navEl.style.transition = "";
            window.removeEventListener("resize", onResize);
            ctx.revert();
        };
    }, [width, height]);
}
