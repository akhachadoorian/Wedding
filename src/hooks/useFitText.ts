'use client';

import { useLayoutEffect, useRef } from "react";

export function useFitText<T extends HTMLElement>() {
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        const container = el?.parentElement;
        if (!el || !container) return;

        const fit = () => {
            if (container.offsetWidth === 0) return;
            el.style.fontSize = "100px";
            el.style.width = "max-content";
            const textWidth = el.offsetWidth;
            el.style.width = "";
            if (textWidth === 0) return;
            el.style.fontSize = `${(container.offsetWidth / textWidth) * 100}px`;
        };

        fit();
        const ro = new ResizeObserver(fit);
        ro.observe(container);
        return () => ro.disconnect();
    }, []);

    return ref;
}
