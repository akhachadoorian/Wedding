'use client'

import { DEFAULT_IMAGE } from "../../data/defaultImage";
import mergeRefs from "../../hooks/mergeRefs";
import { useFadeInChildren } from "../../hooks/useFadeIn";
import { ThreeButtonsArray } from "../../types/buttons";
import { CustomImageProps } from "../../types/images";
import { WithHTMLProps } from "../../types/props";
import { ThreeButtons } from "../Buttons/ButtonGroups";
import Eyebrow from "../Eyebrow/Eyebrow";
import { sub } from "motion/react-client";

import "./ImageCallout.scss";

type ImageCalloutStyleProps = {
    variation: "full_width" | "inset" | "slant" | 'slant_inverse';
    textLayout: "left" | "center" | "columns";
};

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

    return (
        <section {...htmlProps} ref={mergeRefs(animRef, ref)} className={`image_callout ${className ?? ""} image_callout-variation-${styleOptions.variation}`}>
            {/* <div className="image_callout"> */}
                <div className="img-holder image_callout-img_holder">
                    <img src={image.src} alt={image.alt} className="img-bw" />

                    <div className={`img-overlay img-overlay-${styleOptions.textLayout}`} />
                </div>

                {styleOptions.textLayout === "center" ? (
                    <CenterTextLayoutImageCallout eyebrow={eyebrow} header={header} subtitle={subtitle} body={body} buttons={buttons} />
                ) : styleOptions.textLayout === "columns" ? (
                    <ColumnsTextLayoutImageCallout eyebrow={eyebrow} header={header} subtitle={subtitle} body={body} buttons={buttons} />
                ) : (
                    <LeftTextLayoutImageCallout eyebrow={eyebrow} header={header} subtitle={subtitle} body={body} buttons={buttons} />
                )}
            {/* </div> */}
        </section>
    );
}

type TextLayoutProps = {
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
};

function LeftTextLayoutImageCallout({ eyebrow, header, subtitle, body, buttons }: TextLayoutProps) {
    return (
        <div className="image_callout-text image_callout-layout-left">
            {eyebrow && (
                <Eyebrow
                    // className={"mwc-animate"}
                    text={eyebrow}
                    styleOptions={{
                        variation: "left",
                        color: "--gold-500",
                        includeMargin: true,
                    }}
                />
            )}

            <h2 className="image_callout-header heading-l">{header}</h2>

            {(body || subtitle) && (
                <div className="image_callout-text-inner">
                    {subtitle && <h3 className="image_callout-subtitle subtitle">{subtitle}</h3>}

                    {body && <div className="image_callout-body body">{body}</div>}
                </div>
            )}

            {buttons && <ThreeButtons className="image_callout-btns btns mwc-animate" buttons={buttons} />}
        </div>
    );
}

function ColumnsTextLayoutImageCallout({ eyebrow, header, subtitle, body, buttons }: TextLayoutProps) {
    return (
        <div className="image_callout-text image_callout-layout-columns">
            <div className="image_callout-text-left">
                {eyebrow && (
                    <Eyebrow
                        // className={"mwc-animate"}
                        text={eyebrow}
                        styleOptions={{
                            variation: "left",
                            color: "--gold-500",
                            includeMargin: true,
                        }}
                    />
                )}

                <h2 className="image_callout-header heading-l">{header}</h2>
            </div>

            {(body || subtitle || buttons) && (
                <div className="image_callout-text-right">
                    {(body || subtitle) && (
                        <div className="image_callout-text-inner">
                            {subtitle && <h3 className="image_callout-subtitle subtitle">{subtitle}</h3>}

                            {body && <div className="image_callout-body body">{body}</div>}
                        </div>
                    )}

                    {buttons && <ThreeButtons className="image_callout-btns btns mwc-animate" buttons={buttons} />}
                </div>
            )}
        </div>
    );
}

function CenterTextLayoutImageCallout({ eyebrow, header, subtitle, body, buttons }: TextLayoutProps) {
    return (
        <div className="image_callout-text image_callout-layout-center">
            {eyebrow && (
                <Eyebrow
                    // className={"mwc-animate"}
                    text={eyebrow}
                    styleOptions={{
                        variation: "center",
                        color: "--gold-500",
                        includeMargin: true,
                    }}
                />
            )}

            <h2 className="image_callout-header heading-l">{header}</h2>

            {(body || subtitle) && (
                <div className="image_callout-text-inner">
                    {subtitle && <h3 className="image_callout-subtitle subtitle">{subtitle}</h3>}

                    {body && <div className="image_callout-body body">{body}</div>}
                </div>
            )}

            {buttons && <ThreeButtons className="image_callout-btns btns mwc-animate" buttons={buttons} />}
        </div>
    );
}
