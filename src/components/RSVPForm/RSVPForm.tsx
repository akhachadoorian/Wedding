"use client";

import { useEffect, useState } from "react";

import Star from "@/icons/Star";
import { ArrowClockwiseIcon, WarningIcon } from "@phosphor-icons/react";
import useGuests from "../../hooks/useGuests";
import { WithHTMLProps } from "../../types/props";

import Button from "@/components/Buttons/Button";
import "./RSVPForm.scss";
import { RSVPFormProvider, useRSVPForm } from "./RSVPFormContext";
import StepOne from "./Steps/Step1/Step1";
import StepTwo from "./Steps/Step2";
import { GuestParty, RSVPDraft } from "./types";
import StepThree from "./Steps/Step3";
import RSVPThankYou from "./RSVPThankYou";

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

            <div className="rsvp_form-frame rsvp_form-frame-a" />
            <div className="rsvp_form-frame rsvp_form-frame-b" />

            {guestsLoading ? (
                <RSVPFormLoading key="loading" />
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

type RSVPFormErrorProps = {
    errorMessage: string;
    onRetry: () => void;
};

function RSVPFormError({ errorMessage, onRetry }: RSVPFormErrorProps) {
    return (
        <div className="rsvp_form-status flex flex-col items-center gap-200 text-center">
            <WarningIcon size={56} weight="bold" color="var(--cream)" />

            <h3 className="heading-l">An Error has Occurred</h3>
            <p className="body-lg">{errorMessage}</p>

            <Button
                variant="solid"
                colorScheme="cream"
                hoverScheme="burgundy"
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

function RSVPFormLoading({loadingText}:{loadingText?: string}) {
    return (
        <div className="rsvp_form-status step_one_loading">
            <div className="step_one_loading-spinner">
                <Star color="--wine-500" />
            </div>

            <p className="step_one_loading-text">
                {loadingText ?? "Loading"}
                <span className="step_one_loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </p>
        </div>
    );
}

function RenderSteps() {
    const { step, refetchGuests } = useRSVPForm();

    switch (step) {
        case -2:
            return <RSVPThankYou coming={true} />
        case -1:
            return <RSVPThankYou coming={false} />
        case 1:
            return <StepOne />
        case 2:
            return <StepTwo />
        case 3: 
            return <StepThree />
        default:
            return <RSVPFormError key="error" errorMessage={"Error"} onRetry={refetchGuests} /> // TODO: add error message

    }
}