"use client";

import React from "react";

import { ThreeButtons } from "../../components/Buttons/ButtonGroups";
import Eyebrow from "../../components/Eyebrow/Eyebrow";
import { BtnColorSchemeMap, BtnVariantMap, ThreeButtonsArray } from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";

import "./ImageOverlayHero.scss";
import { CustomImageProps } from "@/types/images";
import Image from "next/image";
import ImageHolder from "@/components/ImageHolder/ImageHolder";
import { image } from "motion/react-client";
import { DEFAULT_IMAGE } from "@/data/defaultImage";

type ImageOverlayHeroStyleProps = {
    variation: "left" | "center" | "columns";
    // theme: "default" | "black" | "art-deco-bg";
};

const DEFAULT_STYLE = {
    variation: "left",
    // theme: "default",
} satisfies ImageOverlayHeroStyleProps;

export type ImageOverlayHeroProps = WithHTMLProps & {
    loaded: boolean;

    // Style Options
    styleOptions?: ImageOverlayHeroStyleProps;

    // Fields
    image?: CustomImageProps;
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
};

export default function ImageOverlayHero({
    loaded,
    styleOptions = DEFAULT_STYLE,

    image = DEFAULT_IMAGE,
    eyebrow,
    header,
    subtitle,
    body,
    buttons,

    className,
    ...htmlProps
}: ImageOverlayHeroProps) {
    return (
        <section
            {...htmlProps}
            className={`img_overlay_hero ${loaded ? "is-loaded" : "is-hidden"} `}
        >
            <ImageHolder
                className="img_overlay_hero-img"
                img={{
                    ...image,
                    priority: true,
                    sizes: "100vw",
                    fill: true,
                    style: { objectFit: "cover" },
                }}
            />

            <div className={`img_overlay_hero-wrapper`}>
                {styleOptions?.variation === "columns" ? (
                    <ColumnsImageOverlayHero
                        eyebrow={eyebrow}
                        header={header}
                        subtitle={subtitle}
                        body={body}
                        buttons={buttons}
                    />
                ) : styleOptions?.variation === "center" ? (
                    <CenterImageOverlayHero
                        eyebrow={eyebrow}
                        header={header}
                        subtitle={subtitle}
                        body={body}
                        buttons={buttons}
                    />
                ) : (
                    <LeftImageOverlayHero
                        eyebrow={eyebrow}
                        header={header}
                        subtitle={subtitle}
                        body={body}
                        buttons={buttons}
                    />
                )}
            </div>
        </section>
    );
}

// #region --- Sub-components --------------------------------------------------------

function LeftContentImageOverlayHero({
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
                    className={`img_overlay_hero-eyebrow`}
                    text={eyebrow}
                    styleOptions={{ variation: eyebrowVariation ?? "left", includeMargin: true }}
                />
            )}

            <h1 className={`img_overlay_hero-heading`}>{header}</h1>
        </>
    );
}

function RightContentImageOverlayHero({
    subtitle,
    body,
    buttons,
}: {
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
}) {
    if (!subtitle && !body && !buttons) return;

    // const customVariantMap: BtnVariantMap<3> = ["solid", "solid", "solid"];
    
    const customColorSchemeMap: BtnColorSchemeMap<3> = ["gold", "gold", "gold"];

    return (
        <>
            {subtitle && (
                <p className="subtitle img_overlay_hero-subtitle">
                    {subtitle}
                </p>
            )}

            {body && <p className="img_overlay_hero-body body-l">{body}</p>}

            {buttons && (
                <ThreeButtons
                    className="img_overlay_hero-btns btns"
                    noDecorationMap={true}
                    buttons={buttons ?? []}
                    customColorSchemeMap={customColorSchemeMap}
                    // customVariantMap={customVariantMap}
                />
            )}
        </>
    );
}

function CenterImageOverlayHero({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,
}: {
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
}) {
    return (
        <div className={`img_overlay_hero-content img_overlay_hero-variation-center`}>
            <LeftContentImageOverlayHero
                eyebrowVariation="center"
                eyebrow={eyebrow}
                header={header}
            />

            <RightContentImageOverlayHero
                subtitle={subtitle}
                body={body}
                buttons={buttons}
            />
        </div>
    );
}

function LeftImageOverlayHero({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,
}: {
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
}) {
    return (
        <div className={`img_overlay_hero-content img_overlay_hero-variation-left`}>
            <LeftContentImageOverlayHero
                eyebrowVariation="left"
                eyebrow={eyebrow}
                header={header}
            />

            <RightContentImageOverlayHero
                subtitle={subtitle}
                body={body}
                buttons={buttons}
            />
        </div>
    );
}

function ColumnsImageOverlayHero({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,
}: {
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
}) {
    return (
        <div className={`img_overlay_hero-content img_overlay_hero-variation-columns`}>
            <div className="img_overlay_hero-variation-columns-left">
                <LeftContentImageOverlayHero
                    eyebrowVariation="left"
                    eyebrow={eyebrow}
                    header={header}
                />
            </div>
            {(subtitle || body || buttons) && (
                <div className="img_overlay_hero-variation-columns-right">
                    <RightContentImageOverlayHero
                        subtitle={subtitle}
                        body={body}
                        buttons={buttons}
                    />
                </div>
            )}
        </div>
    );
}
// #endregion ----------------------------------------------------------
