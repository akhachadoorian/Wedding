import { ImageProps } from "next/image";

export type CustomImageProps = ImageProps & {
    caption?: string;
    imgPositionResponsive?: ImgPositionResponsive;
}

type ImgPositionResponsive = {
    desktop: string;
    mobile?: string;
}


// #region --- Background Image ------------------------------------------

export type BackgroundCustomImageProps = {
    backgroundImage?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
}

// #endregion ------------------------------------------------------------