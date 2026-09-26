import { heroImage } from "@/content/builders";
import { EVENT } from "@/content/event";
import { ComingSoonPageContent, HeroContent } from "@/content/types";

// Form step text lives with the form: src/components/RSVPForm/content.ts

// #region --- Hero ---

const hero: HeroContent = {
    image: heroImage,
    eyebrow: "RSVP",
    header: "Reply & Revel",
    subtitle: `Kindly respond by ${EVENT.rsvp.deadline}`,
    body: "We'd love to have you there. Find your reservation below and let us know if you'll be joining us!",
};

// #endregion ---

// #region --- Coming Soon ---

const comingSoon = {
    page: {
        pageTitle: "RSVP",
        body: "This page will be used to RSVP for the wedding and rehearsal mixer.",
    },
} satisfies { page: ComingSoonPageContent };

// #endregion ---

// #region --- Content ---

const rsvpContent = {
    hero,
    comingSoon,
};

export default rsvpContent;

// #endregion ---
