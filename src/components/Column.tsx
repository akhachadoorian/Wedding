import { ButtonSettingProps } from "@/types/buttons";
import { WithHTMLProps } from "@/types/props";
import { Alignment, NonEmptyArray } from "@/types/utility";
import { cn } from "@/utils/cn";
import Button from "./Buttons/Button";
import { LenisLink } from "@/hooks/LenisLink";

export interface ColumnLink {
    text: string;
    link: string;
    target?: "_blank" | "_self";
}

interface BaseColumn extends WithHTMLProps {
    lines?: NonEmptyArray<string>;
    button?: ButtonSettingProps;
    links?: NonEmptyArray<ColumnLink>;
    linksClassName?: string;
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
    text: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    },
    links: {
        left: "items-start",
        center: "items-center",
        right: "items-end",
    },
} as const satisfies Record<string, Record<Alignment, string>>;

export type ColumnProps = LeftColumn | CenterColumn | RightColumn;

export default function Column({
    lines,
    button,
    links,
    linksClassName,
    orientation,
    ref,
    className,
    ...htmlProps
}: ColumnProps & WithHTMLProps) {
    return (
        <div {...htmlProps} className={cn(className)} ref={ref}>
            <div
                className={cn(
                    "flex flex-col gap-050",
                    ORIENTATION_CLASS_MAP.text[orientation],
                )}
            >
                {lines &&
                    lines.map((line, idx) => (
                        <p
                            className="font-sans text-xs md:text-md font-normal leading-[140%] tracking-[1px] md:tracking-[2px] uppercase"
                            key={idx}
                        >
                            {line}
                        </p>
                    ))}

                {button && (
                    <Button
                        // variant="outline"
                        // size={"small"}
                        btnSettings={button}
                    />
                )}

                {links && (
                    <div
                        className={cn(
                            "flex flex-col gap-050",
                            ORIENTATION_CLASS_MAP.links[orientation],
                        )}
                    >
                        {links.map((linkItem, idx) => (
                            <LenisLink
                                key={idx}
                                href={linkItem.link}
                                target={linkItem.target ?? "_self"}
                                className={cn(
                                    "w-fit underline decoration-transparent decoration-2 underline-offset-[5px] transition-all ease-in-out duration-300 hover:decoration-current max-md:decoration-current",
                                    linksClassName,
                                )}
                            >
                                <p className="font-sans text-xs md:text-md font-normal leading-[140%] tracking-[1px] md:tracking-[2px] uppercase">
                                    {linkItem.text}
                                </p>
                            </LenisLink>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
