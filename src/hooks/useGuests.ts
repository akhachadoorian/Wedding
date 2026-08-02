'use client';

import { useCallback, useEffect, useState } from "react";
import { Guests, mapGuestData } from "../components/RSVPForm/types";
import { NO_GUESTS } from "../components/RSVPForm/content";

// Floor on how long the loading state stays visible, so a fast response
// doesn't flash the spinner in and back out.
const MIN_LOADING_MS = 500;

export default function useGuests() {
    const [guests, setGuests] = useState<Guests | null>(null);
    const [guestsLoading, setGuestsLoading] = useState(true);
    const [guestsError, setGuestsError] = useState<string | null>(null);

    const fetchGuests = useCallback(async () => {
        setGuestsLoading(true);
        setGuestsError(null);
        const start = Date.now();

        try {
            const res = await fetch("/api/guests");
            //const res = await fetch("/api/guests?error=1"); // * debug: error testing
            if (!res.ok)
                throw new Error(`Failed to fetch guests: ${res.status}`);
            const data = await res.json();

            setGuests(mapGuestData(data)); // remove headers
        } catch (err) {
            setGuestsError(
                err instanceof Error
                    ? err.message
                    : NO_GUESTS,
            );
        } finally {
            const remaining = MIN_LOADING_MS - (Date.now() - start);
            if (remaining > 0)
                await new Promise((resolve) => setTimeout(resolve, remaining));

            setGuestsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGuests();
    }, [fetchGuests]);

    return { guests, guestsLoading, guestsError, refetchGuests: fetchGuests };
}
