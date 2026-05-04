"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./HomeHero2.scss";

gsap.registerPlugin(ScrollTrigger);

// Card end dimensions taken directly from source HTML snapshot
const END_W = 529;
const END_H = 735.2;
const END_R = 16; // border-radius px
const END_Y = 12; // translateY px
const SCROLL_PX = 1200;

interface HeroProps {
    heroImageSrc?: string;
    coupleName?: string;
    scrollMessage?: string;
    //   coupleInitials?: string;
    //   rsvpHref?: string;
    //   navLinks?: { label: string; href: string }[];
    //   // 4 images: [leftTop, leftBottom, rightTop, rightBottom]
    sideImages?: { src: string; alt?: string }[];
}

const DEFAULT_SIDE_IMAGES = [
    { src: "/images/Engagement.jpg", alt: "" },
    { src: "/images/Graduation.jpg", alt: "" },
    { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80", alt: "" },
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", alt: "" },
];

export default function HomeHero2({
    heroImageSrc = "/images/MaxAndAlex.jpg",
    coupleName = "Alex & Max",
    scrollMessage = "Scroll for details",
    //   coupleInitials = "A&M",
    //   rsvpHref     = "#rsvp",
    //   navLinks = [
    //     { label: "Travel Logistics", href: "#travel" },
    //     { label: "Registry",         href: "#registry" },
    //     { label: "FAQ",              href: "#faq" },
    //   ],
    sideImages = DEFAULT_SIDE_IMAGES,
}: HeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const sideL0 = useRef<HTMLDivElement>(null);
    const sideL1 = useRef<HTMLDivElement>(null);
    const sideR0 = useRef<HTMLDivElement>(null);
    const sideR1 = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // TODO: turn off effect on mobile
    useLayoutEffect(() => {
        const section = sectionRef.current;
        const card = cardRef.current;
        const overlay = overlayRef.current;
        const text = textRef.current;
        if (!section || !card || !overlay || !text) return;

        // Grab the nav so we can scrub its appearance with the hero scroll
        const navEl = document.querySelector<HTMLElement>(".navigation-wrapper");
        // Disable CSS transition while GSAP owns these properties
        if (navEl) navEl.style.transition = "none";

        const ctx = gsap.context(() => {
            // ── Initial states ────────────────────────────────────────────────────────
            const PAD = 32; // --space-400
            gsap.set(card, { width: window.innerWidth - PAD * 2, height: window.innerHeight - PAD * 2, borderRadius: 8, y: 0 });
            gsap.set(overlay, { opacity: 0.22 });
            gsap.set(text, { opacity: 1 });

            // Side images start off-screen: diagonal (x ±575, y +400, scale 0.96)
            gsap.set([sideL0.current, sideL1.current], { x: -575, y: 400, scale: 0.96, autoAlpha: 0 });
            gsap.set([sideR0.current, sideR1.current], { x: 575, y: 400, scale: 0.96, autoAlpha: 0 });

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

            // Phase 1 (0–40%): text overlay + dark overlay fade out
            tl.to(text, { opacity: 0, ease: "none", duration: 0.2  }, 0);
            tl.to(overlay, { opacity: 0.02, ease: "none" }, 0);

            // Phase 1–2 (0–100%): card shrinks from full-screen to portrait card
            tl.to(
                card,
                {
                    width: END_W,
                    height: END_H,
                    borderRadius: END_R,
                    y: END_Y,
                    ease: "power2.inOut",
                },
                0,
            );

            // Nav scrubs from transparent/full-width → dark pill in sync with the card
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

            // Phase 2 (30–100%): side images fly in diagonally (staggered within each column)
            tl.to(
                [sideL0.current, sideL1.current],
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    ease: "power2.out",
                    stagger: 0.1,
                },
                0.1,
            );

            tl.to(
                [sideR0.current, sideR1.current],
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    ease: "power2.out",
                    stagger: 0.1,
                },
                0.3,
            );
        });

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);
        return () => {
            // Restore CSS transition so the nav behaves normally on other pages
            if (navEl) navEl.style.transition = "";
            window.removeEventListener("resize", onResize);
            ctx.revert();
        };
    }, []);

    const imgs = [...DEFAULT_SIDE_IMAGES, ...sideImages].slice(0, 4);

    return (
        <section ref={sectionRef} className="ch2-outer">
            <div className="ch2-sticky">
                {/* Card — centered via flex, sized by GSAP */}
                <div className="ch2-center">
                    <div ref={cardRef} className="ch2-card">
                        <div className="img-holder">
                            <div className="img-overlay top"></div>
                            <img src={heroImageSrc} alt={coupleName} className="ch2-card-img img-bw" />
                            <div className="img-overlay full"></div>
                        </div>

                        <div ref={overlayRef} className="ch2-card-dark" />

                        <div ref={textRef} className="ch2-text">
                            {/* Name */}
                            <div className="ch2-name-wrap">
                                <h1 className="ch2-name-text">{coupleName}</h1>
                            </div>

                            {/* Scroll hint */}
                            <div className="ch2-hint">
                                <div className="ch2-hint-line" />

                                <div className="ch2-hint-row">
                                    <div className="ch2-bounce">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 13l5 5 5-5M12 6v12" />
                                        </svg>
                                    </div>
                                    <p className="ch2-hint-text">{scrollMessage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side images layer — outside card, not clipped by card's overflow */}
                <div className="ch2-side-layer">
                    {/* Left column */}
                    <div className="ch2-col-left">
                        <div ref={sideL0} className="ch2-side-panel img-holder" style={{ width: 264.5, height: 352.896, borderRadius: 16 }}>
                            <img src={imgs[0].src} alt={imgs[0].alt ?? ""} className="img-bw" />
                            <div className="img-overlay"></div>
                        </div>
                        <div ref={sideL1} className="ch2-side-panel img-holder" style={{ width: 206.31, height: 205.856, borderRadius: 16 }}>
                            <img src={imgs[1].src} alt={imgs[1].alt ?? ""} className="img-bw" />
                            <div className="img-overlay"></div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="ch2-col-right">
                        <div ref={sideR0} className="ch2-side-panel img-holder" style={{ width: 206.31, height: 205.856, borderRadius: 16 }}>
                            <img src={imgs[2].src} alt={imgs[2].alt ?? ""} className="img-bw" />
                            <div className="img-overlay"></div>
                        </div>
                        <div ref={sideR1} className="ch2-side-panel  img-holder" style={{ width: 264.5, height: 352.896, borderRadius: 16 }}>
                            <img src={imgs[3].src} alt={imgs[3].alt ?? ""} className="img-bw" />
                            <div className="img-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
