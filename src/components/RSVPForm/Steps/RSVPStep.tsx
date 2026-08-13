import Eyebrow from "@/components/Eyebrow/Eyebrow";
import {
    getStepText,
    RSVPStepProps,
    RSVPStepTextProps,
    STEP_TEXT_MAP,
} from "../types";
import { cn } from "@/utils/cn";
import Star from "@/icons/Star";
import { useState } from "react";

export default function RSVPStepHorizontal({
    currStep,
    children,
    className,
    ...htmlProps
}: RSVPStepProps) {
    const { stepNumber, title, body } = getStepText(currStep);

    return (
        <div
            {...htmlProps}
            className={cn(
                "rsvp_step rsvp_step_horizontal flex py-1500 px-750",
                "flex-col gap-500 ",
                "md:flex-row md:items-center md:space-600",
                className,
            )}
        >
            <RSVPStepText
                className="rsvp_step-left md:flex-[2_1_600px]"
                stepNumber={stepNumber}
                title={title}
                body={body}
            />

            <div className="rsvp_step-right md:flex[1_1_500px]">{children}</div>
        </div>
    );
}

export function RSVPStepVertical({
    currStep,
    children,
    className,
    ...htmlProps
}: RSVPStepProps) {
    // const [loading, setLoading] = useState(false);
    const { stepNumber, eyebrow, title, body } = getStepText(currStep);

    return (
        <div
            {...htmlProps}
            className={cn(
                "rsvp_step rsvp_step-vertical flex py-800 px-750",
                "flex-col gap-500 ",
                "md:items-center md:space-600 md:max-w-[60.625vw] md:mx-auto",
                className,
            )}
        >
            <RSVPStepTextCentered
                className="rsvp_step-top"
                stepNumber={stepNumber}
                eyebrow={eyebrow}
                title={title}
                body={body}
            />

            <div className="rsvp_step-bottom w-full">{children}</div>
        </div>
    );
}

export function RSVPStepText({
    stepNumber,
    title,
    body,
    className,
    ...htmlProps
}: RSVPStepTextProps) {
    return (
        <div {...htmlProps} className={cn("rsvp_step_text", className)}>
            <Eyebrow
                text={`Step ${stepNumber}`}
                styleOptions={{
                    variation: "left",
                    starColor: "--cream-700",
                }}
            />

            <h2 className="heading-xl rsvp_step_text-title">{title}</h2>

            {body && <p className="body rsvp_step_text-body mt-200">{body}</p>}
        </div>
    );
}

function RSVPStepTextCentered({
    stepNumber,
    eyebrow,
    title,
    body,
    className,
    ...htmlProps
}: RSVPStepTextProps) {
    return (
        <div {...htmlProps} className={cn("rsvp_step_text text-center", className)}>
            {/* <p className="eyebrow">Step {eyebrow}</p> */}
            {/* <Eyebrow
                text={`Step ${stepNumber}`}
                styleOptions={{
                    variation: "center",
                    starColor: "--cream-700",
                }}
            /> */}

            <h2 className="heading-xxl rsvp_step_text-title">{title}</h2>

            <p className="eyebrow mt-200!">{eyebrow}</p> 

            {body && <p className="body rsvp_step_text-body mt-200">{body}</p>}
        </div>
    );
}

export function RSVPStepLoading(loadingText?: string) {
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

// function RSVPFormError({ errorMessage, onRetry }: RSVPFormErrorProps) {
//     return (
//         <div className="rsvp_form-status flex flex-col items-center gap-200 text-center">
//             <WarningIcon size={56} weight="bold" color="var(--cream)" />

//             <h3 className="heading-l">An Error has Occurred</h3>
//             <p className="body-lg">{errorMessage}</p>

//             <Button
//                 variant="solid"
//                 colorScheme="cream"
//                 hoverScheme="burgundy"
//                 btnSettings={{
//                     type: "on-click",
//                     text: "Refresh page",
//                     onClick: onRetry,
//                     decoration: {
//                         type: 'icon',
//                         icon: ArrowClockwiseIcon
//                     }
//                 }}
                
//                 className="mt-200"
//             ></Button>
//         </div>
//     );
// }