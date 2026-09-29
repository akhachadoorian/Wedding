'use client';

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import Image from "next/image";
import gsap from "gsap";

import { cn } from "@/utils/cn";

const COVER_DURATION = 0.6;
const REVEAL_DURATION = 0.6;
const REVEAL_DELAY = 0.15;
// Vertical rise of the curtain's slanted edges, matching SlantedSection's large slant.
const SLANT = "12vw";
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
    const logoRef = useRef<HTMLDivElement>(null);
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

        const logo = logoRef.current;
        if (logo) {
            gsap.killTweensOf(logo);
            gsap.fromTo(
                logo,
                { opacity: 0, scale: 0.85, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: COVER_DURATION, delay: COVER_DURATION * 0.5, ease: "power3.out" },
            );
        }

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

            {/* Parallelogram: extends SLANT past the viewport top and bottom so
                the slanted edges are off-screen while it fully covers. */}
            <div
                ref={curtainRef}
                aria-hidden="true"
                className={cn(
                    "fixed inset-x-0 top-[calc(-1*var(--slant))] z-[9999] h-[calc(100svh+2*var(--slant))] bg-cabernet pointer-events-none",
                    "flex items-center justify-center",
                    "[clip-path:polygon(0_var(--slant),100%_0,100%_calc(100%-var(--slant)),0_100%)]",
                )}
                style={{ "--slant": SLANT, transform: "translateY(100%)" } as React.CSSProperties}
            >
                <div ref={logoRef} className="opacity-0">
                    <Image
                        src="/assets/AM.svg"
                        alt=""
                        width={95}
                        height={87}
                        className="aspect-[95/87] h-auto w-[140px] md:w-[220px]"
                    />
                </div>
            </div>
        </PageTransitionContext.Provider>
    );
}
