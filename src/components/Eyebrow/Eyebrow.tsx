import { forwardRef } from "react";

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
    /** t */
    color?: ColorVariables;
};

const DEFAULT_STYLE = {
    variation: "left",
    color: "--gold-500",
} satisfies EyebrowStyleProps;


/** */
type EyebrowProps = {
    /** Additional class name applied to the eyebrow wrapper. */
    className?: string;
    /** Reference to the element. */
    ref?: React.Ref<HTMLDivElement>;

    /** */
    styleOptions?: EyebrowStyleProps;

    /**  */
    text: string;
    /** */
    doubleText?: string;
    
};

export default function Eyebrow({styleOptions = DEFAULT_STYLE, text, doubleText, className, ref }: EyebrowProps) {
    const color: ColorVariables = styleOptions.color ?? DEFAULT_STYLE.color;


    if (styleOptions.variation == "center") {
        return (
            <div ref={ref} className={`eyebrow-wrapper centered ${className ?? ""}`}>
                <p className="eyebrow" style={{ color: `var(${color})` }}>
                    {text}
                </p>
                <div className="diamond_underline-wrapper">
                    <div className={`diamond_underline`} style={{ backgroundColor: `var(${color})` }}></div>
                    <Diamond
                        size={{
                            size: {
                                minSize: 16,
                                desiredSize: 16,
                                maxSize: 20,
                            },
                        }}
                        color={color }
                    />
                    <div className={`diamond_underline`} style={{ backgroundColor: `var(${color})` }}></div>
                </div>
            </div>
        );
    } else if (styleOptions.variation == "double" && doubleText != null) {
        return (
            <div ref={ref} className={`eyebrow-wrapper double ${className ?? ""}`}>
                <p className="eyebrow" style={{ color: `var(${color})` }}>
                    {text}
                </p>
                <div className="diamond_underline-wrapper">
                    <div className={`diamond_underline`} style={{ backgroundColor: `var(${color})` }}></div>
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
                    <div className={`diamond_underline`} style={{ backgroundColor: `var(${color})` }}></div>
                </div>
                <p className="eyebrow" style={{ color: `var(${color})` }}>
                    {doubleText}
                </p>
            </div>
        );
    }

    return (
        <div ref={ref} className={`eyebrow-wrapper left ${className ?? ""}`}>
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
