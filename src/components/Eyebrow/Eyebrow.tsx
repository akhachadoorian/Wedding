import { forwardRef } from "react";

import { ColorVariables } from "../../types/colors";
import Diamond from "../Diamond/Diamond";

import "./Eyebrow.scss";

type EyebrowProps = {
    variation?: "left" | "centered" | "double";
    color?: ColorVariables;
    text: string;
    doubleText?: string;
    className?: string;
    ref?: React.Ref<HTMLDivElement>;
};

export default function Eyebrow({ variation = "left", color = "--gold-500", text, doubleText, className, ref}:EyebrowProps) {
    if (variation == "centered") {
        return (
            <div ref={ref} className={`eyebrow-wrapper centered ${className}`}>
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
                        color={color}
                    />
                    <div className={`diamond_underline`} style={{ backgroundColor: `var(${color})` }}></div>
                </div>
            </div>
        );
    } else if (variation == "double" && doubleText != null) {
        return (
            <div ref={ref} className={`eyebrow-wrapper double`}>
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
        <div ref={ref} className={`eyebrow-wrapper left`}>
            <Diamond size={{
                            size: {
                                minSize: 18,
                                desiredSize: 20,
                                maxSize: 22,
                            },
                            mobileSize: {
                                minSize: 16,
                                desiredSize: 18,
                                maxSize: 20,
                            }
                        }} color={color} />
            <p className="eyebrow" style={{ color: `var(${color})` }}>
                {text}
            </p>
        </div>
    );
};