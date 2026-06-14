'use client'

import { PropsWithChildren } from "react";

import generateSectionClass from "../../hooks/generateSectionClass";
import { ColorVariables } from "../../types/colors";
import { WithHTMLProps } from "../../types/props";

import "./SlantedSection.scss";

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
        <section {...htmlProps} id={id ? id : sectionPrefix ? sectionPrefix : ""} className={`slanted-section ${outerClass}`}>
            <Slant fill={fill} edge="top" {...slantSettings} />

            <div className="slanted-wrapper" style={{ backgroundColor: `var(${fill})` }}>
                <div className={`slanted ${sectionPrefix ?? ""}`} >
                    {children}
                </div>
            </div>

            <Slant fill={fill} edge="bottom" {...slantSettings} />
        </section>
    );
}

type SlantProps = {
    // props: PropsWithChildren;
    fill?: ColorVariables;
    edge: "top" | "bottom";
    depth?: "small" | "large";
    flipped?: boolean;
};

function Slant({
    // props,
    edge,
    fill = "--black-900",
    depth = "small",
    flipped = false,
}: SlantProps) {
    return <div className={`slant slant-${depth} slant-${edge} ${flipped ? "slant-flipped" : ""}`} style={{ backgroundColor: `var(${fill})` }} />;
}
