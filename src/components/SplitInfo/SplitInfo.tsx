'use client'

import React from "react";
import { ButtonSettingProps } from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";
import { NonEmptyArray } from "../../types/utility";
import Button from "../Buttons/Button";
import Eyebrow from "../Eyebrow/Eyebrow";

import { cn } from "../../utils/cn";

const SIDE = "px-300 py-400 md:flex-[1_1_660px] md:px-700 md:py-600";

export type SplitInfoProps = WithHTMLProps & {
    intro: IntroSplitInfoProps;
    content: ContentSplitInfoProps;
};

export default function SplitInfo({
    intro,
    content,

    className,
    ...htmlProps
}: SplitInfoProps) {
    return (
        <div {...htmlProps} className={cn("flex flex-col md:flex-row md:min-h-[480px]", className)}>
            <IntroSplitInfo {...intro} />

            <ContentSplitInfo {...content} />
        </div>
    );
}

type IntroSplitInfoProps = {
    upperText: {
        eyebrow?: string;
        header: string;
        body?: string;
    };
    lowerText?: {
        header: string;
        body?: string;
    };

    // TODO: STYLE
};

function IntroSplitInfo({ upperText, lowerText }: IntroSplitInfoProps) {
    return (
        <div className={cn(SIDE, "flex flex-col justify-between gap-600 bg-black md:gap-700")}>
            <div>
                {upperText.eyebrow && <Eyebrow text={upperText.eyebrow} styleOptions={{ variation: "left", includeMargin: true }} />}

                <h2>{upperText.header}</h2>

                {upperText.body && <p className="mt-100 body-l">{upperText.body}</p>}
            </div>
            {lowerText && (
                <div className="pt-200 border-t-2 border-[color:var(--black-700)]">
                    <p className="eyebrow text-[color:var(--cream-900)]">{lowerText.header}</p>
                    {lowerText.body && <p className="mt-100 italic! body-s">{lowerText.body}</p>}
                </div>
            )}
        </div>
    );
}

type ContentSectionSplitInfoProps = {
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;

    // buttons?: Omit<ThreeButtonsProps, "customColorSchemeMap" | "customVariantMap">;
    buttons?: NonEmptyArray<ButtonSettingProps>;
};

type ContentSplitInfoProps = {
    content: NonEmptyArray<ContentSectionSplitInfoProps>;
    // TODO: STYLE
};

function ContentSplitInfo({ content }: ContentSplitInfoProps) {
    return (
        <div className={cn(SIDE, "flex flex-col gap-500 border-2 border-black")}>
            {content.map((c, idx) => (
                <React.Fragment key={idx}>
                    <div>
                    {c.eyebrow && <Eyebrow text={c.eyebrow} styleOptions={{ variation: "left", includeMargin: true }} />}

                    <h3 className="heading-m">{c.header}</h3>

                    {(c.subtitle || c.body) && (
                        <div className="mt-300 flex flex-col gap-100">
                            {c.subtitle && <p className="subtitle">{c.subtitle}</p>}

                            {c.body && <p className="body">{c.body}</p>}
                        </div>
                    )}

                    {c.buttons && (
                        <div className="mt-600 md:mt-700 btns">
                            {c.buttons.map((b, idx) => (
                                <Button btnSettings={b} key={idx} colorScheme="cabernet" variant="outline" />
                            ))}
                        </div>
                    )}
                </div>

                    {idx != content.length - 1 && (
                        <div className="w-full h-[2px] bg-black"></div>
                    )}
                
                </React.Fragment>
            ))}
        </div>
    );
}
