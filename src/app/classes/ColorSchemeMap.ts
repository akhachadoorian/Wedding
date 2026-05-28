import { ColorVariables } from "../types/colors";
import { CssColor } from "./CssColor";

/** A nested record mapping a color scheme name and variant key to a `ColorVariables` token. */
export type ColorSchemeMapType = Record<string, Record<string, ColorVariables>>;


/**
 * A registry of named color scheme lookups that resolve to {@link CssColor} instances.
 *
 * Each static map (e.g. `DECORATION`, `ART_DECO_ICON`) owns a `ColorSchemeMapType` and a
 * fallback token. Callers retrieve a resolved `CssColor` either by chaining directly off a
 * named map or by using the string-keyed `lookup` method.
 *
 * @example
 * // Named access
 * ColorSchemeMap.DECORATION.get("gold", "solid")
 *
 * @example
 * // String-keyed access
 * ColorSchemeMap.lookup("DECORATION", "gold", "solid")
 */
export class ColorSchemeMap {
    /**
     * @param map - Nested record of scheme → variant → `ColorVariables` token.
     * @param fallback - Token returned when the scheme or key is not found in the map.
     */
    private constructor(
        private map: ColorSchemeMapType,
        private fallback: ColorVariables,
    ) {}

    // #region --- Static Maps ----------------------------------

        /**
         * Color map for Button decoration. Keyed by `colorScheme` → `variant`.
         *
         * @example
         * ColorSchemeMap.DECORATION.get("gold", "solid") // → CssColor("--cream-500")
         */
        static readonly DECORATION = new ColorSchemeMap(
            {
                cream: { solid: "--gold-500", outline: "--cream-500", lines: "--cream-500" },
                gold: { solid: "--cream-500", outline: "--gold-500", lines: "--gold-500" },
            },
            "--cream-500",
        );

        /**
         * Color map for ArtDecoIcon SVGs. Keyed by `colorScheme` → `role` (`primary` | `secondary`).
         *
         * @example
         * ColorSchemeMap.ART_DECO_ICON.get("gold", "primary") // → CssColor("--gold-500")
         */
        static readonly ART_DECO_ICON = new ColorSchemeMap(
            { 
                gold: { primary: "--gold-500", secondary: "--gold-600" } 
            }, 
            "--gold-500"
        );

    // #endregion -------------------------------------------

    /** Index of all named maps, used internally by {@link lookup}. */
    private static readonly ALL = {
        DECORATION:   ColorSchemeMap.DECORATION,
        ART_DECO_ICON: ColorSchemeMap.ART_DECO_ICON,
    };


    /**
     * Returns the CssColor for that map given the scheme and key. 
     * Otherwise returns the map's fallback color
     * @function
     * 
     * @param scheme the scheme key
     * @param key the key for the color
     * @returns CssColor
     */
    get(scheme: string, key: string): CssColor {
        const color = this.map[scheme]?.[key] ?? this.fallback;

        return CssColor.of(color);
    }

    /**
     * Returns the CssColor for that map given the map key, scheme, and key. 
     * Otherwise returns the map's fallback color
     * @function
     * 
     * @param map the ColorSchemeMap map key
     * @param scheme the scheme key
     * @param key the key for the color
     * @returns CssColor
     */
    static lookup(map: keyof typeof ColorSchemeMap.ALL, scheme: string, key: string): CssColor {
        return ColorSchemeMap.ALL[map].get(scheme, key);
    }
}