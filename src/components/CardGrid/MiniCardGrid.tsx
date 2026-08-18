import { LenisLink } from "@/hooks/LenisLink";
import CenteredModal from "../Modal/CenteredModal";
import { useState } from "react";
import { LinkSettings, ModalSettings } from "@/types/buttons";
import { Icon } from "@phosphor-icons/react";
import { NonEmptyArray } from "@/types/utility";
import "./MiniCard.scss";
import { CardTypeProps, LinkCardsProps } from "./card";
import ArrowBox from "../ArrowBox/ArrowBox";

export type MiniCardData = {
    icon: Icon;
    title: string;
    body: string;
    cardType: CardTypeProps;
};

export function MiniCard({ icon, title, body, cardType }: MiniCardData) {
    const [modalOpen, setModalOpen] = useState(false);

    if (cardType.type === "modal") {
        return (
            <>
                <button
                    type="button"
                    className="mini_card mini_card-hover"
                    onClick={() => setModalOpen(true)}
                >
                    <VenueMiniCardInner icon={icon} title={title} body={body} />
                </button>

                <CenteredModal
                    {...cardType.modalSettings.modalContent}
                    id={cardType.modalSettings.modalID}
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            </>
        );
    }

    if (cardType.type === "link") {
        return (
            <LenisLink
                href={cardType.linkSettings.link}
                target={cardType.linkSettings.target ?? "_self"}
                className="mini_card mini_card-hover"
            >
                <VenueMiniCardInner icon={icon} title={title} body={body} />
            </LenisLink>
        );
    }

    return (
        <div className="mini_card">
            <VenueMiniCardInner icon={icon} title={title} body={body} />
        </div>
    );
}

function VenueMiniCardInner({
    icon: IconComp,
    title,
    body,
}: Pick<MiniCardData, "icon" | "title" | "body">) {
    return (
        <>
            <div className="mini_card-frame mini_card-frame-a" />
            <div className="mini_card-frame mini_card-frame-b" />

            <div className="mini_card-content">
                <div className="flex justify-between gap-100">
                    {/* <IconComp
                    className="mini_card-icon"
                    size={22}
                    weight="light"
                /> */}

                    <p className="mini_card-title heading-xs">{title}</p>

                    <ArrowBox />
                </div>

                <p className="mini_card-body body-xs">{body}</p>
            </div>
        </>
    );
}

export type MiniCardGridProps = {
    miniCards: NonEmptyArray<MiniCardData>;
    variant?: "row" | "col";
};

export default function MiniCardGrid({
    miniCards,
    variant = "col",
}: MiniCardGridProps) {
    return (
        <div
            className={`mini_cards flex ${variant === "row" ? "flex-col gap-500 md:flex-row md:gap-col-gutter" : "flex-col gap-500 "}`}
        >
            {miniCards.map((card) => (
                <MiniCard key={card.title} {...card} />
            ))}
        </div>
    );
}
