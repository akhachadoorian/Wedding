import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/components/HomeHero.css";
import HeroImg from "../assets/Max&Alex.jpg";
import Eyebrow from "./Eyebrow";

export default function HomeHero() {
    //

    // Scrolling References
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const mediaRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const text = textRef.current;
        const media = mediaRef.current;
        const image = imageRef.current;

        if (!section || !text || !media || !image) return;

        const ctx = gsap.context(() => {
            gsap.set(media, {
                // top: "14vh",
                top: '0px',
                right: "0",
                width: "43.056vw",
                // height: "62vh",
                height: "100vh",
                borderRadius: "0px", // or 24px if you want rounded first
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
                    borderRadius: "0px",
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
    }, []);

    return (
        <section ref={sectionRef} className="home_hero-wrapper">
            <div className="home_hero-sticky">
                <div className="home_hero-text-shell">
                    <div ref={textRef} className="home_hero-text">
                        <Eyebrow variation="centered" color="gold" text="Saturday Oct, 31, 2026 — Halloween" />
                        <h1 className="home_hero-title">
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
