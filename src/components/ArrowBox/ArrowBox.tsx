'use client'

import React from "react";

import { ColorVariables } from "../../types/colors";
import { ArrowUpIcon, ArrowDownIcon, ArrowUpRightIcon, ArrowRightIcon, ArrowLeftIcon, ArrowUpLeftIcon, ArrowDownLeftIcon, ArrowDownRightIcon } from "@phosphor-icons/react";

import { CssColor } from "../../classes/CssColor";
import { cn } from "../../utils/cn";

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

/**
 * Hover group that slides the arrow (and swaps it to its hover color). Put this class on
 * any ancestor that should trigger the slide — a button, card, or nav link.
 */
export const ARROW_HOVER_GROUP = "group/arrow";

// Each direction lays the two arrows out in a 2-col grid, offset so only the "start" arrow
// shows. On hover the grid slides by one arrow (--arrow-inner-size) to reveal the "end" arrow.
const DIRECTION_CLASSES: Record<ArrowDirectionProps, { grid: string; start: string; end: string }> = {
    "top-right": {
        grid: "grid-rows-[repeat(2,1fr)] -translate-x-(--arrow-inner-size) group-hover/arrow:translate-x-0 group-hover/arrow:-translate-y-(--arrow-inner-size)",
        start: "col-start-2 row-start-1",
        end: "col-start-1 row-start-2",
    },
    "top-left": {
        grid: "grid-rows-[repeat(2,1fr)] group-hover/arrow:-translate-x-(--arrow-inner-size) group-hover/arrow:-translate-y-(--arrow-inner-size)",
        start: "col-start-1 row-start-1",
        end: "col-start-2 row-start-2",
    },
    "bottom-right": {
        grid: "grid-rows-[repeat(2,1fr)] -translate-x-(--arrow-inner-size) -translate-y-(--arrow-inner-size) group-hover/arrow:translate-x-0 group-hover/arrow:translate-y-0",
        start: "col-start-1 row-start-1",
        end: "col-start-2 row-start-2",
    },
    "bottom-left": {
        grid: "grid-rows-[repeat(2,1fr)] -translate-y-(--arrow-inner-size) group-hover/arrow:-translate-x-(--arrow-inner-size) group-hover/arrow:translate-y-0",
        start: "col-start-2 row-start-1",
        end: "col-start-1 row-start-2",
    },
    right: {
        grid: "grid-rows-[1fr] -translate-x-(--arrow-inner-size) group-hover/arrow:translate-x-0",
        start: "col-start-1 row-start-1",
        end: "col-start-2 row-start-1",
    },
    left: {
        grid: "grid-rows-[1fr] group-hover/arrow:-translate-x-(--arrow-inner-size)",
        start: "col-start-1 row-start-1",
        end: "col-start-2 row-start-1",
    },
    up: {
        grid: "grid-rows-[repeat(2,1fr)] group-hover/arrow:-translate-y-(--arrow-inner-size)",
        start: "col-start-1 row-start-1",
        end: "col-start-1 row-start-2",
    },
    down: {
        grid: "grid-rows-[repeat(2,1fr)] -translate-y-(--arrow-inner-size) group-hover/arrow:translate-y-0",
        start: "col-start-1 row-start-1",
        end: "col-start-1 row-start-2",
    },
};

const ARROW_CLASSES =
    "flex items-center justify-center box-border size-(--arrow-inner-size) aspect-square p-(--arrow-icon-inset) [&_path]:transition-all [&_path]:duration-300 [&_path]:ease-in-out";

type ArrowBoxProps = {
    arrowDirection?: ArrowDirectionProps;
    color?: ColorVariables | CssColor;
    /** Color the arrow (and its box border) transitions to when an ancestor with `:hover` sets it. @default same as `color`, i.e. no change */
    hoverColor?: ColorVariables | CssColor;
    /** Outer box size in pixels. Everything else (arrow, icon, slide distance) scales proportionally. @default 20 */
    size?: number;
};


export default function ArrowBox({ color = "--cream-500", hoverColor, arrowDirection = "top-right", size = 20 }: ArrowBoxProps) {
    const Arrow = ARROW_MAP[arrowDirection];

    const resolvedColor = color ? CssColor.resolve(color) : CssColor.of("--cream-500");
    const resolvedHoverColor = hoverColor ? CssColor.resolve(hoverColor) : resolvedColor;

    // Named "-base"/"-hover" (not "--arrow-color" itself) so the hover swap, a class on
    // `--arrow-color`, isn't shadowed by this inline style — inline styles always beat
    // stylesheet rules, :hover included.
    const wrapperStyle = {
        "--arrow-color-base": resolvedColor.toCssVar(),
        "--arrow-color-hover": resolvedHoverColor.toCssVar(),
        "--arrow-box-size": `${size}px`,
    } as React.CSSProperties;

    const dir = DIRECTION_CLASSES[arrowDirection];

    return (
        <div
            className={cn(
                "relative flex items-center justify-center box-border overflow-hidden",
                "size-(--arrow-box-size) aspect-square flex-[0_0_var(--arrow-box-size)] p-025",
                "border border-[color:var(--arrow-color,var(--cream-500))] transition-all duration-300 ease-in-out",
                // Ratios preserve the original hand-tuned proportions (box 20 / inner+arrow 18 / icon inset 1px per side).
                "[--arrow-inner-size:calc(var(--arrow-box-size)*0.9)] [--arrow-icon-inset:calc(var(--arrow-box-size)*0.05)]",
                "[--arrow-color:var(--arrow-color-base)] group-hover/arrow:[--arrow-color:var(--arrow-color-hover)]",
            )}
            style={wrapperStyle}
        >
            <div className="relative size-(--arrow-inner-size) aspect-square">
                <div className={cn("grid grid-cols-[repeat(2,1fr)] transition-all duration-300 ease-in-out", dir.grid)}>
                    <div className={cn(ARROW_CLASSES, dir.start)}>
                        <Arrow color="var(--arrow-color)" size="100%" />
                    </div>

                    <div className={cn(ARROW_CLASSES, dir.end)}>
                        <Arrow color="var(--arrow-color)" size="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
}
