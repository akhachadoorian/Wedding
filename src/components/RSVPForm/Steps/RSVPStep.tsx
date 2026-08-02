import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { getStepText, RSVPStepProps, RSVPStepTextProps, STEP_TEXT_MAP } from "../types";
import { cn } from "@/utils/cn";



export default function RSVPStep({
    // stepNumber, title, body,
    currStep,
    children,
    className,
    ...htmlProps
}:RSVPStepProps) {
    // const text = STEP_TEXT_MAP[currStep]
    const {stepNumber, title, body} = getStepText(currStep);
    
    return (
        <div 
            {...htmlProps} 
            className={cn(
                "rsvp_step flex", 
                "flex-col gap-500 ",
                "md:flex-row md:items-center md:space-600",
                className
            )}>
            
            {/* <div className=""> */}
                <RSVPStepText className="rsvp_step-left" stepNumber={stepNumber} title={title} body={body}  />
            {/* </div> */}
                
            <div className="rsvp_step-right">{children}</div>
        </div>
    )
}



export function RSVPStepText({ stepNumber, title, body, className, ...htmlProps }: RSVPStepTextProps) {
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

            {body && <p className="body rsvp_step_text-body">{body}</p>}
        </div>
    );
}

