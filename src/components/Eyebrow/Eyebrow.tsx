'use client'

import React, { forwardRef } from "react";

import { ColorVariables } from "../../types/colors";
import Diamond from "../Diamond/Diamond";

import "./Eyebrow.scss";

/**
 * Controls the visual layout and color treatment of the Eyebrow component.
 *
 * @property variation   - Layout mode: `left` (single column, left-aligned),
 *                         `center` (single column, centered), or `double`
 *                         (left and right copy).
 * @property color   - CSS variable token for the eyebrow label color.
 */
type EyebrowStyleProps = {
    /** Specifies layout variation. */
    variation: "left" | "center" | "double";
    /** CSS variable token for the eyebrow label color. */
    color?: ColorVariables;
    /** When true, adds bottom margin below the eyebrow. */
    includeMargin?: boolean;
};

const DEFAULT_STYLE = {
    variation: "left",
    color: "--gold-500",
    includeMargin: true,
} satisfies EyebrowStyleProps;

type EyebrowProps = {
    /** Additional class name applied to the eyebrow wrapper. */
    className?: string;
    /** Reference to the wrapper div. */
    ref?: React.Ref<HTMLDivElement>;
    /** Layout and color options. Defaults to left-aligned gold. */
    styleOptions?: EyebrowStyleProps;
    /** Primary label text. */
    text: string;
    /** Second label text, only rendered in the `double` variation. */
    doubleText?: string;
};

/**
 * Decorative section label rendered above headings.
 *
 * Renders one of three layouts based on `styleOptions.variation`:
 * - `left`   — diamond icon followed by text (default)
 * - `center` — text centered above a diamond divider line
 * - `double` — two text labels flanking a diamond divider line
 */
export default function Eyebrow({ styleOptions = DEFAULT_STYLE, text, doubleText, className, ref }: EyebrowProps) {
    const color: ColorVariables = styleOptions.color ?? DEFAULT_STYLE.color;

    if (styleOptions.variation == "center") {
        return (
            <CenterEyebrow text={text} color={color} includeMargin={styleOptions?.includeMargin ?? DEFAULT_STYLE.includeMargin} ref={ref} className={className ?? ''} />
        );
    } else if (styleOptions.variation == "double" && doubleText != null) {
        return (
            <DoubleEyebrow text={text} doubleText={doubleText} color={color} includeMargin={styleOptions?.includeMargin ?? DEFAULT_STYLE.includeMargin} ref={ref} className={className ?? ''} />
        );
    }

    return (
        <LeftEyebrow text={text} color={color} includeMargin={styleOptions?.includeMargin ?? DEFAULT_STYLE.includeMargin} ref={ref} className={className ?? ''} />
    );
}


// ---- Sub-components --------------------------------------------------------

function DiamondDivider({ color }: { color: ColorVariables }) {
    return (
        <div className="diamond_divider">
            <div className={`diamond_divider-underline`} style={{ backgroundColor: `var(${color})` }}></div>
            <Diamond
                size={{
                    size: {
                        minSize: 16,
                        desiredSize: 16,
                        maxSize: 20,
                    },
                    mobileSize: {
                        minSize: 14,
                        desiredSize: 16,
                        maxSize: 18,
                    },
                }}
                color={color}
            />
            <div className={`diamond_divider-underline`} style={{ backgroundColor: `var(${color})` }}></div>
        </div>
    );
}


function LeftEyebrow({text, color, includeMargin, ref, className}:{text:string, color: ColorVariables, includeMargin:boolean, ref?: React.Ref<HTMLDivElement>, className?:string}) {
    return (
        <div ref={ref} className={`eyebrow-wrapper left ${className ?? ""} ${includeMargin ? "eyebrow-margin" : ""}`}>
            <Diamond
                size={{
                    size: {
                        minSize: 18,
                        desiredSize: 20,
                        maxSize: 22,
                    },
                    mobileSize: {
                        minSize: 16,
                        desiredSize: 18,
                        maxSize: 20,
                    },
                }}
                color={color}
            />
            <p className="eyebrow" style={{ color: `var(${color})` }}>
                {text}
            </p>
        </div>
    );
}

function CenterEyebrow({text, color, includeMargin, ref, className}:{text:string, color: ColorVariables, includeMargin:boolean, ref?: React.Ref<HTMLDivElement>, className?:string}) {
    return (
        <div ref={ref} className={`eyebrow-wrapper eyebrow-center ${className ?? ""} ${includeMargin ? "eyebrow-margin" : ""}`}>
                <p className="eyebrow" style={{ color: `var(${color})` }}>
                    {text}
                </p>

                <DiamondDivider color={color} />
            </div>
    );
}

function DoubleEyebrow({text, doubleText, color, includeMargin, ref, className}:{text:string, doubleText:string, color: ColorVariables, includeMargin:boolean, ref?: React.Ref<HTMLDivElement>, className?:string}) {
    return (
        <div ref={ref} className={`eyebrow-wrapper eyebrow-double ${className ?? ""} ${includeMargin ? "eyebrow-margin" : ""}`}>
                <p className="eyebrow" style={{ color: `var(${color})` }}>
                    {text}
                </p>

                <DiamondDivider color={color} />

                <p className="eyebrow" style={{ color: `var(${color})` }}>
                    {doubleText}
                </p>
            </div>
    );
}
