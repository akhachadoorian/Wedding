import { cva } from "class-variance-authority";
import { BtnColorScheme, BtnHoverToken, BtnVariants, HOVER_OPTIONS } from "@/types/buttons";

type ColorClassMap = Record<BtnColorScheme, string>;
type HoverClassMap = Record<BtnHoverToken, string>;

// solid: base text is gold on the cream scheme (needs a dark text on a light bg), cream everywhere
// else; hover text is always cream since every hover bg is a mid/dark tone.
// function solidClass(base: BtnColorScheme, hover: BtnHoverToken): string {
//     const baseText = base === "cream" ? "gold" : "cream";
//     return `border-${base} bg-${base} text-${baseText} hover:border-${hover} hover:bg-${hover} hover:text-cream`;
// }

const SELF_HOVER_TEXT: Partial<Record<BtnColorScheme, BtnHoverToken>> = {
    cream: "burgundy",
};

function solidClass(base: BtnColorScheme, hover: BtnHoverToken): string {
    const baseText = base === "cream" ? "black" : "cream";

    if (hover === base) {
        const invertText = SELF_HOVER_TEXT[base] ?? baseText;
        return `border-${base} bg-${base} text-${baseText} hover:text-${invertText}`;
    }

    return `border-${base} bg-${base} text-${baseText} hover:border-${hover} hover:bg-${hover} hover:text-cream`;
}


// outline: base text is always cream (transparent bg). On hover the bg flips to the hover
// token, so text becomes that token's own hue for contrast — except cream, which stays cream.
function outlineClass(base: BtnColorScheme, hover: BtnHoverToken): string {
    const hoverText = base === "cream" ? "cream" : base;

    if (hover === base) {
        const invertText = SELF_HOVER_TEXT[base] ?? hoverText;
        return `border-${base} text-cream hover:bg-${base} hover:text-${invertText}`;
    }

    return `border-${base} text-cream hover:border-${hover} hover:bg-${hover} hover:text-${hoverText}`;
}

function buildCompoundVariants<V extends "solid" | "outline" | "lines">(variant: V, classFor: (base: BtnColorScheme, hover: BtnHoverToken) => string) {
    return Object.entries(HOVER_OPTIONS[variant]).flatMap(([base, hovers]) =>
        (hovers as readonly BtnHoverToken[]).map((hover) => ({
            variant,
            colorScheme: base as BtnColorScheme,
            hoverScheme: hover,
            class: classFor(base as BtnColorScheme, hover),
        })),
    );
}

const LINES_HOVER_TEXT: Partial<Record<BtnColorScheme, BtnHoverToken>> = {
    cabernet: "cabernet",
};

// lines: underline color always matches the base's own hue; text stays cream except
// cabernet, which flips its own text color in on hover — no border/bg involved here,
// so `hover` isn't used yet (every base currently only has itself as a hover option).
function linesClass(base: BtnColorScheme): string {
    const hoverText = LINES_HOVER_TEXT[base] ?? "cream";
    return `text-cream before:bg-${base} after:bg-${base} hover:text-${hoverText}`;
}

const LINE_BEFORE = "before:h-px before:w-[0px] before:absolute before:top-px before:left-px before:transition-all before:duration-300 before:ease-in-out hover:before:w-full";

const LINE_AFTER = "after:h-px after:w-[0px] after:absolute after:bottom-px after:right-px after:transition-all after:duration-300 after:ease-in-out hover:after:w-full";

export const buttonVariants = cva("flex items-center gap-150 transition-all duration-300 ease-in-out", {
    variants: {
        size: {
            default: 'py-100 px-200 md:py-150 md:px-300 text-base ',
            small: 'text-s py-100 px-200'
        },
        variant: {
            solid: "border-2 border-solid",
            outline: "border-2 border-solid bg-transparent",
            lines: `relative border-none bg-transparent ${LINE_BEFORE} ${LINE_AFTER}`,
        } satisfies Record<BtnVariants, string>,
        colorScheme: {
            cream: "",
            black: "",
            burgundy: "",
            cabernet: "",
        } satisfies ColorClassMap,
        hoverScheme: {
            cream: "",
            black: "",
            burgundy: "",
            cabernet: "",
        } satisfies HoverClassMap,
    },
    compoundVariants: [
        ...buildCompoundVariants("solid", solidClass),
        ...buildCompoundVariants("outline", outlineClass),
        ...buildCompoundVariants("lines", linesClass),
    ],
    defaultVariants: {
        variant: "solid",
        size: 'default',
        colorScheme: "cream",
    },
});
