"use client";

import useCountdown, { WEDDING_COUNTDOWN_TARGET } from "@/hooks/useCountdown";
import {
    COUNTDOWN_LABEL,
    COUNTDOWN_NUMBER,
    CountdownComplete,
    CountdownProps,
    CountdownSrText,
    displayValue,
} from "./CountdownParts";

/** Vertical stack of days / hours / minutes / seconds, separated by hairline dividers. */
export default function CountdownStack({ target = WEDDING_COUNTDOWN_TARGET, className }: CountdownProps) {
    const countdown = useCountdown(target);
    const { days, hours, minutes, seconds, isComplete, isMounted } = countdown;

    if (isComplete) return <CountdownComplete target={target} className={className} />;

    const units = [
        { value: days, label: "days" },
        { value: hours, label: "hours" },
        { value: minutes, label: "minutes" },
        { value: seconds, label: "seconds" },
    ];

    return (
        <div className={className}>
            <div aria-hidden="true" className="flex flex-col">
                {units.map(({ value, label }) => (
                    <div
                        key={label}
                        className="flex items-baseline justify-between gap-400 py-200 not-last:border-b not-last:border-[color:var(--cream-700)]"
                    >
                        <span className={COUNTDOWN_NUMBER}>{displayValue(value, isMounted)}</span>
                        <span className={COUNTDOWN_LABEL}>{label}</span>
                    </div>
                ))}
            </div>
            <CountdownSrText countdown={countdown} />
        </div>
    );
}
