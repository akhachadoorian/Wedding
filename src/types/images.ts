
export type ImageProps = {
    src: string;
    alt?: string;
    caption?: string;
    aspectRatio?: 'landscape' | 'portrait' | 'square';
}


// #region Background Image

export type BackgroundImageProps = {
    backgroundImage?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
}

// #endregion 