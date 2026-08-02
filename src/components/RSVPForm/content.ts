import { RSVPStepTextProps } from "./types";


// #region --- 1 ---

export const STEP_ONE_TEXT: RSVPStepTextProps = {
    stepNumber: 1,
    title: "Find Your Party",
    body: "Enter your name to find your reservation.",
};

// #endregion ---

// #region --- 2 ---

export const STEP_TWO_TEXT: RSVPStepTextProps = {
    stepNumber: 2,
    title: "Who's Coming?",
    body: "Let us know who from your party will be joining us on the day.",
};
// #endregion ---


// #region ---  ---
// #endregion ---


// #region --- Errors ---

export const UNABLE_TO_FIND = "We couldn't find any party with that name. Please try again."

export const NO_GUESTS = "Unable to fetch guests. Please try refreshing the page or try again later."
// #endregion ---