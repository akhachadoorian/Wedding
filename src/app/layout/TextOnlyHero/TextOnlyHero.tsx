import React from "react";

import { ThreeButtons } from "../../components/Buttons/ButtonGroups";
import Eyebrow from "../../components/Eyebrow/Eyebrow";
import { ThreeButtonsArray } from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";

import "./TextOnlyHero.scss";

type TextOnlyHeroStyleProps = {
    variation: "left" | "center" | "columns";
    theme: "default" | "black" | "art-deco-bg";
    inset?: boolean;
};

const DEFAULT_STYLE = {
    variation: "left",
    theme: "default",
    inset: false,
} satisfies TextOnlyHeroStyleProps;

export type TextOnlyHeroProps = WithHTMLProps & {
    loaded: boolean;

    // Style Options
    styleOptions?: TextOnlyHeroStyleProps;

    // Fields
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
};

export default function TextOnlyHero({
    loaded,
    styleOptions = DEFAULT_STYLE,

    eyebrow,
    header,
    subtitle,
    body,
    buttons,

    className,
    ...htmlProps
}: TextOnlyHeroProps) {
    return (
        <section {...htmlProps} className={`text_only_hero-section text_only_hero-theme-${styleOptions.theme} ${styleOptions.inset ? "inset" : ""} ${loaded ? "is-loaded" : "is-hidden"} `}>
            <div className={`text_only_hero-wrapper`}>
                {styleOptions?.variation === "columns" ? (
                    <ColumnsTextOnlyHero eyebrow={eyebrow} header={header} subtitle={subtitle} body={body} buttons={buttons} />
                ) : styleOptions?.variation === "center" ? (
                    <CenterTextOnlyHero eyebrow={eyebrow} header={header} subtitle={subtitle} body={body} buttons={buttons} />
                ) : (
                    <LeftTextOnlyHero eyebrow={eyebrow} header={header} subtitle={subtitle} body={body} buttons={buttons} />
                )}
            </div>
        </section>
    );
}

// #region --- Sub-components --------------------------------------------------------

function LeftContentTextOnlyHero({
    eyebrowVariation,
    eyebrow, 
    header,
}: { 
    eyebrowVariation?: 'center' | 'left';
    eyebrow?: string; 
    header: string;
}) {
    return (
        <>
            {eyebrow && <Eyebrow className={`text_only_hero-eyebrow`} text={eyebrow} styleOptions={{ variation: eyebrowVariation ?? 'left' }} />}

            <h1 className={`text_only_hero-header`}>{header}</h1>
        </>
    )
}

function RightContentTextOnlyHero({
    subtitle, 
    body, 
    buttons
}:{
    subtitle?: string; 
    body?: string; 
    buttons?: ThreeButtonsArray
}) {
    if (!subtitle && !body && !buttons) return;

    return (
        <>
            {subtitle && <p className="subtitle-extra text_only_hero-subtitle">{subtitle}</p>}

            {body && <p className="text_only_hero-body body-l">{body}</p>}

            {buttons && <ThreeButtons className="text_only_hero-btns btns" noDecorationMap={true} buttons={buttons ?? []} />}
        </>
    )
}

function CenterTextOnlyHero({ eyebrow, header, subtitle, body, buttons }: { eyebrow?: string; header: string; subtitle?: string; body?: string; buttons?: ThreeButtonsArray }) {
    return (
        <div className={`text_only_hero text_only_hero-variation-center`}>
            <LeftContentTextOnlyHero eyebrowVariation="center" eyebrow={eyebrow} header={header} />

            <RightContentTextOnlyHero subtitle={subtitle} body={body} buttons={buttons} />
        </div>
    );
}

function LeftTextOnlyHero({ eyebrow, header, subtitle, body, buttons }: { eyebrow?: string; header: string; subtitle?: string; body?: string; buttons?: ThreeButtonsArray }) {
    return (
        <div className={`text_only_hero text_only_hero-variation-left`}>

            <LeftContentTextOnlyHero eyebrowVariation="left" eyebrow={eyebrow} header={header} />

            <RightContentTextOnlyHero subtitle={subtitle} body={body} buttons={buttons} />
        </div>
    );
}

function ColumnsTextOnlyHero({ eyebrow, header, subtitle, body, buttons }: { eyebrow?: string; header: string; subtitle?: string; body?: string; buttons?: ThreeButtonsArray }) {
    return (
        <div className={`text_only_hero text_only_hero-variation-columns`}>
            <div className="text_only_hero-variation-columns-left">
                <LeftContentTextOnlyHero eyebrowVariation="left" eyebrow={eyebrow} header={header} />
            </div>
            {(subtitle || body || buttons) && (
                <div className="text_only_hero-variation-columns-right">
                    <RightContentTextOnlyHero subtitle={subtitle} body={body} buttons={buttons} />
                </div>
            )}
        </div>
    );
}
// #endregion ----------------------------------------------------------
