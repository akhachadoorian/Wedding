'use client'

import { DEFAULT_IMAGE } from "../data/defaultImage";
import mergeRefs from "../hooks/mergeRefs";
import { useFadeInChildren } from "../hooks/useFadeIn";
import { ThreeButtonsArray } from "../types/buttons";
import { CustomImageProps } from "../types/images";
import { WithHTMLProps } from "../types/props";
import { ThreeButtons } from "./Buttons/ButtonGroups";
import Eyebrow from "./Eyebrow";
import { sub } from "motion/react-client";

import Image from "next/image";
import ImageHolder from "./ImageHolder";
import { cn } from "../utils/cn";

type ImageCalloutStyleProps = {
    variation: "full_width" | "inset" | "slant" | 'slant_inverse';
    textLayout: "left" | "center" | "columns";
};

type Variation = ImageCalloutStyleProps["variation"];
type TextLayout = ImageCalloutStyleProps["textLayout"];

const SECTION_VARIATION: Record<Variation, string> = {
    full_width: "px-col-margin",
    inset: "px-col-margin my-section-padding mx-col-margin md:mx-auto",
    slant: "my-300 [clip-path:polygon(0_10%,100%_0%,100%_90%,0%_100%)]",
    slant_inverse: "my-300 [clip-path:polygon(0%_0,100%_10%,100%_100%,0_90%)]",
};

// Gradients sit on the ImageHolder overlay. `!` beats the global `.img-overlay` background.
const OVERLAY: Record<TextLayout, string> = {
    left: "[background:linear-gradient(270deg,rgba(16,17,17,0)_25.3%,rgba(16,17,17,0.7)_80.25%),linear-gradient(0deg,rgba(16,17,17,0.4)_0%,rgba(16,17,17,0.4)_60%)]!",
    center: "[background:linear-gradient(0deg,rgba(16,17,17,0.65)_0%,rgba(16,17,17,0.65)_100%)]!",
    columns: "[background:linear-gradient(0deg,rgba(16,17,17,0.65)_0%,rgba(16,17,17,0.65)_100%)]!",
};

const TEXT_BASE = "relative z-2 flex flex-col justify-center py-1000 px-200 md:min-h-[45dvh] md:px-750";

const TEXT_LAYOUT: Record<TextLayout, string> = {
    left: "",
    center: "text-center items-center",
    columns: "gap-col-gutter md:flex-row md:items-center",
};

const TEXT_LAYOUT_WIDTH: Record<TextLayout, string> = {
    left: "md:max-w-[calc(55%+var(--space-1000)*2)]",
    center: "md:max-w-container md:mx-auto md:my-0",
    columns: "",
};

// When a variation sets the text width/margins, it replaces the layout's own width classes.
const TEXT_VARIATION: Record<Variation, string> = {
    full_width: "md:max-w-container md:my-section-padding md:mx-auto",
    inset: "",
    slant: "md:max-w-container md:mx-auto md:my-0",
    slant_inverse: "md:max-w-container md:mx-auto md:my-0",
};

const TEXT_INNER = "mt-300 flex flex-col gap-100";
const BTNS = "mt-500 mwc-animate";

const DEFAULT_STYLE: ImageCalloutStyleProps = {
    variation: "full_width",
    textLayout: "left",
};

export type ImageCalloutProps = WithHTMLProps & {
    image: CustomImageProps;
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;

    styleOptions?: ImageCalloutStyleProps;
};

