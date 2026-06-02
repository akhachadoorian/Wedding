"use client";


import { WithHTMLProps } from "../../types/props";

import { DEFAULT_IMAGE } from "@/data/defaultImage";
import TextWithNewLine from "@/utils/TextWithNewLine";
import { ImageProps } from "@/types/images";
import "./GothHero.scss";

export type GothHeroProps = WithHTMLProps & {
    loaded: boolean;

    // Fields
    // header: string;
    img?: ImageProps;

    eyebrows?: {
        left?: string;
        center?: string;
        right?: string;
    };
};

export default function GothHero({
    loaded,

    // header,
    img = DEFAULT_IMAGE,
    eyebrows,

    className,
    ...htmlProps
}: GothHeroProps) {
    return (
        <section {...htmlProps} className={` goth_hero ${className ?? ""}`}>
            <div className="img-holder goth_hero-img">
                <img src={img.src} alt={img.alt ?? ""} className="img-bw" />
                <div className="img-overlay"></div>
            </div>

            <div className="goth_hero-text">
                {eyebrows && (
                    <div className="goth_hero-text-eyebrow">
                        {eyebrows.left && (
                            <p className="goth_hero-text-eyebrow-left">
                                <TextWithNewLine text={eyebrows.left} />
                            </p>
                        )}
                        {eyebrows.center && (
                            <p className="goth_hero-text-eyebrow-center">
                                <TextWithNewLine text={eyebrows.center} />
                            </p>
                        )}
                        {eyebrows.right && (
                            <p className="goth_hero-text-eyebrow-right">
                                <TextWithNewLine text={eyebrows.right} />
                            </p>
                        )}
                    </div>
                )}

                <div className="goth_hero-text-title">
                    <h1>Alex</h1>
                    <p>&</p>
                    <h1>Max</h1>
                </div>
            </div>
        </section>
    );
}
