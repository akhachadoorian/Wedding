import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRSVPForm } from "../RSVPFormContext";
import { Guest, GuestParty, Guests, partyGuestCount } from "../types";
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

// Matches as the user types: every typed token must be a *prefix* of either
// the first or last name of the same guest (e.g. "ni" matches "Nick"), rather
// than requiring the full name to be typed out.
function guestMatchesTokens(guest: Guest, tokens: string[]): boolean {
    return tokens.every(
        (token) =>
            guest.firstName?.toLowerCase().startsWith(token) ||
            guest.lastName?.toLowerCase().startsWith(token),
    );
}

function findMatchingGuestsByPrefix(guests: Guests | null, query: string): Guests | null {
    if (guests === null) return null;

    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return null;

    const matches = guests.filter(
        (party) =>
            guestMatchesTokens(party.guest1, tokens) ||
            (party.guest2 && guestMatchesTokens(party.guest2, tokens)),
    );

    return matches;
}

const MAX_WIDTH = '650px'

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

        setSearchResult(findMatchingGuestsByPrefix(guests, debouncedQuery) ?? []);
    }, [debouncedQuery, guests]);

    const handleSelectParty = (party: GuestParty) => {
        setParty(party);
        goToStep(2);
    };

    const trimmedLength = query.trim().length;
    const isPending = trimmedLength >= MIN_SEARCH_LENGTH && query !== debouncedQuery;

    return (
        <RSVPStepVertical currStep={1}>
            <div className="flex flex-col items-center gap-150">
                <TextInput
                    name="party-search"
                    label="Search by Name"
                    value={query}
                    onChange={setQuery}
                    placeholder="Jane Doe"
                    hasError={false}
                    className="max-w-[650px] w-full"
                    styleOptions={{
                        centerContent: true,
                        maxInputWidth: MAX_WIDTH
                    }}
                />

                <SearchResults
                    trimmedLength={trimmedLength}
                    isPending={isPending}
                    searchResult={searchResult}
                    onSelectParty={handleSelectParty}
                />
            </div>
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
            <p className="font-sans body-xs italic! text-cream mt-200! opacity-55 text-center w-full">
                Keep typing your name to search…
            </p>
        );
    }

    if (isPending) {
        return (
            <p className="font-sans body-xs italic! text-cream mt-200! opacity-55 text-center w-full">Searching…</p>
        );
    }

    if (searchResult === null || searchResult.length === 0) {
        return (
            <p className="font-sans body-xs italic! text-cream mt-200! opacity-55 text-center w-full">
                No matches yet — check the spelling of your name.
            </p>
        );
    }

    return (
        <div className="flex items-center flex-col gap-150 max-w-[650px] w-full overflow-x-hidden">
            <AnimatePresence mode="popLayout">
                {searchResult.map((party, index) => (
                    <motion.div
                        key={party.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: "easeOut", delay: index * 0.05 }}
                        className="box-border flex items-center justify-between gap-200 border border-cream px-300 py-200 font-sans text-(--black-700) w-full"
                    >
                        <div className="flex flex-col min-w-0">
                            <span className="truncate">{getNameString(party)}</span>
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
                            className="shrink-0"
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
