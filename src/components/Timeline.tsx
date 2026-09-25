import mergeRefs from "@/hooks/mergeRefs";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import Star from "@/icons/Star";
import { WithHTMLProps } from "@/types/props";
import { NonEmptyArray } from "@/types/utility";
import { cn } from "@/utils/cn";
import React from "react";

export type TimelineElementProps = {
    time: string;
    title: string;
    body: string;
};

function TimelineElement({ time, title, body }: TimelineElementProps) {
    return (
        <div className="flex flex-col items-center text-center mwc-animate">
            <p className="eyebrow mb-200!">{time}</p>
            <h5 className="heading-m">{title}</h5>
            <p className="mt-300! opacity-80 body-s">{body}</p>
        </div>
    );
}

export type TimelineProps = WithHTMLProps & {
    timelineElements: NonEmptyArray<TimelineElementProps>;
};

export default function Timeline({
    timelineElements,
    className,
    ref,
    ...htmlProps
}: TimelineProps) {
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
            stagger: 0.15,
            y: 24,
        });

    const numElements = timelineElements.length
    return (
        <div {...htmlProps} ref={mergeRefs(animRef, ref)} className={cn("flex items-center flex-col gap-500 md:max-w-[550px] md:mx-auto", className)}>
            {timelineElements.map((timeline, idx) => {
                const includeStar = numElements - 1 !== idx

                return (
                    <React.Fragment key={timeline.title}>
                    <TimelineElement {...timeline} />
                    {includeStar && (<Star className="w-6 h-6 md:w-8 md:h-8 mwc-animate" />)}
                    </React.Fragment>
                )
            })}


        </div>
    );
}
