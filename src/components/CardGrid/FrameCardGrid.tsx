import mergeRefs from "@/hooks/mergeRefs";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import { WithHTMLProps } from "@/types/props";
import { NonEmptyArray } from "@/types/utility";
import { cn } from "@/utils/cn";

type FrameCardProps = {
    // eyebrow: string;
    title: string;
    body: string;
};

const frameClasses = "absolute border-2 border-cream z-1"
const topFrameClasses = "-top-3 right-3 bottom-3 -left-3"
const bottomFrameClasses = "top-3 -right-3 -bottom-3 left-3"

function FrameCard({ title, body }: FrameCardProps) {
    return (
        <div className="flex-1 relative z-5 text-cabernet">
            <div className={cn(frameClasses,topFrameClasses, "")} />

            <div className="bg-cream py-500 px-400">
            <p className="eyebrow">{title}</p>

            <p className="body-s">{body}</p>
            </div>

            <div className={cn(frameClasses, bottomFrameClasses,"")} />
        </div>
    );
}


export type FrameCardGridProps = WithHTMLProps & {
    frameCards: NonEmptyArray<FrameCardProps>
}

export default function FrameCardGrid({frameCards,className,
    ref,
    ...htmlProps}:FrameCardGridProps) {
const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

     return (
            <div {...htmlProps} ref={mergeRefs(animRef, ref)} className="flex flex-col gap-500 md:flex-row md:gap-(--layout-gutter-margin">
                {frameCards.map((d, idx) => (
                    <FrameCard 
                        key={idx} 
                        {...d} 
                    />
                ))}
            </div>
        );
}