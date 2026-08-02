import { ArrowDirectionProps } from "../components/ArrowBox/ArrowBox";
import { ModalProps } from "@/components/Modal/Modal";
import { WithA11yProps, WithHTMLProps } from "./props";
import { NonEmptyMaxX, RequireX } from "./utility";
import { Icon } from "@phosphor-icons/react";


export interface LinkSettings {
    /** Label displayed inside the button */
    text?: string;
    /** React Router path or absolute URL the button links to */
    link: string;
    /** Whether the link opens in a new tab @default '_self' */
    target?: "_blank" | "_self";
}   

export interface ModalSettings {
    /** Label displayed inside the button */
    text?: string;
    /** Button decoration (icon, arrow) or left blank for none */
    decoration?: BtnDecoration;
    /** */
    modalID: string;
    /** */
    modalContent: Omit<ModalProps, 'isOpen' | 'onClose'>;
}

export interface OnClickSettings {
    /** Label displayed inside the button */
    text?: string;
    /** Handler invoked when the button is clicked */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Text content, destination, and link behavior for a single button.
 *
 * @description
 * Intentionally style-free — pass this into `ButtonProps.btnSettings` alongside
 * separate `style` and `theme` props, or collect multiples into a `TwoButtonsArray`
 * / `ThreeButtonsArray` and let the group component assign styles automatically.
 *
 * @example Single Button
 * const btn: ButtonSettingProps = {
 *   text: "View Details",
 *   link: "/details",
 * };
 *
 * @example External link opening in a new tab
 * const btn: ButtonSettingProps = {
 *   text: "Our Registry",
 *   link: "https://registry.example.com",
 *   target: "_blank",
 * };
 *
 * @example Used in another type
 * type HeroProps = {
 *   heading: string;
 *   btn?: ButtonSettingProps;
 * };
 *
 * const hero: HeroProps = {
 *   heading: "Our Wedding",
 *   btn: {
 *     text: "View Details",
 *     link: "/details",
 *   },
 * };
 */

// export type LinkButtonSettings = {
//     type: 'link';
//     /** Label displayed inside the button */
//     text: string;
//     /** Button decoration (icon, arrow) or left blank for none */
//     decoration?: BtnDecoration;
//     /** React Router path or absolute URL the button links to */
//     link: string;
//     /** Whether the link opens in a new tab @default '_self' */
//     target?: "_blank" | "_self";
// }

export interface LinkButtonSettings extends LinkSettings {
    type: 'link';
     /** Label displayed inside the button */
    text: string;
    /** Button decoration (icon, arrow) or left blank for none */
    decoration?: BtnDecoration;
}

export interface ModalButtonSettings extends ModalSettings {
    type: 'modal';
     /** Label displayed inside the button */
    text: string;
    /** Button decoration (icon, arrow) or left blank for none */
    decoration?: BtnDecoration;
}

// export type ModalButtonSettings = {
//     type: 'modal';
//     /** Label displayed inside the button */
//     text: string;
//     /** Button decoration (icon, arrow) or left blank for none */
//     decoration?: BtnDecoration;
//     /** */
//     modalID: string;
//     /** */
//     modalContent: Omit<ModalProps, 'isOpen' | 'onClose'>;
// }

/**
 * Button for visual only (not clickable)
 * 
 */
export type VisualButtonSettings = {
    type: 'visual';
    /** Label displayed inside the button */
    text: string;
    /** Button decoration (icon, arrow) or left blank for none */
    decoration?: BtnDecoration;
}

export interface OnClickButtonSettings extends OnClickSettings {
    type: 'on-click';
    /** Label displayed inside the button */
    text: string;
    /** Button decoration (icon, arrow) or left blank for none */
    decoration?: BtnDecoration;
}

export type ButtonSettingProps = LinkButtonSettings | ModalButtonSettings | VisualButtonSettings | OnClickButtonSettings;

export type ButtonTypes = ButtonSettingProps['type'];

// export type ButtonSettingProps = {
//     /** Label displayed inside the button */
//     text: string;
//     /** Button decoration (icon, arrow) or left blank for none */
//     decoration?: BtnDecoration;
//     /** React Router path or absolute URL the button links to */
//     link: string;
//     /** Whether the link opens in a new tab @default '_self' */
//     target?: "_blank" | "_self";
// };

export type BtnSize = 'default' | 'small';

/**
 *
 */
export type ButtonProps = WithHTMLProps &
    WithA11yProps & {
        /** Text content and link destination */
        btnSettings: ButtonSettingProps;

        /** Visual style variant @default 'solid' */
        variant?: BtnVariants;
        /** Color theme applied to the button and arrow */
        colorScheme?: BtnColorScheme;
        /** Hover color override — must be a valid option for the chosen variant/colorScheme (see {@link HOVER_OPTIONS}), otherwise falls back to the default */
        hoverScheme?: BtnHoverToken;
        /** Adds optional full-width class */
        fullWidth?: boolean;
        /** */
        size?: BtnSize
    };


// export type ButtonWithDecorationProps = {

// }

// #region Button Variants and Variants Map

/**
 *
 */
export type BtnVariants = "solid" | "outline" | "lines";

/**
 *
 * @template N - The required number of elements
 */
export type BtnVariantMap<N extends number> = RequireX<BtnVariants, N>;

// #endregion

// #region Button Color Scheme and Theme Map

/**
 *
 */
export type BtnColorScheme = "cream" | "black" | 'burgundy' | 'cabernet';

/** Hover color tokens. Currently identical to `BtnColorScheme`, kept distinct in case a future hover shade isn't a full scheme on its own (e.g. a `gold-600`-style tint). */
export type BtnHoverToken = BtnColorScheme;

/**
 * Valid hover options per `(variant, colorScheme)` pair. The first entry in each array is
 * the default used when no `hoverScheme` is passed — see {@link resolveHoverScheme}.
 * A `variant`/`colorScheme` combo with no entry here (e.g. outline + black) gets no hover
 * color from this table at all.
 */
export const HOVER_OPTIONS = {
    solid: {
        cream: ["cabernet", "burgundy", "cream"],
        black: ["cabernet"],
        burgundy: ["cabernet"],
        cabernet: ["burgundy"],
    },
    outline: {
        cream: ["cabernet", "burgundy", "cream"],
        burgundy: ["cream"],
        cabernet: ["cream"],
    },
    lines: {
        cream: ["cream"],
        black: ["black"],
        burgundy: ["burgundy"],
        cabernet: ["cabernet"],
    },
} as const satisfies Partial<Record<BtnVariants, Partial<Record<BtnColorScheme, readonly BtnHoverToken[]>>>>;

/**
 * Resolves the effective hover token for a `variant`/`colorScheme` pair. An explicit
 * `hoverScheme` is honored only if it's a valid option for that pair — otherwise (including
 * when it's omitted) this falls back to the pair's default (the first entry in {@link HOVER_OPTIONS}).
 */
export function resolveHoverScheme(variant: BtnVariants, colorScheme: BtnColorScheme, hoverScheme?: BtnHoverToken): BtnHoverToken {
    const variantOptions = (HOVER_OPTIONS as Partial<Record<BtnVariants, Partial<Record<BtnColorScheme, readonly BtnHoverToken[]>>>>)[variant];
    const options: readonly BtnHoverToken[] = variantOptions?.[colorScheme] ?? [colorScheme];

    return hoverScheme && options.includes(hoverScheme) ? hoverScheme : options[0];
}


/**
 *
 * @template N - The required number of elements
 */
// export type BtnSchemeMap<N extends number> = RequireX<BtnColorScheme, N>;

// export type BtnFullSchemeMap<N extends number> = {
//   colorScheme: RequireX<BtnColorScheme, N>,
//   hoverScheme: RequireX<BtnColorScheme, N> 
// }

export type BtnSchemeMap<N extends number> = {
  kind: 'simple';
  scheme: RequireX<BtnColorScheme, N>;
};

export type BtnFullSchemeMap<N extends number> = {
  kind: 'full';
  colorScheme: BtnSchemeMap<N>;
  hoverScheme: BtnSchemeMap<N>;
};

export type BtnAnySchemeMap<N extends number> = BtnSchemeMap<N> | BtnFullSchemeMap<N>;

// #endregion

// #region Button Decoration
export type BtnArrowSettings = {
    type: 'arrow';
    arrowSide?: "left" | "right";
    arrowDirection?: ArrowDirectionProps;
};

type BtnIconSettings = {
    type: "icon";
    icon: Icon;
}

export type BtnDecoration = BtnArrowSettings | BtnIconSettings;

export type BtnDecorationMap<N extends number> = NonEmptyMaxX<BtnDecoration, N>;

export type BtnDecorationTypes = BtnDecoration['type'];

export const BTN_DECORATION_SIZE: Record<BtnSize, Record<BtnDecorationTypes, number>> = {
    default: {
        icon: 24,
        arrow: 20
    },
    small: {
        icon: 20,
        arrow: 18
    },
}

// #endregion

// #region Button Groups
export type TwoButtonsArray = NonEmptyMaxX<ButtonSettingProps, 2>;

export type TwoButtonsProps = WithHTMLProps & {
    buttons: TwoButtonsArray;

    customVariantMap?: BtnVariantMap<2>;
    customColorSchemeMap?: BtnAnySchemeMap<2>;
    customDecorationMap?: BtnDecorationMap<2>;
    noDecorationMap?: boolean;
};

/**
 * Type to have a three button array
 */
export type ThreeButtonsArray = NonEmptyMaxX<ButtonSettingProps, 3>;

export type ThreeButtonsProps = WithHTMLProps & {
    buttons: ThreeButtonsArray;

    customVariantMap?: BtnVariantMap<3>;
    customColorSchemeMap?: BtnAnySchemeMap<3>;
    customDecorationMap?: BtnDecorationMap<3>;
    noDecorationMap?: boolean;
};
// #endregion
