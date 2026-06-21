'use client';

import { useLayoutEffect, useRef } from "react";
import { BREAKPOINT_DESKTOP } from "@/constants/breakpoints";

interface useFitLongestWordOptions {
    mobile?: boolean;
}

export function useFitLongestWord<T extends HTMLElement>({ mobile = false}: useFitLongestWordOptions = {}) {
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        const container = el?.parentElement;
        if (!el || !container) return;

        const fit = () => {
            if (!mobile && window.innerWidth < BREAKPOINT_DESKTOP) {
                el.style.fontSize = "";
                return;
            }
            if (container.offsetWidth === 0) return;

            const words = (el.textContent ?? "").split(/\s+/).filter(Boolean);
            if (words.length === 0) return;

            const probe = document.createElement("span");
            probe.style.cssText = `
                position: absolute;
                visibility: hidden;
                white-space: nowrap;
                font-size: 100px;
                font-family: ${getComputedStyle(el).fontFamily};
                font-weight: ${getComputedStyle(el).fontWeight};
                font-style: ${getComputedStyle(el).fontStyle};
            `;
            document.body.appendChild(probe);

            let maxWidth = 0;
            for (const word of words) {
                probe.textContent = word;
                maxWidth = Math.max(maxWidth, probe.offsetWidth);
            }

            document.body.removeChild(probe);

            if (maxWidth === 0) return;
            el.style.fontSize = `${(container.offsetWidth / maxWidth) * 100}px`;
        };

        fit();
        const ro = new ResizeObserver(fit);
        ro.observe(container);
        return () => ro.disconnect();
    }, []);

    return ref;
}
