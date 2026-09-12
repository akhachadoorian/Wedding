'use client';

import { useEffect } from "react";
import gsap from "gsap";

const CURSOR_HOVER_TARGETS = "a, button, [data-cursor-hover]";

export function useCursor() {
    useEffect(() => {
        const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
        if (!mediaQuery.matches) return;

        const cursor = document.querySelector<HTMLElement>(".cursor");
        if (!cursor) return;

        document.documentElement.classList.add("has-custom-cursor");

        gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 1 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = (e.target as Element).closest?.(CURSOR_HOVER_TARGETS);
            if (target && !target.contains(e.relatedTarget as Node)) {
                gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "back.out(1.5)" });
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = (e.target as Element).closest?.(CURSOR_HOVER_TARGETS);
            if (target && !target.contains(e.relatedTarget as Node)) {
                gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);

        return () => {
            document.documentElement.classList.remove("has-custom-cursor");
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
        };
    }, []);
}
