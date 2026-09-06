import { WithHTMLProps } from "@/types/props";
import { RequireAtLeastOne } from "@/types/utility";
import { cn } from "@/utils/cn";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import mergeRefs from "@/hooks/mergeRefs";
import { CenterColumn, Column, LeftColumn, RightColumn } from "./Column";
import { useFitText } from "react-use-fittext";

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

    const { containerRef, textRef, fontSize } = useFitText({
        fitMode: "width",
        lineMode: "single",
        maxFontSize: 400,
    });

    return (
        <div
            {...htmlProps}
            className={cn(className)}
            ref={mergeRefs(animRef, ref)}
        >
            <div className="flex flex-row justify-between gap-col-gutter mb-400 md:mb-700">
                {leftCol && <Column {...leftCol} />}
                {centerCol && <Column {...centerCol} />}
                {rightCol && <Column {...rightCol} />}
            </div>

            {/* <div className="text-center" ref={containerRef}>
                <h2 ref={textRef} style={{ fontSize, lineHeight: 1 }}>
                    {header}
                </h2>
                {body && <p className="">{body}</p>}
            </div> */}
            <div
                className="text-center"
                ref={containerRef as React.RefObject<HTMLDivElement>}
            >
                <h2
                    ref={textRef as React.RefObject<HTMLHeadingElement>}
                    style={{ fontSize, lineHeight: 1 }}
                >
                    {header}
                </h2>
                {body && <p className="">{body}</p>}
            </div>
        </div>
    );
}
