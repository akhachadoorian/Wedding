
export type ClampSize = {
    minSize: number;
    desiredSize: number;
    maxSize: number;
}

export type ResponsiveSize = {
    size: ClampSize;
    mobileSize?: ClampSize;
}