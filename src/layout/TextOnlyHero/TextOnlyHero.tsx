import React from "react";

import { ThreeButtons } from "../../components/Buttons/ButtonGroups";
import Eyebrow from "../../components/Eyebrow/Eyebrow";
import { ThreeButtonsArray } from "../../types/buttons";

import "./TextOnlyHero.scss";

type TextOnlyHeroStyleProps = {
    variation?: "left" | "center" | "columns";
    theme?: 'default' | 'black' | 'art-deco-bg';
    inset?: boolean;
};

const DEFAULT_STYLE = {
    variation: "left",
    theme: 'default',
    inset: false,
} satisfies TextOnlyHeroStyleProps;

export type TextOnlyHeroProps = {
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

export default function TextOnlyHero({ loaded, styleOptions, eyebrow, header, subtitle, body, buttons }: TextOnlyHeroProps) {

    return (
        <section className={`text_only_hero-section text_only_hero-theme-${styleOptions?.theme || DEFAULT_STYLE.theme} ${styleOptions?.inset ? 'inset' : ''} ${loaded ? "is-loaded" : "is-hidden"} `}>

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

// ---- Sub-components --------------------------------------------------------

function CenterTextOnlyHero({ eyebrow, header, subtitle, body, buttons }: { eyebrow?: string; header: string; subtitle?: string; body?: string; buttons?: ThreeButtonsArray }) {
    return (
        <div className={`text_only_hero text_only_hero-variation-center`}>
            {eyebrow && <Eyebrow className={"text_only_hero-eyebrow"} text={eyebrow} styleOptions={{ variation: "center" }} />}

            <h1 className="text_only_hero-header">{header}</h1>

            {subtitle && <p className="subtitle text_only_hero-subtitle">{subtitle}</p>}

            {body && <p className="text_only_hero-body body-l">{body}</p>}

            {buttons && <ThreeButtons className="text_only_hero-btns btns" noDecorationMap={true} buttons={buttons ?? []} />}
        </div>
    );
}

function LeftTextOnlyHero({ eyebrow, header, subtitle, body, buttons }: { eyebrow?: string; header: string; subtitle?: string; body?: string; buttons?: ThreeButtonsArray }) {
    return (
        <div className={`text_only_hero text_only_hero-variation-left`}>
            {eyebrow && <Eyebrow className={"text_only_hero-eyebrow"} text={eyebrow} styleOptions={{ variation: "left" }} />}

            <h1 className="text_only_hero-header">{header}</h1>

            {subtitle && <p className="subtitle text_only_hero-subtitle">{subtitle}</p>}

            {body && <p className="text_only_hero-body body-l">{body}</p>}

            {buttons && <ThreeButtons className="text_only_hero-btns btns" noDecorationMap={true} buttons={buttons ?? []} />}
        </div>
    );
}

function ColumnsTextOnlyHero({ eyebrow, header, subtitle, body, buttons }: { eyebrow?: string; header: string; subtitle?: string; body?: string; buttons?: ThreeButtonsArray }) {
    return (
        <div className={`text_only_hero text_only_hero-variation-columns`}>
            <div className="text_only_hero-variation-columns-left">
                {eyebrow && <Eyebrow className={"text_only_hero-eyebrow"} text={eyebrow} styleOptions={{ variation: "left" }} />}

                <h1 className="text_only_hero-header">{header}</h1>
            </div>
            {(subtitle || body || buttons) && (
                <div className="text_only_hero-variation-columns-right">
                    {subtitle && <p className="subtitle text_only_hero-subtitle">{subtitle}</p>}

                    {body && <p className="text_only_hero-body body-l">{body}</p>}

                    {buttons && <ThreeButtons className="text_only_hero-btns btns" noDecorationMap={true} buttons={buttons ?? []} />}
                </div>
            )}
        </div>
    );
}
