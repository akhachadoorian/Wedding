import mergeRefs from "@/hooks/mergeRefs";
import { useFadeInChildren } from "@/hooks/useFadeIn";
import { ButtonSettingProps } from "@/types/buttons";
import { WithHTMLProps } from "@/types/props";
import { NonEmptyArray } from "@/types/utility";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Button from "../Buttons/Button";
import Star from "@/icons/Star";

type AccordionProps = {
    question: string;
    answer: string;
    button?: ButtonSettingProps;
    className?: string;
};

function Accordion({ question, answer, button, className }: AccordionProps) {
    const [accordionOpen, setAccordionOpen] = useState(false);

    const toggleAccordion = () => {
        setAccordionOpen(!accordionOpen);
    };

    return (
        <div 
            className={cn(
                "py-300 md:py-400 px-200 md:px-300 border-b-2 border-burgundy", 
                "transition-all ease-in-out duration-300",
                "hover:bg-cabernet hover:cursor-pointer",
                className
            )}
             onClick={toggleAccordion}
        >
            <div className="flex justify-between items-center gap-200">
                <h6 className="text-xl! md:text-2xl">{question}</h6>

                <Star color={accordionOpen ? "--wine-500" : '--cream'} className={cn("grow-0 shrink-0 size-6 md:size-8 transition-all ease-in-out duration-300", accordionOpen && 'rotate-90')} />
            </div>

            <AnimatePresence>
                {accordionOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            height: { duration: 0.4, ease: "easeInOut" },
                            opacity: { duration: 0.2 },
                        }}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="py-200 flex flex-col gap-300">
                            <p className="text-s md:text-base font-sans font-light leading-[130%]!">{answer}</p>

                            {button && <Button
                                variant="solid"
                                size="small"
                                colorScheme="burgundy"
                                btnSettings={button}
                            />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export type AccordionGridProps = WithHTMLProps & {
    accordions: NonEmptyArray<AccordionProps>;
};

export function AccordionGrid({
    accordions,
    className,
    ref,
    ...htmlProps
}: AccordionGridProps) {
    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

    return (
        <div
            {...htmlProps}
            ref={mergeRefs(animRef, ref)}
            className={cn("", className)}
        >
            {accordions.map((accordion, idx) => (
                <Accordion {...accordion} key={idx} className="mwc-animate" />
            ))}
        </div>
    );
}
