'use client'

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
import { LinkButtonSettings, LinkSettings, ModalSettings } from "@/types/buttons";

// #region --- Card ---------------------------------------------



export type CardProps = WithHTMLProps & {
    eyebrow?: string;
    title: string;
    body?: string;
    link?: LinkSettings,
    modal?: ModalSettings
};

export function Cards({
    eyebrow,
    title,
    body,
    link,
    modal,

    className,
    ...htmlProps
}: CardProps) {


    return (
        // <LenisLink {...htmlProps} href={link ?? "/"} className={`drink_card ${className ?? ""}`} target={target ?? "_self"}>
            
        // </LenisLink>
    );
}

// function 

// #endregion -------------------------------------------------------

// #region --- Card Grid ------------------------------------------

export type CardGridProps = WithHTMLProps & {
    cards: Array<CardProps>;
};

export default function CardGrid({
    cards,

    className,
    ref,
    ...htmlProps
}: CardGridProps) {
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", { stagger: 0.15, y: 24 });

    return (
        <div {...htmlProps} ref={mergeRefs(animRef, ref)} className="card_grid">
            {cards.map((d, idx) => (
                <Cards key={idx} className="mwc-animate" {...d} />
            ))}
        </div>
    );
}

// #endregion -------------------------------------------------------
