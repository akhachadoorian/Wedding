"use client";

import { WithHTMLProps } from "../../types/props";

import { DEFAULT_IMAGE } from "@/data/defaultImage";
import TextWithNewLine from "@/utils/TextWithNewLine";
import { CustomImageProps } from "@/types/images";
import "./GothHero.scss";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFitText } from "@/hooks/useFitText";
import ImageHolder from "@/components/ImageHolder/ImageHolder";

gsap.registerPlugin(ScrollTrigger);

export type GothHeroProps = WithHTMLProps & {
    loaded: boolean;

    // Fields
    img?: CustomImageProps;

    eyebrows?: {
        left?: string;
        center?: string;
        right?: string;
    };
};

export default function GothHero({
    loaded,

    // header,
    img = DEFAULT_IMAGE,
    eyebrows,

    className,
    ...htmlProps
}: GothHeroProps) {
    const [imgReady, setImgReady] = useState(false);

    // Load References
    const sectionRef = useRef(null);
    const imgRef = useRef(null);
    const h1Ref = useRef(null);
    const eyebrowLeftRef = useRef(null);
    const eyebrowCenterRef = useRef(null);
    const eyebrowRightRef = useRef(null);

    useLayoutEffect(() => {
        if (!loaded || !imgReady) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 800px)", () => {
                const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

                tl.from(h1Ref.current, { y: 16, autoAlpha: 0, duration: 0.8 });

                const eyebrows = [
                    eyebrowLeftRef,
                    eyebrowCenterRef,
                    eyebrowRightRef,
                ]
                    .map((r) => r.current)
                    .filter(Boolean);

                if (eyebrows.length > 0) {
                    tl.from(
                        eyebrows,
                        { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.15 },
                        "-=0.3",
                    );
                }
            });

            // mm.add("(max-width: 799px)", () => {});
        });

        return () => ctx.revert();
    }, [loaded, imgReady]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 800px)", () => {
                gsap.to(imgRef.current, {
                    yPercent: -2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            {...htmlProps}
            className={` goth_hero ${className ?? ""}`}
        >
            <ImageHolder
                className="goth_hero-img"
                img={{
                    ...img,
                    priority: true,
                    sizes: "100vw",
                    fill: true,
                    style: { objectFit: "cover" },
                    onLoad: () => setImgReady(true),
                }}
            />

            <div
                ref={imgRef}
                className="img-holder goth_hero-img"
                style={{
                    "--img-object-position": img.imgPositionResponsive?.desktop ?? "center",
                    "--img-object-position-mobile": img.imgPositionResponsive?.mobile ?? img.imgPositionResponsive?.desktop ?? "center",
                } as React.CSSProperties}
            >
                <Image
                    src={img.src}
                    alt={img.alt ?? ""}
                    className="img-bw"
                    priority={true}
                    sizes="100vw"
                    fill
                    style={{ objectFit: "cover" }}
                    onLoad={() => setImgReady(true)}
                />
                <div className="img-overlay"></div>
            </div>

            <div className="goth_hero-text">
                {eyebrows && (
                    <div className="goth_hero-text-eyebrow">
                        {eyebrows.left && (
                            <p
                                className="goth_hero-text-eyebrow-left"
                                ref={eyebrowLeftRef}
                                // style={{ visibility: "hidden" }}
                            >
                                <TextWithNewLine text={eyebrows.left} />
                            </p>
                        )}
                        {eyebrows.center && (
                            <p
                                className="goth_hero-text-eyebrow-center"
                                ref={eyebrowCenterRef}
                                // style={{ visibility: "hidden" }}
                            >
                                <TextWithNewLine text={eyebrows.center} />
                            </p>
                        )}
                        {eyebrows.right && (
                            <p
                                className="goth_hero-text-eyebrow-right"
                                ref={eyebrowRightRef}
                                // style={{ visibility: "hidden" }}
                            >
                                <TextWithNewLine text={eyebrows.right} />
                            </p>
                        )}
                    </div>
                )}

                <div
                    className="goth_hero-text-title"
                    ref={h1Ref}
                    // style={{ visibility: "hidden" }}
                >
                    {/* <h1 ref={alexUseFitText}>Alex</h1>
                        <p>&</p>
                        <h1 ref={maxUseFitText}>Max</h1> */}

                    <h1>
                        Alex <span>&</span> Max
                    </h1>
                </div>

                {/* <div
                    className="goth_hero-text-title"
                    ref={h1Ref}
                    // style={{ visibility: "hidden" }}
                >
                    <div className="goth_hero-text-title-desktop">
                        <h1 ref={alexUseFitText}>Alex</h1>
                        <p>&</p>
                        <h1>Max</h1>
                    </div>

                    <div className="goth_hero-text-title-mobile">
                        <h1>Alex</h1>
                        <div className="goth_hero-text-title-mobile-inner">
                            <p>&</p>
                            <h1>Max</h1>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
}
