import { ArrowDirectionProps } from "../components/ArrowBox/ArrowBox";
import { WithA11yProps, WithHTMLProps } from "./props";
import { NonEmptyMaxX, RequireX } from "./utility";
import { Icon } from "@phosphor-icons/react";

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

type LinkButtonSettings = {
    type: 'link';
    /** Label displayed inside the button */
    text: string;
    /** Button decoration (icon, arrow) or left blank for none */
    decoration?: BtnDecoration;
    /** React Router path or absolute URL the button links to */
    link: string;
    /** Whether the link opens in a new tab @default '_self' */
    target?: "_blank" | "_self";
}

type ModalButtonSettings = {
    type: 'modal';
    /** Label displayed inside the button */
    text: string;
    /** Button decoration (icon, arrow) or left blank for none */
    decoration?: BtnDecoration;
    /** */
    modalID: string;
}

// export type ButtonSettingProps = LinkButtonSettings | ModalButtonSettings;

export type ButtonSettingProps = {
    /** Label displayed inside the button */
    text: string;
    /** Button decoration (icon, arrow) or left blank for none */
    decoration?: BtnDecoration;
    /** React Router path or absolute URL the button links to */
    link: string;
    /** Whether the link opens in a new tab @default '_self' */
    target?: "_blank" | "_self";
};


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
        /** */
        decoration?: BtnDecoration;  // omit for no decoration
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
export type BtnColorScheme = "gold" | "cream" | "black";

/**
 *
 * @template N - The required number of elements
 */
export type BtnColorSchemeMap<N extends number> = RequireX<BtnColorScheme, N>;
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

type BtnDecoration = BtnArrowSettings | BtnIconSettings;

export type BtnDecorationMap<N extends number> = NonEmptyMaxX<BtnDecoration, N>;

// #endregion 

// #region Button Groups
export type TwoButtonsArray = NonEmptyMaxX<ButtonSettingProps, 2>;

export type TwoButtonsProps = WithHTMLProps & {
    buttons: TwoButtonsArray;

    customVariantMap?: BtnVariantMap<2>;
    customColorSchemeMap?: BtnColorSchemeMap<2>;
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
    customColorSchemeMap?: BtnColorSchemeMap<3>;
    customDecorationMap?: BtnDecorationMap<3>;
    noDecorationMap?: boolean;
};
// #endregion