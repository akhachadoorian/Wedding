import { useEffect, useState } from "react";
import { useRSVPForm } from "../RSVPFormContext";
import { getFindMatchingGuests, GuestParty, Guests, partyGuestCount } from "../types";
import { RSVPStepVertical } from "./RSVPStep";
import Button from "@/components/Buttons/Button";
import { TextInput } from "../FormInputs";

const SEARCH_DEBOUNCE_MS = 400;
const MIN_SEARCH_LENGTH = 2;

function getNameString(guest: GuestParty): string {
    if (!guest.guest2?.lastName && !guest.guest2?.firstName) {
        return `${guest.guest1.firstName} ${guest.guest1.lastName}`;
    }

    if (guest.guest2.lastName === guest.guest1.lastName) {
        return `${guest.guest1.firstName} & ${guest.guest2.firstName} ${guest.guest1.lastName}`;
    }

    return `${guest.guest1.firstName} ${guest.guest1.lastName} & ${guest.guest2.firstName} ${guest.guest2.lastName}`;
}

export default function SearchRSVPLive() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [debounced, setDebounced] = useState({ firstName: "", lastName: "" });
    const [searchResult, setSearchResult] = useState<Guests | null>(null);

    const { guests, setParty, goToStep } = useRSVPForm();

    // Debounce: only commit the typed name to `debounced` after typing pauses.
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced({ firstName, lastName });
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [firstName, lastName]);

    // Search fires automatically once the debounced value settles.
    useEffect(() => {
        const first = debounced.firstName.trim().toLowerCase();
        const last = debounced.lastName.trim().toLowerCase();

        if ((first + last).length < MIN_SEARCH_LENGTH) {
            setSearchResult(null);
            return;
        }

        setSearchResult(getFindMatchingGuests(guests, first, last) ?? []);
    }, [debounced, guests]);

    const handleSelectParty = (party: GuestParty) => {
        setParty(party);
        goToStep(2);
    };

    const trimmedLength = (firstName + lastName).trim().length;
    const isPending =
        trimmedLength >= MIN_SEARCH_LENGTH &&
        (firstName !== debounced.firstName || lastName !== debounced.lastName);

    return (
        <RSVPStepVertical currStep={1}>
            <>
                <SearchInputs
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                />

                <SearchResults
                    trimmedLength={trimmedLength}
                    isPending={isPending}
                    searchResult={searchResult}
                    onSelectParty={handleSelectParty}
                />
            </>
        </RSVPStepVertical>
    );
}

interface SearchInputsProps {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
}

function SearchInputs({
    firstName,
    setFirstName,
    lastName,
    setLastName,
}: SearchInputsProps) {
    return (
        <div className="flex flex-col gap-100 md:flex-row w-full">
            <TextInput
                name="first-name-search"
                label="First Name"
                value={firstName}
                onChange={setFirstName}
                placeholder="Jane"
                hasError={false}
            />

            <TextInput
                name="last-name-search"
                label="Last Name"
                value={lastName}
                onChange={setLastName}
                placeholder="Doe"
                hasError={false}
            />
        </div>
    );
}

interface SearchResultsProps {
    trimmedLength: number;
    isPending: boolean;
    searchResult: Guests | null;
    onSelectParty: (party: GuestParty) => void;
}

function SearchResults({
    trimmedLength,
    isPending,
    searchResult,
    onSelectParty,
}: SearchResultsProps) {
    if (trimmedLength < MIN_SEARCH_LENGTH) {
        return (
            <p className="font-sans text-s text-[var(--cream-700)]">
                Keep typing your name to search…
            </p>
        );
    }

    if (isPending) {
        return (
            <p className="font-sans text-s text-[var(--cream-700)]">Searching…</p>
        );
    }

    if (searchResult === null || searchResult.length === 0) {
        return (
            <p className="font-sans text-s text-[var(--cream-700)]">
                No matches yet — check the spelling of your name.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-150">
            {searchResult.map((party) => (
                <div
                    key={party.id}
                    className="flex items-center justify-between gap-200 border border-[var(--cream-700)] px-300 py-200 font-sans text-[var(--black-700)]"
                >
                    <div className="flex flex-col">
                        <span>{getNameString(party)}</span>
                        <span className="text-s opacity-70">
                            Party of {partyGuestCount(party)}
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        colorScheme="cream"
                        btnSettings={{
                            type: "native",
                            text: "This is us",
                            onClick: () => onSelectParty(party),
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
