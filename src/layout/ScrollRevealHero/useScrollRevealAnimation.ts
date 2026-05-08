import { useLayoutEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Card end-state dimensions — match the values baked into ScrollRevealHero.scss
const END_W = 529;    // portrait card width (px)
const END_H = 735.2;  // portrait card height (px)
const END_R = 16;     // border-radius at rest (px)
const END_Y = 12;     // translateY at rest (px)
const SCROLL_PX = 1200; // scroll distance over which the animation plays (matches $scroll-px in SCSS)

/** DOM refs consumed by the scroll animation — all sourced from ScrollRevealHero. */
export type ScrollRevealRefs = {
    sectionRef: RefObject<HTMLElement | null>;
    cardRef: RefObject<HTMLDivElement | null>;
    // overlayRef: RefObject<HTMLDivElement | null>;
    textRef: RefObject<HTMLDivElement | null>;
    sideL0: RefObject<HTMLDivElement | null>;
    sideL1: RefObject<HTMLDivElement | null>;
    sideR0: RefObject<HTMLDivElement | null>;
    sideR1: RefObject<HTMLDivElement | null>;
    hoverHintRef: RefObject<HTMLParagraphElement | null>;
};

/**
 * Drives the scroll-scrubbed hero animation (desktop ≥800px only):
 *   - Card shrinks from fullscreen → portrait card
 *   - Text overlay and dark vignette fade out
 *   - Side image columns fly in diagonally
 *   - Nav bar transitions from transparent/wide → dark pill
 *
 * Takes over `.navigation-wrapper` CSS transitions for the duration of the hero;
 * restores them on cleanup so the nav behaves normally on other pages.
 */
export default function useScrollRevealAnimation({
    sectionRef,
    cardRef,
    // overlayRef,
    textRef,
    sideL0,
    sideL1,
    sideR0,
    sideR1,
    hoverHintRef,
}: ScrollRevealRefs) {
    useLayoutEffect(() => {
        const section = sectionRef.current;
        const card = cardRef.current;
        // const overlay = overlayRef.current;
        const text = textRef.current;
        // if (!section || !card || !overlay || !text) return;
        if (!section || !card || !text) return;

        const navEl = document.querySelector<HTMLElement>(".navigation-wrapper");
        // Disable CSS transition while GSAP owns these properties
        if (navEl) navEl.style.transition = "none";

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 800px)", () => {
                // ── Initial states ────────────────────────────────────────────────────────
                const PAD = 32; // --space-400
                gsap.set(card, { width: window.innerWidth - PAD * 2, height: window.innerHeight - PAD * 2, borderRadius: 8, y: 0 });

                console.log("width: ",  window.innerWidth - PAD * 2)

                // gsap.set(overlay, { opacity: 0.22 });
                gsap.set(text, { opacity: 1 });

                gsap.set([sideL0.current, sideL1.current], { x: -575, y: 400, scale: 0.96, autoAlpha: 0 });
                gsap.set([sideR0.current, sideR1.current], { x: 575, y: 400, scale: 0.96, autoAlpha: 0 });
                gsap.set(hoverHintRef.current, { autoAlpha: 0, y: 6 });

                if (navEl) {
                    gsap.set(navEl, {
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                        boxShadow: "none",
                        top: "16px",
                        maxWidth: 1600,
                    });
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
    }, []);
}
