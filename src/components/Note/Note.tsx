import { cn } from "@/utils/cn";
import Eyebrow from "../Eyebrow/Eyebrow";
import { WithHTMLProps } from "@/types/props";

export type NoteProps = WithHTMLProps & {
    eyebrow: string;
    body: string;
    variant: "left" | "center";
};

const LEFT_CLASSES = "mx-0 text-left md:max-w-[60.417vw]";
const CENTER_CLASSES = " mx-auto text-center md:max-w-[44.444vw]";

export default function Note({ eyebrow, body, variant, className, ...htmlProps }: NoteProps) {
    const eyebrowVariant = variant === 'left' ? 'left' : 'center';

    return (
        <div {...htmlProps} className={cn("venue-warning my-0 pt-300 border-t-2 border-t-solid border-t-black",variant === 'left' ? LEFT_CLASSES : CENTER_CLASSES, className )}>
            <Eyebrow
                text={eyebrow}
                styleOptions={{ variation: eyebrowVariant }}
            />
            <p className="body-s venue-warning-body mt-100 italic!">
                {body}
            </p>
        </div>
    );
}
