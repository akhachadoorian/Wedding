/**
 * Alternate designs for the "venue" section on the Details page
 * (src/app/details/page.tsx), tried and never wired up. The page ended up
 * shipping with `VenueWatermark` (kept live in page.tsx, backed by
 * `watermarkVenue` in details/content.ts); these four variants — and the
 * content that fed them — were pulled out of both files and archived here
 * verbatim so the designs aren't lost, but stop being dead weight in the
 * live page/content files.
 *
 * This file is excluded from tsc/eslint/next build (see tsconfig.json and
 * eslint.config.mjs) and its imports are not guaranteed to resolve if
 * copied back in — treat it as a snapshot, not code ready to run. To
 * revive one, move the function (and its content below) back into
 * details/page.tsx / details/content.ts and fix up the imports.
 */

import { Fragment } from "react";
import Button from "@/components/Buttons/Button";
import CardGrid, { CardGridProps } from "@/components/CardGrid/CardGrid";
import MiniCardGrid, { MiniCardData } from "@/components/CardGrid/MiniCardGrid";
import CopyOnly, { CopyOnlyProps } from "@/components/CopyOnly/CopyOnly";
import Diamond from "@/components/Diamond/Diamond";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { ImageHolderBorder } from "@/components/ImageHolder/ImageHolder";
import Note from "@/components/Note/Note";
import SplitInfo, { SplitInfoProps } from "@/components/SplitInfo/SplitInfo";
import { CustomImageProps } from "@/types/images";
import { NonEmptyArray } from "@/types/utility";
import { ButtonSettingProps, ModalSettings } from "@/types/buttons";
import { Icon, LetterCirclePIcon, MapTrifoldIcon, VanIcon } from "@phosphor-icons/react";

// #region --- Content ---

const date: SplitInfoProps["intro"] = {
    upperText: {
        eyebrow: "Wedding Day",
        header: "October 31st, 2026",
        body: "Saturday · Halloween",
    },

    lowerText: {
        header: "Rideshare warning",
        body: "Please keep in mind that while you may be able to get an Uber or another rideshare service to the venue, we have been informed that it is very difficult to get an Uber back into Jacksonville.",
    },
};

const venueContent: SplitInfoProps["content"] = {
    content: [
        {
            eyebrow: "The Venue",
            header: "The Clay Theatre",
            subtitle: "326 Walnut St, Green Cove Springs, FL 32043",
            body: "We are so excited to celebrate with you at The Clay Theatre, a beautifully restored historic venue nestled in downtown Green Cove Springs.",
            buttons: [
                {
                    type: "link",
                    text: "View Directions",
                    link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhIIARAuGEMYrwEYxwEYgAQYigUyDQgCEC4YgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyBggEEEUYOTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDE1NjRqMGo0qAIAsAIB&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KZ00Fx6y0OWIMRYGQ-r5b-pC&daddr=326+Walnut+St,+Green+Cove+Springs,+FL+32043",
                    target: "_blank" as const,
                    decoration: {
                        type: "icon",
                        icon: MapTrifoldIcon,
                    },
                },
                {
                    type: "link",
                    text: "Transportation",
                    link: "/accommodations#transportation",
                    target: "_self" as const,
                    decoration: {
                        type: "icon",
                        icon: VanIcon,
                    },
                },
                {
                    type: "modal",
                    text: "parking",
                    decoration: {
                        type: "icon",
                        icon: LetterCirclePIcon,
                    },
                    modalID: "parking_modal",
                    modalContent: {
                        header: "Parking",
                        content: [
                            {
                                title: "Grass Lot Parking",
                                body: "Free parking is available in the grass lot connected to Clay Theatre, conveniently located right next to the venue for easy access.",
                            },
                            {
                                title: "On-Street Parking",
                                body: "On-street parking and public parking along Spring Park are both available and just a short walk from the venue.",
                            },
                            {
                                title: "City Hall Parking",
                                body: "City Hall is just across the street from the venue. Per the venue, guests are welcome to park in their lot as the building is closed on Saturdays.",
                            },
                        ],
                    },
                },
            ],
        },
    ],
};

const summary: SplitInfoProps = {
    intro: date,
    content: venueContent,
};

const venueCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "The Venue",
    header: "The Clay Theatre",
    subtitle: "326 Walnut St, Green Cove Springs, FL 32043",
    body: "We are so excited to celebrate with you at The Clay Theatre, a beautifully restored historic venue nestled in downtown Green Cove Springs.",
};

