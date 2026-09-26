import { LenisLink } from "@/hooks/LenisLink";
import CenteredModal from "../Modal/CenteredModal";
import { useState } from "react";
import { LinkSettings, ModalSettings } from "@/types/buttons";
import { Icon } from "@phosphor-icons/react";
import { NonEmptyArray } from "@/types/utility";
import { CardTypeProps, LinkCardsProps } from "./card";
import ArrowBox, { ARROW_HOVER_GROUP } from "../ArrowBox";
import { cn } from "@/utils/cn";

const MINI_CARD =
    "relative block box-border w-full m-150 appearance-none bg-transparent border-none p-0 text-cream text-left no-underline cursor-pointer transition-all duration-300 ease-in-out";

// Clickable mini cards lift and turn burgundy on hover.
const MINI_CARD_HOVER = `group/mini ${ARROW_HOVER_GROUP} hover:-translate-y-[2.5px]`;

const MINI_CARD_FRAME = "absolute border-2 border-cabernet transition-all duration-300 ease-in-out group-hover/mini:border-burgundy";

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
                    className={cn(MINI_CARD, MINI_CARD_HOVER)}
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
                className={cn(MINI_CARD, MINI_CARD_HOVER)}
            >
                <VenueMiniCardInner icon={icon} title={title} body={body} />
            </LenisLink>
        );
    }

    return (
        <div className={MINI_CARD}>
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
            <div className={cn(MINI_CARD_FRAME, "-top-150 right-150 bottom-150 -left-150")} />
            <div className={cn(MINI_CARD_FRAME, "top-150 -right-150 -bottom-150 left-150")} />

            <div className="relative z-2 flex flex-col gap-100 bg-cabernet px-500 py-300 transition-all duration-300 ease-in-out group-hover/mini:bg-burgundy">
                <div className="flex justify-between gap-100">
                    {/* <IconComp
                    className="text-[color:var(--cream-500)] transition-all duration-300 ease-in-out group-hover/mini:text-cream"
                    size={22}
                    weight="light"
                /> */}

                    <p className="mt-100 text-cream heading-xs">{title}</p>

                    <ArrowBox />
                </div>

                <p className="text-[color:var(--cream-700)] body-xs">{body}</p>
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
