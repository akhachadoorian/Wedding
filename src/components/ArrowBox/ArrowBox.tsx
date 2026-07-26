'use client'

import React from "react";

import { ColorVariables } from "../../types/colors";
import { ArrowUpIcon, ArrowDownIcon, ArrowUpRightIcon, ArrowRightIcon, ArrowLeftIcon, ArrowUpLeftIcon, ArrowDownLeftIcon, ArrowDownRightIcon } from "@phosphor-icons/react";

import "./ArrowBox.scss";
import { CssColor } from "../../classes/CssColor";

const ARROW_MAP = {
    up: ArrowUpIcon,
    down: ArrowDownIcon,
    right: ArrowRightIcon,
    left: ArrowLeftIcon,
    "top-right": ArrowUpRightIcon,
    "top-left": ArrowUpLeftIcon,
    'bottom-right': ArrowDownRightIcon,
    'bottom-left': ArrowDownLeftIcon,
} as const;

export type ArrowDirectionProps = keyof typeof ARROW_MAP;

type ArrowBoxProps = {
    arrowDirection?: ArrowDirectionProps;
    color?: ColorVariables | CssColor;
    /** Color the arrow (and its box border) transitions to when an ancestor with `:hover` sets it. @default same as `color`, i.e. no change */
    hoverColor?: ColorVariables | CssColor;
};


export default function ArrowBox({ color = "--cream-500", hoverColor, arrowDirection = "top-right" }: ArrowBoxProps) {
    const Arrow = ARROW_MAP[arrowDirection];

    const resolvedColor = color ? CssColor.resolve(color) : CssColor.of("--cream-500");
    const resolvedHoverColor = hoverColor ? CssColor.resolve(hoverColor) : resolvedColor;

    // Named "-base"/"-hover" (not "--arrow-color" itself) so the hover swap, done in
    // Button.scss via a stylesheet rule on `--arrow-color`, isn't shadowed by this
    // inline style — inline styles always beat stylesheet rules, :hover included.
    const wrapperStyle = {
        "--arrow-color-base": resolvedColor.toCssVar(),
        "--arrow-color-hover": resolvedHoverColor.toCssVar(),
    } as React.CSSProperties;

    return (
        <div className="arrow_box-wrapper" style={wrapperStyle}>
            <div className={`arrow_box-inner`}>
                <div className={`arrow_box-grid ${arrowDirection}`}>
                    <div className="arrow start">
                        <Arrow color="var(--arrow-color)" size={16} />
                    </div>

                    <div className="arrow end">
                        <Arrow color="var(--arrow-color)" size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}