const venueCards: CardGridProps = {
    cards: [
        {
            text: {
                title: "Directions",
                body: "Get directions straight to the venue.",
            },
            cardType: {
                type: "link",
                linkSettings: {
                    link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhIIARAuGEMYrwEYxwEYgAQYigUyDQgCEC4YgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyBggEEEUYOTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDE1NjRqMGo0qAIAsAIB&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KZ00Fx6y0OWIMRYGQ-r5b-pC&daddr=326+Walnut+St,+Green+Cove+Springs,+FL+32043",
                    target: "_blank",
                },
            },
        },
        {
            text: {
                title: "Transportation",
                body: "Parking, the shuttle, and rideshare info for getting to and from the venue.",
            },
            cardType: {
                type: "link",
                linkSettings: {
                    link: "/accommodations#transportation",
                    target: "_self",
                },
            },
        },
        {
            text: {
                title: "Parking",
                body: "Free lots and on-street options within walking distance.",
            },
            cardType: {
                type: "modal",
                modalSettings: {
                    modalID: "parking_modal",
                    modalContent: {
                        header: "Parking",
                        content: [
                            {
                                title: "Grass Lot Parking",
                                body: "Free parking is available in the grass lot connected to Clay Theatre, conveniently located right next to the venue for easy access.",
                            },
                            {
                                title: "On-Street Parking",
                                body: "On-street parking and public parking along Spring Park are both available and just a short walk from the venue.",
                            },
                            {
                                title: "City Hall Parking",
                                body: "City Hall is just across the street from the venue. Per the venue, guests are welcome to park in their lot as the building is closed on Saturdays.",
                            },
                        ],
                    },
                },
            },
        },
    ],
};

const venueWarning = {
    eyebrow: "Rideshare Warning",
    body: "Please keep in mind that while you may be able to get an Uber or another rideshare service to the venue, we have been informed that it is very difficult to get an Uber back into Jacksonville.",
};

const venue = {
    copyOnly: venueCopyOnly,
    cardGrid: venueCards,
    warning: venueWarning,
};

// --- Venue (framed photo variation) ---
// A photo-led treatment: the venue photograph in a cabernet double-border
// frame alongside the copy, with the three actions rendered as slim
// icon+text links (not buttons or cards) split by diamond dividers.

const venueFramedImage: CustomImageProps = {
    src: "/images/ClayTheatre.jpg",
    alt: "The Clay Theatre, a historic theater venue in downtown Green Cove Springs.",
    fill: true,
};

const venueFramedCopy = {
    eyebrow: "The Venue",
    header: "The Clay Theatre",
    subtitle: "326 Walnut St, Green Cove Springs, FL 32043",
    body: "We are so excited to celebrate with you at The Clay Theatre, a beautifully restored historic venue nestled in downtown Green Cove Springs.",
};

const venueFramedActions: ButtonSettingProps[] = [
    {
        type: "link",
        text: "Directions",
        link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhIIARAuGEMYrwEYxwEYgAQYigUyDQgCEC4YgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyBggEEEUYOTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDE1NjRqMGo0qAIAsAIB&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KZ00Fx6y0OWIMRYGQ-r5b-pC&daddr=326+Walnut+St,+Green+Cove+Springs,+FL+32043",
        target: "_blank",
        decoration: {
            type: "icon",
            icon: MapTrifoldIcon,
        },
    },
    {
        type: "link",
        text: "Transportation",
        link: "/accommodations#transportation",
        target: "_self",
        decoration: {
            type: "icon",
            icon: VanIcon,
        },
    },
    {
        type: "modal",
        text: "Parking",
        decoration: {
            type: "icon",
            icon: LetterCirclePIcon,
        },
        modalID: "parking_modal_framed",
        modalContent: {
            header: "Parking",
            content: [
                {
                    title: "Grass Lot Parking",
                    body: "Free parking is available in the grass lot connected to Clay Theatre, conveniently located right next to the venue for easy access.",
                },
                {
                    title: "On-Street Parking",
                    body: "On-street parking and public parking along Spring Park are both available and just a short walk from the venue.",
                },
                {
                    title: "City Hall Parking",
                    body: "City Hall is just across the street from the venue. Per the venue, guests are welcome to park in their lot as the building is closed on Saturdays.",
                },
            ],
        },
    },
];

const venueFramed = {
    image: venueFramedImage,
    copy: venueFramedCopy,
    actions: venueFramedActions,
    warning: venueWarning,
};

// --- Venue (icon mini-card variation) ---
// Small bordered icon cards (no big background letter, no cabernet fill) so
// they read distinctly from both `venueCards`'s Card/CardGrid look and the
// shrunk-card override used in the side-cards layout.

