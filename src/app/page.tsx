"use client";

import CopyOnly from "@/components/CopyOnly/CopyOnly";
import DrinkCardGrid from "@/components/DrinkCardGrid/DrinkCardGrid";
import { useFadeIn } from "@/hooks/useFadeIn";
import content from "./content";

import PhotoCollage from "@/components/PhotoCollage/PhotoCollage";
import GothHero from "../layout/GothHero/GothHero";
import "./Home.scss";
import WatermarkText from "@/components/WatermarkText/WatermarkText";


export default function Home({ loaded = true }: { loaded?: boolean }) {
    // Setup refs for fade in
    const welcomeRef = useFadeIn<HTMLDivElement>();
    const ourStoryRef = useFadeIn<HTMLDivElement>();
    const quickLinksRef = useFadeIn<HTMLDivElement>();

    return (
        <>
            <GothHero loaded={loaded} {...content.hero} />

            {/* <section ref={welcomeRef} id="welcome" className="welcome-section base_section">
                <CopyOnly
                    styleOptions={{
                        variation: "center",
                        headingSize: "h2",
                        customBtnColorSchemeMap: ['black', 'cream', 'cream']
                    }}
                    {...content.welcome.copyOnly}
                />

                <DashedCopyGrid {...content.welcome.dashedCopyGrid} /> */}

            {/* <div className="small_text_column">
                    <SmallText {...content.welcome.smallText[0]}  />
                    <SmallText {...content.welcome.smallText[0]}  />
                </div> */}
            {/* </section> */}

            <section
                ref={welcomeRef}
                id="welcome"
                className="welcome-section base_section"
            >
                <WatermarkText {...content.welcome.welcomeWatermarkText} />

            </section>

            {/* <section
                ref={welcomeRef}
                id="welcome"
                className="welcome-section base_section"
            >
                <WelcomeBlockB
                    eyebrow="We're getting married"
                    heading="Saturday, October"
                    headingItalic="31st"
                    location={{
                        year: "2026",
                        city: "Green Cove Springs",
                        state: "Florida",
                    }}
                    details={[
                        {
                            label: "Guests Arrive",
                            value: "4:30 PM",
                            link: "/details#timeline",
                        },
                        {
                            label: "Venue",
                            value: "The Clay Theatre",
                            link: "/details#venue",
                        },
                        {
                            label: "Ceremony Begins",
                            value: "5:00 PM",
                            link: "/details#timeline",
                        },
                    ]}
                    cta={{ text: "RSVP Now", link: "/rsvp" }}
                />
            </section> */}

            <section
                ref={ourStoryRef}
                id="our_story"
                className="our_story-section base_section"
            >
                <PhotoCollage
                    {...content.ourStory}
                    styleOptions={{ headerTop: true, textBehind: true }}
                />
            </section>

            <section
                ref={quickLinksRef}
                id="quick_links"
                className="quick_links-section base_section"
            >
                <CopyOnly
                    styleOptions={{
                        variation: "center",
                        headingSize: "h2",
                    }}
                    {...content.quickLinks.copyOnly}
                />

                <DrinkCardGrid {...content.quickLinks.drinkGrid} />
            </section>
        </>
    );
}
