import { ThreeButtons } from "../../types/buttons";
import Buttons from "../Buttons/Buttons";
import Eyebrow from "../Eyebrow/Eyebrow";

import "./CopyOnly.scss";

type CopyOnlyProps = {
    eyebrow?: string;
    header: string;
    subtitle?: string;
    // body?: string;
    body?: string | { __html: string };
    buttons?: ThreeButtons;

    headingSize?: "h2" | "h3" | "h4";
    variation: "left" | "center" | "columns";
};

export default function CopyOnly({ eyebrow, header, subtitle, body, buttons, headingSize = "h2", variation = "left" }: CopyOnlyProps) {
    const eyebrowVariation = variation === "center" ? "centered" : "left";

    const Heading = headingSize;

    return (
        <div className={`copy-wrapper `}>
            <div className={`copy-inner ${variation}`}>
                <div className="copy-text">
                    <div className="copy-upper">
                        {eyebrow && <Eyebrow text={eyebrow} variation={eyebrowVariation} />}

                        <Heading>{header}</Heading>
                    </div>

                    {subtitle && <h5 className="subtitle">{subtitle}</h5>}

                    {body && typeof body === "object" ? <div className="copy-body" dangerouslySetInnerHTML={body} /> : <p className="copy-body">{body as string}</p>}
                </div>

                {buttons?.length != 0 && (
                    <div className="copy-btns">
                        {buttons?.map((btn, idx) => {
                            console.log("btn", btn.btnText);
                            return (
                                <Buttons
                                    className=""
                                    style={idx === 2 ? "lines" : idx === 1 ? "outline" : "solid"}
                                    theme={idx === 2 ? "cream" : "gold"}
                                    btnSettings={{
                                        btnText: btn.btnText,
                                        link: btn.link,
                                        target: btn.target ?? "_self",
                                    }}
                                    includeArrow={true}
                                />
                            );
                        })}
                    </div>
                )}

                {/* <div className="copy" dangerouslySetInnerHTML={{ __html: text }} /> */}
            </div>
        </div>
    );
}
