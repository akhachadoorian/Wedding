"use client";

import { useState, useEffect, FormEvent } from "react";

import GUEST_LIST from "../../../data/guestList";
import toHtmlId from "../../../hooks/toHtmlId";
import RSVP from "../page";
import { party } from "../../../types/guestList";
import { WithHTMLProps } from "../../../types/props";
import { NonEmptyArray } from "../../../types/utility";
import Eyebrow from "../../../components/Eyebrow/Eyebrow";

import "./RSVPForm.scss";

export type RSVPFormProps = WithHTMLProps & {
    progressBar: NonEmptyArray<string>;
    steps: NonEmptyArray<RSVPStepProps>;
};

export default function RSVPForm({
    progressBar,
    steps,

    className,
    ...htmlProps
}: RSVPFormProps) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        fetch("/api/guests")
            .then((res) => res.json())
            .then((data) => console.log("guests", data));
    }, []);

    // const [searchQuery, setSearchQuery] = useState("");
    // const [searchResult, setSearchResult] = useState<party[]>([]);
    // const [searchError, setSearchError] = useState("");
    // const [searching, setSearching] = useState(false);

    // const handleSearch = () => {
    //     setSearching(true);
    //     setSearchError("");
    //     setSearchResult([]);
    //     setTimeout(() => {
    //         const q = searchQuery.trim().toLowerCase();

    //         const found = GUEST_LIST.filter((p) => p.guests.some((g) => g.lastName?.toLowerCase() === q));

    //         if (found.length > 0) {
    //             setSearchResult(found);
    //         } else {
    //             setSearchError("We couldn't find that name. Please try again.");
    //         }
    //         setSearching(false);
    //     }, 600);
    // };

    return (
        <div {...htmlProps} className={`rsvp_form  ${className ?? ""}`}>
            {/* <RSVPProgressBar texts={progressBar} currStep={step} /> */}

            <div className="rsvp_form-steps">
                <StepOne />
            </div>
        </div>
    );
}

// #region --- Progress Bar -----------------------------------------------

type RSVPProgressBarProps = {
    texts: NonEmptyArray<string>;
    currStep: number;
};

function RSVPProgressBar({ texts, currStep }: RSVPProgressBarProps) {
    console.log("currStep", currStep);

    return (
        <div className="rsvp_progress_bar">
            {texts.map((t, idx) => {
                let id = toHtmlId(t);

                return (
                    <div
                        key={idx}
                        id={`pb-${id}`}
                        className={`rsvp_progress_bar-element ${idx <= currStep ? "active" : ""}`}
                    >
                        <div className="rsvp_progress_bar-element-line" />

                        <p className="rsvp_progress_bar-element-text">{t}</p>
                    </div>
                );
            })}
        </div>
    );
}

// #endregion -------------------------------------------------------------

// #region --- Step Text -------------------------------------------------

type RSVPStepTextProps = {
    stepNumber: number;
    title: string;
    body?: string;
};

function RSVPStepText({ stepNumber, title, body }: RSVPStepTextProps) {
    return (
        <div className="rsvp_step_text">
            <Eyebrow
                text={`Step ${stepNumber}`}
                styleOptions={{
                    variation: "left",
                }}
            />

            <h2 className="heading-l rsvp_step_text-title">{title}</h2>

            {body && <p className="body rsvp_step_text-body">{body}</p>}
        </div>
    );
}

function RSVPStep({
    type,
    textContent,
    searchQuery,
    setSearchQuery,
    handleSearch,
    searchResult,
    searchError,
    searching,
}: RSVPStepProps) {
    return (
        <div className={`rsvp_step`}>
            {type === "search" &&
            searchQuery !== undefined &&
            setSearchQuery &&
            handleSearch ? (
                <SearchStep
                    textContent={textContent}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                    searchResult={searchResult ?? []}
                    searchError={searchError ?? ""}
                    searching={searching ?? false}
                />
            ) : (
                <>
                    <div className="rsvp_step-inner">
                        <div className="rsvp_step-left">
                            <RSVPStepText {...textContent} />
                        </div>

                        <div className="rsvp_step-right"></div>
                    </div>

                    <div className="rsvp_step-nav_btns"></div>
                </>
            )}
        </div>
    );
}

// #endregion -------------------------------------------------------------

// #region --- Search -------------------------------------------------

type SearchStepPassthroughProps = {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    handleSearch: () => void;
    searchResult: party[];
    searchError: string;
    searching: boolean;
};

