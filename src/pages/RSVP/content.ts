
import { TextOnlyHeroProps } from "../../layout/TextOnlyHero/TextOnlyHero";

// ----- Content -----------------------------------------------


const hero: Omit<TextOnlyHeroProps, "loaded" | "styleOptions"> = {
    eyebrow: 'RSVP',
    header: "Let Us Know You're Coming",
    subtitle: "Kindly respond by October 1st",
    body: "We'd love to have you there. Find your reservation below and let us know if you'll be joining us on October 31st."
}

// ----- Content -----------------------------------------------

const rsvpContent = {
    hero: hero
};

export default rsvpContent;