"use client";

import { useState } from "react";

import Star from "@/icons/Star";
import { ArrowClockwiseIcon, WarningIcon } from "@phosphor-icons/react";
import useGuests from "../../hooks/useGuests";
import { WithHTMLProps } from "../../types/props";

import Button from "@/components/Buttons/Button";
import "./RSVPForm.scss";
import StepOne from "./Steps/Step1/Step1";

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
    const [step, setStep] = useState(0);
    const { guests, guestsLoading, guestsError, refetchGuests } = useGuests();

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
                    <StepOne guests={guests} />
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

function RSVPFormLoading() {
    return (
        <div className="rsvp_form-status step_one_loading">
            <div className="step_one_loading-spinner">
                <Star color="--wine-500" />
            </div>

            <p className="step_one_loading-text">
                Loading
                <span className="step_one_loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </p>
        </div>
    );
}

