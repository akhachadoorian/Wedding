import { WithHTMLProps } from "@/types/props";
import { RequireAtLeastOne } from "@/types/utility";
import { cn } from "@/utils/cn";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import { useFitHeadline } from "@/hooks/useFitHeadline";
import mergeRefs from "@/hooks/mergeRefs";
import { CenterColumn, Column, LeftColumn, RightColumn } from "./Column";

export type ThreeColumnCopyProps = WithHTMLProps & {
    header: string;
    body?: string;
    columnContent: RequireAtLeastOne<{
        leftCol?: LeftColumn;
        centerCol?: CenterColumn;
        rightCol?: RightColumn;
    }>;
};

export function ThreeColumnCopy({
    header,
    body,
    columnContent,
    className,
    ref,
    ...htmlProps
}: ThreeColumnCopyProps) {
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

    const { leftCol, centerCol, rightCol } = columnContent;

    const { containerRef, textRef, headlineStyle } = useFitHeadline();

    return (
        <div
            {...htmlProps}
            className={cn(className)}
            ref={mergeRefs(animRef, ref)}
        >
            <div className="flex flex-row items-end justify-between gap-col-gutter mb-400 md:mb-700">
                {leftCol && <Column {...leftCol} />}
                {centerCol && <Column {...centerCol} />}
                {rightCol && <Column {...rightCol} />}
            </div>

            <div className="text-center space-y-300" ref={containerRef}>
                <h2 ref={textRef} style={headlineStyle}>
                    {header}
                </h2>
                {body && <p className="body-l">{body}</p>}
            </div>
        </div>
    );
}
