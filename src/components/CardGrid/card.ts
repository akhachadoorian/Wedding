import { LinkSettings, ModalSettings } from "@/types/buttons";
import { WithHTMLProps } from "@/types/props";

export type LinkCardsProps = WithHTMLProps & {
    type: "link";
    linkSettings: LinkSettings;
};

export type ModalCardsProps = WithHTMLProps & {
    type: "modal";
    modalSettings: ModalSettings;
};

export type VisualCardsProps = WithHTMLProps & {
    type: "visual";
};

export type CardTypeProps = LinkCardsProps | ModalCardsProps | VisualCardsProps;