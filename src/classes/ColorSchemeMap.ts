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
 * ColorSchemeMap.DECORATION.get("cabernet", "solid")
 *
 * @example
 * // String-keyed access
 * ColorSchemeMap.lookup("DECORATION", "cabernet", "solid")
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
         * `${variant}-flip` keys cover the self-hover "flip" state (`colorScheme` and
         * `hoverScheme` resolve to the same scheme — see `SELF_HOVER_TEXT` in
         * button.variants.ts), where the button's own text/fill relationship inverts.
         * Only cream currently has a flip state, since it's the only scheme with a
         * self-hover option defined.
         *
         * @example
         * ColorSchemeMap.DECORATION.get("cabernet", "solid") // → CssColor("--cream-500")
         */
        static readonly DECORATION = new ColorSchemeMap(
            {
                cream: {
                    solid: "--wine-800", outline: "--cream", lines: "--cream",
                    "solid-flip": "--wine-600", "outline-flip": "--wine-600",
                },
                burgundy: { solid: "--cream", outline: "--cream", lines: "--cream" },
                cabernet: { solid: "--cream", outline: "--cream", lines: "--cream" },
            },
            "--cream-500",
        );

        /**
         * Hover-state overrides for {@link DECORATION}. Only schemes/variants that change
         * color on hover need an entry — anything missing falls back to the base
         * `DECORATION` color (i.e. no color change on hover). Use {@link tryGet} rather
         * than {@link get} to read this map so the "no entry" case can be distinguished
         * from an explicit color.
         *
         * @example
         * ColorSchemeMap.DECORATION_HOVER.tryGet("cream", "outline") // → CssColor("--wine-800")
         * ColorSchemeMap.DECORATION_HOVER.tryGet("cream", "solid") // → undefined
         */
        static readonly DECORATION_HOVER = new ColorSchemeMap(
            {
                cream: { solid: "--cream", },
                burgundy: {outline: "--wine-600"},
                cabernet: {outline: "--wine-800" },
                
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
        DECORATION_HOVER: ColorSchemeMap.DECORATION_HOVER,
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
     * Like {@link get}, but returns `undefined` instead of the fallback when the
     * scheme or key has no explicit entry. Use this for maps like `DECORATION_HOVER`
     * where "no entry" is a meaningful case distinct from any particular color.
     * @function
     *
     * @param scheme the scheme key
     * @param key the key for the color
     * @returns CssColor, or undefined if not explicitly present in the map
     */
    tryGet(scheme: string, key: string): CssColor | undefined {
        const color = this.map[scheme]?.[key];

        return color ? CssColor.of(color) : undefined;
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