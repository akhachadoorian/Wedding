import React, { useEffect, useRef } from "react";
import Eyebrow from "./Eyebrow";
import HeroImg from "../assets/ArchedImage.png";
import gsap from "gsap";

function Hero({}) {
    const imgRef = useRef(null);
    const eyebrowRef = useRef(null);
    const h1Ref = useRef(null);

    useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(imgRef.current, {
            scale: 0.94,
            opacity: 0,
            duration: 1.4,
        })
        .from(eyebrowRef.current, {
            y: 12,
            opacity: 0,
            duration: 0.8,
        }, "-=0.9")
        .from(h1Ref.current, {
            y: 16,
            opacity: 0,
            duration: 0.8,
        }, "-=0.6");
    });

    return () => ctx.revert(); // ← this is the key cleanup
}, []);

    return (
        <section className="hero-section">
            <div className="hero-wrapper">
                <div className="hero-img">
                    <div className="img_holder">
                        <img ref={imgRef} src={HeroImg} alt="" />
                    </div>
                </div>
                <div className="hero-text">
                    <div ref={eyebrowRef}>
                        <Eyebrow variation="centered" color="gold" text="Saturday Oct, 31, 2026 — Halloween" />
                    </div>

                    {/* <Eyebrow variation="centered" color="gold" text="Saturday Oct, 31, 2026 — Halloween" /> */}
                    <h1 ref={h1Ref}>
                        Alex Khachadoorian
                        <br />& Max Paluett
                    </h1>
                </div>
            </div>
        </section>
    );
}

export default Hero;
