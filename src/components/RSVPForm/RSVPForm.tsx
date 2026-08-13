"use client";

import { Dispatch, SetStateAction, useState } from "react";

import Star from "@/icons/Star";
import { ArrowClockwiseIcon, WarningIcon } from "@phosphor-icons/react";
import useGuests from "../../hooks/useGuests";
import { WithHTMLProps } from "../../types/props";

import Button from "@/components/Buttons/Button";
import "./RSVPForm.scss";
import StepOne from "./Steps/Step1/Step1";
import { number } from "motion";
import StepTwo from "./Steps/Step2/Step2";
import { getPartyFromId, GuestParty, Guests, RSVPDraft, StepProps } from "./types";

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

    const { guests, guestsLoading, guestsError, refetchGuests } = useGuests();
    console.log("guests", guests)

    const [party, setParty] = useState<GuestParty | null>(null)

    const [draft, setDraft] = useState<RSVPDraft>({ attendance: {} });

    // const [partyId, setPartyId] = useState<string | null>(null)
    // console.log("partyId", partyId)

    return (
        <div {...htmlProps} className={`rsvp_form  ${className ?? ""}`}>
            {/* <RSVPProgressBar texts={progressBar} currStep={step} /> */}

            <div className="rsvp_form-frame rsvp_form-frame-a" />
            <div className="rsvp_form-frame rsvp_form-frame-b" />

            {guestsLoading ? (
                <RSVPFormLoading key="loading" />
            ) : guestsError ? (
                <RSVPFormError key="error" errorMessage={guestsError} onRetry={refetchGuests} />
            ) : (
                <div key="steps" className="rsvp_form-steps rsvp_form-status">
                    <RenderSteps currStep={step} goToNextStep={setStep} draft={draft}  setDraft={setDraft} refetchGuests={refetchGuests}  guests={guests} setParty={setParty} party={party}  />
                </div>
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
                    type: "on-click",
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

interface RenderStepsProps extends StepProps {
    currStep: number;
    // goToNextStep: Dispatch<SetStateAction<number>>;
    // setDraft: Dispatch<SetStateAction<RSVPDraft>>;
    refetchGuests: () => Promise<void>

    guests:  Guests | null;
    setParty: Dispatch<SetStateAction<GuestParty | null>>;
    party: GuestParty | null;
}

function RenderSteps({currStep, goToNextStep, draft, setDraft, refetchGuests, guests, setParty, party}:RenderStepsProps) {
    // TODO: null guests?



    switch (currStep) {
        case 1:
            return <StepOne draft={draft} setDraft={setDraft} guests={guests} setParty={setParty} goToNextStep={goToNextStep} />
        case 2:
            return <StepTwo draft={draft}  setDraft={setDraft} party={party} goToNextStep={goToNextStep} />
        default:
            return <RSVPFormError key="error" errorMessage={"Error"} onRetry={refetchGuests} /> // TODO: add error message

    } 
}