import mergeRefs from "@/hooks/mergeRefs";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import { WithHTMLProps } from "@/types/props";
import { NonEmptyArray } from "@/types/utility";
import { cn } from "@/utils/cn";

type FrameCardProps = {
    
    title: string;
    subtitle?: string;
    body: string;
};

const frameClasses = "absolute border-2 border-cream z-1";
const topFrameClasses = "-top-3 right-3 bottom-3 -left-3";
const bottomFrameClasses = "top-3 -right-3 -bottom-3 left-3";

function FrameCard({ title, body, subtitle }: FrameCardProps) {
    return (
        <div className="flex-1 relative z-5 text-cabernet mx-200 my-200">
            <div className={cn(frameClasses, topFrameClasses, "")} />

            <div className="bg-cream py-300 px-200 md:py-500 md:px-400 flex flex-col justify-between gap-300">
                <p className="font-semibold text-lg uppercase">{title}</p>
                
                <div className="flex flex-col gap-100">
                    {subtitle && <p className="text-base italic font-medium">{subtitle}</p>}

                <p className="text-base ">{body}</p>
                </div>
            </div>

            <div className={cn(frameClasses, bottomFrameClasses, "")} />
        </div>
    );
}

export type FrameCardGridProps = WithHTMLProps & {
    frameCards: NonEmptyArray<FrameCardProps>;
};

export default function FrameCardGrid({
    frameCards,
    className,
    ref,
    ...htmlProps
}: FrameCardGridProps) {
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

    return (
        <div
            {...htmlProps}
            ref={mergeRefs(animRef, ref)}
            className="flex flex-col gap-500 md:flex-row md:gap-(--layout-gutter-margin"
        >
            {frameCards.map((d, idx) => (
                <FrameCard key={idx} {...d} />
            ))}
        </div>
    );
}
