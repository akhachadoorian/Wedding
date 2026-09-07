'use client'

import { CalculateClamp } from "../../hooks/calculateClamp";
import { ColorVariables } from "../../types/colors";
import { WithHTMLProps } from "../../types/props";
import { ResponsiveClampSize } from "../../types/size";
import Fan from "./svgs/Sunrise";

import "./ArtDecoIcon.scss";
import Rounded from "./svgs/Rounded";
import Sunrise from "./svgs/Sunrise";

const ART_DECO_ICON_MAP = {
    fan: Fan,
    sunrise: Sunrise,
    rounded: Rounded
} as const;

export type ArtDecoIconTypeProps = keyof typeof ART_DECO_ICON_MAP;

type ArtDecoIconProps = WithHTMLProps & {
    type: ArtDecoIconTypeProps;
    size?: ResponsiveClampSize;
};

const DEFAULT_ICON_SIZE = {
    size: {
        minSize: 150,
        desiredSize: 175,
        maxSize: 200,
    },
    // mobileSize: {
    //     minSize: 100,
    //     desiredSize: 150,
    //     maxSize: 200,
    // },
} as ResponsiveClampSize;

export default function ArtDecoIcon({
    type,
    size = DEFAULT_ICON_SIZE,

    className,
    style,
    ...htmlProps
}: ArtDecoIconProps) {
    // Convert sizes using the CalculateClamp function
    let desktopSize = size.size;
    let mobileSize = size.mobileSize ? size.mobileSize : desktopSize;

    let desktopClampSize = CalculateClamp({ size: desktopSize, mobile: false });
    let mobileClampSize = CalculateClamp({ size: mobileSize, mobile: true });

    const sizeStyle = {
        "--icon-size-width": desktopClampSize,
        // "--drink-size-height": desktopClampSize,
        "--icon-size-mobile-width": mobileClampSize,
        // "--drink-size-mobile-height": mobileClampSize,
        ...style,
    } as React.CSSProperties;

    const Icon = ART_DECO_ICON_MAP[type];

    return (
        <div {...htmlProps} className={`art_deco_icon ${className ?? ""}`} style={sizeStyle}>
            <Icon colorScheme="gold" />
        </div>
    );
}

export type ArtDecoSVG = {
    colorScheme?: "gold";
};
