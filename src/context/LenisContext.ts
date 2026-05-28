import Lenis from "lenis";
import { createContext, useContext } from "react";

/**
 * Provides access to the Lenis smooth scroll instance
 * throughout the component tree.
 *
 * Value is `null` until the instance is initialized in App.
 */
export const LenisContext = createContext<Lenis | null>(null);

/**
 * Returns the current Lenis smooth scroll instance.
 *
 * @returns The Lenis instance if initialized, otherwise `null`
 *
 * @example
 * const lenis = useLenis();
 * lenis?.scrollTo(element, { offset: 0, duration: 1.4 });
 */
export function useLenis() {
  return useContext(LenisContext);
}