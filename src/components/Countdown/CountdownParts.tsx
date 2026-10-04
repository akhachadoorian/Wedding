"use client";

import { cn } from "@/utils/cn";
import {
    Countdown,
    formatCountdownLabel,
    getCompletionMessage,
} from "@/hooks/useCountdown";

/** Shared prop shape for every countdown variant. */
export type CountdownProps = {
    /** Moment to count down to. Defaults to the ceremony start. */
    target?: Date;
    className?: string;
};

/** Large serif number used by the row and stack variants. */
export const COUNTDOWN_NUMBER = "heading-m leading-none! tabular-nums";
/** Small letter-spaced label in the site's muted secondary color. */
export const COUNTDOWN_LABEL = "font-sans text-s font-light tracking-[1.4px] text-[color:var(--cream-900)]";

/** Shows "--" until the countdown has mounted, so SSR and hydration match. */
export function displayValue(value: number, isMounted: boolean): string {
    return isMounted ? String(value) : "--";
}

/** Replaces the countdown once the target has passed. */
export function CountdownComplete({ target, className }: { target: Date; className?: string }) {
    return <p className={cn("heading-s", className)}>{getCompletionMessage(target)}</p>;
}

/**
 * Visually hidden text equivalent. It only includes days/hours/minutes, so its
 * content changes at most once a minute; role="timer" keeps aria-live off.
 */
export function CountdownSrText({ countdown }: { countdown: Countdown }) {
    if (!countdown.isMounted) return null;

    return (
        <span role="timer" className="sr-only">
            {formatCountdownLabel(countdown)}
        </span>
    );
}
