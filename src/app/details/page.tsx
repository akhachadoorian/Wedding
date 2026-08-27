"use client";

import Accordions from "@/components/Accordions/Accordions";
import Button from "@/components/Buttons/Button";
import CardGrid from "@/components/CardGrid/CardGrid";
import MiniCardGrid from "@/components/CardGrid/MiniCardGrid";
import CopyOnly from "@/components/CopyOnly/CopyOnly";
import Diamond from "@/components/Diamond/Diamond";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import { ImageHolderBorder } from "@/components/ImageHolder/ImageHolder";
import Note from "@/components/Note/Note";
import PageGuard from "@/components/PageGuard/PageGuard";
import SimpleTable from "@/components/SimpleTable/SimpleTable";
import { SmallTextGrid } from "@/components/SmallTextGrid/SmallTextGrid";
import SplitInfo from "@/components/SplitInfo/SplitInfo";
import WatermarkText from "@/components/WatermarkText/WatermarkText";
import { useFadeIn } from "@/hooks/useFadeIn";
import ParallaxingDrinkSection from "@/layout/archive/ParallaxingDrinkSection/ParallaxingDrinkSection";
import ComingSoon, { ComingSoonSection } from "@/layout/ComingSoon/ComingSoon";
import ImageOverlayHero from "@/layout/ImageOverlayHero/ImageOverlayHero";
import InsetBackgroundSection from "@/layout/InsetBackgroundSection/InsetBackgroundSection";
import SlantedSection from "@/layout/SlantedSection/SlantedSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fragment } from "react";
import content from "./content";
import "./Details.scss";
import ComponentGuard from "@/components/ComponentGuard/ComponentGuard";

gsap.registerPlugin(ScrollTrigger);

export default function Details({ loaded = true }: { loaded?: boolean }) {
    const dateTimeRef = useFadeIn<HTMLDivElement>();
    const venueRef = useFadeIn<HTMLDivElement>();
    const timelineRef = useFadeIn<HTMLDivElement>();
    const dressCodeRef = useFadeIn<HTMLDivElement>();
    const rehearsalRef = useFadeIn<HTMLDivElement>();
    const faqsRef = useFadeIn<HTMLDivElement>();

    return (
        <PageGuard
            route="/details"
            fallback={
                <ComingSoon
                    pageTitle="Details"
                    body="This page will have information about the venue, the day-of timeline, FAQs and more."
                />
            }
        >
            <ImageOverlayHero
                {...content.hero}
                loaded={loaded}
                styleOptions={{ variation: "columns" }}
            />

            <VenueWatermark venueRef={venueRef} />

            <ComponentGuard
                id="details-timeline"
                fallback={
                    <ComingSoonSection
                    theme='black'
                        eyebrow="More to Come"
                        title="Day of Schedule coming soon!"
                        body="It will outline the general timeline for the day of."
                    />
                }
            >
                <section
                    ref={timelineRef}
                    id="timeline"
                    className="timeline-section base_section"
                >
                    <CopyOnly
                        styleOptions={{
                            variation: "center",
                            headingLevel: "h2",
                        }}
                        {...content.timeline.copyOnly}
                    />
                </section>

                {/* <ParallaxingDrinkSection
                    className="timeline-section"
                    ref={timelineRef}
                    id="timeline"
                >
                    <CopyOnly
                        styleOptions={{
                            variation: "center",
                            headingLevel: "h2",
                        }}
                        {...content.timeline.copyOnly}
                    />
                    <SimpleTable {...content.timeline.simpleTable} />
                </ParallaxingDrinkSection> */}
            </ComponentGuard>

            <ComponentGuard
                id="details-dress_code"
                fallback={
                    <ComingSoonSection
                        theme="gray"
                        eyebrow="More to Come"
                        title="Dress code coming soon!"
                    />
                }
            >

                <SlantedSection
                    ref={rehearsalRef}
                    sectionPrefix="rehearsal"
                    fill={"--wine-800"}
                    slantSettings={{
                        depth: "large",
                        flipped: true,
                    }}
                >
                    <CopyOnly
                        styleOptions={{
                            variation: "left",
                            headingLevel: "h2",
                        }}
                        {...content.dressCode.copyOnly}
                    />
                </SlantedSection>

                {/* <section
                    ref={dressCodeRef}
                    id="dress_code"
                    className="dress_code-section base_section"
                >
                    <CopyOnly
                        styleOptions={{
                            variation: "left",
                            headingLevel: "h2",
                        }}
                        {...content.dressCode.copyOnly}
                    />
                </section> */}
            </ComponentGuard>

            <ComponentGuard
                id="details-faqs"
                fallback={
                    <ComingSoonSection
                        theme="black"
                        eyebrow="More to Come"
                        title="FAQs coming soon!"
                    />
                }
            >
                {/* <InsetBackgroundSection
                    sectionPrefix="faqs"
                    ref={faqsRef}
                    backgroundImage="/assets/DiamondPattern.svg"
                    backgroundSize="60vw"
                    backgroundRepeat="repeat"
                    backgroundPosition="center"
                > */}
                <section  ref={faqsRef}
                    id="faqs"
                    className="faqs-section base_section">
                    <CopyOnly
                        styleOptions={{
                            variation: "center",
                            headingLevel: "h2",
                        }}
                        {...content.faqs.copyOnly}
                    />
                    <Accordions {...content.faqs.accordions} />
                    </section>
                {/* </InsetBackgroundSection> */}
            </ComponentGuard>

            <ComponentGuard
                id="details-rehearsal_mixer"
                fallback={
                    <ComingSoonSection
                        eyebrow="More to Come"
                        title="Rehearsal mixer details coming soon!"
                    />
                }
            >
                {/* <SlantedSection
                    ref={rehearsalRef}
                    sectionPrefix="rehearsal"
                    fill={"--wine-800"}
                    slantSettings={{
                        depth: "large",
                        flipped: true,
                    }}
                > */}
                    <section ref={rehearsalRef}
                    id="rehearsal"
                    className="rehearsal-section base_section">
                    <CopyOnly
                        styleOptions={{
                            variation: "left",
                            headingLevel: "h2",
                        }}
                        className="rehearsal-left"
                        {...content.rehearsalMixer.copyOnly}
                    />
                    <div className="rehearsal-right">
                        <Button
                            colorScheme="cabernet"
                            variant="solid"
                            fullWidth={true}
                            {...content.rehearsalMixer.button}
                        />
                        <SmallTextGrid
                            {...content.rehearsalMixer.smallTextGrid}
                        />
                    </div>
                    </section>
                {/* </SlantedSection> */}
            </ComponentGuard>
        </PageGuard>
    );
}

function VenueMiniCards({
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

function VenueCopyMedia({
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

function VenueCardGrid({ venueRef }: { venueRef?: React.Ref<HTMLDivElement> }) {
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

function VenueSplitInfo({
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

function VenueWatermark({
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
            <WatermarkText {...content.watermarkVenue} />
        </section>
    );
}
