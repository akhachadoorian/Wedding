'use client'

import { PropsWithChildren } from "react";

import generateSectionClass from "../hooks/generateSectionClass";
import { ColorVariables } from "../types/colors";
import { WithHTMLProps } from "../types/props";

import { cn } from "@/utils/cn";

type SlantedSectionProps = WithHTMLProps &
    PropsWithChildren & {
        fill?: ColorVariables;
        slantSettings?: {
            depth?: "small" | "large";
            flipped?: boolean;
        };

        sectionPrefix?: string;
    };

export default function SlantedSection({
    fill = "--black-900",
    slantSettings,

    sectionPrefix,

    children,
    id,
    className,
    ...htmlProps
}: SlantedSectionProps) {
    const outerClass =
        className && sectionPrefix ? generateSectionClass({ sectionPrefix: sectionPrefix, className: className }) : className ? className : sectionPrefix ? `${sectionPrefix}-section` : "";

    return (
        <section {...htmlProps} id={id ? id : sectionPrefix ? sectionPrefix : ""} className={cn("relative", outerClass)}>
            <Slant fill={fill} edge="top" {...slantSettings} className="-mb-1" />

            <div className="px-col-margin py-section-padding" style={{ backgroundColor: `var(${fill})` }}>
                <div className={cn("md:max-w-container md:mx-auto", sectionPrefix)}>
                    {children}
                </div>
            </div>

            <Slant fill={fill} edge="bottom" {...slantSettings} className="-mt-1" />
        </section>
    );
}

const SLANT_DEPTH: Record<"small" | "large", string> = {
    small: "aspect-[821/63]",
    large: "aspect-[619/95]",
};

// Bottom slants mirror vertically; a flipped slant mirrors horizontally (bottom + flipped cancels out the horizontal mirror)
const SLANT_TRANSFORM: Record<"top" | "bottom", Record<"default" | "flipped", string>> = {
    top: { default: "", flipped: "-scale-x-100" },
    bottom: { default: "-scale-x-100 -scale-y-100", flipped: "-scale-y-100" },
};

type SlantProps = {
    // props: PropsWithChildren;
    fill?: ColorVariables;
    edge: "top" | "bottom";
    depth?: "small" | "large";
    flipped?: boolean;
    className?: string;
};

function Slant({
    // props,
    edge,
    fill = "--black-900",
    depth = "small",
    flipped = false,
    className
}: SlantProps) {
    return (
        <div
            className={cn(
                "w-full h-full [clip-path:polygon(0_80%,100%_0,100%_100%,0%_100%)]",
                SLANT_DEPTH[depth],
                SLANT_TRANSFORM[edge][flipped ? "flipped" : "default"],
                className,
            )}
            style={{ backgroundColor: `var(${fill})` }}
        ></div>
    );

    // return <div className={`slant slant-${depth} slant-${edge} ${flipped ? "slant-flipped" : ""}`} style={{ backgroundColor: `var(${fill})` }} />;
}
