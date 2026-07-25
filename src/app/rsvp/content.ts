import { DEFAULT_IMAGE } from "@/data/defaultImage";
import { RSVPFormProps, RSVPStepProps } from "../../components/RSVPForm/RSVPForm";
import { TextOnlyHeroProps } from "../../layout/TextOnlyHero/TextOnlyHero";
import { ImageOverlayHeroProps } from "@/layout/ImageOverlayHero/ImageOverlayHero";

// #region --- Hero --------------------------------------------------

const heroText: Omit<TextOnlyHeroProps, "loaded" | "styleOptions"> = {
    eyebrow: "RSVP",
    header: "Let Us Know You're Coming",
    subtitle: "Kindly respond by October 1st",
    body: "We'd love to have you there. Find your reservation below and let us know if you'll be joining us on October 31st.",
};

const hero: Omit<ImageOverlayHeroProps, "loaded" | "styleOptions"> = {
    image: {
        ...DEFAULT_IMAGE,
        imgPositionResponsive: {
            desktop: "center 25%",
            mobile: "35% center",
        },
    },
    eyebrow: "RSVP",
    header: "Let Us Know You're Coming",
    subtitle: "Kindly respond by Oct 1st",
    body: "We'd love to have you there. Find your reservation below and let us know if you'll be joining us!",
}


// #endregion --------------------------------------------------------

// #region --- RSVP Form --------------------------------------------------

const step1: RSVPStepProps = {
    // progressBarText: "Find Party",
    type: 'search',
    textContent: {
        stepNumber: 1,
        title: "Find Your Party",
        body: 'Enter your name to find your reservation.'
    },
};

const step2: RSVPStepProps = {
    // progressBarText: "Attending",
    textContent: {
        stepNumber: 2,
        title: "Who's Coming?",
        body: 'Let us know who from your party will be joining us on the day.'
    },
};

const rsvpForm: RSVPFormProps = {
    progressBar: ['Find Party', 'Attending'],
    steps: [step1, step2],
};

// #endregion --------------------------------------------------------

// #region --- Content -----------------------------------------------

const rsvpContent = {
    hero: hero,
    form: rsvpForm,
};

export default rsvpContent;

// #endregion --------------------------------------------------------

// #region --- Hero --------------------------------------------------

// #endregion --------------------------------------------------------

