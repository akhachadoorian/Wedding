"use client";

import { WithHTMLProps } from "../../types/props";

import mergeRefs from "@/hooks/mergeRefs";
import TextWithNewLine from "@/utils/TextWithNewLine";
import { useFitText } from "@/hooks/useFitText";
import { useEffect, useLayoutEffect, useRef } from "react";
import "./WatermarkText.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonSettingProps } from "@/types/buttons";
import { NonEmptyArray } from "@/types/utility";
import Button from "../Buttons/Button";
import { useFitLongestWord } from "@/hooks/useFitLongestWord";

gsap.registerPlugin(ScrollTrigger);

type Caption = {
    lines: NonEmptyArray<string>;
    button?: ButtonSettingProps;
};

export type WatermarkTextProps = WithHTMLProps & {
    watermarkText: string;
    subheader?: string;
    captions?: {
        left?: Caption;
        center?: Caption;
        right?: Caption;
    };
};

export default function WatermarkText({
    watermarkText,
    subheader,
    captions,

    className,
    ref,
    ...htmlProps
}: WatermarkTextProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const subheaderRef = useRef<HTMLHeadingElement>(null);
    const watermarkTextRef = useRef<HTMLDivElement>(null);
    const fitTextRef = useFitText<HTMLHeadingElement>();
    // const fitLongestWord = useFitLongestWord<HTMLHeadingElement>();
    // const parallaxRef = useRef<HTMLDivElement>(null);
    const captionLeftRef = useRef<HTMLParagraphElement>(null);
    const captionCenterRef = useRef<HTMLParagraphElement>(null);
    const captionRightRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power2.out", duration: 0.8 },
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            if (subheaderRef.current) {
                tl.fromTo(
                    subheaderRef.current,
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0 },
                );
            }

            if (watermarkTextRef.current) {
                tl.fromTo(
                    watermarkTextRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0 },
                    subheaderRef.current ? "-=0.4" : 0,
                );
            }

            const captionEls = [
                captionLeftRef,
                captionCenterRef,
                captionRightRef,
            ]
                .map((r) => r.current)
                .filter(Boolean);

            if (captionEls.length > 0) {
                tl.fromTo(
                    captionEls,
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, stagger: 0.15 },
                    "-=0.3",
                );
            }
        }, el);

        return () => ctx.revert();
    }, []);

    // useEffect(() => {
    //     const el = parallaxRef.current;
    //     if (!el) return;

    //     const ctx = gsap.context(() => {
    //         const mm = gsap.matchMedia();
    //         mm.add("(min-width: 800px)", () => {
    //             gsap.fromTo(el,
    //                 { y: 0 },
    //                 {
    //                     y: 30,
    //                     ease: "none",
    //                     scrollTrigger: {
    //                         trigger: el,
    //                         start: "top bottom",
    //                         end: "bottom top",
    //                         scrub: true,
    //                     },
    //                 }
    //             );
    //         });
    //     });

    //     return () => ctx.revert();
    // }, []);

    return (
        <div
            {...htmlProps}
            ref={mergeRefs(ref, wrapperRef)}
            className={`watermark_text ${className ?? ""}`}
        >
            {subheader && (
                <h3 className="watermark_text-subheader" ref={subheaderRef}>
                    {subheader}
                </h3>
            )}

            <div className="watermark_text-title" ref={watermarkTextRef}>
                    <h2 ref={fitTextRef}>October 31st</h2>
            </div>

            {captions && (
                <div className="watermark_text-captions">
                    {captions.left && (
                        <div
                            className="watermark_text-captions-left  watermark_text-caption"
                            ref={captionLeftRef}
                        >
                            <div className="watermark_text-caption-lines">
                                {captions.left.lines.map((l, idx) => (
                                    <p
                                        className="watermark_text-caption-line"
                                        key={idx}
                                    >
                                        {l}
                                    </p>
                                ))}
                            </div>

                            {captions.left.button && (
                                <Button
                                    className="watermark_text-caption-btn"
                                    btnSettings={captions.left.button}
                                    colorScheme="black"
                                    variant="solid"
                                />
                            )}
                        </div>
                    )}
                    {captions.center && (
                        <div
                            className="watermark_text-captions-center  watermark_text-caption"
                            ref={captionCenterRef}
                        >
                            <div className="watermark_text-caption-lines">
                                {captions.center.lines.map((l, idx) => (
                                    <p
                                        className="watermark_text-caption-line"
                                        key={idx}
                                    >
                                        {l}
                                    </p>
                                ))}
                            </div>

                            {captions.center.button && (
                                <Button
                                    className="watermark_text-caption-btn"
                                    btnSettings={captions.center.button}
                                    colorScheme="black"
                                    variant="solid"
                                />
                            )}
                        </div>
                    )}
                    {captions.right && (
                        <div
                            className="watermark_text-captions-right  watermark_text-caption"
                            ref={captionRightRef}
                        >
                            <div className="watermark_text-caption-lines">
                                {captions.right.lines.map((l, idx) => (
                                    <p
                                        className="watermark_text-caption-line"
                                        key={idx}
                                    >
                                        {l}
                                    </p>
                                ))}
                            </div>

                            {captions.right.button && (
                                <Button
                                    className="watermark_text-caption-btn"
                                    btnSettings={captions.right.button}
                                    colorScheme="black"
                                    variant="solid"
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
