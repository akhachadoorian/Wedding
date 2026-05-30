'use client';

import { useEffect, useState } from "react";
import { BREAKPOINT_DESKTOP, BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from "../constants/breakpoints";

export default function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export function useBreakpoints() {
  const width = useWindowWidth();

  return {
    isMobile: width < BREAKPOINT_MOBILE,
    isTablet: width >= BREAKPOINT_MOBILE && width < BREAKPOINT_TABLET,
    isDesktop: width >= BREAKPOINT_TABLET && width < BREAKPOINT_DESKTOP,
    isLargeDesktop: width >= BREAKPOINT_DESKTOP,
  };
}

// const BREAKPOINT_ORDER: BreakpointProps[] = ['mobile', 'tablet', 'desktop', 'large-desktop'];

// export function useScreenSize({ min, max }: { min: BreakpointProps; max?: BreakpointProps }): boolean {
//     const { isMobile, isTablet, isDesktop, isLargeDesktop } = useBreakpoints();

//     const breakpointMap: Record<BreakpointProps, boolean> = {
//         'mobile': isMobile,
//         'tablet': isTablet,
//         'desktop': isDesktop,
//         'large-desktop': isLargeDesktop,
//     };

//     const minIdx = BREAKPOINT_ORDER.indexOf(min);
//     const maxIdx = max ? BREAKPOINT_ORDER.indexOf(max) : BREAKPOINT_ORDER.length - 1;

//     return BREAKPOINT_ORDER.slice(minIdx, maxIdx + 1).some(bp => breakpointMap[bp]);
// }

