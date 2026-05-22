
export type ImageProps = {
    src: string;
    alt?: string;
    caption?: string;
    aspectRatio?: 'landscape' | 'portrait' | 'square';
    // objectPosition: 
}


// #region Background Image

export type BackgroundImageProps = {
    backgroundImage?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
}

// #endregion 