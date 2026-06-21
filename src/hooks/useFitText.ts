'use client';

import { useLayoutEffect, useRef } from "react";
import { BREAKPOINT_DESKTOP } from "@/constants/breakpoints";

interface UseFitTextOptions {
    mobile?: boolean;
}

export function useFitText<T extends HTMLElement>({ mobile = false }: UseFitTextOptions = {}) {
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        const container = el?.parentElement;
        if (!el || !container) return;

        const measure = () => {
            if (!mobile && window.innerWidth < BREAKPOINT_DESKTOP) {
                el.style.fontSize = "";
                return;
            }
            const containerWidth = container.getBoundingClientRect().width;

            console.log("containerWidth", containerWidth)
            if (containerWidth === 0) return;
            el.style.fontSize = "100px";
            el.style.width = "max-content";
            const textWidth = el.getBoundingClientRect().width;
            el.style.width = "";
            if (textWidth === 0) return;
            el.style.fontSize = `${Math.floor((containerWidth / textWidth) * 100)}px`;
        };

        const ro = new ResizeObserver(measure);
        ro.observe(container);

        document.fonts.ready.then(measure);

        return () => ro.disconnect();
    }, []);

    return ref;
}
