"use client";

import ReactMarkdown from "react-markdown";

import { LenisLink } from "../../hooks/LenisLink";
import mergeRefs from "../../hooks/mergeRefs";
import { useFadeInChildren } from "../../hooks/useFadeIn";
import { WithHTMLProps } from "../../types/props";

import "./CardGrid.scss";
import { LinkSettings, ModalSettings } from "@/types/buttons";
import ArrowBox from "../ArrowBox/ArrowBox";
import { useState } from "react";
import Modal from "../Modal/Modal";

// #region --- Card ---------------------------------------------

// type CardType = 'link' | 'modal' | 'visual';

type CardTextProps = {
    eyebrow?: string;
    title: string;
    body: string;
    letter?: string;
};

type LinkCardsProps = WithHTMLProps & {
    type: "link";
    // text: CardTextProps;
    linkSettings: LinkSettings;
};

type ModalCardsProps = WithHTMLProps & {
    type: "modal";
    // text: CardTextProps;
    modalSettings: ModalSettings;
};

type VisualCardsProps = WithHTMLProps & {
    type: "visual";
};

type CardTypeProps = LinkCardsProps | ModalCardsProps | VisualCardsProps;

type CardProps = WithHTMLProps & {
    text: CardTextProps;
    cardType: CardTypeProps;
};

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
            className={`card link_card ${className ?? ""}`}
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
        <>
            <button onClick={() => setModalOpen(true)} className={`card modal_card ${className ?? ""}`}>
                <CardContent text={text} includeArrow={true} />
            </button>

            <Modal {...modalSettings.modalContent} id={modalSettings.modalID} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}

type VisualCardProps = WithHTMLProps & {
    text: CardTextProps;
};

function VisualCard({ text, className, ...htmlProps }: VisualCardProps) {
    return (
        <div {...htmlProps} className={`card visual_card ${className ?? ""}`}>
            <CardContent text={text} includeArrow={true} />
        </div>
    );
}

type CardContentProps = {
    text: CardTextProps;
    includeArrow: boolean;
};

function CardContent({ text, includeArrow = false }: CardContentProps) {
    const { eyebrow, title, body } = text;
    const letter = text.letter ?? title.charAt(0);

    return (
        <>
            <div className="card-text">
                <div className="card-upper">
                    <div className="card-upper-text">
                        {eyebrow && <p className="eyebrow">{eyebrow}</p>}

                        <p className="heading-m">{title}</p>
                    </div>

                    {includeArrow && <ArrowBox />}
                </div>

                <p className="">{body}</p>
            </div>

            <p className="card-letter">{letter}</p>
        </>
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
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

    return (
        <div {...htmlProps} ref={mergeRefs(animRef, ref)} className="card_grid">
            {cards.map((d, idx) => (
                <Cards 
                    key={idx} 
                    className="mwc-animate" 
                    {...d} 
                />
            ))}
        </div>
    );
}

// #endregion -------------------------------------------------------
