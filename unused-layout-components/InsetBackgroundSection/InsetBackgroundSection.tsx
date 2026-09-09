'use client'

import { PropsWithChildren } from "react";
import { WithHTMLProps } from "../../types/props"
import { ColorVariables } from "../../types/colors";
import './InsetBackgroundSection.scss';
import { BackgroundCustomImageProps } from "../../types/images";
import generateSectionClass from "../../hooks/generateSectionClass";


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
            className={`inset_bg-section ${outerClass}`}
            style={{
                ...style,
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: backgroundSize,
                backgroundPosition: backgroundPosition,
                backgroundRepeat: backgroundRepeat,
            }}
        >
            <div className={`inset_bg ${sectionPrefix ?? ''}`} >
                {children}
            </div>

        </section>
    )
}
