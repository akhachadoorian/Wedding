"use client";

import CopyOnly from "@/components/CopyOnly";
import PageGuard from "@/components/PageGuard";
import WatermarkText from "@/components/WatermarkText";
import { useFadeIn } from "@/hooks/useFadeIn";
import ComingSoon, { ComingSoonSection } from "@/layout/ComingSoon";
import ImageOverlayHero from "@/layout/ImageOverlayHero";
import InsetBackgroundSection from "@/layout/InsetBackgroundSection";
import SlantedSection from "@/layout/SlantedSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "./content";
import "./Details.scss";
import ComponentGuard from "@/components/ComponentGuard";
import Timeline from "@/components/Timeline";
import FrameCardGrid from "@/components/CardGrid/FrameCardGrid";
import { AccordionGrid } from "@/components/Accordions";
import { ThreeColumnCopy } from "@/components/ThreeColumnCopy";
import Star from "@/icons/Star";

gsap.registerPlugin(ScrollTrigger);

export default function Details({ loaded = true }: { loaded?: boolean }) {
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
                        theme="black"
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
                            headingClass: "heading-xl",
                        }}
                        {...content.timeline.copyOnly}
                    />

                    <Timeline timelineElements={content.timeline.elements} />
                </section>
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
                    ref={dressCodeRef}
                    sectionPrefix="dress_code"
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
                            starColor: "--cream",
                            subtitleExtra: true,
                            subtitleExtraBorderColor: "--cream",
                        }}
                        {...content.dressCode.copyOnly}
                    />

                    <FrameCardGrid {...content.dressCode.frameCards} />
                </SlantedSection>
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
                <section
                    ref={faqsRef}
                    id="faqs"
                    className="faqs-section base_section"
                >
                    <CopyOnly
                        styleOptions={{
                            variation: "center",
                            headingLevel: "h2",
                        }}
                        {...content.faqs.copyOnly}
                    />
                    <AccordionGrid {...content.faqs.accordions} />
                </section>
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
                <section
                    ref={rehearsalRef}
                    id="rehearsal"
                    className="rehearsal-section base_section"
                >
                    <ThreeColumnCopy {...content.rehearsalMixer.threeColCopy} />
                </section>
            </ComponentGuard>
        </PageGuard>
    );
}

function VenueWatermark({
    venueRef,
}: {
    venueRef?: React.Ref<HTMLDivElement>;
}) {
    const noteRef = useFadeIn<HTMLDivElement>();

    return (
        <section
            ref={venueRef}
            id="venue"
            className="venue-section base_section"
        >
            <WatermarkText {...content.watermarkVenue} />

            <div
                ref={noteRef}
                className="flex gap-050 md:max-w-[60vw] md:mx-auto"
            >
                <Star className="size-5" />
                <p className="text-center italic text-base">
                    Just a reminder that rideshares, while available to the
                    venue, will be very difficult to find — if you can even find
                    one — for the trip back. Please plan accordingly.
                </p>
                <Star className="size-5" />
            </div>
        </section>
    );
}
