import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../css/components/HomeHero.css";
import HeroImg from "../../assets/Max&Alex.jpg";
import Eyebrow from "../Eyebrow";

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

    useEffect(() => {
        if (!loaded) return;

        const isDesktop = window.innerWidth >= 800;
        if (!isDesktop) return;

        const section = sectionRef.current;
        const text = textRef.current;
        const media = mediaRef.current;
        const image = imageRef.current;

        if (!section || !text || !media || !image) return;

        const ctx = gsap.context(() => {
            gsap.set(media, {
                top: "0px",
                right: "0",
                width: "43.056vw",
                height: "100vh",
            });

            gsap.set(text, {
                x: 0,
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
                },
            });

            tl.to(
                media,
                {
                    top: 0,
                    right: 0,
                    width: "100vw",
                    height: "100vh",
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
        }, section);

        return () => ctx.revert();
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
