import { WithHTMLProps } from "@/types/props";
import { RequireAtLeastOne } from "@/types/utility";
import { cn } from "@/utils/cn";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import { useFitHeadline } from "@/hooks/useFitHeadline";
import mergeRefs from "@/hooks/mergeRefs";
import Column, { CenterColumn, LeftColumn, RightColumn } from "./Column";
import Star from "@/icons/Star";
import { ButtonSettingProps } from "@/types/buttons";
import Button from "./Buttons/Button";
import ColumnRow from "./ColumnRow";

export type ThreeColumnCopyProps = WithHTMLProps & {
    header: string;
    body?: string;
    button?: ButtonSettingProps;
    columnContent: RequireAtLeastOne<{
        leftCol?: LeftColumn;
        centerCol?: CenterColumn;
        rightCol?: RightColumn;
    }>;
};

export function ThreeColumnCopy({
    header,
    body,
    button,
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
            <ColumnRow
                columnOne={leftCol}
                columnTwo={centerCol}
                columnThree={rightCol}
                styleOptions={{
                    includeStars: true,
                }}
                className="mb-400 md:mb-700"
            />

            <div className="flex flex-col items-center gap-500">
                <div
                    className="text-center space-y-300 w-full "
                    ref={containerRef}
                >
                    <h2
                        ref={textRef}
                        style={headlineStyle}
                        className="mwc-animate"
                    >
                        {header}
                    </h2>

                    {body && <p className="body-l mwc-animate">{body}</p>}
                </div>

                {button && (
                    <Button
                        className="mwc-animate"
                        colorScheme="burgundy"
                        btnSettings={button}
                    />
                )}
            </div>
        </div>
    );
}
