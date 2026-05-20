
import { useBreakpoints } from "../../hooks/useWindowWidth";
import { WithHTMLProps } from "../../types/props";
import { AlignmentProps, NonEmptyArray } from "../../types/utility";

import "./SmallText.scss";

export type SmallTextProps = WithHTMLProps & {
    eyebrow?: string;
    title?: string;
    body?: string;
    alignment?: AlignmentProps;
};

const DEFAULT_ALIGNMENT: AlignmentProps = {
    desktop: "left",
};

// TODO: consider making an interface
// export interface SmallTextProps extends WithHTMLProps {
//     eyebrow?: string;
//     title?: string;
//     body?: string;
//     alignment?: AlignmentProps;
// }
export default function SmallText({
    eyebrow,
    title,
    body,
    alignment = DEFAULT_ALIGNMENT,

    // WithHTMLProps
    className,
    ...htmlProps
}: SmallTextProps) {
    if (!eyebrow && !title && !body) return;

    const width = useBreakpoints();
    const isDesktop = width.isDesktop || width.isLargeDesktop;

    return (
        <div 
            {...htmlProps} 
            className={`small_text small_text-alignment-${isDesktop ? alignment.desktop : alignment.mobile ? alignment.mobile : alignment.desktop}`}
        >
            {eyebrow && <p className="eyebrow gold">{eyebrow}</p>}

            {title && <h5 className="heading-s">{title}</h5>}

            {body && <p className="body-xs">{body}</p>}
        </div>
    );
}

export type SmallTextGridProps = WithHTMLProps & {
    smallText: NonEmptyArray<SmallTextProps>
    // columns
}

export function SmallTextGrid({ 
    smallText,

    // WithHTMLProps
    className,
    ...htmlProps
}:SmallTextGridProps ) {
    return (
        <div {...htmlProps} className={`small_text_grid ${className ?? ''}`}>
            {smallText.map((s, idx) => (
                <SmallText key={idx} {...s} />
            ))}
        </div>
    )
}
