import { useState } from "react";
import { GuestKey, RSVPDraft, RSVPDraftKey } from "../types";
import { useRSVPForm } from "../RSVPFormContext";

type ValueForDraftKey<K extends RSVPDraftKey> = NonNullable<NonNullable<RSVPDraft[K]>[GuestKey]>;

type HandleGuestUpdateProps = <K extends RSVPDraftKey>(
        draftKey: K,
        guestKey: GuestKey,
        newValue: ValueForDraftKey<K>
    ) => void;

type HandleGuestFieldUpdateProps = <
    K extends RSVPDraftKey,
    F extends keyof ValueForDraftKey<K>
>(
    draftKey: K,
    guestKey: GuestKey,
    field: F,
    value: ValueForDraftKey<K>[F]
) => void;

type UseHandleGuestUpdateResult = {
    handleGuestUpdate: HandleGuestUpdateProps;
    handleGuestFieldUpdate: HandleGuestFieldUpdateProps;
};

export function useHandleGuestUpdate(): UseHandleGuestUpdateResult {
    const {setDraft } = useRSVPForm();

    const handleGuestUpdate: HandleGuestUpdateProps = (
        draftKey,
        guestKey,
        newValue
    ) => {

        setDraft((prev) => {
            const existing = prev[draftKey] as
            | Partial<Record<GuestKey, typeof newValue>>
            | undefined;

            return {
                ...prev,
                [draftKey]: {...existing, [guestKey]: newValue}
            }
        })
    }

    const handleGuestFieldUpdate: HandleGuestFieldUpdateProps = (
        draftKey,
        guestKey,
        field,
        value
    ) => {
        setDraft((prev) => {
            const existingGuestMap = prev[draftKey] as
                | Partial<Record<GuestKey, Record<string, unknown>>>
                | undefined;
            const existingGuestValue = existingGuestMap?.[guestKey];

            return {
                ...prev,
                [draftKey]: {
                    ...existingGuestMap,
                    [guestKey]: {
                        ...existingGuestValue,
                        [field]: value,
                    },
                },
            };
        });
    };

    return { handleGuestUpdate, handleGuestFieldUpdate  };
}