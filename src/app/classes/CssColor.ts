import { ColorVariables } from "../types/colors";




/**
 * Represents a resolved CSS custom property, wrapping a {@link ColorVariables} token
 * and providing conversion to a `var(--token)` string for use in inline styles.
 *
 * Construction is private — instances are created via {@link CssColor.of} or
 * returned from {@link ColorSchemeMap.get} / {@link ColorSchemeMap.lookup}.
 *
 * @example
 * const color = CssColor.of("--gold-500");
 * color.toCssVar(); // "var(--gold-500)"
 *
 * @example
 * // Typical usage in a component
 * <Icon color={color.toCssVar()} />
 */
export class CssColor {
    /** @param variable - The `ColorVariables` token this instance wraps. */
    private constructor(private variable: ColorVariables) {}

    /**
     * Returns the token formatted as a CSS `var()` expression.
     *
     * @returns A string in the form `"var(--token-name)"`.
     *
     * @example
     * CssColor.of("--cream-500").toCssVar() // "var(--cream-500)"
     */
    toCssVar(): string {
        return `var(${this.variable})`;
    }

    /**
     * Factory method — wraps a {@link ColorVariables} token in a `CssColor` instance.
     * @static
     * @function
     *
     * @param color - A valid `ColorVariables` token.
     * @returns A new `CssColor` wrapping the given token.
     *
     * @example
     * CssColor.of("--gold-500")
     */
    static of(color: ColorVariables): CssColor {
        return new CssColor(color);
    }

    /**
     * Accepts either a raw {@link ColorVariables} token or an existing `CssColor` instance
     * and guarantees a `CssColor` is returned. Use this at component boundaries where a prop
     * accepts both types and you need a single resolved value to work with.
     *
     * @param color - A `ColorVariables` token or an existing `CssColor` instance.
     * @returns The same `CssColor` if one was passed; otherwise a new `CssColor` wrapping the token.
     *
     * @example
     * // Normalize once at the top of a component
     * const resolvedColor = CssColor.resolve(color ?? "--cream-500");
     * <Icon color={resolvedColor.toCssVar()} />
     */
    static resolve(color: ColorVariables | CssColor): CssColor {
        return color instanceof CssColor ? color : CssColor.of(color);
    }
}


