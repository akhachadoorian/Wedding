"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { GuestParty, Guests, RSVPDraft } from "./types";

export interface RSVPFormContextValue {
    step: number;
    goToStep: (step: number) => void;
    draft: RSVPDraft;
    setDraft: Dispatch<SetStateAction<RSVPDraft>>;
    guests: Guests | null;
    party: GuestParty | null;
    setParty: Dispatch<SetStateAction<GuestParty | null>>;
    refetchGuests: () => Promise<void>;
}

const RSVPFormContext = createContext<RSVPFormContextValue | null>(null);

export const RSVPFormProvider = RSVPFormContext.Provider;

export function useRSVPForm() {
    const ctx = useContext(RSVPFormContext);
    if (!ctx) {
        throw new Error("useRSVPForm must be used within an RSVPFormProvider");
    }
    return ctx;
}
