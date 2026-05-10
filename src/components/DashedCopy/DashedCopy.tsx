import { LenisLink } from "../../hooks/LenisLink";
import { NonEmptyArray } from "../../types/utility";
import { useTooltip } from "../../layout/GlobalTooltip/GlobalTooltip";

import "./DashedCopy.scss";

export type DashedCopyProps = {
    /** Text displayed on the left side of the dashed divider line. */
    leftCopy?: string;
    /** Text displayed on the right side of the dashed divider line. */
    rightCopy?: string;
    /** If provided, wraps the component in a Lenis-smooth anchor link. */
    link?: string;
    /** Tooltip text shown on hover when the item is inside a DashedCopyGrid. */
    tooltipCaption?: string;
};



/**
 * A horizontal layout with optional left/right eyebrow text separated by a dashed line.
 * Renders as a `<LenisLink>` when `link` is provided, otherwise a plain `<div>`.
 *
 * @param leftCopy - Text displayed on the left side of the dashed divider line.
 * @param rightCopy - Text displayed on the right side of the dashed divider line.
 * @param link - If provided, wraps the component in a Lenis-smooth anchor link.
 * @param tooltipCaption - Tooltip text shown on hover when inside a `DashedCopyGrid`.
 * @returns `null` if both `leftCopy` and `rightCopy` are omitted.
 */
export function DashedCopy({ leftCopy, rightCopy, link, tooltipCaption }: DashedCopyProps) {
    if (!leftCopy && !rightCopy) return;

    if (link) {
        return (
            <LenisLink to={link} className="dashed_copy dashed_copy-link">
                {leftCopy && <p className="eyebrow white dashed_copy-left">{leftCopy}</p>}
                <div className="dashed_copy-line"></div>
                {rightCopy && <p className="eyebrow white right-copy">{rightCopy}</p>}
            </LenisLink>
        );
    }

    return (
        <div className="dashed_copy">
            {leftCopy && <p className="eyebrow white dashed_copy-left">{leftCopy}</p>}
            <div className="dashed_copy-line"></div>
            {rightCopy && <p className="eyebrow white right-copy">{rightCopy}</p>}
        </div>
    );
}


export type DashedCopyGridProps = {
    /** Additional class name applied to the grid wrapper. */
    className?: string;
    /** Non-empty list of DashedCopy items to render in the grid. */
    dashedCopy: NonEmptyArray<DashedCopyProps>;
};


/**
 * Renders a vertical list of `DashedCopy` rows. Each item can carry a tooltip
 * caption; the tooltip type switches to `"text-arrow"` when the item also has a link.
 *
 * @param className - Additional class name applied to the grid wrapper.
 * @param dashedCopy - Non-empty list of `DashedCopy` items to render.
 */
export default function DashedCopyGrid({ className, dashedCopy }: DashedCopyGridProps) {
    const { makeMouseHandlers } = useTooltip();

    

    return (
        <div className={`dashed_copy_grid ${className ?? ""}`}>
            <div className="dashed_copy_grid-inner">
                {dashedCopy.map((d, idx) => (
                    <div className="dashed_copy_grid-element" key={idx} {...(d.tooltipCaption && d.link ? makeMouseHandlers({ type: "text-arrow", caption: d.tooltipCaption, arrowDirection: "top-right" }) : d.tooltipCaption ?  makeMouseHandlers({ type: "text", caption: d.tooltipCaption}) : {})}>
                        <DashedCopy {...d}  />
                    </div>
                ))}
            </div>
        </div>
    );
}
