'use client';

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import gsap from "gsap";

const COVER_DURATION = 0.6;
const REVEAL_DURATION = 0.6;
const REVEAL_DELAY = 0.15;
// If the new route never commits (e.g. a failed fetch), reveal anyway so the
// page can't get stuck behind the curtain.
const SAFETY_TIMEOUT = 3000;

type PageTransitionContextValue = {
    navigate: (href: string) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function usePageTransition() {
    return useContext(PageTransitionContext);
}

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const lenis = useLenis();

    const curtainRef = useRef<HTMLDivElement>(null);
    const isTransitioning = useRef(false);
    const pending = useRef<{ pathname: string; hasHash: boolean } | null>(null);
    const safetyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const reveal = useCallback(() => {
        const curtain = curtainRef.current;
        clearTimeout(safetyTimer.current);

        const hasHash = pending.current?.hasHash ?? false;
        pending.current = null;

        if (!hasHash) {
            if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
            else window.scrollTo(0, 0);
        }

        if (!curtain) {
            isTransitioning.current = false;
            return;
        }

        gsap.to(curtain, {
            yPercent: -100,
            duration: REVEAL_DURATION,
            delay: REVEAL_DELAY,
            ease: "power3.inOut",
            onComplete: () => {
                gsap.set(curtain, { y: 0, yPercent: 100, pointerEvents: "none" });
                isTransitioning.current = false;
            },
        });
    }, [lenis]);

    const navigate = useCallback((href: string) => {
        if (isTransitioning.current) return;

        const curtain = curtainRef.current;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!curtain || prefersReducedMotion) {
            router.push(href);
            return;
        }

        const url = new URL(href, window.location.href);
        isTransitioning.current = true;
        pending.current = { pathname: url.pathname, hasHash: url.hash !== "" };

        router.prefetch(href);

        gsap.killTweensOf(curtain);
        gsap.set(curtain, { y: 0, yPercent: 100, pointerEvents: "auto" });
        gsap.to(curtain, {
            yPercent: 0,
            duration: COVER_DURATION,
            ease: "power3.inOut",
            onComplete: () => {
                router.push(href, { scroll: false });
                safetyTimer.current = setTimeout(reveal, SAFETY_TIMEOUT);
            },
        });
    }, [router, reveal]);

    // The new page has committed once the pathname matches the pending target.
    useEffect(() => {
        if (pending.current && pending.current.pathname === pathname) {
            reveal();
        }
    }, [pathname, reveal]);

    useEffect(() => () => clearTimeout(safetyTimer.current), []);

    return (
        <PageTransitionContext.Provider value={{ navigate }}>
            {children}

            <div
                ref={curtainRef}
                aria-hidden="true"
                className="fixed inset-0 z-[9999] bg-black-bg pointer-events-none"
                style={{ transform: "translateY(100%)" }}
            />
        </PageTransitionContext.Provider>
    );
}
