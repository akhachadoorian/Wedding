"use client";

import React, { forwardRef } from "react";

import { ColorVariables } from "../../types/colors";
import Diamond from "../Diamond/Diamond";

import "./Eyebrow.scss";
import { WithHTMLProps } from "@/types/props";
import Star from "@/icons/Star";

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
    includeStar?: boolean;
    /** CSS variable token for the eyebrow label color. */
    starColor?: ColorVariables;
};

const DEFAULT_STYLE = {
    variation: "left",
    color: "--cream",
    includeMargin: true,
    includeStar: true,
    starColor: '--wine-600'
} satisfies EyebrowStyleProps;

type EyebrowProps = WithHTMLProps & {
    /** Reference to the wrapper div. */
    ref?: React.Ref<HTMLDivElement>;
    /** Layout and color options. Defaults to left-aligned gold. */
    styleOptions?: EyebrowStyleProps;
    /** Primary label text. */
    text: string;
    /** Second label text, only rendered in the `double` variation. */
    doubleText?: string;
};

// export default function Eyebrow({
//     styleOptions = DEFAULT_STYLE,
//     text,
//     className,
//     ...htmlProps
// }: EyebrowProps) {
//     const color: ColorVariables = styleOptions.color ?? DEFAULT_STYLE.color;

//     // return (
//     //     <div
//     //         {...htmlProps}
//     //         className={`eyebrow-component left ${className ?? ""} ${styleOptions.includeMargin ? "eyebrow-margin" : ""}`}
//     //     >
//     //         <p className="eyebrow" style={{ color: `var(${color})` }}>
//     //             {text}
//     //         </p>
//     //     </div>
//     // );

//     return (
//         <div
//             {...htmlProps}
//             className={`eyebrow-component ${className ?? ""} ${styleOptions.includeMargin ? "eyebrow-margin" : ""}`}
//         >
//             <Star color="--wine-600" />
//             <p className="eyebrow" style={{ color: `var(${color})` }}>
//                 {text}
//             </p>
//         </div>
//     );
// }


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
            <CenterEyebrow text={text} color={color} includeMargin={styleOptions?.includeMargin ?? DEFAULT_STYLE.includeMargin} ref={ref} className={className ?? ''} includeStar={styleOptions?.includeStar ?? DEFAULT_STYLE.includeStar} starColor={styleOptions?.starColor ?? DEFAULT_STYLE.starColor} />
        );
    } 
    else if (styleOptions.variation == "double" && doubleText != null) {
        return (
            <DoubleEyebrow text={text} doubleText={doubleText} color={color} includeMargin={styleOptions?.includeMargin ?? DEFAULT_STYLE.includeMargin} ref={ref} className={className ?? ''} includeStar={styleOptions?.includeStar ?? DEFAULT_STYLE.includeStar} starColor={styleOptions?.starColor ?? DEFAULT_STYLE.starColor} />
        );
    }

    return (
        <LeftEyebrow text={text} color={color} includeMargin={styleOptions?.includeMargin ?? DEFAULT_STYLE.includeMargin} ref={ref} className={className ?? ''} includeStar={styleOptions?.includeStar ?? DEFAULT_STYLE.includeStar} starColor={styleOptions?.starColor ?? DEFAULT_STYLE.starColor} />
    );
}

// ---- Sub-components --------------------------------------------------------

function DiamondDivider({ color }: { color: ColorVariables }) {
    return (
        <div className="diamond_divider">
            <div
                className={`diamond_divider-underline`}
                style={{ backgroundColor: `var(${color})` }}
            ></div>
            {/* <Diamond
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
            /> */}
            <div
                className={`diamond_divider-underline`}
                style={{ backgroundColor: `var(${color})` }}
            ></div>
        </div>
    );
}

type SubEyebrowProps = {
    text: string;
    color: ColorVariables;
    includeMargin: boolean;
    includeStar?: boolean;
    starColor: ColorVariables;

    ref?: React.Ref<HTMLDivElement>;
    className?: string;
}

function LeftEyebrow({
    text,
    color,
    includeMargin,
    includeStar,
    starColor,
    ref,
    className,
}: SubEyebrowProps) {
    return (
        <div
            ref={ref}
            className={`eyebrow-component left ${className ?? ""} ${includeMargin ? "eyebrow-margin" : ""}`}
        >
            {/* <Diamond
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
            /> */}
            {includeStar && <Star color={starColor} />}
            <p className="eyebrow" style={{ color: `var(${color})` }}>
                {text}
            </p>
        </div>
    );
}

function CenterEyebrow({
    text,
    color,
    includeMargin,
    includeStar,
    starColor,
    ref,
    className,
}:SubEyebrowProps) {
    return (
        <div
            ref={ref}
            className={`eyebrow-component eyebrow-center ${className ?? ""} ${includeMargin ? "eyebrow-margin" : ""}`}
        >
            {includeStar && <Star color={starColor} />}

            <p className="eyebrow" style={{ color: `var(${color})` }}>
                {text}
            </p>

           {includeStar && <Star color={starColor} />}
        </div>
    );
}

function DoubleEyebrow({
    text,
    doubleText,
    color,
    includeMargin,
    includeStar,
    starColor,
    ref,
    className,
}:SubEyebrowProps & {doubleText: string}) {
    return (
        <div
            ref={ref}
            className={`eyebrow-wrapper eyebrow-double ${className ?? ""} ${includeMargin ? "eyebrow-margin" : ""}`}
        >
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
