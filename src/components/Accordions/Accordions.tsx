import React, { useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import "./Accordions.scss";

export type AccordionProps = {
    className?: string;
    question: string;
    answer: string;
};

export function Accordion({ className, question, answer }: AccordionProps) {
    const [accordionOpen, setAccordionOpen] = useState(false);

    const toggleAccordion = () => {
        setAccordionOpen(!accordionOpen);
    };

    return (
        <div className={`accordion ${accordionOpen ? "accordion-open" : "accordion-closed"} ${className ?? ""}`}>
            <div className="accordion-question" onClick={toggleAccordion}>
                <h5 className="">{question}</h5>

                <div className="accordion-caret">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="17" viewBox="0 0 35 17" fill="none">
                        <path d="M17.5 1.7002H31.5L17.5 15.3002L3.5 1.7002H17.5Z" stroke={accordionOpen ? "var(--gold-500)" : "var(--gold-700)"} />
                        <path d="M17.5 1.7002H24.5L17.5 8.5002L10.5 1.7002H17.5Z" fill={accordionOpen ? "var(--gold-500)" : "var(--gold-700)"} />
                    </svg>
                </div>
            </div>
            <AnimatePresence>
                {accordionOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5 }}>
                        <div className="accordion-answer">
                            <p className="body-l">{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* {body && <ReactMarkdown components={{ p: ({ children }) => <p className={`body-md ${headingSize === "h2" ? "body-l" : "body"}`}>{children}</p> }}>{body}</ReactMarkdown>} */}
        </div>
    );
}

export type AccordionsProps = {
    className?: string;
    accordions: Array<AccordionProps>;
};

export default function Accordions({ className, accordions }: AccordionsProps) {
    return (
        <div className={`accordions-wrapper ${className ?? ""}`}>
            <div className="accordions">
                {accordions.map((a, idx) => (
                    <Accordion key={idx} question={a.question} answer={a.answer} />
                ))}
            </div>
        </div>
    );
}
