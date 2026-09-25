"use client";

import { WithHTMLProps } from "../../types/props";

import ImageHolder from "@/components/ImageHolder/ImageHolder";
import { DEFAULT_IMAGE } from "@/data/defaultImage";
import { CustomImageProps } from "@/types/images";
import TextWithNewLine from "@/utils/TextWithNewLine";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { useFitHeadline } from "@/hooks/useFitHeadline";
import mergeRefs from "@/hooks/mergeRefs";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

const HERO_HEIGHT = "h-[calc(100svh+var(--space-400))]";

const EYEBROW_TEXT =
    "font-sans text-xs font-normal leading-[140%] tracking-[1px] uppercase md:text-md md:tracking-[2px]";

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

    const { containerRef, textRef, headlineStyle } = useFitHeadline({
        lineMode: "single",
    });

    return (
        <section
            ref={sectionRef}
            {...htmlProps}
            className={cn("relative flex items-end w-dvw overflow-hidden min-h-[calc(100svh+var(--space-400))]", className)}
        >
            <ImageHolder
                className={cn("absolute! z-1 w-full", HERO_HEIGHT)}
                ref={imgRef}
                img={{
                    ...img,
                    priority: true,
                    sizes: "100vw",
                    fill: true,
                    style: { objectFit: "cover" },
                    onLoad: () => setImgReady(true),
                }}
            />

            <div className="relative z-5 w-dvw overflow-hidden pt-200 pb-400 px-col-margin bg-[linear-gradient(180deg,rgba(16,17,17,0)_12.02%,rgba(16,17,17,0.6)_47.12%)]">
                {eyebrows && (
                    <div className="flex justify-between gap-col-gutter mx-auto mb-400 md:max-w-container md:mb-700">
                        {eyebrows.left && (
                            <p
                                className={cn(EYEBROW_TEXT, "text-left md:invisible")}
                                ref={eyebrowLeftRef}
                                // style={{ visibility: "hidden" }}
                            >
                                <TextWithNewLine text={eyebrows.left} />
                            </p>
                        )}
                        {eyebrows.center && (
                            <p
                                className={cn(EYEBROW_TEXT, "text-center md:invisible")}
                                ref={eyebrowCenterRef}
                                // style={{ visibility: "hidden" }}
                            >
                                <TextWithNewLine text={eyebrows.center} />
                            </p>
                        )}
                        {eyebrows.right && (
                            <p
                                className={cn(EYEBROW_TEXT, "text-right md:invisible")}
                                ref={eyebrowRightRef}
                                // style={{ visibility: "hidden" }}
                            >
                                <TextWithNewLine text={eyebrows.right} />
                            </p>
                        )}
                    </div>
                )}

                <div
                    // className="goth_hero-text-title"
                    ref={mergeRefs(h1Ref, containerRef)}
                    // style={{ visibility: "hidden" }}
                >
                    {/* <h1 ref={alexUseFitText}>Alex</h1>
                        <p>&</p>
                        <h1 ref={maxUseFitText}>Max</h1> */}

                    <h1 ref={textRef} style={headlineStyle}>
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
