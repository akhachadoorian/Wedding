import { SubmitEvent, useState } from "react";
import { useRSVPForm } from "../RSVPFormContext";
import { getFindMatchingGuests, GuestParty, Guests } from "../types";
import { UNABLE_TO_FIND } from "../content";
import { RSVPStepVertical } from "./RSVPStep";
import Button from "@/components/Buttons/Button";
import { MagnifyingGlassIcon, WarningIcon } from "@phosphor-icons/react";
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogSection,
    DialogSubheader,
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
            } else {
                setSearchError(UNABLE_TO_FIND);
            }
            setResultsOpen(true);
            setSearching(false);
        }, 600);
    };

    const handleSelectParty = (party: GuestParty) => {
        setResultsOpen(false);
        setParty(party);
        goToStep(2);
    };

    const hasError = !!searchError;

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
                />

                <Dialog open={resultsOpen} onOpenChange={setResultsOpen}>
                    <DialogContent>
                        {hasError ? (
                            <>
                                <DialogHeader className="text-center">
                                    <DialogTitle>No Matches Found</DialogTitle>
                                </DialogHeader>

                                <DialogBody className="items-center gap-200 text-center">
                                    <p className="body-l font-normal! text-cabernet">
                                        Sorry! No match were found for the following values:
                                    </p>

                                    {firstName !== '' || lastName !== '' ? (<div className="flex flex-wrap gap-100">
                                        {firstName !== '' && (<p className="body-s font-normal! text-cabernet">First Name: {firstName}</p>)}

                                        {lastName !== '' && (<p className="body-s font-normal! text-cabernet">Last Name:  {lastName}</p>)}
                                    </div>) : (<p className="body-l font-normal! text-cabernet">No values where entered for first or last name.</p>)}
        
                                </DialogBody>

                                <DialogFooter className="justify-center!">
                                    <Button
                                        variant="solid"
                                        colorScheme="burgundy"
                                        hoverScheme="cabernet"
                                        btnSettings={{
                                            type: "native",
                                            text: "Try Again",
                                            htmlType: "button",
                                            onClick: () => setResultsOpen(false),
                                        }}
                                    />
                                </DialogFooter>
                            </>
                        ) : (
                            <>
                                <DialogHeader>
                                    <DialogTitle>Select your party</DialogTitle>
                                </DialogHeader>

                                <DialogBody className="gap-150">
                                    <DialogSection>
                                        <DialogSubheader>Matches</DialogSubheader>
                                    </DialogSection>

                                    {searchResult?.map((party) => (
                                        <Button
                                            key={party.id}
                                            variant="solid"
                                            colorScheme="cabernet"
                                            hoverScheme="burgundy"
                                            fullWidth
                                            btnSettings={{
                                                type: "native",
                                                text: getNameString(party),
                                                htmlType: "button",
                                                onClick: () => handleSelectParty(party),
                                            }}
                                        />
                                    ))}
                                </DialogBody>
                            </>
                        )}
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
    // error?: string;
}

function SearchInputs({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleSearchSubmit,
    searching,
    // error,
}: SearchInputsProps) {
    const isDisabled = searching || (firstName === "" && lastName === "");
    // const hasError = !!error;
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
                        hasError={false}
                        // hasError={hasError}
                    />

                    <TextInput
                        name="last-name-search"
                        label="Last Name"
                        value={lastName}
                        onChange={setLastName}
                        placeholder="Doe"
                        hasError={false}
                        // hasError={hasError}
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

            
        </div>
    );
}


