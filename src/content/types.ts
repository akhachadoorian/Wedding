import { CopyOnlyProps } from "@/components/CopyOnly";
import { ComingSoonProps, ComingSoonSectionProps } from "@/layout/ComingSoon";
import { ImageOverlayHeroProps } from "@/layout/ImageOverlayHero";

/** Heading block (eyebrow / header / subtitle / body / buttons) rendered by CopyOnly. */
export type CopyContent = Omit<CopyOnlyProps, "styleOptions" | "className">;

/** Page hero rendered by ImageOverlayHero. Styling is set in the page. */
export type HeroContent = Omit<ImageOverlayHeroProps, "loaded" | "styleOptions">;

/** Full-page fallback shown while a page is not live. */
export type ComingSoonPageContent = ComingSoonProps;

/** Section fallback shown while a section is not live. Theme is set in the page. */
export type ComingSoonSectionContent = Omit<ComingSoonSectionProps, "theme" | "className">;
