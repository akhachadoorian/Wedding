// ⚠️  Auto-generated — do not edit directly.
// Edit vault/Content/Home.md instead, then re-run: npx tsx scripts/generate.ts

import type { CopyOnlyProps } from "../components/CopyOnly/CopyOnly";
import type { DashedCopyGridProps } from "../components/DashedCopy/DashedCopy";
import type { DrinkCardGridProps } from "../components/DrinkCardGrid/DrinkCardGrid";
import type { HomeHeroProps } from "../components/heros/HomeHero/HomeHero";
import type { ImageGridProps } from "../components/ImageGrid/ImageGrid";

export const welcomeCopyCopyOnlyContent: Omit<CopyOnlyProps, "variation" | "headingSize"> = {
  eyebrow: "We're getting married",
  header: "Once upon a time, we found each other, and now we're counting down the days until we say **I do**. We would be thrilled to have you join us in this next chapter.",
};

export const quickNavigationCopyCopyOnlyContent: Omit<CopyOnlyProps, "variation" | "headingSize"> = {
  eyebrow: "We've got you covered",
  header: "Everything from the ceremony to where to stay, all in one place",
};

export const welcomeInfoDashedCopyGridContent: DashedCopyGridProps = {
  dashedCopy: [
    {
      leftCopy: "Saturday, October 31st, 2026",
      rightCopy: "Guests arrive at 4:30 PM",
    },
    {
      leftCopy: "Ceremony – Reception",
      rightCopy: "5:00 PM – 10:30 PM",
    },
    {
      leftCopy: "The Clay Theatre",
      rightCopy: "Green Cove Springs, Florida",
    },
  ],
};

export const quickNavigationCardsDrinkCardGridContent: DrinkCardGridProps = {
  drinkCards: [
    {
      eyebrow: "The Day",
      title: "Details",
      body: "Ceremony time, timeline, and what to expect on the day",
      link: "/details",
      target: "_self",
      drinks: [
        {
          type: "martini",
          rotate: "large",
          rotateNeg: true,
          hoverHeight: "high",
        },
        {
          type: "highball",
          rotate: "small",
          rotateNeg: false,
          hoverHeight: "low",
        },
      ],
    },
    {
      eyebrow: "Accommodations",
      title: "Stay & Travel",
      body: "Hotel blocks, parking, and getting to The Clay Theatre",
      link: "/accommodations",
      target: "_self",
      drinks: [
        {
          type: "cocktail",
          rotate: "medium",
          rotateNeg: false,
          hoverHeight: "medium",
        },
        {
          type: "whiskey",
          rotate: "large",
          rotateNeg: true,
          hoverHeight: "high",
        },
      ],
    },
    {
      eyebrow: "RSVP",
      title: "You're Invited",
      body: "Let us know if you are able to come!",
      link: "/rsvp",
      target: "_self",
      drinks: [
        {
          type: "coupe",
          rotate: "medium",
          rotateNeg: false,
          hoverHeight: "medium",
        },
        {
          type: "margarita",
          rotate: "large",
          rotateNeg: true,
          hoverHeight: "high",
        },
      ],
    },
  ],
};

export const heroHomeHeroContent: Omit<HomeHeroProps, "loaded"> = {
  heading: {
    line1: "Alex Khachadoorian",
    line2: "& Max Paluett",
  },
  eyebrow: {
    variation: "double",
    text: "Saturday Oct 31, 2026",
    doubleText: "The Clay Theatre",
  },
  btn: {
    btnText: "RSVP Now",
    link: "/rsvp",
  },
  image: {
    src: "/images/Max&Alex.jpg",
    alt: "Max and Alex posed on a bridge.",
  },
};

export const photoGalleryImageGridContent: ImageGridProps = {
  curvedImg: {
    src: "/images/Max&Alex.jpg",
  },
  curvedImgCaption: "Lorem ipsum dolor sit amet",
  squareImg: {
    src: "/images/Max&Alex.jpg",
  },
  squareImgCaption: "Lorem ipsum dolor sit amet",
};
