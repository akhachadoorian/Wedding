import { cva } from "class-variance-authority";
import { BtnColorScheme, BtnVariants } from "@/types/buttons";

type ColorClassMap = Record<BtnColorScheme, string>;

export const buttonColorVariants = cva("flex items-center gap-150 transition-all duration-300 ease-in-out", {
    variants: {
        size: {
            default: 'py-100 px-200 md:py-150 md:px-300',
            small: 'py-100 px-200'
        },
        variant: {
            solid: "border-2 border-solid",
            outline: "border-2 border-solid bg-transparent",
            lines: "",
        } satisfies Record<BtnVariants, string>,
        colorScheme: {
            gold: "",
            cream: "",
            black: "",
            burgundy: "",
            cabernet: "",
        } satisfies ColorClassMap,
    },
    compoundVariants: [
        // #region --- Solid ---
        {
            variant: "solid",
            colorScheme: "cream",
            class: "border-cream bg-cream text-gold hover:border-gold hover:bg-gold hover:text-cream",
        },
        {
            variant: "solid",
            colorScheme: "gold",
            class: "border-gold bg-gold text-cream hover:border-gold-600 hover:bg-gold-600 hover:text-cream",
        },
        {
            variant: "solid",
            colorScheme: "black",
            class: "border-black bg-black text-cream hover:border-cabernet hover:bg-cabernet hover:text-cream",
        },
        {
            variant: "solid",
            colorScheme: "burgundy",
            class: "border-burgundy bg-burgundy text-cream hover:border-cabernet hover:bg-cabernet hover:text-cream",
        },
        {
            variant: "solid",
            colorScheme: "cabernet",
            class: "border-cabernet bg-cabernet text-cream hover:border-burgundy hover:bg-burgundy hover:text-cream",
        },
        // #endregion

        // #region --- Outline ---
        {
            variant: "outline",
            colorScheme: "gold",
            class: "border-gold text-cream hover:border-cream hover:bg-cream hover:text-gold",
        },
        {
            variant: "outline",
            colorScheme: "cream",
            class: "border-cream text-cream hover:border-cabernet hover:bg-cabernet hover:text-cream",
        },
        {
            variant: "outline",
            colorScheme: "burgundy",
            class: "border-burgundy text-cream hover:border-cream hover:bg-cream hover:text-burgundy",
        },
        {
            variant: "outline",
            colorScheme: "cabernet",
            class: "border-cabernet text-cream hover:border-cream hover:bg-cream hover:text-cabernet",
        },
        // #endregion
    ],
    defaultVariants: {
        variant: "solid",
        size: 'default',
        colorScheme: "cream",
    },
});
