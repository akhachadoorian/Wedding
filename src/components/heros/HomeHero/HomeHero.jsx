import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroImg from "../../../assets/Max&Alex.jpg";
import Eyebrow from "../../Eyebrow/Eyebrow";
import "./HomeHero.scss";

export default function HomeHero({ loaded }) {
    // Load References
    const eyebrowRef = useRef(null);
    const h1Ref = useRef(null);

    // Scrolling References
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const mediaRef = useRef(null);
    const imageRef = useRef(null);

    useLayoutEffect(() => {
        if (!loaded) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            tl.from(mediaRef.current, {
                opacity: 0,
                duration: 0.8,
            })
                .from(
                    eyebrowRef.current,
                    {
                        y: 12,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.9",
                )
                .from(
                    h1Ref.current,
                    {
                        y: 16,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.6",
                );
        });

        return () => ctx.revert();
    }, [loaded]);

    useLayoutEffect(() => {
        if (!loaded) return;

        const section = sectionRef.current;
        const text = textRef.current;
        const media = mediaRef.current;
        const image = imageRef.current;

        if (!section || !text || !media || !image) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 800px)", () => {
                gsap.set(media, {
                    top: "0px",
                    right: "0px",
                    bottom: "auto",
                    left: "auto",
                    width: "43.056vw",
                    height: "100vh",
                    y: 0,
                });

                gsap.set(text, {
                    x: 0,
                    y: 0,
                    opacity: 1,
                });

                gsap.set(image, {
                    scale: 1,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                tl.to(
                    media,
                    {
                        width: "100vw",
                        height: "100vh",
                        top: 0,
                        right: 0,
                        ease: "none",
                        duration: 0.58,
                    },
                    0,
                )
                    .to(
                        image,
                        {
                            scale: 1.05,
                            ease: "none",
                            duration: 1,
                        },
                        0,
                    )
                    .to(
                        text,
                        {
                            x: -80,
                            opacity: 0,
                            ease: "none",
                            duration: 0.2,
                        },
                        0.3,
                    );
            });

            mm.add("(max-width: 799px)", () => {
                gsap.set(media, {
                    top: "auto",
                    right: "0px",
                    bottom: "0px",
                    left: "0px",
                    width: "100vw",
                    height: "38vh",
                    y: 0,
                });

                gsap.set(text, {
                    x: 0,
                    y: 0,
                    opacity: 1,
                });

                gsap.set(image, {
                    scale: 1,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "bottom 70%",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                tl.to(
                    media,
                    {
                        height: "100vh",
                        bottom: 0,
                        ease: "none",
                        duration: 0.65,
                    },
                    0,
                )
                    .to(
                        image,
                        {
                            scale: 1.06,
                            ease: "none",
                            duration: 1,
                        },
                        0,
                    )
                    .to(
                        text,
                        {
                            y: -50,
                            opacity: 0,
                            ease: "none",
                            duration: 0.16,
                        },
                        0.12,
                    );
            });

            return () => mm.revert();
        }, section);

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        window.addEventListener("resize", refresh);

        return () => {
            window.removeEventListener("load", refresh);
            window.removeEventListener("resize", refresh);
            ctx.revert();
        };
    }, [loaded]);

    return (
        <section ref={sectionRef} className={`home_hero-wrapper ${loaded ? "is-loaded" : "is-hidden"}`}>
            <div className="home_hero-sticky">
                <div className="home_hero-text-shell">
                    <div ref={textRef} className="home_hero-text">
                        <div ref={eyebrowRef}>
                            <Eyebrow variation="centered" color="gold" text="Saturday Oct, 31, 2026 — Halloween" />
                        </div>

                        <h1 ref={h1Ref} className="home_hero-title">
                            Alex Khachadoorian
                            <br />& Max Paulett
                        </h1>
                    </div>
                </div>

                <div ref={mediaRef} className="home_hero-media">
                    <div className="home_hero-overlay"></div>
                    <img ref={imageRef} src={HeroImg} alt="Wedding" className="home_hero-image" />
                </div>
            </div>
        </section>
    );
}
