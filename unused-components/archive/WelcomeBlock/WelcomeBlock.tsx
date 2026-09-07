"use client";

import Button from "@/components/Buttons/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { LenisLink } from "@/hooks/LenisLink";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import "./WelcomeBlock.scss";

type WelcomeDetail = {
    label: string;
    value: string;
    link?: string;
};

export type WelcomeBlockProps = {
    className?: string;
    eyebrow?: string;
    heading: string;
    subheading?: string;
    details?: WelcomeDetail[];
    cta?: {
        text: string;
        link: string;
    };
};

export default function WelcomeBlock({
    className,
    eyebrow,
    heading,
    subheading,
    details,
    cta,
}: WelcomeBlockProps) {
    const ref = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.12,
        y: 24,
    });

    return (
        <div ref={ref} className={`welcome_block ${className ?? ""}`}>
            {eyebrow && (
                <Eyebrow
                    styleOptions={{ variation: "center", color: "--gold-500" }}
                    text={eyebrow}
                    className="mwc-animate"
                />
            )}

            <h2 className="welcome_block-heading  mwc-animate">{heading}</h2>

            {subheading && (
                <p className="welcome_block-subheading body-l mwc-animate">
                    {subheading}
                </p>
            )}

            {/* <div className="welcome_block-rule mwc-animate" aria-hidden="true" /> */}

            {details && details.length > 0 && (
                <div className="welcome_block-details mwc-animate">
                    {details.map((detail, idx) => (
                        <DetailItem key={idx} detail={detail} />
                    ))}
                </div>
            )}

            {cta && (
                <div className="welcome_block-cta mwc-animate">
                    <Button
                        btnSettings={{
                            type: "link",
                            text: cta.text,
                            link: cta.link,
                        }}
                        colorScheme="black"
                    />
                </div>
            )}
        </div>
    );
}

function DetailItem({ detail }: { detail: WelcomeDetail }) {
    const inner = (
        <>
            <p className="welcome_block-detail_label">{detail.label}</p>
            <p className="welcome_block-detail_value">{detail.value}</p>
        </>
    );

    if (detail.link) {
        return (
            <LenisLink href={detail.link} className="welcome_block-detail">
                {inner}
            </LenisLink>
        );
    }

    return <div className="welcome_block-detail">{inner}</div>;
}
