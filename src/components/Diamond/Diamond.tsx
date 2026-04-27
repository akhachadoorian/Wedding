import React from "react";

import { ColorVariables } from "../../types/colors";
import './Diamond.scss';
import { ResponsiveClampSize } from "../../types/size";
import { CalculateClamp } from "../../hooks/calculateClamp";

type DiamondProps = {
    color: ColorVariables;
    size?: ResponsiveClampSize;
    className?: string;
};

export default function Diamond({ color = "--gold-500", size = {size: {minSize: 16, desiredSize: 16, maxSize: 20}}, className }: DiamondProps) {
    // Convert sizes
    let sizeVW = CalculateClamp({size:size.size, mobile:false});
    let mobileSizeVW = CalculateClamp({size: size.mobileSize ? size.mobileSize : size.size, mobile: true});

    const sizeStyle = {
        "--diamond-size": sizeVW,
        "--diamond-mobile-size": mobileSizeVW,
    } as React.CSSProperties;

    return (
        <div className={`diamond-wrapper ${className ?? ""}`} style={sizeStyle}>
            
            <svg className="diamond" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                <path d="M11.707 0.707153L22.707 11.7072L11.707 22.7072L0.707031 11.7072L11.707 0.707153Z" stroke={`var(${color})`} />
                <path opacity="0.6" d="M11.707 6.20715L17.207 11.7072L11.707 17.2072L6.20703 11.7072L11.707 6.20715Z" fill={`var(${color})`} />
            </svg>
        </div>
    );
}
