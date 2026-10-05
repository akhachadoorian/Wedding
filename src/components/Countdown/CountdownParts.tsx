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

/**
 * Large serif number used by the row and stack variants. Respira defaults to
 * oldstyle figures; "lnum" swaps in its proportional lining set (.LP glyphs).
 * Restates "ss01" because this replaces the font-feature-settings from .heading-m.
 */
export const COUNTDOWN_NUMBER = "heading-m leading-none! [font-feature-settings:'ss01'_on,'lnum'_on]!";
/** Small letter-spaced label in the site's muted secondary color. */
export const COUNTDOWN_LABEL = "eyebrow text-[color:var(--cream-900)]";

/**
 * Shows "--" until the countdown has mounted, so SSR and hydration match.
 * `minDigits` zero-pads the value (e.g. 2 → "07").
 */
export function displayValue(value: number, isMounted: boolean, minDigits = 1): string {
    return isMounted ? String(value).padStart(minDigits, "0") : "--";
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
