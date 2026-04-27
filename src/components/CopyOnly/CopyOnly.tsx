import ReactMarkdown from "react-markdown";

import { ThreeButtonsArray } from "../../types/buttons";
import { ThreeButtons } from "../Buttons/Buttons";
import Eyebrow from "../Eyebrow/Eyebrow";

import "./CopyOnly.scss";

export type CopyOnlyProps = {
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;

    headingSize?: "h2" | "h3" | "h4";
    variation: "left" | "center" | "columns";
};

export default function CopyOnly({ eyebrow, header, subtitle, body, buttons, headingSize = "h2", variation = "left" }: CopyOnlyProps) {
    const eyebrowVariation = variation === "center" ? "centered" : "left";

    const Heading = headingSize;

    if (variation === "columns") {
        return (
            <div className={`copy-wrapper`}>
                <div className={`copy-inner ${variation}`}>
                    <div className="copy-left">
                        {eyebrow && <Eyebrow text={eyebrow} variation={eyebrowVariation} />}

                        <ReactMarkdown
                            components={{
                                p: ({ children }) => <Heading className="copy-header heading-md">{children}</Heading>,
                            }}
                        >
                            {header}
                        </ReactMarkdown>
                    </div>

                    <div className="copy-right">
                        {subtitle && <h5 className="subtitle">{subtitle}</h5>}

                        {body && <ReactMarkdown components={{ p: ({ children }) => <p className={`body-md ${headingSize === "h2" ? "body-l" : "body"}`}>{children}</p> }}>{body}</ReactMarkdown>}

                        {buttons && buttons?.length != 0 && <ThreeButtons className="copy-btns" buttons={buttons ?? []} />}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`copy-wrapper `}>
            <div className={`copy-inner ${variation}`}>
                <div className="copy-text">
                    <div className="copy-upper">
                        {eyebrow && <Eyebrow text={eyebrow} variation={eyebrowVariation} />}

                        <ReactMarkdown
                            components={{
                                p: ({ children }) => <Heading className="copy-header">{children}</Heading>,
                            }}
                        >
                            {header}
                        </ReactMarkdown>
                    </div>

                    {subtitle && <h5 className="subtitle">{subtitle}</h5>}

                    {body && <ReactMarkdown components={{ p: ({ children }) => <p className={headingSize === "h2" ? "body-l" : "body"}>{children}</p> }}>{body}</ReactMarkdown>}
                </div>

                {buttons && buttons?.length != 0 && <ThreeButtons className="copy-btns" buttons={buttons ?? []} />}
            </div>
        </div>
    );
}
