"use client";

import mergeRefs from "@/hooks/mergeRefs";
import { useFitHeadline } from "@/hooks/useFitHeadline";
import { WithHTMLProps } from "@/types/props";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ColumnProps } from "./Column";
import ColumnRow from "./ColumnRow";

export type WatermarkTextProps = WithHTMLProps & {
    watermarkText: string;
    subheader?: string;
    captions?: {
        left?: ColumnProps;
        center?: ColumnProps;
        right?: ColumnProps;
    };
};

/** Captions are always center-aligned, whatever orientation they were given. */
const centered = (column?: ColumnProps): ColumnProps | undefined =>
    column && { ...column, orientation: "center" };

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
    const watermarkRef = useRef<HTMLDivElement>(null);

    const { containerRef, textRef, headlineStyle, ready } = useFitHeadline({
        safetyMargin: 0.9,
    });

    // Captions fade in on their own via ColumnRow's useFadeInChildren.
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

            tl.fromTo(
                watermarkRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0 },
                subheaderRef.current ? "-=0.4" : 0,
            );
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <div
            {...htmlProps}
            ref={mergeRefs(ref, wrapperRef)}
            className={cn(
                "relative overflow-hidden flex flex-col gap-400",
                className,
            )}
        >
            {subheader && (
                <h3
                    ref={subheaderRef}
                    // `!` on the type styles beats the global `h3` heading rule.
                    className="text-cream uppercase tracking-[1.08px] text-center font-sans! font-semibold! leading-[120%]! text-md! md:text-xl!"
                >
                    {subheader}
                </h3>
            )}

            <div ref={mergeRefs(watermarkRef, containerRef)}>
                <h2
                    ref={textRef}
                    style={headlineStyle}
                    className="text-[color:var(--wine-650)] text-center md:whitespace-nowrap"
                >
                    {ready && watermarkText}
                </h2>
            </div>

            {captions && (
                <ColumnRow
                    columnOne={centered(captions.left)}
                    columnTwo={centered(captions.center)}
                    columnThree={centered(captions.right)}
                />
            )}
        </div>
    );
}
