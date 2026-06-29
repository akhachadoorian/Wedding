import { WithHTMLProps } from '@/types/props';
import './ImageHolder.scss';
import Image from 'next/image';
import { CustomImageProps } from '@/types/images';
import { useTooltip } from '@/layout/GlobalTooltip/GlobalTooltip';


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

type ToolTipHoverImageHolderProps = ImageHolderProps & {
    makeMouseHandlers: ReturnType<typeof useTooltip>["makeMouseHandlers"];
    // makeTouchHandlers: (idx: number) => { onTouchStart: (e: React.TouchEvent) => void };
} 


export function ToolTipHoverImageHolder({
    img,
    includeOverlay = true,
    style: wrapperStyle,
    className,
    makeMouseHandlers,
    // makeTouchHandlers
}:ToolTipHoverImageHolderProps) {

    const { caption, imgPositionResponsive, style, ...imageProps } = img;

    const divStyle = {
        "--img-object-position": imgPositionResponsive?.desktop ?? "center",
        "--img-object-position-mobile": imgPositionResponsive?.mobile ?? imgPositionResponsive?.desktop ?? "center",
        ...wrapperStyle,
    } as React.CSSProperties;

    return (
        <div
            className={`img-holder img-tooltip_hover ${className ?? ""}`} style={divStyle}
            {...(img.caption
                ? makeMouseHandlers({ type: "text", caption: img.caption })
                : "")}
        >
            <Image {...imageProps} className="img-bw" style={style} />

            {includeOverlay && <div className="img-overlay" />}
        </div>
    );
}