export type RSVPStepProps = {
    type?: "search";
    textContent: RSVPStepTextProps;
} & Partial<SearchStepPassthroughProps>;

function SearchStep({
    textContent,
    searchQuery,
    setSearchQuery,
    handleSearch,
    searchResult,
    searchError,
    searching,
}: { textContent: RSVPStepTextProps } & SearchStepPassthroughProps) {
    return (
        <div className={`search_step`}>
            <div className="search_step-left">
                <RSVPStepText {...textContent} />

                <div className="search_step-search">
                    <p className="search_step-search-label">Last Name</p>
                    <input
                        className="search_step-search-input"
                        type="text"
                        placeholder="Smith"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                </div>
            </div>

            <div className="search_step-right search_step-results">
                <div className="search_step-results-header">
                    <div className="search_step-results-header-line" />

                    <p className="eyebrow">Results</p>

                    <div className="search_step-results-header-line" />
                </div>

                <div className="search_step-results-content">
                    {!searching &&
                        searchResult.length === 0 &&
                        !searchError && (
                            <p className="body search_step-placeholder">
                                Results will appear here.
                            </p>
                        )}

                    {searching && <p className="body">Searching...</p>}

                    {searchError && (
                        <p className="body search_step-error">{searchError}</p>
                    )}

                    {searchResult.map((party, idx) => (
                        <div key={idx} className="search_step-result">
                            {party.guests.map((guest, gIdx) => (
                                <p key={gIdx} className="body">
                                    {guest.placeholder
                                        ? "Guest"
                                        : `${guest.firstName}${guest.lastName ? ` ${guest.lastName}` : ""}`}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// #endregion -------------------------------------------------------------

const STEP_ONE_TEXT: RSVPStepTextProps = {
    stepNumber: 1,
    title: "Find Your Party",
    body: "Enter your name to find your reservation.",
};

function StepOne({}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [searchResult, setSearchResult] = useState<party[]>([]);
    const [searchError, setSearchError] = useState("");
    const [searching, setSearching] = useState(false);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        setSearching(true);
        setSearchError("");
        setSearchResult([]);

        setTimeout(() => {
            const first = firstName.trim().toLowerCase();
            const last = lastName.trim().toLowerCase();

            const found = GUEST_LIST.filter((p) =>
                p.guests.some(
                    (g) =>
                        g.lastName?.toLowerCase() === last &&
                        (!first || g.firstName.toLowerCase() === first),
                ),
            );

            if (found.length > 0) {
                setSearchResult(found);
            } else {
                setSearchError("We couldn't find that name. Please try again.");
            }
            setSearching(false);
        }, 600);
    };

    return (
        <div className="rsvp_step">
            <div className="rsvp_step-inner">
                <div className="rsvp_step-left">
                    <RSVPStepText {...STEP_ONE_TEXT} />
                </div>

                <div className="rsvp_step-right">
                    <StepOneInputs
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        handleSearchSubmit={handleSearch}
                    />
                </div>
            </div>

            <div className="rsvp_step-results">
                <div className="rsvp_step-results-header">
                    <div className="rsvp_step-results-header-line" />
                    <p className="eyebrow">Results</p>
                    <div className="rsvp_step-results-header-line" />
                </div>

                <div className="rsvp_step-results-content">
                    {!searching &&
                        searchResult.length === 0 &&
                        !searchError && (
                            <p className="body rsvp_step-results-placeholder">
                                Results will appear here.
                            </p>
                        )}

                    {searching && <p className="body">Searching...</p>}

                    {searchError && (
                        <p className="body rsvp_step-results-error">
                            {searchError}
                        </p>
                    )}

                    {searchResult.map((party, idx) => (
                        <div key={idx} className="rsvp_step-results-result">
                            {party.guests.map((guest, gIdx) => (
                                <p key={gIdx} className="body">
                                    {guest.placeholder
                                        ? "Guest"
                                        : `${guest.firstName}${guest.lastName ? ` ${guest.lastName}` : ""}`}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface StepOneInputsProps {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    handleSearchSubmit: (e: FormEvent) => void;
}

function StepOneInputs({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleSearchSubmit,
}: StepOneInputsProps) {
    return (
        <form onSubmit={handleSearchSubmit} className="step_one_search">
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
                        className="step_one_search-input"
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
                        className="step_one_search-input"
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
                disabled={!lastName.trim()}
            >
                Search
            </button>
        </form>
    );
}
