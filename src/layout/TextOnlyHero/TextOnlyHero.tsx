"use client";

import React from "react";

import { ThreeButtons } from "../../components/Buttons/ButtonGroups";
import Eyebrow from "../../components/Eyebrow/Eyebrow";
import { BtnColorSchemeMap, ThreeButtonsArray } from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";

import "./TextOnlyHero.scss";

type TextOnlyHeroThemes = "default" | "black" | "black_gradient";

type TextOnlyHeroStyleProps = {
    variation?: "left" | "center" | "columns";
    theme?: TextOnlyHeroThemes;
    // theme?: "default" | "black" | "art-deco-bg";
    // inset?: boolean;
};

const DEFAULT_STYLE = {
    variation: "left",
    theme: "default",
    // inset: false,
} satisfies TextOnlyHeroStyleProps;

const THEME_COLOR_MAPS: Record<TextOnlyHeroThemes, BtnColorSchemeMap<3>> = {
    default: ["gold", "gold", "gold"],
    black: ["gold", "gold", "gold"],
    black_gradient: ["gold", "gold", "gold"],
};

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
    const theme = styleOptions.theme ?? DEFAULT_STYLE.theme;
    const variation = styleOptions.variation ?? DEFAULT_STYLE.variation;

    return (
        <section
            {...htmlProps}
            className={`text_only_hero text_only_hero-theme-${theme} ${loaded ? "is-loaded" : "is-hidden"} `}
        >
            <div className={`text_only_hero-wrapper`}>
                {variation === "columns" ? (
                    <ColumnsTextOnlyHero
                        eyebrow={eyebrow}
                        header={header}
                        subtitle={subtitle}
                        body={body}
                        buttons={buttons}
                        theme={theme}
                    />
                ) : variation === "center" ? (
                    <CenterTextOnlyHero
                        eyebrow={eyebrow}
                        header={header}
                        subtitle={subtitle}
                        body={body}
                        buttons={buttons}
                        theme={theme}
                    />
                ) : (
                    <LeftTextOnlyHero
                        eyebrow={eyebrow}
                        header={header}
                        subtitle={subtitle}
                        body={body}
                        buttons={buttons}
                        theme={theme}
                    />
                )}
            </div>
        </section>
    );
}

// #region --- Inner Components --------------------------------------------------------

function LeftContentTextOnlyHero({
    eyebrowVariation,
    eyebrow,
    header,
}: {
    eyebrowVariation?: "center" | "left";
    eyebrow?: string;
    header: string;
}) {
    return (
        <>
            {eyebrow && (
                <Eyebrow
                    className={`text_only_hero-eyebrow`}
                    text={eyebrow}
                    styleOptions={{ variation: eyebrowVariation ?? "left" }}
                />
            )}

            <h1 className={`text_only_hero-header`}>{header}</h1>
        </>
    );
}

function RightContentTextOnlyHero({
    subtitle,
    body,
    buttons,
    theme
}: {
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
    theme: TextOnlyHeroThemes
}) {
    if (!subtitle && !body && !buttons) return;

    return (
        <>
            {subtitle && (
                <p className="subtitle-extra text_only_hero-subtitle">
                    {subtitle}
                </p>
            )}

            {body && <p className="text_only_hero-body body-l">{body}</p>}

            {buttons && (
                <ThreeButtons
                    className="text_only_hero-btns btns"
                    noDecorationMap={true}
                    buttons={buttons ?? []}
                    customColorSchemeMap={THEME_COLOR_MAPS[theme]}
                />
            )}
        </>
    );
}

// #endregion ----------------------------------------------------------

// #region --- Sub-components --------------------------------------------------------

type SubTextOnlyHeroProps = {
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
    theme: TextOnlyHeroThemes
};

function CenterTextOnlyHero({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,
    theme
}:SubTextOnlyHeroProps) {
    return (
        <div
            className={`text_only_hero-content text_only_hero-variation-center`}
        >
            <LeftContentTextOnlyHero
                eyebrowVariation="center"
                eyebrow={eyebrow}
                header={header}
            />

            <RightContentTextOnlyHero
                subtitle={subtitle}
                body={body}
                buttons={buttons}
                theme={theme}
            />
        </div>
    );
}

function LeftTextOnlyHero({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,
    theme
}: SubTextOnlyHeroProps) {
    return (
        <div className={`text_only_hero-content text_only_hero-variation-left`}>
            <LeftContentTextOnlyHero
                eyebrowVariation="left"
                eyebrow={eyebrow}
                header={header}
            />

            <RightContentTextOnlyHero
                subtitle={subtitle}
                body={body}
                buttons={buttons}
                theme={theme}
            />
        </div>
    );
}

function ColumnsTextOnlyHero({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,
    theme
}:SubTextOnlyHeroProps) {
    return (
        <div
            className={`text_only_hero-content text_only_hero-variation-columns`}
        >
            <div className="text_only_hero-variation-columns-left">
                <LeftContentTextOnlyHero
                    eyebrowVariation="left"
                    eyebrow={eyebrow}
                    header={header}
                />
            </div>
            {(subtitle || body || buttons) && (
                <div className="text_only_hero-variation-columns-right">
                    <RightContentTextOnlyHero
                        subtitle={subtitle}
                        body={body}
                        buttons={buttons}
                        theme={theme}
                    />
                </div>
            )}
        </div>
    );
}
// #endregion ----------------------------------------------------------
