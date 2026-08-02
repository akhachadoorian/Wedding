import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { WarningIcon } from "@phosphor-icons/react";
import { getFindMatchingGuests, GuestEntry, Guests, RSVPStepTextProps } from "../../types";
import { STEP_ONE_TEXT, UNABLE_TO_FIND } from "../../content";
import { SubmitEvent, useState } from "react";
import Star from "@/icons/Star";
import './Step1.scss'
import RSVPStep, { RSVPStepText } from "../RSVPStep";

interface StepOneProps {
    guests: Guests | null;
    // guestsLoading: boolean;
}

export default function StepOne({ guests }: StepOneProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [searchResult, setSearchResult] = useState<Guests | null>(null);
    const [searchError, setSearchError] = useState("");
    const [searching, setSearching] = useState(false);

    // TODO: may not need
    // if (!guestsLoading && guests.length === 0) {
    //     setSearchError(NO_GUESTS)
    // }

    const handleSearch = (e: SubmitEvent) => {
        e.preventDefault();
        // * debug
        console.group("submitting");
        console.log("firstName ", firstName);
        console.log("lastName", lastName);
        console.groupEnd();

        setSearching(true);
        setSearchError("");
        setSearchResult([]);

        setTimeout(() => {
            const first = firstName.trim().toLowerCase();
            const last = lastName.trim().toLowerCase();

            const found = getFindMatchingGuests(guests!, first, last);

            if (found && found?.length > 0) {
                setSearchResult(found);

                // * debug
                console.group("found results");
                console.log("found ", found);
                console.groupEnd();
            } else {
                setSearchError(UNABLE_TO_FIND);
            }
            setSearching(false);
        }, 600);
    };

    return (
        <RSVPStep currStep={1}>
            <>
             {searching ? (
                        <StepOneLoading />
                    ) : searchResult == null ? (
                        <StepOneInputs
                            firstName={firstName}
                            setFirstName={setFirstName}
                            lastName={lastName}
                            setLastName={setLastName}
                            handleSearchSubmit={handleSearch}
                            searching={searching}
                            error={searchError}
                        />
                    ) : (
                        <StepOneSuccess matches={searchResult} />
                    )}
            </>
        </RSVPStep>
    );
}

// #region --- Inputs ---

interface StepOneInputsProps {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    handleSearchSubmit: (e: SubmitEvent) => void;
    searching: boolean;
    error?: string;
}

function StepOneInputs({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleSearchSubmit,
    searching,
    error,
}: StepOneInputsProps) {
    const isDisabled = searching || (firstName === "" && lastName === "");
    const hasError = !!error;

    return (
        <div className="step_one_search flex flex-col gap-400">
            <form
                onSubmit={handleSearchSubmit}
                className="step_one_search-form"
            >
                <div className="step_one_search-fields">
                    <div className="step_one_search-field">
                        <label
                            className="step_one_search-label"
                            htmlFor="first-name-search"
                        >
                            First Name
                        </label>
                        <input
                            id="first-name-search"
                            className={`step_one_search-input ${hasError ? "has-error" : ""}`}
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Jane"
                        />
                    </div>

                    <div className="step_one_search-field">
                        <label
                            className="step_one_search-label"
                            htmlFor="last-name-search"
                        >
                            Last Name
                        </label>
                        <input
                            id="last-name-search"
                            className={`step_one_search-input ${hasError ? "has-error" : ""}`}
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="step_one_search-submit"
                    disabled={isDisabled} // FIXME:
                >
                    Search
                </button>
            </form>

            {hasError && (
                <div className="step_one_search-error">
                    <WarningIcon
                        size={18}
                        weight="bold"
                        color="var(--wine-800)"
                    />

                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}

// #endregion ---

// #region --- Loading ---

function StepOneLoading() {
    return (
        <div className="step_one_loading">
            <div className="step_one_loading-spinner">
                <Star color="--wine-500" />
            </div>

            <p className="step_one_loading-text">
                Searching
                <span className="step_one_loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </p>
        </div>
    );
}

// #endregion ---

// #region --- Success ---

function getNameString(guest: GuestEntry): string {
    // If only one name
    if (guest.lastNameG2 === "" && guest.firstNameG2 === "" ) {
        return `${guest.firstNameG1} ${guest.lastNameG1}`
    }

    // If have same last
    if (guest.lastNameG2 === guest.lastNameG1) {
        return `${guest.firstNameG1} & ${guest.firstNameG2} ${guest.lastNameG1}`
    }

    return `${guest.firstNameG1} ${guest.lastNameG1} & ${guest.firstNameG2}  ${guest.lastNameG2}`
}


interface StepOneSuccessProps {
    matches: Guests;
}

function StepOneSuccess({ matches }: StepOneSuccessProps) {
    return (
        <div className="step_one-success">
            <Eyebrow
                text="Results"
                styleOptions={{ starColor: "--cream", variation: "center" }}
            />

            <div className="flex flex-col gap-400">
                {matches.map((m) => {
                    const name = getNameString(m)

                    // TODO: save party and navigate to next page
                    return (
                        <button className="rsvp_party">
                            <p>{name}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}

// #endregion ---
