import React from "react";
import { ButtonSettingProps } from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";
import { NonEmptyArray } from "../../types/utility";
import Button from "../Buttons/Button";
import Eyebrow from "../Eyebrow/Eyebrow";

import "./SplitInfo.scss";

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
        <div {...htmlProps} className={`split_info ${className ?? ""}`}>
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
        <div className="split_info-intro split_info-side">
            <div className="split_info-intro-upper">
                {upperText.eyebrow && <Eyebrow text={upperText.eyebrow} styleOptions={{ variation: "left", includeMargin: true }} />}

                <h2 className="split_info-intro-upper-header">{upperText.header}</h2>

                {upperText.body && <p className="split_info-intro-upper-body body-l">{upperText.body}</p>}
            </div>
            {lowerText && (
                <div className="split_info-intro-lower">
                    <p className="eyebrow split_info-intro-lower-header">{lowerText.header}</p>
                    {lowerText.body && <p className="split_info-intro-lower-body body-s">{lowerText.body}</p>}
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
        <div className="split_info-content split_info-side">
            {content.map((c, idx) => (
                <React.Fragment key={idx}>
                    <div className="split_info-content-section">
                    {c.eyebrow && <Eyebrow text={c.eyebrow} styleOptions={{ variation: "left", includeMargin: true }} />}

                    <h3 className="split_info-content-section-header heading-m">{c.header}</h3>

                    {(c.subtitle || c.body) && (
                        <div className="split_info-content-section-text">
                            {c.subtitle && <p className="split_info-content-section-subtitle subtitle">{c.subtitle}</p>}

                            {c.body && <p className="split_info-content-section-body body">{c.body}</p>}
                        </div>
                    )}

                    {c.buttons && (
                        <div className="split_info-content-section-btns btns">
                            {c.buttons.map((b, idx) => (
                                <Button btnSettings={b} key={idx} colorScheme="gold" variant="outline" />
                            ))}
                        </div>
                    )}
                </div>

                    {idx != content.length - 1 && (
                        <div className="split_info-content-line"></div>
                    )}
                
                </React.Fragment>
            ))}
        </div>
    );
}
