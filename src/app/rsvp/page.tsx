"use client";

import React from "react";
import "./RSVP.scss";
import content from "./content";
import TextOnlyHero from "../../layout/TextOnlyHero";
import RSVPForm from "../../components/RSVPForm/RSVPForm";
import ComingSoon from "@/layout/ComingSoon";
import PageGuard from "@/components/PageGuard";
import ImageOverlayHero from "@/layout/ImageOverlayHero";
import { useFadeIn } from "@/hooks/useFadeIn";
import CopyOnly from "@/components/CopyOnly";
import Eyebrow from "@/components/Eyebrow";
import { ThreeButtons } from "@/components/Buttons/ButtonGroups";
import CountdownRow from "@/components/Countdown/CountdownRow";
import CountdownSentence from "@/components/Countdown/CountdownSentence";
import CountdownStack from "@/components/Countdown/CountdownStack";

const { closed } = content;

export default function RSVP({ loaded = true }: { loaded?: boolean }) {
    // const rsvpRef = useFadeIn<HTMLDivElement>();
    const closedRSVPRef = useFadeIn<HTMLDivElement>();

    return (
        <PageGuard
            route="/rsvp"
            fallback={<ComingSoon {...content.comingSoon.page} />}
        >
            <ImageOverlayHero
                {...content.hero}
                loaded={loaded}
                styleOptions={{ variation: "columns" }}
            />

            {/* TURNED OFF RSVP FORM */}
            {/* <section ref={rsvpRef} className="base_section">
                <RSVPForm />
            </section> */}

            {/* Variation 1 — countdown leads */}
            {/* <section className="rsvp-closed base_section">
                <CopyOnly
                    styleOptions={{
                        variation: "center",
                        headingLevel: "h2",
                        headingClass: "heading-m",
                    }}
                    eyebrow={closed.countdownLeads.eyebrow}
                    header={closed.countdownLeads.header}
                    body={closed.countdownLeads.body}
                    buttons={closed.countdownLeads.buttons}
                />

                <hr className="rsvp-closed-divider" />

                <div className="rsvp-closed-countdown">
                    <Eyebrow
                        text={"countdown"}
                        styleOptions={{
                            variation: "center",
                            includeMargin: false,
                        }}
                    />
                    <CountdownRow />
                </div>
            </section> */}

            {/* Variation 2 — countdown as a sentence */}
            {/* <section className="rsvp-closed base_section">
                <CopyOnly
                    className="rsvp-closed-intro"
                    styleOptions={{
                        variation: "center",
                        headingLevel: "h2",
                        headingClass: "heading-m",
                    }}
                    eyebrow={closed.countdownSentence.eyebrow}
                    header={closed.countdownSentence.header}
                    body={closed.countdownSentence.body}
                />

                <hr className="rsvp-closed-divider" />

                <CountdownSentence className="text-center" />

                <ThreeButtons
                    className="justify-center"
                    noDecorationMap={true}
                    buttons={closed.countdownSentence.buttons}
                />
            </section> */}

            {/* Variation 3 — split layout with seconds */}
            <section
                ref={closedRSVPRef}
                className="rsvp-closed-split base_section"
            >
                <CopyOnly
                    className="rsvp-closed-split-copy"
                    styleOptions={{
                        variation: "left",
                        headingLevel: "h2",
                        headingClass: "heading-m",
                    }}
                    {...closed.splitWithSeconds}
                />

                <CountdownStack className="rsvp-closed-split-countdown" />
            </section>
        </PageGuard>
    );
}
