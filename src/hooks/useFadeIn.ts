'use client';

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_DURATION = 0.5;
const DEFAULT_DELAY = 0;
const DEFAULT_Y = 20;
const DEFAULT_THRESHOLD = 0.2;
const DEFAULT_STAGGER = 0.1;

interface FadeInOptions {
    duration?: number;
    delay?: number;
    y?: number;
    threshold?: number;
    enabled?: boolean;
}

export function useFadeIn<T extends HTMLElement>(options: FadeInOptions = {}) {
    const { duration = DEFAULT_DURATION, delay = DEFAULT_DELAY, y = DEFAULT_Y, threshold = DEFAULT_THRESHOLD, enabled = true } = options;
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
    const { duration = DEFAULT_DURATION, delay = DEFAULT_DELAY, y = DEFAULT_Y, stagger = DEFAULT_STAGGER, threshold = DEFAULT_THRESHOLD, enabled = true } = options;
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