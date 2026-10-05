import { arrowLink, heroImage } from "@/content/builders";
import { EVENT } from "@/content/event";
import { ComingSoonPageContent, HeroContent } from "@/content/types";
import { ThreeButtonsArray } from "@/types/buttons";

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

// #region --- RSVP Closed (countdown variations) ---

const closedButtons: ThreeButtonsArray = [
    arrowLink("View Details", "/details"),
    arrowLink("Accommodations", "/accommodations"),
];

const closed = {
    countdownLeads: {
        eyebrow: "RSVP Closed",
        header: "Reply received, revelry pending",
        body: `Our guest list is officially closed. Thank you to everyone who sent in their reply. We can't wait to celebrate with you at ${EVENT.venue.name}.`,
        buttons: closedButtons,
    },
    countdownSentence: {
        eyebrow: "RSVP",
        header: "Reply received, revelry pending",
        body: `<p class="gold-italic">Our guest list is officially closed</p><p>Thank you to everyone who sent in their reply. We can't wait to celebrate with you at ${EVENT.venue.name}.</p>`,
        buttons: closedButtons,
    },
    splitWithSeconds: {
        eyebrow: "RSVP Closed",
        header: "Reply received, revelry pending",
        body: `Our guest list is officially closed. Thank you for replying. We can't wait to celebrate with you on ${EVENT.wedding.date}.`,
        buttons: closedButtons,
    },
};

// #endregion ---

// #region --- Content ---

const rsvpContent = {
    hero,
    comingSoon,
    closed,
};

export default rsvpContent;

// #endregion ---
