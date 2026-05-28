import ReactMarkdown from "react-markdown";

import { LenisLink } from "../../hooks/LenisLink";
import mergeRefs from "../../hooks/mergeRefs";
import { useFadeInChildren } from "../../hooks/useFadeIn";
import { WithHTMLProps } from "../../types/props";
import { ResponsiveClampSize } from "../../types/size";
import { MaxX } from "../../types/utility";
import ArrowBox from "../ArrowBox/ArrowBox";
import Drinks from "../Drinks/Drinks";
import { DrinkTypes } from "../Drinks/drinks.type";

import "./DrinkCardGrid.scss";

// #region --- Drink Card ---------------------------------------------

// #region --- Drink Defaults ------------------------

const DEFAULT_DRINK_LEFT = {
    type: "cocktail",
    rotate: "medium",
    rotateNeg: false,
    hoverHeight: "low",
} as DrinkSettings;

const DEFAULT_DRINK_RIGHT = {
    type: "coupe",
    rotate: "medium",
    rotateNeg: false,
    hoverHeight: "low",
} as DrinkSettings;

// #endregion ------------------------------------

type DrinkSettings = {
    type: DrinkTypes;
    rotate: "small" | "medium" | "large";
    rotateNeg: boolean;
    hoverHeight: "low" | "medium" | "high";
};

export type DrinkCardProps = WithHTMLProps & {
    eyebrow?: string;
    title: string;
    body?: string;
    link?: string;
    target?: "_blank" | "_self";

    drinks?: MaxX<DrinkSettings, 2>;
};

export function DrinkCards({
    eyebrow,
    title,
    body,
    link,
    target,
    drinks,

    className,
    ...htmlProps
}: DrinkCardProps) {
    const drinkLeft = drinks?.[0] ?? DEFAULT_DRINK_LEFT;
    const drinkRight = drinks?.[1] ?? DEFAULT_DRINK_RIGHT;

    const leftRotateClass = `rotate-${drinkLeft.rotate}${drinkLeft.rotateNeg ? "-inverse" : ""}`;
    const rightRotateClass = `rotate-${drinkRight.rotate}${drinkRight.rotateNeg ? "-inverse" : ""}`;

    const leftHoverHeightClass = `hover_height-${drinkLeft.hoverHeight}`;
    const rightHoverHeightClass = `hover_height-${drinkRight.hoverHeight}`;

    const drinkSize = {
        size: {
            minSize: 120,
            desiredSize: 150,
            maxSize: 170,
        },
    } as ResponsiveClampSize;

    return (
        <LenisLink {...htmlProps} to={link ?? "/"} className={`drink_card ${className ?? ""}`} target={target ?? "_self"}>
            <div className="drink_card-inner">
                <div className="drink_card-upper">
                    <div className="drink_card-text">
                        {eyebrow && <p className="eyebrow gold">{eyebrow}</p>}

                        <p className="heading-s">{title}</p>
                    </div>

                    <ArrowBox />
                </div>

                {body && <ReactMarkdown components={{ p: ({ children }) => <p className="drink_card-body body-xs body-md ">{children}</p> }}>{body}</ReactMarkdown>}
            </div>

            <div className="drink_card-drinks">
                <div className="drink_card-drinks-left">
                    <Drinks className={`left-drink ${leftRotateClass} ${leftHoverHeightClass}`} type={drinkLeft.type} sizeHeight={true} size={drinkSize} />
                </div>
                <div className="drink_card-drinks-right">
                    <Drinks className={`right-drink ${rightRotateClass}  ${rightHoverHeightClass}`} type={drinkRight.type} sizeHeight={true} size={drinkSize} />
                </div>
            </div>
        </LenisLink>
    );
}

// #endregion -------------------------------------------------------

// #region --- Drink Card Grid ------------------------------------------

export type DrinkCardGridProps = WithHTMLProps & {
    drinkCards: Array<DrinkCardProps>;
};

export default function DrinkCardGrid({
    drinkCards,

    className,
    ref,
    ...htmlProps
}: DrinkCardGridProps) {
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", { stagger: 0.15, y: 24 });

    return (
        <div {...htmlProps} ref={mergeRefs(animRef, ref)} className="drink_card_grid">
            {drinkCards.map((d, idx) => (
                <DrinkCards key={idx} className="mwc-animate" {...d} />
            ))}
        </div>
    );
}

// #endregion -------------------------------------------------------
