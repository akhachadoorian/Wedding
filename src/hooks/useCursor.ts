import { useEffect } from "react";
import gsap from "gsap";

export function useCursor() {
    useEffect(() => {
        const cursor = document.querySelector<HTMLElement>(".cursor");
        if (!cursor) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const onMouseOver = (e: MouseEvent) => {
            const wrapper = (e.target as Element).closest?.(".drink_card-wrapper");
            if (wrapper && !wrapper.contains(e.relatedTarget as Node)) {
                gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const wrapper = (e.target as Element).closest?.(".drink_card-wrapper");
            if (wrapper && !wrapper.contains(e.relatedTarget as Node)) {
                gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.in" });
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
        };
    }, []);
}