const venueMiniCards: NonEmptyArray<MiniCardData> = [
    {
        icon: MapTrifoldIcon,
        title: "Directions",
        body: "Get directions straight to the venue.",
        cardType: {
            type: "link",

            linkSettings: {
                link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhIIARAuGEMYrwEYxwEYgAQYigUyDQgCEC4YgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyBggEEEUYOTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDE1NjRqMGo0qAIAsAIB&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KZ00Fx6y0OWIMRYGQ-r5b-pC&daddr=326+Walnut+St,+Green+Cove+Springs,+FL+32043",
                target: "_blank",
            },
        },
    },
    {
        icon: VanIcon,
        title: "Transportation",
        body: "Parking, the shuttle, and rideshare info for getting to and from the venue.",
        cardType: {
            type: "link",
            linkSettings: {
                link: "/accommodations#transportation",
                target: "_self",
            },
        },
    },
    {
        icon: LetterCirclePIcon,
        title: "Parking",
        body: "Free lots and on-street options within walking distance.",
        cardType: {
            type: "modal",
            modalSettings: {
                modalID: "parking_modal_mini",
                modalContent: {
                    header: "Parking",
                    content: [
                        {
                            title: "Grass Lot Parking",
                            body: "Free parking is available in the grass lot connected to Clay Theatre, conveniently located right next to the venue for easy access.",
                        },
                        {
                            title: "On-Street Parking",
                            body: "On-street parking and public parking along Spring Park are both available and just a short walk from the venue.",
                        },
                        {
                            title: "City Hall Parking",
                            body: "City Hall is just across the street from the venue. Per the venue, guests are welcome to park in their lot as the building is closed on Saturdays.",
                        },
                    ],
                },
            },
        },
    },
];

const content = { venue, venueFramed, venueMiniCards, summary };

// #endregion --- Content ---

// #region --- Components ---

export function VenueMiniCards({
    venueRef,
}: {
    venueRef?: React.Ref<HTMLDivElement>;
}) {
    return (
        <section
            ref={venueRef}
            id="venue"
            className="venue-section v5 base_section"
        >
            <div className="venue-side_cards">
                <div className="venue-side_cards-text">
                    <CopyOnly
                        styleOptions={{
                            variation: "left",
                            headingLevel: "h2",
                        }}
                        {...content.venue.copyOnly}
                    />

                    <Note
                        eyebrow={content.venue.warning.eyebrow}
                        body={content.venue.warning.body}
                        variant="left"
                    />
                </div>

                <div className="venue-side_cards-cards">
                    <MiniCardGrid
                        miniCards={content.venueMiniCards}
                        variant="col"
                    />
                </div>
            </div>
        </section>
    );
}

export function VenueCopyMedia({
    venueRef,
}: {
    venueRef?: React.Ref<HTMLDivElement>;
}) {
    return (
        <section
            ref={venueRef}
            id="venue"
            className="venue-section v4 base_section"
        >
            <div className="venue-framed">
                <ImageHolderBorder
                    img={content.venueFramed.image}
                    includeOverlay={false}
                    className="venue-framed-media"
                />

                <div className="venue-framed-text">
                    <Eyebrow
                        text={content.venueFramed.copy.eyebrow}
                        styleOptions={{ variation: "left" }}
                    />

                    <h2 className="venue-framed-header heading-xl">
                        {content.venueFramed.copy.header}
                    </h2>

                    <p className="venue-framed-subtitle subtitle">
                        {content.venueFramed.copy.subtitle}
                    </p>

                    <p className="venue-framed-body body">
                        {content.venueFramed.copy.body}
                    </p>

                    <div className="venue-framed-actions">
                        {content.venueFramed.actions.map((btnSettings, idx) => (
                            <Fragment key={idx}>
                                <Button
                                    variant="lines"
                                    colorScheme="cream"
                                    size="small"
                                    btnSettings={btnSettings}
                                />

                                {idx !==
                                    content.venueFramed.actions.length - 1 && (
                                    <Diamond color="--wine-600" />
                                )}
                            </Fragment>
                        ))}
                    </div>

                    <div className="venue-warning venue-warning-left">
                        <Eyebrow
                            text={content.venueFramed.warning.eyebrow}
                            styleOptions={{ variation: "left" }}
                        />
                        <p className="body-s venue-warning-body">
                            {content.venueFramed.warning.body}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function VenueCardGrid({ venueRef }: { venueRef?: React.Ref<HTMLDivElement> }) {
    return (
        <section
            ref={venueRef}
            id="venue"
            className="venue-section base_section"
        >
            <CopyOnly
                styleOptions={{
                    variation: "center",
                    headingLevel: "h2",
                }}
                {...content.venue.copyOnly}
            />

            <CardGrid {...content.venue.cardGrid} />

            <Note
                eyebrow={content.venue.warning.eyebrow}
                body={content.venue.warning.body}
                variant="center"
            />
        </section>
    );
}

export function VenueSplitInfo({
    venueRef,
}: {
    venueRef?: React.Ref<HTMLDivElement>;
}) {
    return (
        <section
            ref={venueRef}
            id="venue"
            className="venue-section base_section"
        >
            <SplitInfo {...content.summary} />
        </section>
    );
}

// #endregion --- Components ---
