import Button from "@/components/Buttons/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { cn } from "@/utils/cn";
import { RSVPFormError } from "../RSVPForm";
import { useRSVPForm } from "../RSVPFormContext";
import RSVPThankYou from "../RSVPThankYou";
import { getStepText, Guest, RSVPStepProps, RSVPStepTextProps } from "../types";
import AttendRehearsalMixer from "./AttendRehearsalMixer";
import AttendWedding from "./AttendWedding";
import MealSelection from "./MealSelection";
import SearchRSVP from "./SearchingLive";
import Transportation from "./Transportation";
import React from "react";

export function RSVPStepVertical({
    currStep,
    children,
    className,
    ...htmlProps
}: RSVPStepProps) {
    const { stepNumber, eyebrow, title, body } = getStepText(currStep);

    return (
        <div
            {...htmlProps}
            className={cn(
                "rsvp_step rsvp_step-vertical flex py-500 px-0",
                "flex-col gap-700 md:gap-1500",
                "md:items-center md:space-600  md:mx-auto md:py-800 md:px-750",
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

function MultilineText({
    text,
    className,
}: {
    text?: string;
    className?: string;
}) {
    if (!text) return null;
    const lines = text.split("\n");
    return (
        <p className={className}>
            {lines.map((line, i) => (
                <React.Fragment key={i}>
                    {line}
                    {i < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </p>
    );
}

const eyebrowClass =
    "flex-1 font-sans text-xs md:text-base uppercase font-normal leading-[140%] tracking-[1px] md:tracking-[2px] ";

function RSVPStepTextCentered({
    stepNumber,
    eyebrow,
    title,
    body,
    className,
    ...htmlProps
}: RSVPStepTextProps) {
    return (
        <div {...htmlProps} className={cn("text-center w-full", className)}>
            <div className="lg:max-w-[60.417vw] lg:mx-auto">
                {eyebrow && (
                    <Eyebrow
                        text={eyebrow}
                        styleOptions={{
                            variation: "center",
                            includeMargin: false,
                        }}
                        className={"mb-400!"}
                    />
                )}

                <h2
                    className={cn(
                        stepNumber === 1
                            ? "text-6xl! lg:text-[175px]! "
                            : "text-6xl!",
                        "leading-[130%]!",
                    )}
                >
                    {title}
                </h2>
            </div>

            {body &&
                (typeof body === "string" ? (
                    <p className="body-l rsvp_step_text-body mt-300!">{body}</p>
                ) : (
                    <div className="mt-300 flex gap-(--layout-column-gutter) lg:px-200 min-w-0 w-full ">
                        <MultilineText
                            text={body.left}
                            className={cn(eyebrowClass, "min-w-0 text-left")}
                        />
                        <MultilineText
                            text={body.center}
                            className={cn(eyebrowClass, "min-w-0 text-center")}
                        />
                        <MultilineText
                            text={body.right}
                            className={cn(eyebrowClass, "min-w-0 text-right")}
                        />
                    </div>
                ))}
        </div>
    );
}

interface RSVPNavButtonProps {
    hidden?: boolean;
    disabled: boolean;
}

export interface OverrideProps extends RSVPNavButtonProps {
    coming: boolean;
    text?: string;
}

// TODO: add override to thank you
interface RSVPNavButtonsProps {
    back?: RSVPNavButtonProps;
    next: RSVPNavButtonProps;
    overrideNext?: OverrideProps;
    /** True while the step's submission (e.g. the final RSVP write) is in flight — disables nav and swaps the Next label. */
    submitting?: boolean;
}

/** Resolves which step a form submission should advance to, given an optional override (e.g. declining branches to the "not coming" thank-you step). */
export function resolveNextStep(
    step: number,
    overrideNext?: OverrideProps,
): number {
    if (overrideNext) return overrideNext.coming ? -2 : -1;
    return step + 1;
}

export function RSVPNavButtons({
    back = { disabled: false, hidden: false },
    next,
    overrideNext,
    submitting = false,
}: RSVPNavButtonsProps) {
    const { step, goToStep } = useRSVPForm();

    return (
        <div className="flex items-center justify-between gap-300 mt-500">
            {/* Back: type="button" so it can't trigger the enclosing form's submit */}
            {back && !back.hidden && (
                <Button
                    variant="outline"
                    colorScheme="cream"
                    btnSettings={{
                        type: "native",
                        text: "Back",
                        disabled: back.disabled || submitting,
                        onClick: () => goToStep(step - 1),
                        htmlType: "button",
                    }}
                />
            )}

            {/* Next: type="submit" so it drives the enclosing form's onSubmit (which should call resolveNextStep) */}
            {overrideNext ? (
                <Button
                    variant="solid"
                    colorScheme="cream"
                    hoverScheme="burgundy"
                    btnSettings={{
                        type: "native",
                        text: submitting
                            ? "Submitting…"
                            : (overrideNext.text ?? "Next"),
                        disabled: overrideNext.disabled || submitting,
                        htmlType: "submit",
                    }}
                />
            ) : !next.hidden ? (
                <Button
                    variant="solid"
                    colorScheme="cream"
                    hoverScheme="burgundy"
                    btnSettings={{
                        type: "native",
                        text: submitting ? "Submitting…" : "Next",
                        disabled: next.disabled || submitting,
                        htmlType: "submit",
                    }}
                />
            ) : null}
        </div>
    );
}

interface GuestLabelInputWrapperProps {
    guest: Guest;
    children: React.ReactNode;
    layout?: "row" | "column";
    centerHeader?: boolean;
    className?: string;
}

export function GuestLabelInputWrapper({
    guest,
    children,
    layout = "column",
    centerHeader = false,
    className,
}: GuestLabelInputWrapperProps) {
    if (layout === "row") {
        return (
            <div
                className={cn(
                    "flex flex-col md:flex-row md:items-center md:justify-center gap-400",
                    className,
                )}
            >
                <h4 className={cn("heading-l", centerHeader && "text-center")}>
                    {guest.firstName} {guest.lastName}
                </h4>

                {children}
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-400", className)}>
            <h4 className={cn("heading-l", centerHeader && "text-center")}>
                {guest.firstName} {guest.lastName}
            </h4>

            {children}
        </div>
    );
}

export function RenderSteps({ step }: { step: number }) {
    const { refetchGuests } = useRSVPForm();

    switch (step) {
        case -2:
            return <RSVPThankYou coming={true} />;
        case -1:
            return <RSVPThankYou coming={false} />;
        case 1:
            return <SearchRSVP />;
        case 2:
            return <AttendWedding />;
        case 3:
            return <MealSelection />;
        case 4:
            return <Transportation />;
        case 5:
            return <AttendRehearsalMixer />;
        default:
            return (
                <RSVPFormError
                    key="error"
                    errorMessage={"Error"}
                    onRetry={refetchGuests}
                />
            ); // TODO: add error message
    }
}

// export default function RSVPStepHorizontal({
//     currStep,
//     children,
//     className,
//     ...htmlProps
// }: RSVPStepProps) {
//     const { stepNumber, title, body } = getStepText(currStep);

//     return (
//         <div
//             {...htmlProps}
//             className={cn(
//                 "rsvp_step rsvp_step_horizontal flex py-1500 px-750",
//                 "flex-col gap-500 ",
//                 "md:flex-row md:items-center md:space-600",
//                 className,
//             )}
//         >
//             <RSVPStepText
//                 className="rsvp_step-left md:flex-[2_1_600px]"
//                 stepNumber={stepNumber}
//                 title={title}
//                 body={body}
//             />

//             <div className="rsvp_step-right md:flex[1_1_500px]">{children}</div>
//         </div>
//     );
// }

// export function RSVPStepText({
//     stepNumber,
//     title,
//     body,
//     className,
//     ...htmlProps
// }: RSVPStepTextProps) {
//     return (
//         <div {...htmlProps} className={cn("rsvp_step_text md:max-w-[60.417]", className)}>
//             <Eyebrow
//                 text={`Step ${stepNumber}`}
//                 styleOptions={{
//                     variation: "left",
//                     starColor: "--cream-700",
//                 }}
//             />

//             <h2 className="heading-xl rsvp_step_text-title">{title}</h2>

//             {body && <p className="body rsvp_step_text-body mt-200">{body}</p>}
//         </div>
//     );
// }
