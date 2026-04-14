import React from "react";

import "./Eyebrow.scss";
import { ColorVariables } from "../../types/colors";
import Diamond from "../Diamond/Diamond";

type EyebrowProps = {
    variation: "left" | "centered" | "double"
    color: ColorVariables
    text: string
    doubleText?: string
};

function Eyebrow({ variation = "left", color = "--gold-500", text, doubleText }: EyebrowProps) {
    
    
    if (variation == "centered") {
        return (
            <div className={`eyebrow-wrapper centered`}>
                <p className="eyebrow" style={{color: `var(${color})`}}>{text}</p>
                <div className="diamond_underline-wrapper">
                    <div className={`diamond_underline`} style={{backgroundColor: `var(${color})`}}></div>
                    <Diamond size="16px" color={color} />
                    <div className={`diamond_underline`} style={{backgroundColor: `var(${color})`}}></div>
                </div>
            </div>
        );
    } else if (variation == "double" && doubleText != null) {
        return (
            <div className={`eyebrow-wrapper double`}>
                <p className="eyebrow" style={{color: `var(${color})`}}>{text}</p>
                <Diamond size="16px" color={color} />
                <p className="eyebrow" style={{color: `var(${color})`}}>{doubleText}</p>
            </div>
        )
    }

    return (
        <div className={`eyebrow-wrapper left`}>
            <Diamond size="20px" mobileSize="18px" color={color} />
            <p className="eyebrow" style={{color: `var(${color})`}}>{text}</p>
        </div>
    );
}

export default Eyebrow;
