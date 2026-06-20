"use client";

import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { LenisLink } from "@/hooks/LenisLink";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import "./WelcomeBlockB.scss";

type WelcomeDetail = {
    label: string;
    value: string;
    link?: string;
};

export type WelcomeBlockBProps = {
    className?: string;
    eyebrow?: string;
    heading: string;
    headingItalic?: string;
    location?: {
        year?: string;
        city?: string;
        state?: string;
    };
    details?: WelcomeDetail[];
    cta?: {
        text: string;
        link: string;
    };
};

export default function WelcomeBlockB({
    className,
    eyebrow,
    heading,
    headingItalic,
    location,
    details,
    cta,
}: WelcomeBlockBProps) {
    const ref = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.1,
        y: 20,
    });

    return (
        <div ref={ref} className={`wb2 ${className ?? ""}`}>
            <div className="wb2-top">
                <div className="wb2-left">
                    {eyebrow && (
                        <Eyebrow
                            styleOptions={{ variation: "left", color: "--gold-500", includeMargin: false }}
                            text={eyebrow}
                            className="mwc-animate"
                        />
                    )}
                    <h2 className="wb2-heading mwc-animate">
                        {heading}
                        {headingItalic && <em> {headingItalic}</em>}
                    </h2>
                </div>

                {location && (
                    <div className="wb2-location mwc-animate">
                        {location.year && <span>{location.year}</span>}
                        {location.city && <span>{location.city}</span>}
                        {location.state && <span>{location.state}</span>}
                    </div>
                )}
            </div>

            {((details && details.length > 0) || cta) && (
                <div className="wb2-bottom">
                    {details?.map((detail, idx) => (
                        <DetailItem key={idx} detail={detail} />
                    ))}

                    {cta && (
                        <LenisLink href={cta.link} className="wb2-cta_item mwc-animate">
                            <span className="wb2-cta_text">{cta.text}</span>
                            <span className="wb2-cta_arrow" aria-hidden="true">→</span>
                        </LenisLink>
                    )}
                </div>
            )}
        </div>
    );
}

function DetailItem({ detail }: { detail: WelcomeDetail }) {
    const inner = (
        <>
            <p className="wb2-detail_label">{detail.label}</p>
            <p className="wb2-detail_value">{detail.value}</p>
        </>
    );

    if (detail.link) {
        return (
            <LenisLink href={detail.link} className="wb2-detail mwc-animate">
                {inner}
            </LenisLink>
        );
    }

    return <div className="wb2-detail mwc-animate">{inner}</div>;
}