export default function ImageCallout({
    image = DEFAULT_IMAGE,
    eyebrow,
    header,
    subtitle,
    body,
    buttons,

    styleOptions = DEFAULT_STYLE,

    className,
    ref,
    ...htmlProps
}: ImageCalloutProps) {
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", { stagger: 0.15, y: 24 });
    const { textLayout, variation } = styleOptions;
    const textClass = cn(TEXT_BASE, TEXT_LAYOUT[textLayout], TEXT_VARIATION[variation] || TEXT_LAYOUT_WIDTH[textLayout]);

    return (
        <section {...htmlProps} ref={mergeRefs(animRef, ref)} className={cn("relative overflow-hidden", className, SECTION_VARIATION[styleOptions.variation])}>
            {/* <div className="image_callout"> */}
                <ImageHolder img={{
                    ...image,
                    priority: true,
                    sizes: "100vw",
                    fill: true,
                    style: { objectFit: "cover" },
                }}
                    customOverlayClass={OVERLAY[styleOptions.textLayout]}
                    className={cn(
                        "absolute! top-0 left-0 z-1 w-full h-full",
                        styleOptions.variation === "inset" && "md:w-[calc(100%-var(--layout-column-margin)*2)] md:left-col-margin",
                    )}
                />
                {/* <div className="img-holder image_callout-img_holder">
                    <Image src={image.src} alt={image.alt} className="img-bw" />

                    <div className={`img-overlay img-overlay-${styleOptions.textLayout}`} />
                </div> */}

                {styleOptions.textLayout === "center" ? (
                    <CenterTextLayoutImageCallout className={textClass} eyebrow={eyebrow} header={header} subtitle={subtitle} body={body} buttons={buttons} />
                ) : styleOptions.textLayout === "columns" ? (
                    <ColumnsTextLayoutImageCallout className={textClass} eyebrow={eyebrow} header={header} subtitle={subtitle} body={body} buttons={buttons} />
                ) : (
                    <LeftTextLayoutImageCallout className={textClass} eyebrow={eyebrow} header={header} subtitle={subtitle} body={body} buttons={buttons} />
                )}
            {/* </div> */}
        </section>
    );
}

type TextLayoutProps = {
    className: string;
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
};

function LeftTextLayoutImageCallout({ className, eyebrow, header, subtitle, body, buttons }: TextLayoutProps) {
    return (
        <div className={className}>
            {eyebrow && (
                <Eyebrow
                    // className={"mwc-animate"}
                    text={eyebrow}
                    styleOptions={{
                        variation: "left",
                        includeMargin: true,
                    }}
                />
            )}

            <h2 className="heading-l">{header}</h2>

            {(body || subtitle) && (
                <div className={TEXT_INNER}>
                    {subtitle && <h3 className="subtitle">{subtitle}</h3>}

                    {body && <div className="body">{body}</div>}
                </div>
            )}

            {buttons && <ThreeButtons className={BTNS} buttons={buttons} />}
        </div>
    );
}

function ColumnsTextLayoutImageCallout({ className, eyebrow, header, subtitle, body, buttons }: TextLayoutProps) {
    return (
        <div className={className}>
            <div className="md:flex-[1_1_762px]">
                {eyebrow && (
                    <Eyebrow
                        // className={"mwc-animate"}
                        text={eyebrow}
                        styleOptions={{
                            variation: "left",
                            includeMargin: true,
                        }}
                    />
                )}

                <h2 className="heading-l">{header}</h2>
            </div>

            {(body || subtitle || buttons) && (
                <div className="md:flex-[1_1_528px]">
                    {(body || subtitle) && (
                        <div className={cn(TEXT_INNER, "mt-0")}>
                            {subtitle && <h3 className="subtitle">{subtitle}</h3>}

                            {body && <div className="body">{body}</div>}
                        </div>
                    )}

                    {buttons && <ThreeButtons className={BTNS} buttons={buttons} />}
                </div>
            )}
        </div>
    );
}

function CenterTextLayoutImageCallout({ className, eyebrow, header, subtitle, body, buttons }: TextLayoutProps) {
    return (
        <div className={className}>
            {eyebrow && (
                <Eyebrow
                    // className={"mwc-animate"}
                    text={eyebrow}
                    styleOptions={{
                        variation: "center",
                        includeMargin: true,
                    }}
                />
            )}

            <h2 className="heading-l">{header}</h2>

            {(body || subtitle) && (
                <div className={TEXT_INNER}>
                    {subtitle && <h3 className="subtitle">{subtitle}</h3>}

                    {body && <div className="body">{body}</div>}
                </div>
            )}

            {buttons && <ThreeButtons className={BTNS} buttons={buttons} />}
        </div>
    );
}
