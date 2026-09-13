"use client";

import type { CSSProperties, RefObject } from "react";
import { useFitText } from "react-use-fittext";
import type { FitMode, LineMode } from "react-use-fittext";
import { useBreakpoints } from "@/hooks/useWindowWidth";

interface UseFitHeadlineOptions {
    /** Max font size (px) at tablet width and above @default 400 */
    desktopMax?: number;
    /** Max font size (px) below tablet width @default 100 */
    mobileMax?: number;
    /**
     * Force the line mode instead of the responsive default
     * (`multi` below tablet, `single` from tablet up). `undefined` keeps
     * the responsive default, so a caller can override conditionally:
     * `lineMode: stepNum === 1 ? "single" : undefined`.
     */
    lineMode?: LineMode;
    /** Force the fit mode @default "width" */
    fitMode?: FitMode;
    /** Force maxFontSize, overriding both `desktopMax` and `mobileMax` */
    maxFontSize?: number;
    lineHeight?: string | number;
}

/**
 * Fits a headline to its container width: one line from tablet up, wrapping
 * below that. Centralises the responsive policy, the ref casts, and the
 * reveal gate so every headline behaves the same.
 *
 * Attach `containerRef` to the measured wrapper and `textRef` + `headlineStyle`
 * to the text element. `headlineStyle` keeps the text hidden until the client
 * has resolved the breakpoint, so there is no size-jump flash on load.
 *
 * Every option is optional; pass one to override that facet for a given call
 * (e.g. an RSVP step that needs a different line mode) while the rest keep
 * their responsive defaults.
 *
 * @example
 * const { containerRef, textRef, headlineStyle } = useFitHeadline();
 * <div ref={mergeRefs(parallaxRef, containerRef)}>
 *   <h2 ref={textRef} style={headlineStyle}>{header}</h2>
 * </div>
 *
 * @example
 * // RSVP: single line on step 1, wrap on later steps
 * const { containerRef, textRef, headlineStyle } = useFitHeadline({
 *     lineMode: stepNum === 1 ? "single" : "multi",
 *     maxFontSize: stepNum === 1 ? 400 : 160,
 * });
 */
export function useFitHeadline({
    desktopMax = 400,
    mobileMax = 100,
    lineMode,
    fitMode = "width",
    maxFontSize,
    lineHeight = "140%",
}: UseFitHeadlineOptions = {}) {
    const { isMobile, isTablet, ready } = useBreakpoints();
    const mobile = isMobile || isTablet;

    const { containerRef, textRef, fontSize } = useFitText({
        fitMode,
        lineMode: lineMode ?? (mobile ? "multi" : "single"),
        maxFontSize: maxFontSize ?? (mobile ? mobileMax : desktopMax),
    });

    const headlineStyle: CSSProperties = {
        fontSize,
        lineHeight: lineHeight,
        visibility: ready ? "visible" : "hidden",
    };

    return {
        containerRef: containerRef as RefObject<HTMLDivElement>,
        textRef: textRef as RefObject<HTMLHeadingElement>,
        fontSize,
        ready,
        headlineStyle,
    };
}
