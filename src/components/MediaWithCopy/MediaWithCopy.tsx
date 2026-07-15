'use client'

import { TwoButtonsArray } from "../../types/buttons";
import Eyebrow from "../Eyebrow/Eyebrow";

import ReactMarkdown from "react-markdown";
import { CustomImageProps } from "../../types/images";
import Note from "../archive/Note/Note";
import "./MediaWithCopy.scss";
import { TwoButtons } from "../Buttons/ButtonGroups";
import Image from "next/image";

export type MediaWithCopyProps = {
    className?: string;
    mediaSide?: "left" | "right";
    headingLevel?: "h2" | "h3" | "h4";

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

    img?: CustomImageProps;
    
};

export default function MediaWithCopy({ className, mediaSide = 'right', headingLevel = "h2",eyebrow, header, subtitle, body, buttons, note, img}: MediaWithCopyProps) {
    const Heading = headingLevel;

    return (
        <div className={`media_with_copy-wrapper  ${className ?? ''} ${mediaSide}`}>
                <div className="media_with_copy-text">
                    <div className="media_with_copy-text">
                        {eyebrow && <Eyebrow text={eyebrow} styleOptions={{variation: 'left'}}/>}

                        <Heading className="">{header}</Heading>

                        {subtitle && <h5 className="subtitle">{subtitle}</h5>}

                        {body && <ReactMarkdown components={{ p: ({ children }) => <p className={"body"}>{children}</p> }}>{body}</ReactMarkdown>}
                    </div>

                    {buttons && <TwoButtons className="media_with_copy-btns" buttons={buttons ?? []} />}

                    {note && <Note variation="left" backgroundColor="--black-700" {...note} />}
                </div>

                <div className="media_with_copy-img img-wrapper">
                    {/* <div className="img-wrapper"> */}
                        <div className="img-holder">
                            <Image src={img?.src ?? "/images/MaxAndAlex.jpg"} alt={img?.alt ?? "Max and Alex posed on a bridge."} className="img-bw" loading="lazy" decoding="async" />
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

                    {body && <ReactMarkdown components={{ p: ({ children }) => <p className={headingLevel === "h2" ? "body-l" : "body"}>{children}</p> }}>{body}</ReactMarkdown>}
                </div>

                 */}
        </div>
    );
}
