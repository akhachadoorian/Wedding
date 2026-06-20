"use client";

import { ButtonSettingProps } from "@/types/buttons";
import mergeRefs from "../../hooks/mergeRefs";
import { useFadeInChildren } from "../../hooks/useFadeIn";
import { useBreakpoints } from "../../hooks/useWindowWidth";
import { WithHTMLProps } from "../../types/props";
import { AlignmentProps, NonEmptyArray } from "../../types/utility";

import "./SmallTextGrid.scss";
import Button from "../Buttons/Button";

export type SmallTextProps = WithHTMLProps & {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    body?: string;
    button?: ButtonSettingProps;
};

export default function SmallText({
    eyebrow,
    title,
    subtitle,
    body,
    button,

    // WithHTMLProps
    className,
    ...htmlProps
}: SmallTextProps) {
    if (!eyebrow && !title && !subtitle && !body) return;

    return (
        <div {...htmlProps} className={`small_text ${className ?? ""}`}>
            {eyebrow && <p className="eyebrow gold small_text-left">{eyebrow}</p>}

            <div className="small_text-right">
                {(title || subtitle || body) && (
                    <div className="small_text-text">
                        {title && (
                            <h5 className="small_text-title heading-s">
                                {title}
                            </h5>
                        )}

                        {subtitle && (
                            <p className="small_text-subtitle subtitle">
                                {subtitle}
                            </p>
                        )}

                        {body && (
                            <p className="small_text-body body-xs">{body}</p>
                        )}
                    </div>
                )}

                {button && <Button 
                    btnSettings={{decoration: {type: 'arrow'}, ...button}} 
                    variant="solid" 
                    colorScheme="black" 
                />}
            </div>
        </div>
    );
}

export type SmallTextGridProps = WithHTMLProps & {
    smallText: NonEmptyArray<SmallTextProps>;
    // columns
};

export function SmallTextGrid({
    smallText,

    // WithHTMLProps
    className,
    ref,
    ...htmlProps
}: SmallTextGridProps) {
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

    return (
        <div
            {...htmlProps}
            ref={mergeRefs(animRef, ref)}
            className={`small_text_grid ${className ?? ""}`}
        >
            {smallText.map((s, idx) => (
                <SmallText key={idx} className="mwc-animate" {...s} />
            ))}
        </div>
    );
}
