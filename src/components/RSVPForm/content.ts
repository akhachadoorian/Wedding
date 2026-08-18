import { RSVPStepTextProps } from "./types";

// #region --- 1 ---

export const STEP_ONE_TEXT: RSVPStepTextProps = {
    stepNumber: 1,
    eyebrow: "Find you Invitation",
    title: "RSVP",
    // body: "",
};

// export const STEP_ONE_TEXT: RSVPStepTextProps = {
//     stepNumber: 1,
//     title: "Find Your Party",
//     body: "Enter your name to find your reservation.",
// };

// #endregion ---

// TODO: responding for which guests?

// #region --- 2 ---

// export const WEDDING_RSVP: RSVPStepTextProps = {
//     stepNumber: 2,
//     title: "Who's Coming?",
//     body: "Let us know who from your party will be joining us on the day.",
// };

export const STEP_TWO_TEXT: RSVPStepTextProps = {
    stepNumber: 2,
    title: "Who's Coming?",
    body: "Let us know who from your party will be joining us on the day.",
};
// #endregion ---

// #region --- 3 ---
export const STEP_THREE_TEXT: RSVPStepTextProps = {
    stepNumber: 3,
    title: "Meal Selection",
    body: "Please choose a meal preference for each guest attending. Let us know about any dietary restrictions or allergies in the field below.",
};

// #endregion ---

// #region --- 4 ---
export const STEP_FOUR_TEXT: RSVPStepTextProps = {
    stepNumber: 4,
    title: "",
    body: "",
};
// #endregion ---

// #region --- 5 ---
export const STEP_FIVE_TEXT: RSVPStepTextProps = {
    stepNumber: 5,
    title: "Rehearsal Mixer",
    body: "You've been invited to join us the evening before the wedding — Friday, October 30th from 8:30–11 PM at Maggiano's Little Italy for drinks and snacks. Will you be joining us?",
};
// #endregion ---

// #region --- Thank you ---

export const FORM_THANK_YOU = {
    yes: {
        eyebrow: "Thank you",
        header: "You're all set!",
        body: "We've received your RSVP and can't wait to celebrate with you. See you on October 31st!",
    },
    no: {
        eyebrow: "Thank you",
        header: "We'll miss you!",
        body: "We're sorry you can't be there, but we appreciate you letting us know. ",
    },
};

// #endregion ---

// #region --- Thank ---

// #endregion ---

// #region --- Errors ---

export const UNABLE_TO_FIND =
    "We couldn't find any party with that name. Please try again.";

export const NO_GUESTS =
    "Unable to fetch guests. Please try refreshing the page or try again later.";
// #endregion ---

// #region ---  ---
// #endregion ---


// // #region --- 2 ---

// export const STEP_TWO_TEXT: RSVPStepTextProps = {
//     stepNumber: 2,
//     title: "Your Responding for",
//     body: "Let us know who from your party will be joining us on the day.",
// };

// // #endregion ---

// // #region --- 3 ---

// export const STEP_THREE_TEXT: RSVPStepTextProps = {
//     stepNumber: 2,
//     title: "Who's Coming?",
//     body: "Let us know who from your party will be joining us on the day.",
// };

// // #endregion ---

// // #region --- 4 ---
// export const STEP_FOUR_TEXT: RSVPStepTextProps = {
//     stepNumber: 4,
//     title: "Meal Selection",
//     body: "Please choose a meal preference for each guest attending. Let us know about any dietary restrictions or allergies in the field below.",
// };
// // #endregion ---

// // #region --- 5 ---
// export const STEP_FIVE_TEXT: RSVPStepTextProps = {
//     stepNumber: 5,
//     title: "",
//     body: "",
// };
// // #endregion ---

// // #region --- 6 ---
// export const STEP_SIX_TEXT: RSVPStepTextProps = {
//     stepNumber: 6,
//     title: "Rehearsal Mixer",
//     body: "You've been invited to join us the evening before the wedding — Friday, October 30th from 8:30–11 PM at Maggiano's Little Italy for drinks and snacks. Will you be joining us?",
// };
// // #endregion ---