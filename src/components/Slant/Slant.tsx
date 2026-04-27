import React from "react";

import { CalculateClamp } from "../../hooks/calculateClamp";
import { ColorVariables } from "../../types/colors";
import { ResponsiveClampSize } from "../../types/size";

import "./Slant.scss";

type SlantProps = {
    className?: string;
    color?: ColorVariables;
    size?: "small" | "large";
    inverseDirection?: boolean;
    order: "top" | "bottom";
};

export default function Slant({ className, color = "--black-900", size = "small", inverseDirection = false, order }: SlantProps) {
    let slantClass = `slant-${size} slant-${order}`;

    if (inverseDirection) {
        slantClass += ` slant-inverse`;
    }

    if (className) {
        slantClass += ` ${className}`
    }

    return (
        <div className={`slant-wrapper`}>
                <div className={`slant-inner ${slantClass}`} style={{backgroundColor: `var(${color})`}}></div>
            </div>
    );
}


// function LargeSlant({ color }: { color?: ColorVariables }) {
//     const fill = color ? `var(${color})` : "var(--black-900)";

//     return (
//         <svg className="large_slant" xmlns="http://www.w3.org/2000/svg" width="1440" height="221" viewBox="0 0 1440 221" fill="none">
//             <path d="M0 110.5L1440 0V221H0V110.5Z" fill={fill} />
//         </svg>
//     );
// }

// function SmallSlant({ color }: { color?: ColorVariables }) {
//     const fill = color ? `var(${color})` : "var(--black-900)";

//     return (
//         <svg className="small_slant" xmlns="http://www.w3.org/2000/svg" width="1440" height="111" viewBox="0 0 1440 111" fill="none">
//             <path d="M0 55.25L1440 0V110.5H0V55.25Z" fill="#1F2121" />
//         </svg>
//     );
// }