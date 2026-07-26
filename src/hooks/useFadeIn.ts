'use client';

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


interface FadeInOptions {
    duration?: number;
    delay?: number;
    y?: number;
    threshold?: number;
    enabled?: boolean;
}

export function useFadeIn<T extends HTMLElement>(options: FadeInOptions = {}) {
    const { duration = 0.8, delay = 0, y = 20, threshold = 0.2, enabled = true } = options;
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el || !enabled) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    delay,
                    ease: "power2.out",
                    clearProps: "transform",
                    scrollTrigger: {
                        trigger: el,
                        start: `top ${Math.round((1 - threshold) * 100)}%`,
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [enabled]);

    return ref;
}

export function useFadeInChildren<T extends HTMLElement>(
    selector: string,
    options: FadeInOptions & { stagger?: number } = {}
) {
    const { duration = 0.8, delay = 0, y = 20, stagger = 0.1, threshold = 0.2, enabled = true } = options;
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el || !enabled) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                selector,
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    delay,
                    stagger,
                    ease: "power2.out",
                    clearProps: "transform",
                    scrollTrigger: {
                        trigger: el,
                        start: `top ${Math.round((1 - threshold) * 100)}%`,
                        toggleActions: "play none none none",
                    },
                }
            );
        }, el);

        return () => ctx.revert();
    }, [enabled]);

    return ref;
}