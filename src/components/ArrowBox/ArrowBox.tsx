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
};


export default function ArrowBox({ color = "--cream-500", arrowDirection = "top-right" }: ArrowBoxProps) {
    const Arrow = ARROW_MAP[arrowDirection];

    const resolvedColor = color ? CssColor.resolve(color) : CssColor.of("--cream-500");


    return (
        <div className="arrow_box-wrapper" style={{ borderColor: resolvedColor.toCssVar() }}>
            <div className={`arrow_box-inner`}>
                <div className={`arrow_box-grid ${arrowDirection}`}>
                    <div className="arrow start">
                        <Arrow color={resolvedColor.toCssVar()} size={16} />
                    </div>

                    <div className="arrow end">
                        <Arrow color={resolvedColor.toCssVar()} size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}
