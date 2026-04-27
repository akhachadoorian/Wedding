import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


interface FadeInOptions {
    duration?: number;
    delay?: number;
    y?: number;
    threshold?: number;
}

export function useFadeIn<T extends HTMLElement>(options: FadeInOptions = {}) {
    const { duration = 0.8, delay = 0, y = 20, threshold = 0.2 } = options;
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

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
                    scrollTrigger: {
                        trigger: el,
                        start: `top ${Math.round((1 - threshold) * 100)}%`,
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return ref;
}

export function useFadeInChildren<T extends HTMLElement>(
    selector: string,
    options: FadeInOptions & { stagger?: number } = {}
) {
    const { duration = 0.8, delay = 0, y = 20, stagger = 0.1, threshold = 0.2 } = options;
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

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
                    scrollTrigger: {
                        trigger: el,
                        start: `top ${Math.round((1 - threshold) * 100)}%`,
                        toggleActions: "play none none none",
                    },
                }
            );
        }, el);

        return () => ctx.revert();
    }, []);

    return ref;
}