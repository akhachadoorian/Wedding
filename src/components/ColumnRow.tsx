import { WithHTMLProps } from "@/types/props";
import Column, { ColumnProps } from "./Column";
import { cn } from "@/utils/cn";
import Star from "@/icons/Star";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import mergeRefs from "@/hooks/mergeRefs";
import { ColorVariables } from "@/types/colors";

interface ColumnRowStyleOptions {
    includeStars?: boolean;
    starColor?: ColorVariables;
}

const DEFAULT_STYLE_OPTIONS: ColumnRowStyleOptions = {
    includeStars: false,
    starColor: "--wine-600",
};

const STAR_CLASSES = {
    default: "size-6 md:size-8",
    hover: "transition-transform duration-500 ease-in-out hover:animate-spin",
};

interface ColumnRowProps extends WithHTMLProps {
    columnOne?: ColumnProps;
    columnTwo?: ColumnProps;
    columnThree?: ColumnProps;
    styleOptions?: ColumnRowStyleOptions;
}

export default function ColumnRow({
    columnOne,
    columnTwo,
    columnThree,
    styleOptions = DEFAULT_STYLE_OPTIONS,
    ref,
    className,
    ...htmlProps
}: ColumnRowProps) {
    if (!columnOne && !columnTwo && !columnThree) return null;

    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

    const displayStars =
        styleOptions.includeStars ?? DEFAULT_STYLE_OPTIONS.includeStars;

    const displayFirstStar =
        displayStars && columnOne && (columnTwo || columnThree);

    const displaySecondStar = displayStars && columnTwo && columnThree;

    return (
        <div
            {...htmlProps}
            ref={mergeRefs(animRef, ref)}
            className={cn(
                "flex flex-col md:flex-row md:items-center justify-between gap-col-gutter ",
                className,
            )}
        >
            {columnOne && <Column {...columnOne} className="mwc-animate" />}

            {displayFirstStar && (
                <div className="flex items-center gap-2">
                    <Star
                        color={
                            styleOptions.starColor ??
                            DEFAULT_STYLE_OPTIONS.starColor
                        }
                        className={cn(
                            STAR_CLASSES.default,
                            STAR_CLASSES.hover,
                            "mwc-animate",
                        )}
                    />

                    <div className="w-full h-px bg-burgundy md:hidden"></div>
                </div>
            )}

            {columnTwo && <Column {...columnTwo} className="mwc-animate" />}

            {displaySecondStar && (
                <div className="flex items-center gap-2">
                    <div className="w-full h-px bg-burgundy  md:hidden"></div>

                    <Star
                        color={
                            styleOptions.starColor ??
                            DEFAULT_STYLE_OPTIONS.starColor
                        }
                        className={cn(
                            STAR_CLASSES.default,
                            STAR_CLASSES.hover,
                            "mwc-animate",
                        )}
                    />
                </div>
            )}

            {columnThree && <Column {...columnThree} className="mwc-animate" />}
        </div>
    );
}
