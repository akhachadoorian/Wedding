import React from "react";
import { CalculateClamp } from "../../hooks/calculateClamp";
import { ResponsiveClampSize } from "../../types/size";

import "./Drinks.scss";
import { DRINK_MAP, DrinksProps } from "./drinks.type";

const DEFAULT_DRINK_SIZE = {
    size: { 
        minSize: 150, 
        desiredSize: 225, 
        maxSize: 275 },
    mobileSize: {
        minSize: 100,
        desiredSize: 150,
        maxSize: 200,
    },
} as ResponsiveClampSize;

export default function Drinks({ 
    size = DEFAULT_DRINK_SIZE, 
    sizeHeight = true, 
    type = "martini",

    className, 
    style,
    ...htmlProps
}: DrinksProps) {
    // Convert sizes using the CalculateClamp function
    let desktopSize = size.size;
    let mobileSize =  size.mobileSize ? size.mobileSize : desktopSize;

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
        ...style
    } as React.CSSProperties;


    const DrinkComponent = DRINK_MAP[type];

    return (
        <div 
            {...htmlProps} 
            className={`drinks drinks-${type} ${className ?? ""}`} 
            style={sizeStyle}
        >
            <DrinkComponent />
        </div>
    );
}
