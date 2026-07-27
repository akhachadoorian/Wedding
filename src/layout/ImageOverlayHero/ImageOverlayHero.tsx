"use client";

import React, { useRef, useState } from "react";

import { ThreeButtons } from "../../components/Buttons/ButtonGroups";
import Eyebrow from "../../components/Eyebrow/Eyebrow";
import {
    BtnColorSchemeMap,
    ThreeButtonsArray
} from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";

import ImageHolder from "@/components/ImageHolder/ImageHolder";
import { DEFAULT_IMAGE } from "@/data/defaultImage";
import mergeRefs from "@/hooks/mergeRefs";
import { CustomImageProps } from "@/types/images";
import "./ImageOverlayHero.scss";
import { useFadeInChildren } from "@/hooks/useFadeIn";

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
    ref,
    ...htmlProps
}: ImageOverlayHeroProps) {
    const [imgReady, setImgReady] = useState(false);

    const imgRef = useRef(null);

    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
        enabled: loaded && imgReady,
    });

    return (
        <section
            {...htmlProps}
            ref={mergeRefs(animRef, ref)}
            className={`img_overlay_hero ${loaded ? "is-loaded" : "is-hidden"} `}
        >
            <ImageHolder
                className="img_overlay_hero-img"
                ref={imgRef}
                img={{
                    ...image,
                    priority: true,
                    sizes: "100vw",
                    fill: true,
                    style: { objectFit: "cover" },
                    onLoad: () => setImgReady(true),
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

// #region --- Inner Components -------------------------------------------------------

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
                    className={`img_overlay_hero-eyebrow mwc-animate`}
                    text={eyebrow}
                    styleOptions={{
                        variation: eyebrowVariation ?? "left",
                        includeMargin: true,
                        color: "--cream",
                    }}
                />
            )}

            <h1 className={`img_overlay_hero-heading mwc-animate`}>{header}</h1>
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
    const customColorSchemeMap: BtnColorSchemeMap<3> = [
        "burgundy",
        "burgundy",
        "burgundy",
    ];

    const bodyStyle = {
        "--body-margin-top": subtitle ? "var(--space-300)" : "0px",
        "--body-margin-top-mobile": subtitle ? "var(--space-200)" : "0px",
    } as React.CSSProperties;

    return (
        <>
            {(subtitle || body) && (
                <div className="img_overlay_hero-sb">
                    {subtitle && (
                        <p className="subtitle-extra img_overlay_hero-subtitle mwc-animate">
                            {subtitle}
                        </p>
                    )}

                    {body && (
                        <p className="img_overlay_hero-body body mwc-animate">
                            {body}
                        </p>
                    )}
                </div>
            )}

            {buttons && (
                <ThreeButtons
                    className="img_overlay_hero-btns btns mwc-animate"
                    noDecorationMap={true}
                    buttons={buttons ?? []}
                    customColorSchemeMap={customColorSchemeMap}
                    // customVariantMap={customVariantMap}
                />
            )}
        </>
    );
}

// #endregion --------------------------------------------------------

// #region --- Sub-components --------------------------------------------------------

type SubImageOverlayHeroProps = {
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
};

function CenterImageOverlayHero({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,
}: SubImageOverlayHeroProps) {
    return (
        <div
            className={`img_overlay_hero-content img_overlay_hero-variation-center`}
        >
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
}: SubImageOverlayHeroProps) {
    return (
        <div
            className={`img_overlay_hero-content img_overlay_hero-variation-left`}
        >
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
}: SubImageOverlayHeroProps) {
    return (
        <div
            className={`img_overlay_hero-content img_overlay_hero-variation-columns`}
        >
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
