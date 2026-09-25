'use client'

import { PropsWithChildren } from "react";
import { WithHTMLProps } from "../types/props"
import { ColorVariables } from "../types/colors";
import { BackgroundCustomImageProps } from "../types/images";
import generateSectionClass from "../hooks/generateSectionClass";
import { cn } from "@/utils/cn";


type InsetBackgroundSectionProps = WithHTMLProps & PropsWithChildren & BackgroundCustomImageProps & {
    sectionPrefix?: string;
};

export default function InsetBackgroundSection({
    backgroundImage = '/assets/DiamondPattern.svg',
    backgroundSize = '60vw',
    backgroundPosition = 'center center',
    backgroundRepeat = 'no-repeat',

    sectionPrefix,

    children,
    id,
    style,
    className,
    ...htmlProps
}: InsetBackgroundSectionProps) {
    const outerClass = className && sectionPrefix ? generateSectionClass({sectionPrefix: sectionPrefix, className:className}) : className ? className : sectionPrefix ? `${sectionPrefix}-section` : '';

    return (
        <section 
            {...htmlProps} 
            id={id ? id : sectionPrefix ? sectionPrefix : ''} 
            className={cn("px-col-margin py-section-padding md:py-[calc(var(--space-1500)+var(--layout-section-padding))]", outerClass)}
            style={{
                ...style,
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: backgroundSize,
                backgroundPosition: backgroundPosition,
                backgroundRepeat: backgroundRepeat,
            }}
        >
            <div
                className={cn(
                    "flex flex-col gap-700 bg-[rgba(22,24,24,0.9)] px-300 py-500",
                    "md:gap-1000 md:p-750 md:max-w-[calc(60.417vw+var(--space-700))] md:mx-auto md:my-800",
                    sectionPrefix,
                )}
            >
                {children}
            </div>

        </section>
    )
}
