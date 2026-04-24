// ⚠️  Auto-generated — do not edit directly.
// Edit vault/Content/Home.md instead, then re-run: npx tsx scripts/generate.ts

import type { CopyOnlyProps } from "../components/CopyOnly/CopyOnly";
import type { DashedCopyGridProps } from "../components/DashedCopy/DashedCopy";
import type { HomeHeroProps } from "../components/heros/HomeHero/HomeHero";

export const welcomeCopyCopyOnlyContent: Omit<CopyOnlyProps, "variation" | "headingSize"> = {
  eyebrow: "We're getting married",
  header: "Once upon a time, we found each other, and now we're counting down the days until we say **I do**. We would be thrilled to have you join us in this next chapter.",
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
    alt: "Couple",
  },
};
