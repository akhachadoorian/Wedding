'use client'

import CopyOnly from "@/components/CopyOnly/CopyOnly";
import DashedCopyGrid from "@/components/DashedCopy/DashedCopy";
import DrinkCardGrid from "@/components/DrinkCardGrid/DrinkCardGrid";
import { useFadeIn } from "@/hooks/useFadeIn";
import ScrollRevealHero from "@/layout/ScrollRevealHero/ScrollRevealHero";
import content from "./content";

import "./Home.scss";
import GothHero from "../layout/GothHero/GothHero";

export default function Home({ loaded = true }: { loaded?: boolean }) {
    // Setup refs for fade in
    const welcomeRef = useFadeIn<HTMLDivElement>();
    const quickLinksRef = useFadeIn<HTMLDivElement>();

    return (
        <>
            {/* <ScrollRevealHero {...content.hero} /> */}
            
            <GothHero loaded={loaded}  {...content.hero}/>

            <section ref={welcomeRef} id="welcome" className="welcome-section base_section">
                <CopyOnly
                    styleOptions={{
                        variation: "left",
                        headingSize: "h2",
                    }}
                    {...content.welcome.copyOnly}
                />

                <DashedCopyGrid {...content.welcome.dashedCopyGrid} />
            </section>


            <section ref={quickLinksRef} id="quick_links" className="quick_links-section base_section">
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
