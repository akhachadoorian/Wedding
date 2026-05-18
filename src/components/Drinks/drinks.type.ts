import React from "react";

import { WithHTMLProps } from "../../types/props";
import { ResponsiveClampSize } from "../../types/size";
import Cocktail from "./svgs/Cocktail";
import Coupe from "./svgs/Coupe";
import Glass from "./svgs/Glass";
import Highball from "./svgs/Highball";
import Margarita from "./svgs/Margarita";
import Martini from "./svgs/Martini";
import Shaker from "./svgs/Shaker";
import Whiskey from "./svgs/Whiskey";
import Wine from "./svgs/Wine";

// #region --- Component Props ----------------------------------

/** 
 * Map of drink type keys to their SVG components.
 * 
 * @constant `as const` is required so {@link DrinkTypes} resolves to a key union rather than `string`.
 * 
 */
export const DRINK_MAP = {
    /** Standard cocktail glass */
    cocktail: Cocktail,
    /** Coupe glass */
    coupe: Coupe,
    /**  */
    glass: Glass,
    /**  */
    highball: Highball,
    /**  */
    margarita: Margarita,
    /**  */
    martini: Martini,
    /**  */
    shaker: Shaker,
    /**  */
    whiskey: Whiskey,
    /**  */
    wine: Wine,
} as const;

/**
 * Specifies the type of drink SVG.
 * Derived from {@link DRINK_MAP} — add a new entry there to extend this type.
 */
export type DrinkTypes = keyof typeof DRINK_MAP;


export type DrinksProps = WithHTMLProps & {
    size?: ResponsiveClampSize;
    sizeHeight?: boolean; // whether size represents height or width
    type: DrinkTypes;
};

// #endregion ------------------------------------------------

// #region --- Drink Config ----------------------------------

type DrinkPosition = {
    x: number | string;
    y: number | string;
    rotate: number;
};

export type DrinkConfig = {
    type: DrinkTypes;
    desktopPosition: DrinkPosition;
    mobilePosition: DrinkPosition;
};

// #endregion ------------------------------------------------