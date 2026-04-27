import { TwoButtonsArray } from "../../types/buttons";
import { TwoButtons } from "../Buttons/Buttons";
import Eyebrow from "../Eyebrow/Eyebrow";

import "./MediaWithCopy.scss";
import { ImageProps } from "../../types/images";
import ReactMarkdown from "react-markdown";
import Note from "../Note/Note";

export type MediaWithCopyProps = {
    className?: string;
    mediaSide?: "left" | "right";
    headingSize?: "h2" | "h3" | "h4";

    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: TwoButtonsArray;
    note?: {
        icon?: 'info' | 'warning' | 'question';
        title?: string;
        body?: string;
    }

    img?: ImageProps;
    
};

export default function MediaWithCopy({ className, mediaSide = 'right', headingSize = "h2",eyebrow, header, subtitle, body, buttons, note, img}: MediaWithCopyProps) {
    const Heading = headingSize;

    return (
        <div className={`media_with_copy-wrapper  ${className ?? ''} ${mediaSide}`}>
                <div className="media_with_copy-text">
                    <div className="media_with_copy-text">
                        {eyebrow && <Eyebrow text={eyebrow} variation={"left"} />}

                        <Heading className="">{header}</Heading>

                        {subtitle && <h5 className="subtitle">{subtitle}</h5>}

                        {body && <ReactMarkdown components={{ p: ({ children }) => <p className={"body"}>{children}</p> }}>{body}</ReactMarkdown>}
                    </div>

                    {buttons && buttons?.length != 0 && <TwoButtons className="media_with_copy-btns" buttons={buttons ?? []} />}

                    {note && <Note variation="left" backgroundColor="--black-700" {...note} />}
                </div>

                <div className="media_with_copy-img img-wrapper">
                    {/* <div className="img-wrapper"> */}
                        <div className="img-holder">
                            <img src={img?.src ?? "/images/Max&Alex.jpg"} alt={img?.alt ?? "Max and Alex posed on a bridge."} className="img-bw" loading="lazy" decoding="async" />
                        </div>

                        <div className="img-overlay"></div>
                    {/* </div> */}
                </div>


                {/* <div className="copy-text">
                    <div className="copy-upper">
                        {eyebrow && <Eyebrow text={eyebrow} variation={"left"} />}

                        <h2 className="">{header}</h2>
                    </div>

                    {subtitle && <h5 className="subtitle">{subtitle}</h5>}

                    {body && <ReactMarkdown components={{ p: ({ children }) => <p className={headingSize === "h2" ? "body-l" : "body"}>{children}</p> }}>{body}</ReactMarkdown>}
                </div>

                 */}
        </div>
    );
}
