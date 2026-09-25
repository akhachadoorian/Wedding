"use client";

import React from "react";

import { ThreeButtons } from "../../components/Buttons/ButtonGroups";
import Eyebrow from "../../components/Eyebrow/Eyebrow";
import { BtnSchemeMap, ThreeButtonsArray } from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";

import { cn } from "@/utils/cn";

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

const THEME_CLASSES: Record<TextOnlyHeroThemes, string> = {
    default: "",
    black: "bg-black",
    black_gradient: "bg-linear-to-b from-[var(--black-850)] to-black-bg",
};

const CONTENT_BASE = "flex flex-col justify-center overflow-hidden";

const VARIATION_CLASSES: Record<NonNullable<TextOnlyHeroStyleProps["variation"]>, string> = {
    left: "md:max-w-[75.833vw] min-[109.375rem]:max-w-[60.417vw]",
    center: "mx-auto text-center md:max-w-[60.417vw] md:m-auto",
    columns: "mx-auto md:flex-row md:items-center md:gap-col-gutter min-[109.375rem]:gap-1000",
};

// FIXME:
const THEME_COLOR_MAPS: Record<TextOnlyHeroThemes, BtnSchemeMap<3>> = {
    default: {
        kind: "simple",
        scheme: ["cabernet", "cabernet", "cabernet"],
    },
    black: {
        kind: "simple",
        scheme: ["cabernet", "cabernet", "cabernet"],
    },
    black_gradient: {
        kind: "simple",
        scheme: ["cabernet", "cabernet", "cabernet"],
    },
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
            className={cn("relative min-h-dvh w-dvw overflow-hidden", THEME_CLASSES[theme], loaded ? "is-loaded" : "is-hidden")}
        >
            <div className="relative flex items-center pt-200 pb-400 px-col-margin min-h-[calc(100dvh-var(--space-400)*2)] md:max-w-container md:mx-auto md:py-1500 md:min-h-[calc(100dvh-var(--space-1500)*2)]">
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
                    text={eyebrow}
                    styleOptions={{ variation: eyebrowVariation ?? "left" }}
                />
            )}

            <h1>{header}</h1>
        </>
    );
}

function RightContentTextOnlyHero({
    subtitle,
    body,
    buttons,
    theme,
    variation,
}: {
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
    theme: TextOnlyHeroThemes;
    variation: NonNullable<TextOnlyHeroStyleProps["variation"]>;
}) {
    if (!subtitle && !body && !buttons) return;

    return (
        <>
            {subtitle && (
                <p className={cn("subtitle-extra mt-300", variation === "center" && "mx-auto", variation === "columns" && "md:mt-0")}>
                    {subtitle}
                </p>
            )}

            {body && <p className="mt-300 body-l">{body}</p>}

            {buttons && (
                <ThreeButtons
                    className={cn("mt-500", variation === "center" && "justify-center")}
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
    theme: TextOnlyHeroThemes;
};

function CenterTextOnlyHero({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,
    theme,
}: SubTextOnlyHeroProps) {
    return (
        <div
            className={cn(CONTENT_BASE, VARIATION_CLASSES.center)}
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
                variation="center"
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
    theme,
}: SubTextOnlyHeroProps) {
    return (
        <div className={cn(CONTENT_BASE, VARIATION_CLASSES.left)}>
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
                variation="left"
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
    theme,
}: SubTextOnlyHeroProps) {
    return (
        <div
            className={cn(CONTENT_BASE, VARIATION_CLASSES.columns)}
        >
            <div className="md:flex-[2_1_760px]">
                <LeftContentTextOnlyHero
                    eyebrowVariation="left"
                    eyebrow={eyebrow}
                    header={header}
                />
            </div>
            {(subtitle || body || buttons) && (
                <div className="md:flex-[1_1_530px]">
                    <RightContentTextOnlyHero
                        subtitle={subtitle}
                        body={body}
                        buttons={buttons}
                        theme={theme}
                        variation="columns"
                    />
                </div>
            )}
        </div>
    );
}
// #endregion ----------------------------------------------------------
