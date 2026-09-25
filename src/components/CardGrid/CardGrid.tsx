"use client";


import { LenisLink } from "../../hooks/LenisLink";
import mergeRefs from "../../hooks/mergeRefs";
import { useFadeInChildren } from "../../hooks/useFadeIn";
import { WithHTMLProps } from "../../types/props";

import CenteredModal from "@/components/Modal/CenteredModal";
import { LinkSettings, ModalSettings } from "@/types/buttons";
import { useState } from "react";
import ArrowBox, { ARROW_HOVER_GROUP } from "../ArrowBox";
import { cn } from "../../utils/cn";
import { CardTypeProps } from "./card";

// #region --- Card ---------------------------------------------

const CARD = "relative overflow-hidden";

// Clickable cards lift, turn cabernet, nudge the letter up, and slide their arrow on hover.
const CARD_HOVER = `group/card ${ARROW_HOVER_GROUP} transition-transform duration-300 ease-in-out hover:-translate-y-[5px] hover:cursor-pointer`;

// #region --- Types ---------------------------------------------
type CardTextProps = {
    eyebrow?: string;
    title: string;
    body?: string;
    letter?: string;
};


type CardProps = WithHTMLProps & {
    text: CardTextProps;
    cardType: CardTypeProps;
};

// #endregion ---

export function Cards({
    cardType,
    text,

    ...htmlProps
}: CardProps) {
    switch (cardType.type) {
        case "link":
            return (
                <LinkCard
                    text={text}
                    linkSettings={cardType.linkSettings}
                    {...htmlProps}
                />
            );
        case "modal":
            return (
                <ModalCard
                    text={text}
                    modalSettings={cardType.modalSettings}
                    {...htmlProps}
                />
            );
        case "visual":
            return <VisualCard text={text} {...htmlProps} />;
    }
}

// #region --- Sub Card Components ---------------------------------------------
type LinkCardProps = WithHTMLProps & {
    text: CardTextProps;
    linkSettings: LinkSettings;
};

function LinkCard({
    text,
    linkSettings,
    className,
    ...htmlProps
}: LinkCardProps) {
    return (
        <LenisLink
            {...htmlProps}
            className={cn(CARD, CARD_HOVER, "no-underline", className)}
            href={linkSettings.link ?? "/"}
            target={linkSettings.target ?? "_self"}
        >
            <CardContent text={text} includeArrow={true} />
        </LenisLink>
    );
}

type ModalCardProps = WithHTMLProps & {
    text: CardTextProps;
    modalSettings: ModalSettings;
};

function ModalCard({
    text,
    modalSettings,
    className,
    ...htmlProps
}: ModalCardProps) {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div {...htmlProps} className={cn("transition-transform duration-300 ease-in-out", className)}>
            <button  onClick={() => setModalOpen(true)} className={cn(CARD, CARD_HOVER, "appearance-none border-none w-full h-full p-0 text-left")}>
                <CardContent text={text} includeArrow={true} />
            </button>

            <CenteredModal {...modalSettings.modalContent} id={modalSettings.modalID} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

type VisualCardProps = WithHTMLProps & {
    text: CardTextProps;
};

function VisualCard({ text, className, ...htmlProps }: VisualCardProps) {
    return (
        <div {...htmlProps} className={cn(CARD, className)}>
            <CardContent text={text} includeArrow={true} />
        </div>
    );
}

// #endregion ---

// #region --- Card Content Components ---------------------------------------------

type CardContentProps = {
    text: CardTextProps;
    includeArrow: boolean;
};

function CardContent({ text, includeArrow = false }: CardContentProps) {
    const { eyebrow, title, body } = text;
    const letter = text.letter ?? title.charAt(0);

    return (
        <>
            <div className="flex flex-col justify-between gap-200 h-full min-h-[180px] p-500 bg-black text-cream transition-all duration-300 ease-in-out md:min-h-[281px] group-hover/card:bg-cabernet">
                <div className="relative z-2 flex justify-between">
                    <div className="flex flex-col gap-200">
                        {eyebrow && <p className="eyebrow">{eyebrow}</p>}

                        <p className="heading-m">{title}</p>
                    </div>

                    {includeArrow && <ArrowBox size={26} />}
                </div>

                {body && <p className="font-sans text-base">{body}</p>}
            </div>

            <p className="absolute z-1 -right-[15px] -bottom-[15px] font-goth text-[170px] leading-none uppercase text-cream opacity-15 transition-all duration-300 ease-in-out md:-right-[25px] md:-bottom-[25px] md:text-[200px] group-hover/card:-bottom-5">
                {letter}
            </p>
        </>
    );
}

// #endregion ---

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
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

    return (
        <div {...htmlProps} ref={mergeRefs(animRef, ref)} className="flex flex-wrap gap-400 md:gap-col-gutter">
            {cards.map((d, idx) => (
                <Cards 
                    key={idx} 
                    className="mwc-animate flex-[1_0_350px] md:flex-[1_0_420px]"
                    {...d} 
                />
            ))}
        </div>
    );
}

// #endregion -------------------------------------------------------
