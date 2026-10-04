import { act, renderHook } from "@testing-library/react";
import useCountdown, { formatCountdownLabel, getCompletionMessage } from "./useCountdown";

const TARGET = new Date("2026-10-31T17:00:00-04:00");

describe("useCountdown", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("counts down to the target and ticks every second", () => {
        // 27 days, 18 hours, 17 minutes, 56 seconds before the target
        vi.setSystemTime(TARGET.getTime() - ((((27 * 24 + 18) * 60 + 17) * 60 + 56) * 1000));
        const { result } = renderHook(() => useCountdown(TARGET));

        expect(result.current).toEqual({
            days: 27, hours: 18, minutes: 17, seconds: 56, isComplete: false, isMounted: true,
        });

        act(() => vi.advanceTimersByTime(1000));
        expect(result.current.seconds).toBe(55);
    });

    it("never goes negative and marks completion", () => {
        vi.setSystemTime(TARGET.getTime() - 1500);
        const { result } = renderHook(() => useCountdown(TARGET));

        act(() => vi.advanceTimersByTime(5000));
        expect(result.current).toMatchObject({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true });
        expect(vi.getTimerCount()).toBe(0);
    });

    it("clears its interval on unmount", () => {
        vi.setSystemTime(TARGET.getTime() - 60_000);
        const { unmount } = renderHook(() => useCountdown(TARGET));
        expect(vi.getTimerCount()).toBe(1);
        unmount();
        expect(vi.getTimerCount()).toBe(0);
    });
});

describe("getCompletionMessage", () => {
    it("celebrates on the day and thanks guests afterwards (Eastern time)", () => {
        expect(getCompletionMessage(TARGET, new Date("2026-10-31T23:30:00-04:00"))).toBe("Today's the day");
        expect(getCompletionMessage(TARGET, new Date("2026-11-01T00:30:00-04:00"))).toBe("Thank you for celebrating with us");
    });
});

describe("formatCountdownLabel", () => {
    it("pluralises each unit", () => {
        expect(formatCountdownLabel({ days: 29, hours: 4, minutes: 12 })).toBe("29 days, 4 hours, and 12 minutes until the ceremony");
        expect(formatCountdownLabel({ days: 1, hours: 1, minutes: 1 })).toBe("1 day, 1 hour, and 1 minute until the ceremony");
    });
});
