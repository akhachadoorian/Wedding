"use client";

import { TwoButtonsArray } from "../../types/buttons";
import Eyebrow from "../Eyebrow/Eyebrow";

import ReactMarkdown from "react-markdown";
import { CustomImageProps } from "../../types/images";
import Note from "../archive/Note/Note";
import "./MediaWithCopy.scss";
import { TwoButtons } from "../Buttons/ButtonGroups";
import Image from "next/image";
import { WithHTMLProps } from "@/types/props";
import { DEFAULT_IMAGE } from "@/data/defaultImage";
import ImageHolder, { ImageHolderBorder } from "../ImageHolder/ImageHolder";
import { HeadingClassProps, HeadingLevelProps } from "@/types/headings";

type MediaWithCopyStyleProps = {
    mediaSide: "left" | "right";
    headingLevel: Exclude<HeadingLevelProps, "h1">;
    headingClass: HeadingClassProps;
};

const DEFAULT_STYLE: MediaWithCopyStyleProps = {
    mediaSide: "left",
    headingLevel: "h2",
    headingClass: "heading-xl"
};

export type MediaWithCopyProps = WithHTMLProps & {
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: TwoButtonsArray;
    note?: {
        icon?: "info" | "warning" | "question";
        title?: string;
        body?: string;
    };

    img?: CustomImageProps;

    styleOptions?: MediaWithCopyStyleProps;
};

export default function MediaWithCopy({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,
    note,
    img = DEFAULT_IMAGE,
    styleOptions = DEFAULT_STYLE,

    className,
    ...htmlProps
}: MediaWithCopyProps) {
    const Heading = styleOptions.headingLevel;

    return (
        <div
            {...htmlProps}
            className={`media_with_copy  ${className ?? ""} media_with_copy-side-${styleOptions.mediaSide}`}
        >
            <div className="media_with_copy-text">
                <div className="media_with_copy-text-upper">
                    {eyebrow && (
                        <Eyebrow
                            text={eyebrow}
                            styleOptions={{ variation: "left", includeMargin: true }}
                        />
                    )}

                    <Heading className={` ${styleOptions.headingClass}`}>{header}</Heading>

                    {subtitle && <h5 className="subtitle">{subtitle}</h5>}

                    {body && (
                        <ReactMarkdown
                            components={{
                                p: ({ children }) => (
                                    <p className={"body"}>{children}</p>
                                ),
                            }}
                        >
                            {body}
                        </ReactMarkdown>
                    )}
                </div>

                {buttons && (
                    <TwoButtons
                        className="media_with_copy-btns"
                        buttons={buttons ?? []}
                    />
                )}

                {note && (
                    <Note
                        variation="left"
                        backgroundColor="--black-700"
                        {...note}
                    />
                )}
            </div>

            <div className="media_with_copy-img img-wrapper">
                {/* <ImageHolder img={img} /> */}
                <ImageHolderBorder img={img} />
            </div>
        </div>
    );
}
