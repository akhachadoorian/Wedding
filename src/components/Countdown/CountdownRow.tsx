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

/** Horizontal row of days / hours / minutes, each number above its label. */
export default function CountdownRow({ target = WEDDING_COUNTDOWN_TARGET, className }: CountdownProps) {
    const countdown = useCountdown(target);
    const { days, hours, minutes, isComplete, isMounted } = countdown;

    if (isComplete) return <CountdownComplete target={target} className={className} />;

    const units = [
        { value: days, label: "days" },
        { value: hours, label: "hours" },
        { value: minutes, label: "minutes" },
    ];

    return (
        <div className={className}>
            <div aria-hidden="true" className="flex justify-center gap-600 md:gap-800">
                {units.map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center gap-100">
                        <span className={COUNTDOWN_NUMBER}>{displayValue(value, isMounted)}</span>
                        <span className={COUNTDOWN_LABEL}>{label}</span>
                    </div>
                ))}
            </div>
            <CountdownSrText countdown={countdown} />
        </div>
    );
}
