import { PropsWithChildren } from "react";
import { WithHTMLProps } from "../../types/props"
import { ColorVariables } from "../../types/colors";
import './InsetBackgroundSection.scss';
import { BackgroundImageProps } from "../../types/images";


type InsetBackgroundSectionProps = WithHTMLProps & PropsWithChildren & BackgroundImageProps & {

};

export default function InsetBackgroundSection({
    backgroundImage = '/assets/DiamondPattern.svg',
    backgroundSize = '60vw',
    backgroundPosition = 'center center',
    backgroundRepeat = 'no-repeat',

    children,
    style,
    className,
    ...htmlProps
}: InsetBackgroundSectionProps) {
    return (
        <section 
            {...htmlProps} 
            className={`inset_bg-section ${className ?? ''}`} 
            style={{
                ...style,
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: backgroundSize,
                backgroundPosition: backgroundPosition,
                backgroundRepeat: backgroundRepeat,
            }}
        >
            <div className={`inset_bg`} >
                {children}
            </div>

        </section>
    )
}
