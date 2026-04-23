import React from "react";

import { ColorVariables } from "../../types/colors";
import { ArrowUpIcon, ArrowDownIcon, ArrowUpRightIcon, ArrowRightIcon, ArrowLeftIcon, ArrowUpLeftIcon, ArrowDownLeftIcon, ArrowDownRightIcon } from "@phosphor-icons/react";

import "./ArrowBox.scss";

export type ARROW_DIRECTIONS = 'up' | 'down' | 'right' | 'left' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

type ArrowBoxProps = {
    arrowDirection?: ARROW_DIRECTIONS;
    color?: ColorVariables;
};

export default function ArrowBox({ color = "--cream-500", arrowDirection = "top-right" }: ArrowBoxProps) {
    const arrowMap = {
        'up': ArrowUpIcon,
        'down': ArrowDownIcon,
        right: ArrowRightIcon,
        left: ArrowLeftIcon,
        "top-right": ArrowUpRightIcon,
        "top-left": ArrowUpLeftIcon,
        'bottom-right': ArrowDownRightIcon,
        'bottom-left': ArrowDownLeftIcon,
    } satisfies Record<ARROW_DIRECTIONS, React.ElementType>;
    const Arrow = arrowMap[arrowDirection];

    return (
        <div className="arrow_box-wrapper" style={{ borderColor: `var(${color})` }}>
            <div className={`arrow_box-inner`}>
                <div className={`arrow_box-grid ${arrowDirection}`}>
                    <div className="arrow start">
                        <Arrow color={`var(${color})`} size={16} />
                    </div>

                    <div className="arrow end">
                        <Arrow color={`var(${color})`} size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}
