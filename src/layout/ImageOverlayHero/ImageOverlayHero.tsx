"use client";

import { useRef, useState } from "react";

import { ThreeButtons } from "../../components/Buttons/ButtonGroups";
import Eyebrow from "../../components/Eyebrow/Eyebrow";
import {
    BtnSchemeMap,
    ThreeButtonsArray
} from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";

import ImageHolder from "@/components/ImageHolder/ImageHolder";
import { DEFAULT_IMAGE } from "@/data/defaultImage";
import mergeRefs from "@/hooks/mergeRefs";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import { CustomImageProps } from "@/types/images";
import { cn } from "@/utils/cn";

type ImageOverlayHeroStyleProps = {
    variation: "left" | "center" | "columns";
    // theme: "default" | "black" | "art-deco-bg";
};

const CONTENT_BASE = "flex flex-col justify-center overflow-hidden";

const VARIATION_CLASSES: Record<ImageOverlayHeroStyleProps["variation"], string> = {
    left: "m-0 md:max-w-[75.833vw] min-[109.375rem]:max-w-[60.417vw]",
    center: "mx-auto w-full items-center text-center md:max-w-[60.417vw] md:m-auto",
    columns:
        "mx-auto w-full gap-300 lg:flex-row lg:justify-between lg:items-center lg:gap-col-gutter min-[109.375rem]:gap-1000",
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
            className={cn("relative min-h-dvh w-dvw overflow-hidden", loaded ? "is-loaded" : "is-hidden", className)}
        >
            <ImageHolder
                className="absolute! z-1 min-h-dvh h-full w-full"
                customOverlayClass="bg-black-bg/70!"
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

            <div className="relative z-5 flex h-full min-h-dvh py-1000 px-col-margin md:max-w-container md:m-auto md:py-1500">
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
                    className="mwc-animate"
                    text={eyebrow}
                    styleOptions={{
                        variation: eyebrowVariation ?? "left",
                        includeMargin: true,
                        color: "--cream",
                    }}
                />
            )}

            <h1 className="mwc-animate">{header}</h1>
        </>
    );
}

function RightContentImageOverlayHero({
    subtitle,
    body,
    buttons,
    centered = false,
}: {
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
    centered?: boolean;
}) {
    if (!subtitle && !body && !buttons) return;

    // const customVariantMap: BtnVariantMap<3> = ["solid", "solid", "solid"];
    // FIXME:
    // const customColorSchemeMap: BtnSchemeMap<3> = [
    //     "burgundy",
    //     "burgundy",
    //     "burgundy",
    // ];

    return (
        <>
            {(subtitle || body) && (
                <div className="flex flex-col gap-200 md:gap-300">
                    {subtitle && (
                        <p className="subtitle-extra mwc-animate">
                            {subtitle}
                        </p>
                    )}

                    {body && (
                        <p className="body mwc-animate">
                            {body}
                        </p>
                    )}
                </div>
            )}

            {buttons && (
                <ThreeButtons
                    className={cn("mt-300 md:mt-500 mwc-animate", centered && "justify-center")}
                    noDecorationMap={true}
                    buttons={buttons ?? []}
                    // customColorSchemeMap={customColorSchemeMap}
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
            className={cn(CONTENT_BASE, VARIATION_CLASSES.center)}
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
                centered
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
            className={cn(CONTENT_BASE, VARIATION_CLASSES.left)}
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
            className={cn(CONTENT_BASE, VARIATION_CLASSES.columns)}
        >
            <div className="lg:flex-[2_1_710px]">
                <LeftContentImageOverlayHero
                    eyebrowVariation="left"
                    eyebrow={eyebrow}
                    header={header}
                />
            </div>
            {(subtitle || body || buttons) && (
                <div className="overflow-hidden lg:flex-[1_1_530px]">
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
