
export type HeadingLevelProps = "h1" |  "h2" | "h3" | "h4" | "h5" | "h6"

export type HeadingClassProps = "heading-xxl" | "heading-xl" | "heading-l" | "heading-m" | "heading-s" | "heading-xs";

export type HeadingLevelClassMap = Record<HeadingLevelProps, HeadingClassProps>

export const DEFAULT_HEADING_CLASS_MAP: HeadingLevelClassMap  = {
    h1: "heading-xxl",
    h2: "heading-xl",
    h3: "heading-l",
    h4: "heading-m",
    h5: "heading-s",
    h6: "heading-xs"
}