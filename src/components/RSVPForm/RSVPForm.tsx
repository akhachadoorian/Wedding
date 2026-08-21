"use client";

import { useEffect, useState } from "react";

import { ArrowClockwiseIcon, WarningIcon } from "@phosphor-icons/react";
import useGuests from "../../hooks/useGuests";
import { WithHTMLProps } from "../../types/props";

import Button from "@/components/Buttons/Button";
import "./RSVPForm.scss";
import { RSVPFormProvider, useRSVPForm } from "./RSVPFormContext";
import StepTwo from "./Steps/Step2";
import { GuestParty, RSVPDraft } from "./types";
import StepThree from "./Steps/Step3";
import RSVPThankYou from "./RSVPThankYou";
import StepFour from "./Steps/Step4";
import StepFive from "./Steps/Step5";
import SearchRSVP from "./Steps/Searching";
import Star from "@/icons/Star";
import { RenderSteps } from "./Steps/RSVPStep";

// TODO: after rsvp date close

export type RSVPFormProps = WithHTMLProps & {
    // progressBar: NonEmptyArray<string>;
    // steps: NonEmptyArray<RSVPStepProps>;
};


export default function RSVPForm({
    // progressBar,
    // steps,

    className,
    ...htmlProps
}: RSVPFormProps) {
    const [step, setStep] = useState(1);
    const goToStep = (step: number) => {
        console.log("go to step ", step)
        setStep(step)

    }
    // FIXME:
    // const goToStep = (step: number) => setStep(step);

    const { guests, guestsLoading, guestsError, refetchGuests } = useGuests();
    // console.log("guests", guests)    

    const [party, setParty] = useState<GuestParty | null>(null)

    const [draft, setDraft] = useState<RSVPDraft>({ attendance: {}});
    useEffect(() => {
        console.log("draft changed", draft)
    }, [draft])

    // const [partyId, setPartyId] = useState<string | null>(null)
    // console.log("partyId", partyId)

    const onRetry = async () => {
        setStep(1)
        await refetchGuests()
    }

    return (
        <div {...htmlProps} className={`rsvp_form  ${className ?? ""}`}>
            {/* <RSVPProgressBar texts={progressBar} currStep={step} /> */}

            {guestsLoading ? (
                <RSVPStepLoading key="loading" />
            ) : guestsError ? (
                <RSVPFormError key="error" errorMessage={guestsError} onRetry={onRetry} />
            ) : (
                <RSVPFormProvider value={{ step, goToStep, draft, setDraft, guests, party, setParty, refetchGuests: onRetry }}>
                    <div key="steps" className="rsvp_form-steps rsvp_form-status">
                        <RenderSteps />
                    </div>
                </RSVPFormProvider>
            )}
        </div>
    );
}





function RSVPStepLoading({ loadingText }: { loadingText?: string }) {
    return (
        <div className="rsvp_form-status flex min-h-[220px] flex-col items-center justify-center gap-300">
            <div className="size-14 rsvp_star_spin">
                <Star color="--wine-500" />
            </div>

            <p className="flex items-center justify-center gap-025 font-sans text-lg font-semibold tracking-[0.6px] text-(--cream-700) uppercase">
                {loadingText ?? "Loading"}
                <span className="flex">
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse [animation-delay:0.2s]">.</span>
                    <span className="animate-pulse [animation-delay:0.4s]">.</span>
                </span>
            </p>
        </div>
    );
}

type RSVPFormErrorProps = {
    errorMessage: string;
    onRetry: () => void;
};

export function RSVPFormError({ errorMessage, onRetry }: RSVPFormErrorProps) {
    return (
        <div className="rsvp_form-status flex flex-col items-center gap-200 text-center">
            <WarningIcon size={56} weight="bold" color="var(--wine-500)" />

            <h3 className="heading-l">An Error has Occurred</h3>
            <p className="body-lg">{errorMessage}</p>

            <Button
                variant="solid"
                colorScheme="burgundy"
                hoverScheme="cabernet"
                btnSettings={{
                    type: "native",
                    text: "Refresh page",
                    onClick: onRetry,
                    decoration: {
                        type: 'icon',
                        icon: ArrowClockwiseIcon
                    }
                }}
                
                className="mt-200"
            ></Button>
        </div>
    );
}