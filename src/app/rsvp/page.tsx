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
    const rsvpRef = useFadeIn<HTMLDivElement>();

    return (
        <PageGuard
            route="/rsvp"
            fallback={
                <ComingSoon {...content.comingSoon.page} />
            }
        >
            {/* <TextOnlyHero
                loaded={loaded}
                {...content.hero}
                styleOptions={{
                    variation: "columns",
                    theme: "black",
                }}
            /> */}

            {/* FIXME: add hero back */}
            <ImageOverlayHero {...content.hero} loaded={loaded} styleOptions={{variation: 'columns'}}/>

            <section ref={rsvpRef} className="base_section">
                {/* <div className="mb-300 text-center">
                    <h2>RSVP</h2>
                </div> */}

                <RSVPForm />
            </section>

            {/* Variation 1 — countdown leads */}
            <section className="rsvp-closed base_section">
                <div className="rsvp-closed-countdown">
                    <Eyebrow text={closed.countdownLeads.eyebrow} styleOptions={{ variation: "center", includeMargin: false }} />
                    <CountdownRow />
                </div>

                <hr className="rsvp-closed-divider" />

                <CopyOnly
                    styleOptions={{ variation: "center", headingLevel: "h2", headingClass: "heading-m" }}
                    header={closed.countdownLeads.header}
                    body={closed.countdownLeads.body}
                    buttons={closed.countdownLeads.buttons}
                />
            </section>

            {/* Variation 2 — countdown as a sentence */}
            <section className="rsvp-closed base_section">
                <CopyOnly
                    className="rsvp-closed-intro"
                    styleOptions={{ variation: "center", headingLevel: "h2", headingClass: "heading-m" }}
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
            </section>

            {/* Variation 3 — split layout with seconds */}
            <section className="rsvp-closed-split base_section">
                <CopyOnly
                    className="rsvp-closed-split-copy"
                    styleOptions={{ variation: "left", headingLevel: "h2", headingClass: "heading-m" }}
                    {...closed.splitWithSeconds}
                />

                <CountdownStack className="rsvp-closed-split-countdown" />
            </section>
            
        </PageGuard>
    );
}
