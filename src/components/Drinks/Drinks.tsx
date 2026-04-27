import React from "react";

import { CalculateClamp } from "../../hooks/calculateClamp";
import { ResponsiveClampSize, ResponsiveSize } from "../../types/size";
import Cocktail from "./svgs/Cocktail";
import Coupe from "./svgs/Coupe";
import Glass from "./svgs/Glass";
import Highball from "./svgs/Highball";
import Margarita from "./svgs/Margarita";
import Martini from "./svgs/Martini";
import Shaker from "./svgs/Shaker";
import Whiskey from "./svgs/Whiskey";
import Wine from "./svgs/Wine";

import "./Drinks.scss";

export type DrinkTypes = "cocktail" | "coupe" | "glass" | "highball" | "margarita" | "martini" | "shaker" | "whiskey" | "wine";

type DrinksProps = {
    className?: string;
    size?: ResponsiveClampSize;
    // size: ResponsiveSize;
    sizeHeight?: boolean; // whether size represents height or width
    type: DrinkTypes;
};

const defaultSize = {
    size: {
        minSize: 500,
        desiredSize: 600,
        maxSize: 700,
    },
    mobileSize: {
        minSize: 200,
        desiredSize: 300,
        maxSize: 400,
    },
} as ResponsiveClampSize;

export default function Drinks({ className, size, sizeHeight = true, type = "martini" }: DrinksProps) {
    // Convert sizes
    let desktopSize = size?.size ?? defaultSize.size;
    let mobileSize =  size?.mobileSize ? size.mobileSize : desktopSize;


    let desktopClampSize = CalculateClamp({ size: desktopSize, mobile: false });
    let mobileClampSize = CalculateClamp({ size: mobileSize, mobile: true });

    // Setup CSS variables depending on which size given
    const drinkWidth = sizeHeight ? "auto" : desktopClampSize;
    const drinkHeight = !sizeHeight ? 'auto' : desktopClampSize;

    const drinkWidthMobile = sizeHeight ? 'auto' : mobileClampSize;
    const drinkHeightMobile = !sizeHeight ? 'auto' : mobileClampSize;

    const sizeStyle = {
        "--drink-size-width": drinkWidth,
        "--drink-size-height": drinkHeight,
        "--drink-size-mobile-width": drinkWidthMobile,
        "--drink-size-mobile-height": drinkHeightMobile,
    } as React.CSSProperties;


    const DrinkMap: Record<string, React.ComponentType> = {
        cocktail: Cocktail,
        coupe: Coupe,
        glass: Glass,
        highball: Highball,
        margarita: Margarita,
        martini: Martini,
        shaker: Shaker,
        whiskey: Whiskey,
        wine: Wine,
    };

    const DrinkComponent = DrinkMap[type];

    return (
        <div className={`drinks-wrapper drinks-${type} ${className ?? ""}`} style={sizeStyle}>
            <DrinkComponent />
        </div>
    );
}
