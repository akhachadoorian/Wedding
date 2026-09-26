"use client";

import React from "react";
import "./Accommodations.scss";
import content from "./content";
import TextOnlyHero from "../../layout/TextOnlyHero";
import { useFadeIn } from "../../hooks/useFadeIn";
import ComingSoon, { ComingSoonSection } from "@/layout/ComingSoon";
import PageGuard from "@/components/PageGuard";
import ImageOverlayHero from "@/layout/ImageOverlayHero";
import CardGrid from "@/components/CardGrid/CardGrid";
import ComponentGuard from "@/components/ComponentGuard";
import CopyOnly from "@/components/CopyOnly";
import SlantedSection from "@/layout/SlantedSection";
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
                <ComingSoon {...content.comingSoon.page} />
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
                    {...content.hotels.intro}
                />

                <CardGrid {...content.hotels.cards} />
            </section>

            <ComponentGuard
                id="accommodations-transportation"
                fallback={
                    <ComingSoonSection {...content.comingSoon.transportation} />
                }
            >
                <SlantedSection
                    ref={transportationRef}
                    sectionPrefix="transportation"
                >
                    <CopyOnly
                        {...content.transportation.intro}
                        styleOptions={{
                            variation: "center",
                            headingLevel: "h2",
                            bodyClass: "body-l",
                        }}
                    />

                    <div className="flex gap-050 md:max-w-[45vw] md:mx-auto">
                        <Star className="size-5" color="--cream" />
                        <p className="text-center italic body">
                            {content.transportation.note}
                        </p>
                        <Star className="size-5" color="--cream" />
                    </div>
                </SlantedSection>
            </ComponentGuard>
        </PageGuard>
    );
}
