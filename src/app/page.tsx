"use client";

import CopyOnly from "@/components/CopyOnly/CopyOnly";
import DrinkCardGrid from "@/components/DrinkCardGrid/DrinkCardGrid";
import { useFadeIn } from "@/hooks/useFadeIn";
import content from "./content";

import PageGuard from "@/components/PageGuard/PageGuard";
import PhotoCollage from "@/components/PhotoCollage/PhotoCollage";
import WatermarkText from "@/components/WatermarkText/WatermarkText";
import GothHero from "../layout/GothHero/GothHero";
import "./Home.scss";
import CardGrid from "@/components/CardGrid/CardGrid";


export default function Home({ loaded = true }: { loaded?: boolean }) {
    // Setup refs for fade in
    const welcomeRef = useFadeIn<HTMLDivElement>();
    const ourStoryRef = useFadeIn<HTMLDivElement>();
    const quickLinksRef = useFadeIn<HTMLDivElement>();

    return (
        <PageGuard route="/" fallback={<GothHero loaded={loaded} {...content.hero} />}>
            <GothHero loaded={loaded} {...content.hero} />

            <section
                ref={welcomeRef}
                id="welcome"
                className="welcome-section base_section"
            >
                <WatermarkText {...content.welcome.welcomeWatermarkText} />

            </section>

            <section
                ref={ourStoryRef}
                id="our_story"
                className="our_story-section base_section"
            >
                <PhotoCollage
                    {...content.ourStory}
                    styleOptions={{ headerTop: true, textBehind: true, reverseImageShapes: true }}
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
                        headingLevel: "h2",
                    }}
                    {...content.quickLinks.copyOnly}
                />

                <CardGrid {...content.quickLinks.cardGrid} />

                {/* <DrinkCardGrid {...content.quickLinks.drinkGrid} /> */}
            </section>
        </PageGuard>
    );
}
