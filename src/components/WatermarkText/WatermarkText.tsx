"use client";

import { WithHTMLProps } from "../../types/props";

import mergeRefs from "@/hooks/mergeRefs";
import { ButtonSettingProps } from "@/types/buttons";
import { NonEmptyArray } from "@/types/utility";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import Button from "../Buttons/Button";
import "./WatermarkText.scss";
import { useFitHeadline } from "@/hooks/useFitHeadline";
import ColumnRow from "../ColumnRow";
import { ColumnProps } from "../Column";

type Caption = {
    lines: NonEmptyArray<string>;
    button?: ButtonSettingProps;
};

export type WatermarkTextProps = WithHTMLProps & {
    watermarkText: string;
    subheader?: string;
    captions?: {
        left?: ColumnProps;
        center?: ColumnProps;
        right?: ColumnProps;
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
    // const fitLongestWord = useFitLongestWord<HTMLHeadingElement>();
    // const parallaxRef = useRef<HTMLDivElement>(null);
    const captionLeftRef = useRef<HTMLParagraphElement>(null);
    const captionCenterRef = useRef<HTMLParagraphElement>(null);
    const captionRightRef = useRef<HTMLParagraphElement>(null);

    const { containerRef, textRef, headlineStyle } = useFitHeadline();

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

            <div
                className="watermark_text-title"
                ref={mergeRefs(watermarkTextRef, containerRef)}
            >
                <h2 ref={textRef} style={headlineStyle}>
                    {watermarkText}
                </h2>
            </div>

            {captions && (
                <ColumnRow
                    columnOne={{ ...captions.left, orientation: "center" }}
                    columnTwo={{ ...captions.center, orientation: "center" }}
                    columnThree={{ ...captions.right, orientation: "center" }}
                />
            )}
        </div>
    );
}
