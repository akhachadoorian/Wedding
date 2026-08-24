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

// Splits a single search query into the firstName/lastName params
// getFindMatchingGuests expects: a lone word is checked against both,
// so it matches on first name OR last name; multiple words split into
// a leading first name and the remaining text as the last name.
function splitQuery(query: string): { first: string; last: string } {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const first = tokens[0] ?? "";
    const last = tokens.length > 1 ? tokens.slice(1).join(" ") : first;
    return { first, last };
}

export default function SearchRSVPLive() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [searchResult, setSearchResult] = useState<Guests | null>(null);

    const { guests, setParty, goToStep } = useRSVPForm();

    // Debounce: only commit the typed query after typing pauses.
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [query]);

    // Search fires automatically once the debounced value settles.
    useEffect(() => {
        if (debouncedQuery.trim().length < MIN_SEARCH_LENGTH) {
            setSearchResult(null);
            return;
        }

        const { first, last } = splitQuery(debouncedQuery);
        setSearchResult(getFindMatchingGuests(guests, first, last) ?? []);
    }, [debouncedQuery, guests]);

    const handleSelectParty = (party: GuestParty) => {
        setParty(party);
        goToStep(2);
    };

    const trimmedLength = query.trim().length;
    const isPending = trimmedLength >= MIN_SEARCH_LENGTH && query !== debouncedQuery;

    return (
        <RSVPStepVertical currStep={1}>
            <>
                <TextInput
                    name="party-search"
                    label="Search by Name"
                    value={query}
                    onChange={setQuery}
                    placeholder="Jane Doe"
                    hasError={false}
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
