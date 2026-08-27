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
import { cn } from "@/utils/cn";

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

const BUTTON_STYLE = {
    colorScheme: "cream" as const,
    variation: "outline" as const,
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
                defaults: { ease: "power2.out", duration: 0.5 },
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
                <h2 ref={fitTextRef}>{watermarkText}</h2>
            </div>

            {captions && (
                <div className="watermark_text-captions">
                    {captions.left && <WatermarkCaption {...captions.left} />}
                    {captions.center && (
                        <WatermarkCaption {...captions.center} />
                    )}
                    {captions.right && <WatermarkCaption {...captions.right} />}
                </div>
            )}
        </div>
    );
}

type WatermarkCaptionProps = Caption & WithHTMLProps;

function WatermarkCaption({
    lines,
    button,
    ref,
    className,
    ...htmlProps
}: WatermarkCaptionProps) {
    return (
        <div
            {...htmlProps}
            ref={ref}
            className={cn(
                "flex flex-col justify-between gap-200 md:gap-(--layout-column-gutter) flex-1 border-b border-[#666765] pb-400 md:border-0 md:pb-0 last-of-type:pb-0 last-of-type:border-0",
                className,
            )}
        >
            <div className="watermark_text-caption-lines flex-1 h-full justify-end">
                {lines.map((l, idx) => (
                    <p className="watermark_text-caption-line" key={idx}>
                        {l}
                    </p>
                ))}
            </div>

            {button && (
                <Button
                    className="watermark_text-caption-btn"
                    btnSettings={button}
                    colorScheme={BUTTON_STYLE.colorScheme}
                    variant={BUTTON_STYLE.variation}
                />
            )}
        </div>
    );
}
