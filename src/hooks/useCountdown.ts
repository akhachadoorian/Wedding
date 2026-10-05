"use client";

import { useEffect, useState } from "react";

/** Ceremony start: Saturday, October 31, 2026 at 5:00 PM Eastern. */
export const WEDDING_COUNTDOWN_TARGET = new Date("2026-10-31T17:00:00-04:00");

const EVENT_TIME_ZONE = "America/New_York";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export type Countdown = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    /** True once the target has passed. */
    isComplete: boolean;
    /** False on the server and the first client render; true once ticking. */
    isMounted: boolean;
};

/**
 * Live countdown to `target`, ticking once a second.
 *
 * Returns zeros with `isMounted: false` on the server and first client render
 * so markup always hydrates cleanly; real values arrive after mount.
 */
export default function useCountdown(target: Date): Countdown {
    const [now, setNow] = useState<number | null>(null);
    const targetTime = target.getTime();

    useEffect(() => {
        const tick = () => {
            const current = Date.now();
            setNow(current);
            if (current >= targetTime) clearInterval(id);
        };

        const id = setInterval(tick, SECOND);
        tick();

        return () => clearInterval(id);
    }, [targetTime]);

    if (now === null) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: false, isMounted: false };
    }

    const remaining = Math.max(0, targetTime - now);

    return {
        days: Math.floor(remaining / DAY),
        hours: Math.floor((remaining % DAY) / HOUR),
        minutes: Math.floor((remaining % HOUR) / MINUTE),
        seconds: Math.floor((remaining % MINUTE) / SECOND),
        isComplete: now >= targetTime,
        isMounted: true,
    };
}

const toEventDay = (date: Date) =>
    new Intl.DateTimeFormat("en-CA", { timeZone: EVENT_TIME_ZONE }).format(date);

/** Message shown once the countdown has finished, based on the calendar day in Eastern time. */
export function getCompletionMessage(target: Date, now: Date = new Date()): string {
    return toEventDay(now) === toEventDay(target)
        ? "Today's the day"
        : "Thank you for celebrating with us";
}

const plural = (value: number, unit: string) => `${value} ${unit}${value === 1 ? "" : "s"}`;

/** Screen-reader text for a countdown, e.g. "29 days, 4 hours, and 12 minutes until the ceremony". */
export function formatCountdownLabel({
    days,
    hours,
    minutes,
}: Pick<Countdown, "days" | "hours" | "minutes">): string {
    return `${plural(days, "day")}, ${plural(hours, "hour")}, and ${plural(minutes, "minute")} until the ceremony`;
}
