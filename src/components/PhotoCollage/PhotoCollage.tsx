import { DEFAULT_IMAGE, DEFAULT_IMAGE_DISNEY, DEFAULT_IMAGE_ENGAGEMENT, DEFAULT_IMAGE_GRADUATION, DEFAULT_IMAGE_SUNGLASSES } from "@/data/defaultImage";
import { useTooltip } from "@/layout/GlobalTooltip/GlobalTooltip";
import { CustomImageProps } from "@/types/images";
import { WithHTMLProps } from "@/types/props";
import { RequireX } from "@/types/utility";
import Image from "next/image";
import { useState } from "react";
import "./PhotoCollage.scss";

export type PhotoCollageProps = WithHTMLProps & {
    header?: string;

    mainImage?: CustomImageProps;
    // sideImages?: RequireX<CustomImageProps, 4>
    leftSideImages?: RequireX<CustomImageProps, 2>;
    rightSideImages?: RequireX<CustomImageProps, 2>;
    styleOptions?: {
        headerTop: boolean;
        textBehind: boolean;
    };
};

const DEFAULT_STYLE_OPTIONS = {
    headerTop: true,
    textBehind: false,
};

const DEFAULT_LEFT_IMAGES : RequireX<CustomImageProps, 2> = [
    DEFAULT_IMAGE_ENGAGEMENT,
    DEFAULT_IMAGE_SUNGLASSES,
];


const DEFAULT_RIGHT_IMAGES : RequireX<CustomImageProps, 2> = [
    DEFAULT_IMAGE_DISNEY,
    DEFAULT_IMAGE_GRADUATION,
];

export default function PhotoCollage({
    header,
    mainImage = DEFAULT_IMAGE,
    leftSideImages = DEFAULT_LEFT_IMAGES,
    rightSideImages = DEFAULT_RIGHT_IMAGES,
    styleOptions = DEFAULT_STYLE_OPTIONS,

    className,
    ...htmlProps
}: PhotoCollageProps) {
    const [touchedIdx, setTouchedIdx] = useState<number | null>(null);
    const { makeMouseHandlers } = useTooltip();

    const makeTouchHandlers = (idx: number) => ({
        onTouchStart: (e: React.TouchEvent) => {
            e.stopPropagation();
            setTouchedIdx((prev) => (prev === idx ? null : idx));
        },
    });

    return (
        <div {...htmlProps} className={`photo_collage ${className ?? ""}`}>
            {header && <h2 className="photo_collage-text">{header}</h2>}

            <div className="photo_collage-imgs">
                {/* Left Column */}
                {leftSideImages && (
                    <div className="photo_collage-imgs-left photo_collage-imgs-side">
                        {leftSideImages.map((img, idx) => (
                            <PhotoCollageImageHolder key={idx} className={`photo_collage-img photo_collage-img-${idx === 0 ? 'tall' : 'long'}`} img={img} makeMouseHandlers={makeMouseHandlers}/>
                        ))}
                    </div>
                )}

                {/* Center Image */}
                <PhotoCollageImageHolder
                    className="photo_collage-imgs-main"
                    img={mainImage}
                    makeMouseHandlers={makeMouseHandlers}
                    // makeTouchHandlers={makeTouchHandlers}
                />

                {/* Right Column */}
                {rightSideImages && (
                     <div className="photo_collage-imgs-left photo_collage-imgs-side">
                        {rightSideImages.map((img, idx) => (
                            <PhotoCollageImageHolder key={idx} className={`photo_collage-img photo_collage-img-${idx === 0 ? 'long' : 'tall'}`} img={img} makeMouseHandlers={makeMouseHandlers} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function PhotoCollageImageHolder({
    img,
    hideOverlay = false,
    className,
    makeMouseHandlers,
    // makeTouchHandlers
}: {
    img: CustomImageProps;
    hideOverlay?: boolean;
    className?: string;
    makeMouseHandlers: ReturnType<typeof useTooltip>['makeMouseHandlers'];
    // makeTouchHandlers: (idx: number) => { onTouchStart: (e: React.TouchEvent) => void };
}) {
    return (
        <div className={`img-holder ${className ?? ""}`} {...(img.caption ? makeMouseHandlers({ type: "text", caption: img.caption}) : '')} >
            <Image {...img} className="img-bw" />

            {!hideOverlay && <div className="img-overlay" />}
        </div>
    );
}
