import { LenisLink } from "../../hooks/LenisLink";
import { NonEmptyArray } from "../../types/utility";
import { useTooltip } from "../../layout/GlobalTooltip/GlobalTooltip";

import "./DashedCopy.scss";
import { useFadeInChildren } from "../../hooks/useFadeIn";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Props for the `DashedCopy` component, which renders a horizontal layout with optional left/right text separated by a dashed line.
 *
 * @property className    - Additional CSS class(es) applied to the root element.
 * @property leftCopy - Text displayed on the left side of the dashed divider line.
 * @property rightCopy - Text displayed on the right side of the dashed divider line.
 * @property link - If provided, wraps the component in a Lenis-smooth anchor link.
 * @property tooltipCaption - Tooltip text shown on hover when inside a `DashedCopyGrid`.
 */
export type DashedCopyProps = {
    /** Additional CSS class(es) applied to the root element. */
    className?: string;
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
 * @param className - Additional CSS class(es) applied to the root element.
 * @param leftCopy - Text displayed on the left side of the dashed divider line.
 * @param rightCopy - Text displayed on the right side of the dashed divider line.
 * @param link - If provided, wraps the component in a Lenis-smooth anchor link.
 * @param tooltipCaption - Tooltip text shown on hover when inside a `DashedCopyGrid`.
 * 
 * @returns `null` if both `leftCopy` and `rightCopy` are omitted. `react-router` `<Link>` when `link` is provided, otherwise a plain `<div>`.
 * 
 */
export function DashedCopy({ className, leftCopy, rightCopy, link, tooltipCaption }: DashedCopyProps) {
    const lineRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = lineRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: 0.6,
                    delay: 0.3,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    if (!leftCopy && !rightCopy) return null;

    if (link) {
        return (
            <LenisLink to={link} className={`dashed_copy dashed_copy-link ${className ?? ""}`} {...(tooltipCaption ? { "data-tooltip": tooltipCaption } : {})}>
                {leftCopy && <p className="dashed_copy-text dashed_copy-left">{leftCopy}</p>}
                <div ref={lineRef} className="dashed_copy-line"></div>
                {rightCopy && <p className="dashed_copy-text dashed_copy-right">{rightCopy}</p>}
            </LenisLink>
        );
    }

    return (
        <div className={`dashed_copy ${className ?? ""}`}>
            {leftCopy && <p className="dashed_copy-text dashed_copy-left">{leftCopy}</p>}
            <div ref={lineRef} className="dashed_copy-line"></div>
            {rightCopy && <p className="dashed_copy-text dashed_copy-right">{rightCopy}</p>}
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

    const ref = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
            stagger: 0.15,
            y: 24,
        });

    return (
        <div ref={ref} className={`dashed_copy_grid ${className ?? ""}`}>
            <div className="dashed_copy_grid-inner">
                {dashedCopy.map((d, idx) => (
                    <div className="dashed_copy_grid-element mwc-animate" key={idx} {...(d.tooltipCaption && d.link ? makeMouseHandlers({ type: "text-arrow", caption: d.tooltipCaption, arrowDirection: "top-right" }) : d.tooltipCaption ?  makeMouseHandlers({ type: "text", caption: d.tooltipCaption}) : {})}>
                        <DashedCopy {...d}  />
                    </div>
                ))}
            </div>
        </div>
    );
}
