import { ImageProps } from "next/image";

export type CustomImageProps = ImageProps & {
    caption?: string;
}

// type BasicImageProps = 


// #region --- Background Image ------------------------------------------

export type BackgroundCustomImageProps = {
    backgroundImage?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
}

// #endregion ------------------------------------------------------------