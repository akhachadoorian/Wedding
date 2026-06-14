import { WithHTMLProps } from '@/types/props';
import './ImageHolder.scss';
import Image from 'next/image';
import { CustomImageProps } from '@/types/images';


export type ImageHolderProps = WithHTMLProps & {
    img: CustomImageProps;
    includeOverlay?: boolean
}

export default function ImageHolder({
    img,
    includeOverlay = true,

    className,
    ...htmlProps
}:ImageHolderProps) {
    return (
        <div {...htmlProps} className={`img-holder ${className ?? ""}`}>
            <Image 
                {...img}
                className='bw-img'
            />

            {includeOverlay && <div className='img-overlay' />}
        </div>
    )
}

