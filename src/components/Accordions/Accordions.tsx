import React, { useState } from "react";

import "./Accordions.scss";

export type AccordionProps = {
    className?: string;
    title?: string;
    body?: string;
};

export function Accordion({ className, title, body }: AccordionProps) {
    const [accordionOpen, setAccordionOpen] = useState(false);

    const toggleAccordion = () => {
        setAccordionOpen(!accordionOpen);
    };

    return (
        <div className={`accordion-wrapper ${accordionOpen ? "accordion-open" : "accordion-closed"} ${className ?? ""}`}>
            <div className="accordion-question" onClick={toggleAccordion}>
                <h5 className="">{title}</h5>

                <div className="caret">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="17" viewBox="0 0 35 17" fill="none">
                        <path d="M17.5 1.7002H31.5L17.5 15.3002L3.5 1.7002H17.5Z" stroke="#6B532E" />
                        <path d="M17.5 1.7002H24.5L17.5 8.5002L10.5 1.7002H17.5Z" fill="#6B532E" />
                    </svg>
                </div>
            </div>
            <div className="accordion-answer">
                <p className="body-l">{body}</p>
            </div>
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
                    <Accordion key={idx} title={a.title} body={a.body} />
                ))}
            </div>
        </div>
    );
}
