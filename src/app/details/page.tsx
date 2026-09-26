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
                <ComingSoon {...content.comingSoon.page} />
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
                        {...content.comingSoon.timeline}
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
                        {...content.timeline.intro}
                    />

                    <Timeline timelineElements={content.timeline.events} />
                </section>
            </ComponentGuard>

            <ComponentGuard
                id="details-dress_code"
                fallback={
                    <ComingSoonSection
                        theme="gray"
                        {...content.comingSoon.dressCode}
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
                        {...content.dressCode.intro}
                    />

                    <FrameCardGrid {...content.dressCode.cards} />
                </SlantedSection>
            </ComponentGuard>

            <ComponentGuard
                id="details-faqs"
                fallback={
                    <ComingSoonSection
                        theme="black"
                        {...content.comingSoon.faqs}
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
                        {...content.faqs.intro}
                    />
                    <AccordionGrid {...content.faqs.items} />
                </section>
            </ComponentGuard>

            <ComponentGuard
                id="details-rehearsal_mixer"
                fallback={
                    <ComingSoonSection {...content.comingSoon.rehearsal} />
                }
            >
                <section
                    ref={rehearsalRef}
                    id="rehearsal"
                    className="rehearsal-section base_section"
                >
                    <ThreeColumnCopy {...content.rehearsal.columns} />
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
            <WatermarkText {...content.venue.watermark} />

            <div
                ref={noteRef}
                className="flex gap-050 md:max-w-[60vw] md:mx-auto"
            >
                <Star className="size-5" />
                <p className="text-center italic text-base">
                    {content.venue.note}
                </p>
                <Star className="size-5" />
            </div>
        </section>
    );
}
