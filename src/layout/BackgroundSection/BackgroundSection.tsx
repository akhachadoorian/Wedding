import { PropsWithChildren } from "react";
import generateSectionClass from "../../hooks/generateSectionClass";
import { BackgroundImageProps, ImageProps } from "../../types/images";
import { WithHTMLProps } from "../../types/props";
import './BackgroundSection.scss';
import { DEFAULT_IMAGE } from "../../data/defaultImage";
import { NumBetweenInclusive } from "../../types/utility";


type BackgroundSectionProps = WithHTMLProps & PropsWithChildren & {
    image: ImageProps;
    overlayWeight?: NumBetweenInclusive<100, 0>;
    applySlant?: boolean;
    inverseSlant?: boolean;
    sectionPrefix?: string;
};

export default function BackgroundSection({
    image = DEFAULT_IMAGE,
    overlayWeight = 35,
    applySlant = false,
    inverseSlant = false,

    sectionPrefix,

    children,
    id,
    className,
    ...htmlProps
}: BackgroundSectionProps) {
    const outerClass = className && sectionPrefix ? generateSectionClass({sectionPrefix: sectionPrefix, className:className}) : className ? className : sectionPrefix ? `${sectionPrefix}-section` : '';

    return (
        <section 
            {...htmlProps} 
            id={id ? id : sectionPrefix ? sectionPrefix : ''} 
            className={`bg-section ${outerClass} ${!applySlant ? '' : inverseSlant ? 'bg-slant' : 'bg-slant-inverse'}`}
        >
            <div className='img-holder bg-img_holder'>
                <img src={image.src} alt={image.alt} className="img-bw" />

                <div className="img-overlay" style={{opacity: `${overlayWeight}%`}} />
            </div>

            <div className={`bg ${sectionPrefix ?? ''}`} >
                {children}
            </div>

        </section>
    )
}
