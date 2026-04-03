import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import HeroImg from "../../../assets/Max&Alex.jpg";
import Eyebrow from "../../Eyebrow/Eyebrow";
import './OffsetHero.scss';

export default function OffsetHero({variation = "right", loaded}) {
    const imgRef = useRef(null);
    const eyebrowRef = useRef(null);
    const h1Ref = useRef(null);

    useLayoutEffect(() => {
        if (!loaded) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            tl.from(imgRef.current, {
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

    return (
        <section className={"offset_hero-section"}>
            <div className={`offset_hero-wrapper ${variation}`}>
                <div className="offset_hero-text">
                    <div ref={eyebrowRef}>
                        <Eyebrow variation="centered" color="gold" text="Saturday Oct, 31, 2026 — Halloween" />
                    </div>

                    <h1 className="offset_hero-title" ref={h1Ref}>
                        Alex Khachadoorian
                        <br />& Max Paluett
                    </h1>
                </div>

                <div className="offset_hero-img">
                    <div className="offset_hero-overlay"></div>
                    <div className="img_holder">
                        <img ref={imgRef} src={HeroImg} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}