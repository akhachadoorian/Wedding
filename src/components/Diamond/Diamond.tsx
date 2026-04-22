import React from "react";

import { ColorVariables } from "../../types/colors";
import './Diamond.scss';
import { ResponsiveSize } from "../../types/size";

type DiamondProps = {
    color: ColorVariables;
    size?: ResponsiveSize;
    className?: string;
};

const desktopSize = 1440;

export default function Diamond({ color = "--gold-500", size = {size: {minSize: 16, desiredSize: 16, maxSize: 20}}, className }: DiamondProps) {
    // Setup consts
    const desktopScreenSize = 1440;
    const mobileScreenSize = 375;

    const desktopSize = size.size;
    const mobileSize = size.mobileSize? size.mobileSize : size.size;

    // Do view width calculations
    let dVW = (desktopSize.desiredSize / desktopScreenSize) * 100;
    let mVW = (mobileSize.desiredSize / mobileScreenSize) * 100 ;

    // let sizeVW = `${dVW}dvw`;
    let sizeVW = `clamp(${desktopSize.minSize}px, ${dVW.toFixed(3)}dvw, ${desktopSize.maxSize}px)`;
    let mobileSizeVW = `clamp(${mobileSize.minSize}px, ${mVW.toFixed(3)}dvw, ${mobileSize}px)`;

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
