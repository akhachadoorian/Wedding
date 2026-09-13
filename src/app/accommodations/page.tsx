"use client";

import React from "react";
import "./Accommodations.scss";
import content from "./content";
import TextOnlyHero from "../../layout/TextOnlyHero/TextOnlyHero";
import { useFadeIn } from "../../hooks/useFadeIn";
import SplitInfo from "../../components/SplitInfo/SplitInfo";
import ComingSoon, { ComingSoonSection } from "@/layout/ComingSoon/ComingSoon";
import PageGuard from "@/components/PageGuard/PageGuard";
import ImageOverlayHero from "@/layout/ImageOverlayHero/ImageOverlayHero";
import CardGrid from "@/components/CardGrid/CardGrid";
import ComponentGuard from "@/components/ComponentGuard/ComponentGuard";
import CopyOnly from "@/components/CopyOnly/CopyOnly";
import SlantedSection from "@/layout/SlantedSection/SlantedSection";
import Star from "@/icons/Star";

export default function Accommodations({
    loaded = true,
}: {
    loaded?: boolean;
}) {
    const hotelsRef = useFadeIn<HTMLDivElement>();
    const transportationRef = useFadeIn<HTMLDivElement>();

    return (
        <PageGuard
            route="/accommodations"
            fallback={
                <ComingSoon
                    pageTitle="Accommodations"
                    body="This page will have information related to the hotel blocks and transportation to the venue."
                />
            }
        >
            <ImageOverlayHero
                {...content.hero}
                loaded={loaded}
                styleOptions={{ variation: "columns" }}
                className="accommodations_hero"
            />

            <section
                id="hotels"
                className="base_section hotels-section"
                ref={hotelsRef}
            >
                <CopyOnly
                    styleOptions={{
                        variation: "center",
                        headingLevel: "h2",
                    }}
                    {...content.hotels.copyOnly}
                />

                <CardGrid {...content.hotels.hotelCards} />
            </section>

            <ComponentGuard
                id="accommodations-transportation"
                fallback={
                    <ComingSoonSection
                        eyebrow="More to Come"
                        title="Transportation section coming soon!"
                        body="It will contain information regarding how to get and from the venue, venue parking, and the arranged bus service."
                    />
                }
            >
                {/* <section
                    id="transportation"
                    className="base_section transportation-section"
                    ref={transportationRef}
                >
                    <SplitInfo {...content.transportation} />
                </section> */}

                <SlantedSection
                    ref={transportationRef}
                    sectionPrefix="transportation"
                >
                    <CopyOnly
                        {...content.transportation}
                        styleOptions={{
                            variation: "center",
                            headingLevel: "h2",
                            bodyClass: "body-l",
                        }}
                    />

                    <div className="flex gap-050 md:max-w-[45vw] md:mx-auto">
                        <Star className="size-5" color="--cream" />
                        <p className="text-center italic body">
                            Just a reminder that rideshares, while available to
                            the venue, will be very difficult to find — if you
                            can even find one — for the trip back. Please plan
                            accordingly.
                        </p>
                        <Star className="size-5" color="--cream" />
                    </div>
                </SlantedSection>
            </ComponentGuard>
        </PageGuard>
    );
}
