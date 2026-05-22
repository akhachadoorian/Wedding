import mergeRefs from "../../hooks/mergeRefs";
import { useFadeInChildren } from "../../hooks/useFadeIn";
import { ButtonSettingProps } from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";
import { NonEmptyArray } from "../../types/utility";


// #region --- Art Deco Cards -----------------------------

type ArtDecoCardProps = WithHTMLProps & {
    icon?: 'fan';
    title: string;
    subtitle?: string;
    body?: string;
    btnSettings?: ButtonSettingProps
}


export function ArtDecoCard({
    icon = 'fan',
    title,
    subtitle,
    body,
    btnSettings,

    className,
    ...htmlProps
}:ArtDecoCardProps) {
    


    return (
        <div {...htmlProps} className={`art_deco_card ${className ?? ''}`}>
            {/* icon */}

            <p className="art_deco_card-title">{title}</p>

            {subtitle && <p className="art_deco_card-subtitle">{subtitle}</p>}
        </div>
    )
}

    // #region ---
        

    // function ClickableArtDecoCard({}) {
    //     return (

    //     )
    // }

    // #endregion -------------------------------------------

// #endregion -------------------------------------------





// #region --- Art Deco Card Grid -------------------------------

type ArtDecoCardGridProps = WithHTMLProps & {
    cards: NonEmptyArray<ArtDecoCardProps>
}

export default  function ArtDecoCardGrid({
    cards, 

    className,
    ref,
    ...htmlProps
}:ArtDecoCardGridProps) {
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", { stagger: 0.15, y: 24 });

    return (
        <div {...htmlProps} className={` ${className ?? ''}`}  ref={mergeRefs(animRef, ref)} >
            {cards.map(() => (

            ))}
        </div>
    )
}

// #endregion -------------------------------------------