import { EVENT } from "@/content/event";
import { RSVPStepTextProps } from "./types";

const { wedding, venue, rehearsal } = EVENT;

// #region --- Steps ---

export const STEP_ONE_TEXT: RSVPStepTextProps = {
    stepNumber: 1,
    eyebrow: "Find Your Invitation",
    title: "RSVP",
};

export const STEP_TWO_TEXT: RSVPStepTextProps = {
    stepNumber: 2,
    eyebrow: "Wedding Ceremony & Reception",
    title: "Who's Joining Us?",
    body: {
        left: `${wedding.weekday}\n${wedding.date}`,
        center: `${venue.name}\n${venue.cityShort}`,
        right: `Ceremony ${wedding.ceremony}\nUntil ${wedding.end}`,
    },
};

export const STEP_THREE_TEXT: RSVPStepTextProps = {
    stepNumber: 3,
    eyebrow: "Meal Selection",
    title: "What's on the Menu?",
    body: "Please choose a meal preference for each guest attending. Let us know about any dietary restrictions or allergies in the field below.",
};

export const STEP_FOUR_TEXT: RSVPStepTextProps = {
    stepNumber: 4,
    eyebrow: "Transportation",
    title: "Riding the Bus?",
    body: "If you're staying at one of our hotel blocks, let us know if you'd like a seat on the complimentary bus to the venue.",
};

export const STEP_FIVE_TEXT: RSVPStepTextProps = {
    stepNumber: 5,
    eyebrow: "Rehearsal Mixer",
    title: "Join Us Friday?",
    body: {
        left: `${rehearsal.weekday}\n${rehearsal.date}`,
        center: `${rehearsal.place}\n${rehearsal.area}`,
        right: `From ${rehearsal.start}\nUntil ${rehearsal.end}`,
    },
};

// #endregion ---

// #region --- Thank You ---

export const FORM_THANK_YOU = {
    yes: {
        eyebrow: "Thank you",
        header: "You're all set!",
        body: `We've received your RSVP and can't wait to celebrate with you. See you on ${wedding.date}!`,
    },
    no: {
        eyebrow: "Thank you",
        header: "We'll miss you!",
        body: "We're sorry you can't be there, but we appreciate you letting us know.",
    },
};

// #endregion ---

// #region --- Errors ---

export const NO_GUESTS =
    "Unable to fetch guests. Please try refreshing the page or try again later.";

// #endregion ---
