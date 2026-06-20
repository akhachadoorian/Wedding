"use client";

import React from "react";
import "./RSVP.scss";
import content from "./content";
import TextOnlyHero from "../../layout/TextOnlyHero/TextOnlyHero";
import RSVPForm from "../../components/RSVPForm/RSVPForm";
import ComingSoon from "@/layout/ComingSoon/ComingSoon";
import PageGuard from "@/components/PageGuard/PageGuard";

export default function RSVP({ loaded = true }: { loaded?: boolean }) {
    return (
        <PageGuard
            route="/rsvp"
            fallback={
                <ComingSoon
                    pageTitle="RSVP"
                    body="This page will be used to RSVP for the wedding and rehearsal mixer."
                />
            }
        >
            <TextOnlyHero
                loaded={loaded}
                {...content.hero}
                styleOptions={{
                    variation: "columns",
                    theme: "black",
                }}
            />
            <RSVPForm {...content.form} />
        </PageGuard>
    );
}
