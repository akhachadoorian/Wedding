import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Star from "@/icons/Star";
import { WarningIcon } from "@phosphor-icons/react";
import { SubmitEvent, useState } from "react";
import { useRSVPForm } from "../../RSVPFormContext";
import { UNABLE_TO_FIND } from "../../content";
import { getFindMatchingGuests, GuestParty, Guests } from "../../types";
import RSVPStepHorizontal, { RSVPStepVertical } from "../RSVPStep";
import './Step1.scss';
import Button from "@/components/Buttons/Button";

export default function StepOne() {
    const { guests } = useRSVPForm();
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

        setSearching(true);
        setSearchError("");
        setSearchResult([]);

        setTimeout(() => {
            const first = firstName.trim().toLowerCase();
            const last = lastName.trim().toLowerCase();

            const found = getFindMatchingGuests(guests!, first, last);

            if (found && found?.length > 0) {
                setSearchResult(found);
            } else {
                setSearchError(UNABLE_TO_FIND);
            }
            setSearching(false);
        }, 600);
    };

    return (
        <RSVPStepVertical currStep={1}>
            <>
            {/* TODO: error? */}
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
        </RSVPStepVertical>
    );


    // return (
    //     <RSVPStepVertical currStep={1}>
    //         <>
    //         {/* TODO: error? */}
    //          {searching ? (
    //                     <StepOneLoading />
    //                 ) : searchResult == null ? (
    //                     <StepOneInputs
    //                         firstName={firstName}
    //                         setFirstName={setFirstName}
    //                         lastName={lastName}
    //                         setLastName={setLastName}
    //                         handleSearchSubmit={handleSearch}
    //                         searching={searching}
    //                         error={searchError}
    //                     />
    //                 ) : (
    //                     <StepOneSuccess matches={searchResult} setParty={setParty} goToNextStep={goToNextStep}/>
    //                 )}
    //         </>
    //     </RSVPStepVertical>
    // );

    // return (
    //     <RSVPStepHorizontal currStep={1}>
    //         <>
    //          {searching ? (
    //                     <StepOneLoading />
    //                 ) : searchResult == null ? (
    //                     <StepOneInputs
    //                         firstName={firstName}
    //                         setFirstName={setFirstName}
    //                         lastName={lastName}
    //                         setLastName={setLastName}
    //                         handleSearchSubmit={handleSearch}
    //                         searching={searching}
    //                         error={searchError}
    //                     />
    //                 ) : (
    //                     <StepOneSuccess matches={searchResult} />
    //                 )}
    //         </>
    //     </RSVPStepHorizontal>
    // );
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

                <Button
                    variant="outline"
                    colorScheme="cream"
                    btnSettings={{
                        type: "native",
                        text: "Search",
                        htmlType: "submit",
                        disabled: isDisabled,
                    }}
                />
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

function getNameString(guest: GuestParty): string {
    // If only one name
    if (!guest.guest2?.lastName && !guest.guest2?.firstName ) {
        return `${guest.guest1.firstName} ${guest.guest1.lastName}`
    }

    // If have same last
    if (guest.guest2.lastName === guest.guest1.lastName) {
        return `${guest.guest1.firstName} & ${guest.guest2.firstName} ${guest.guest1.lastName}`
    }

    return `${guest.guest1.firstName} ${guest.guest1.lastName} & ${guest.guest2.firstName}  ${guest.guest2.lastName}`
}


interface StepOneSuccessProps {
    matches: Guests;
}

function StepOneSuccess({ matches }: StepOneSuccessProps) {
    const { setParty, goToStep } = useRSVPForm();

    const handleButtonPress = (party: GuestParty) => {
        setParty(party);
        goToStep(2);
    }

    // TODO: style and layout of buttons
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
                        <button key={m.id} className="rsvp_party" onClick={() => handleButtonPress(m)}>
                            <p>{name}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}

// #endregion ---
