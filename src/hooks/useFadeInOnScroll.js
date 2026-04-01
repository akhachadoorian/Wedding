import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFadeInOnScroll() {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(ref.current, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 85%",  // fires when top of section hits 85% down the viewport
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return ref;
}