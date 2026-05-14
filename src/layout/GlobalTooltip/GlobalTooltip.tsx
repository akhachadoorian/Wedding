import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import ArrowBox from '../../components/ArrowBox/ArrowBox';
import type { ARROW_DIRECTIONS } from '../../components/ArrowBox/ArrowBox';
import type { ColorVariables } from '../../types/colors';
import './GlobalTooltip.scss';

type TextContent      = { type: 'text';       caption: string };
type ArrowContent     = { type: 'arrow';      arrowDirection?: ARROW_DIRECTIONS; color?: ColorVariables };
type TextArrowContent = { type: 'text-arrow'; caption: string; arrowDirection?: ARROW_DIRECTIONS; color?: ColorVariables };
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

    const modifierClass =
        tooltip.type === 'arrow'      ? ' global-tooltip--arrow' :
        tooltip.type === 'text-arrow' ? ' global-tooltip--text-arrow' : '';

    return (
        <div
            className={`global-tooltip${modifierClass}`}
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
