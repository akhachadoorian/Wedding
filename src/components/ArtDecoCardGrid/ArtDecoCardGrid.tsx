import { LenisLink } from "../../hooks/LenisLink";
import mergeRefs from "../../hooks/mergeRefs";
import { useFadeInChildren } from "../../hooks/useFadeIn";
import { LinkButtonSettings } from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";
import { NonEmptyArray } from "../../types/utility";
import ArtDecoIcon, { ArtDecoIconTypeProps } from "../ArtDecoIcon/ArtDecoIcon";
import Button from "../Buttons/Button";

import './ArtDecoCardGrid.scss'

// #region --- Art Deco Cards -----------------------------

export type ArtDecoCardProps = WithHTMLProps & {
    icon?: ArtDecoIconTypeProps;
    title: string;
    subtitle?: string;
    body?: string;
    btnSettings?: LinkButtonSettings;
};

export function ArtDecoCard({
    icon = "fan",
    title,
    subtitle,
    body,
    btnSettings,

    className,
    ...htmlProps
}: ArtDecoCardProps) {
    // if (btnSettings) return <ButtonArtDecoCard icon={icon} title={title} subtitle={subtitle} body={body} btnSettings={btnSettings} className={className} {...htmlProps} />;

    if (btnSettings) {
        return (
            <LenisLink {...htmlProps} className={`art_deco_card ${className ?? ""}`} to={btnSettings.link}>
                <ArtDecoIcon type={icon} className="art_deco_card-icon" />

                <InnerArtDecoCard title={title} subtitle={subtitle} body={body} />

                <Button
                    variant="lines"
                    colorScheme="cream"
                    btnSettings={{
                        type: 'visual',
                        text: btnSettings.text,
                        decoration: {
                            type: 'arrow',
                            arrowDirection: 'top-right',
                            arrowSide: 'right'
                        }
                    }}
                />
            </LenisLink>
        );
    }

    return (
        <div {...htmlProps} className={`art_deco_card ${className ?? ""}`}>
            <ArtDecoIcon type="fan" className="art_deco_card-icon" />

            <InnerArtDecoCard title={title} subtitle={subtitle} body={body} />
        </div>
    );
}

    // #region --- Inner Art Deco Card --------------------------

    function InnerArtDecoCard({ title, subtitle, body }: { title: string; subtitle?: string; body?: string }) {
        return (
            <div className="art_deco_card-text">
                <p className="art_deco_card-title heading-s">{title}</p>

                {subtitle && <p className="art_deco_card-subtitle subtitle-extra">{subtitle}</p>}

                {body && <p className="art_deco_card-body body">{body}</p>}
            </div>
        );
    }

    // #endregion -------------------------------------------

// #endregion -------------------------------------------

// #region --- Art Deco Card Grid -------------------------------

export type ArtDecoCardGridProps = WithHTMLProps & {
    cards: NonEmptyArray<ArtDecoCardProps>;
};

export default function ArtDecoCardGrid({
    cards,

    className,
    ref,
    ...htmlProps
}: ArtDecoCardGridProps) {
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", { stagger: 0.15, y: 24 });

    return (
        <div {...htmlProps} className={`art_deco_card_grid ${className ?? ""}`} ref={mergeRefs(animRef, ref)}>
            {cards.map((c, idx) => (
                <ArtDecoCard key={idx} className="mwc-animate" {...c} />
            ))}
        </div>
    );
}

// #endregion -------------------------------------------
