import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import { MaxTwo } from "../../types/utility";
import ArrowBox from "../ArrowBox/ArrowBox";
import Drinks, { DrinkTypes } from "../Drinks/Drinks";

import "./DrinkCardGrid.scss";
import { ResponsiveClampSize } from "../../types/size";
import { LenisLink } from "../../hooks/LenisLink";

type DrinkSettings = {
    type: DrinkTypes;
    rotate: "small" | "medium" | "large";
    rotateNeg: boolean;
    hoverHeight: "low" | "medium" | "high";
};

export type DrinkCardProps = {
    eyebrow?: string;
    title: string;
    body?: string;
    link?: string;
    target?: "_blank" | "_self";

    drinks?: MaxTwo<DrinkSettings>;
};

export type DrinkCardGridProps = {
    drinkCards: Array<DrinkCardProps>;
};

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



export function DrinkCards({ eyebrow, title, body, link, target, drinks }: DrinkCardProps) {
    const drinkLeft  = drinks?.[0] ?? DEFAULT_DRINK_LEFT;
    const drinkRight = drinks?.[1] ?? DEFAULT_DRINK_RIGHT;

    const leftRotateClass = `rotate-${drinkLeft.rotate}${drinkLeft.rotateNeg ? '-inverse' : ''}`;
    const rightRotateClass = `rotate-${drinkRight.rotate}${drinkRight.rotateNeg ? '-inverse' : ''}`;

    const leftHoverHeightClass = `hover_height-${drinkLeft.hoverHeight}`;
    const rightHoverHeightClass = `hover_height-${drinkRight.hoverHeight}`;

    const drinkSize = {
        size: {
            minSize: 120,
            desiredSize: 150,
            maxSize: 170,
        }
    } as ResponsiveClampSize;

    return (
        <LenisLink to={link ?? "/"} className="drink_card-wrapper" target={target ?? "_self"}>
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

export default function DrinkCardGrid({ drinkCards }: DrinkCardGridProps) {
    return (
        <div className="drink_card_grid-wrapper">
            <div className="drink_card_grid">
                {drinkCards.map((d, idx) => (
                    <DrinkCards key={idx} {...d} />
                ))}
            </div>
        </div>
    );
}
