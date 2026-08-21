import { SubmitEvent, useState } from "react";
import { useRSVPForm } from "../RSVPFormContext";
import { getFindMatchingGuests, GuestParty, Guests } from "../types";
import { UNABLE_TO_FIND } from "../content";
import { RSVPStepVertical } from "./RSVPStep";
import Button from "@/components/Buttons/Button";
import { MagnifyingGlassIcon, WarningIcon } from "@phosphor-icons/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/ui/Dialog";
import { TextInput } from "../FormInputs";

function getNameString(guest: GuestParty): string {
    if (!guest.guest2?.lastName && !guest.guest2?.firstName) {
        return `${guest.guest1.firstName} ${guest.guest1.lastName}`;
    }

    if (guest.guest2.lastName === guest.guest1.lastName) {
        return `${guest.guest1.firstName} & ${guest.guest2.firstName} ${guest.guest1.lastName}`;
    }

    return `${guest.guest1.firstName} ${guest.guest1.lastName} & ${guest.guest2.firstName} ${guest.guest2.lastName}`;
}

export default function SearchRSVP() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [searchResult, setSearchResult] = useState<Guests | null>(null);
    const [searchError, setSearchError] = useState("");
    const [searching, setSearching] = useState(false);
    const [resultsOpen, setResultsOpen] = useState(false);

    const { guests, setParty, goToStep } = useRSVPForm();

    const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSearching(true);
        setSearchError("");
        setSearchResult(null);

        setTimeout(() => {
            const first = firstName.trim().toLowerCase();
            const last = lastName.trim().toLowerCase();

            const found = getFindMatchingGuests(guests!, first, last);

            if (found && found?.length > 0) {
                setSearchResult(found);
                setResultsOpen(true);
            } else {
                setSearchError(UNABLE_TO_FIND);
            }
            setSearching(false);
        }, 600);
    };

    const handleSelectParty = (party: GuestParty) => {
        setResultsOpen(false);
        setParty(party);
        goToStep(2);
    };

    return (
        <RSVPStepVertical currStep={1}>
            <>
                <SearchInputs
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    handleSearchSubmit={handleSearch}
                    searching={searching}
                    error={searchError}
                />

                <Dialog open={resultsOpen} onOpenChange={setResultsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Select your invitation</DialogTitle>
                            <DialogDescription>
                                We found the following matches
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col gap-150">
                            {searchResult?.map((party) => (
                                <button
                                    key={party.id}
                                    type="button"
                                    onClick={() => handleSelectParty(party)}
                                    className="border border-cream/20 px-300 py-200 text-left font-sans text-cream transition-colors duration-300 hover:bg-cream/10"
                                >
                                    {getNameString(party)}
                                </button>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        </RSVPStepVertical>
    );
}

interface SearchInputsProps {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    handleSearchSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
    searching: boolean;
    error?: string;
}

function SearchInputs({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleSearchSubmit,
    searching,
    error,
}: SearchInputsProps) {
    const isDisabled = searching || (firstName === "" && lastName === "");
    const hasError = !!error;
    return (
        <div className="flex flex-col gap-400">
            <form
                onSubmit={handleSearchSubmit}
                className="flex items-center flex-col gap-400"
            >
                <div className="flex flex-col gap-100 md:flex-row w-full">
                    <TextInput
                        name="first-name-search"
                        label="First Name"
                        value={firstName}
                        onChange={setFirstName}
                        placeholder="Jane"
                        hasError={hasError}
                    />

                    <TextInput
                        name="last-name-search"
                        label="Last Name"
                        value={lastName}
                        onChange={setLastName}
                        placeholder="Doe"
                        hasError={hasError}
                    />
                </div>

                <Button
                    variant="outline"
                    colorScheme="cream"
                    btnSettings={{
                        type: "native",
                        text: "Search",
                        htmlType: "submit",
                        disabled: isDisabled,
                        decoration: {
                            type: 'icon',
                            icon: MagnifyingGlassIcon,
                            // iconSide: 'right'
                        }
                    }}
                />
            </form>

            {hasError && (
                <div className="flex items-center gap-150 rounded-md bg-[var(--cream-100)] px-300 py-200 font-sans text-s leading-[1.5] font-medium text-[var(--black-700)] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
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
