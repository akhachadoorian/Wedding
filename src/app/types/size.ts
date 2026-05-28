/**
 * Type that holds the three sizes needed for clamp
 */
export type ClampSize = {
    minSize: number;
    desiredSize: number;
    maxSize: number;
}

/**
 * Type to hold both mobile and desktop clamp sizes for responsiveness
 */
export type ResponsiveClampSize = {
    size: ClampSize;
    mobileSize?: ClampSize;
}

/**
 * Type to hold a single size variable for desktop and mobile
 */
export type ResponsiveSize = {
    desktop: string;
    mobile?: string;
}