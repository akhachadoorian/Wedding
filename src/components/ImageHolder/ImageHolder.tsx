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
    style: wrapperStyle,
    ...htmlProps
}:ImageHolderProps) {
    const { caption, imgPositionResponsive, style, ...imageProps } = img;

    const divStyle = {
        "--img-object-position": imgPositionResponsive?.desktop ?? "center",
        "--img-object-position-mobile": imgPositionResponsive?.mobile ?? imgPositionResponsive?.desktop ?? "center",
        ...wrapperStyle,
    } as React.CSSProperties;


    return (
        <div {...htmlProps} className={`img-holder ${className ?? ""}`} style={divStyle}>
            <Image
                {...imageProps}
                className='img-bw'
                style={style}
            />

            {includeOverlay && <div className='img-overlay' />}
        </div>
    )
}

