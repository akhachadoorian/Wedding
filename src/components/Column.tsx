import { ButtonSettingProps } from "@/types/buttons";
import { WithHTMLProps } from "@/types/props";
import { Alignment, NonEmptyArray } from "@/types/utility";
import { cn } from "@/utils/cn";

interface BaseColumn extends WithHTMLProps {
    lines: NonEmptyArray<string>;
    button?: ButtonSettingProps;
}

export interface LeftColumn extends BaseColumn {
    orientation: Extract<Alignment, "left">;
}

export interface CenterColumn extends BaseColumn {
    orientation: Extract<Alignment, "center">;
}

export interface RightColumn extends BaseColumn {
    orientation: Extract<Alignment, "right">;
}

const ORIENTATION_CLASS_MAP = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
} as const satisfies Record<Alignment, string>;

export type ColumnProps = LeftColumn | CenterColumn | RightColumn;

export function Column({
    lines,
    orientation,
    ref,
    className,
    ...htmlProps
}: ColumnProps) {
    return (
        <div
            {...htmlProps}
            className={cn(ORIENTATION_CLASS_MAP[orientation], className)}
            ref={ref}
        >
            <div className="flex flex-col gap-050">
                {lines.map((line, idx) => (
                    <p
                        className="font-sans text-xs md:text-md font-normal leading-[140%] tracking-[1px] md:tracking-[2px] uppercase"
                        key={idx}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
}
