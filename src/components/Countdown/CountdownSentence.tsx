"use client";

import useCountdown, { WEDDING_COUNTDOWN_TARGET } from "@/hooks/useCountdown";
import { CountdownComplete, CountdownProps, CountdownSrText, displayValue } from "./CountdownParts";

/** Single serif line: "Only 27 days until we say I do". */
export default function CountdownSentence({ target = WEDDING_COUNTDOWN_TARGET, className }: CountdownProps) {
    const countdown = useCountdown(target);
    const { days, isComplete, isMounted } = countdown;

    if (isComplete) return <CountdownComplete target={target} className={className} />;

    return (
        <div className={className}>
            <p aria-hidden="true" className="heading-s">
                Only {displayValue(days, isMounted)} {days === 1 && isMounted ? "day" : "days"} until we say I do
            </p>
            <CountdownSrText countdown={countdown} />
        </div>
    );
}
