'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import ArrowBox from '../../components/ArrowBox/ArrowBox';
import type { ArrowDirectionProps } from '../../components/ArrowBox/ArrowBox';
import type { ColorVariables } from '../../types/colors';
import { cn } from '@/utils/cn';

type TextContent      = { type: 'text';       caption: string };
type ArrowContent     = { type: 'arrow';      arrowDirection?: ArrowDirectionProps; color?: ColorVariables };
type TextArrowContent = { type: 'text-arrow'; caption: string; arrowDirection?: ArrowDirectionProps; color?: ColorVariables };
type TooltipContent   = TextContent | ArrowContent | TextArrowContent;
type TooltipState     = ({ x: number; y: number } & TooltipContent) | null;

const TooltipContext = createContext<{
    tooltip: TooltipState;
    setTooltip: Dispatch<SetStateAction<TooltipState>>;
}>({ tooltip: null, setTooltip: () => {} });

export function TooltipProvider({ children }: { children: ReactNode }) {
    const [tooltip, setTooltip] = useState<TooltipState>(null);
    return (
        <TooltipContext.Provider value={{ tooltip, setTooltip }}>
            {children}
        </TooltipContext.Provider>
    );
}

export function useTooltip() {
    const { setTooltip } = useContext(TooltipContext);

    const makeMouseHandlers = (content: string | TooltipContent) => {
        const normalized: TooltipContent = typeof content === 'string'
            ? { type: 'text', caption: content }
            : content;

        const isEmpty = normalized.type === 'text' && !normalized.caption;

        return {
            onMouseMove: (e: React.MouseEvent) => {
                if (isEmpty || window.matchMedia('(hover: none)').matches) return;
                setTooltip({ x: e.clientX, y: e.clientY, ...normalized });
            },
            onMouseLeave: () => setTooltip(null),
        };
    };

    // const makeTouchHandlers = (content: string | TooltipContent) => {
    //     const normalized: TooltipContent = typeof content === 'string'
    //         ? { type: 'text', caption: content }
    //         : content;

    //     const isEmpty = normalized.type === 'text' && !normalized.caption;

    //     return {
    //         onPointerDown: (e: React.PointerEvent) => {
    //             if (isEmpty || e.pointerType === 'mouse') return;
    //             setTooltip({ x: e.clientX, y: e.clientY, ...normalized });
    //             console.log("click")
    //         },
    //         onPointerUp: () => setTimeout(() => setTooltip(null), 1500),
    //     };
    // };

    const showTooltip = (x: number, y: number, content: string | TooltipContent) => {
        const normalized: TooltipContent = typeof content === 'string'
            ? { type: 'text', caption: content }
            : content;
        setTooltip({ x, y, ...normalized });
    };

    const hideTooltip = () => setTooltip(null);

    return { makeMouseHandlers, showTooltip, hideTooltip };
}

export function GlobalTooltip() {
    const { tooltip } = useContext(TooltipContext);
    if (!tooltip) return null;


    return (
        <div
            className={cn(
                'fixed z-9999 pointer-events-none animate-tooltip-in',
                'bg-black text-[color:var(--cream-500)] font-sans text-xs font-semibold leading-normal tracking-[0.6px] uppercase text-center',
                'px-150 py-075 max-w-[35vw] rounded-[6px] border border-white/8 shadow-[0_4px_16px_rgba(0,0,0,0.5)]',
                tooltip.type === 'arrow' && 'bg-transparent border-0 shadow-none p-0 rounded-none max-w-none',
                tooltip.type === 'text-arrow' && 'flex items-center gap-150 max-w-none',
            )}
            style={{
                left: Math.min(tooltip.x + 14, window.innerWidth * 0.8),
                top: Math.min(tooltip.y + 14, window.innerHeight - 48),
            }}
        >
            {tooltip.type === 'text' && tooltip.caption}
            {tooltip.type === 'arrow' && (
                <ArrowBox arrowDirection={tooltip.arrowDirection} color={tooltip.color} />
            )}
            {tooltip.type === 'text-arrow' && (
                <>
                    <span>{tooltip.caption}</span>
                    <ArrowBox arrowDirection={tooltip.arrowDirection} color={tooltip.color} />
                    {/* <ArrowRightIcon color={tooltip.color} size={18}/> */}
                </>
            )}
        </div>
    );
}
