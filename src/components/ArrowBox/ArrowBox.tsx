import React from "react";

import "./ArrowBox.scss";
import { ArrowUpIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { ColorVariables } from "../../types/colors";

type ArrowBoxProps = {
    color?: ColorVariables;
};

export default function ArrowBox({ color = "--cream-500" }: ArrowBoxProps) {
    return (
        <div className="arrow_box-wrapper" style={{borderColor: `var(${color})`}}>
            <div className="arrow_box-inner">
                <div className="arrow_box-grid">
                <div className="arrow start">
                   <ArrowUpRightIcon color={`var(${color})`} size={16} />
                </div>

                <div className="arrow end">
                   <ArrowUpRightIcon fill={`var(${color})`} size={16} />
                </div>
                </div>
            </div>
        </div>
    );
}

// export default function ArrowBox({ color }: ArrowBoxProps) {
//     return (
//         <div className="arrow-wrapper">
//             <div className="arrow-inner"></div>
//         </div>
//     );
// }
