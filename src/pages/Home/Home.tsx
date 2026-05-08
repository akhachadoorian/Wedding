import CopyOnly from "../../components/CopyOnly/CopyOnly";
import DashedCopyGrid from "../../components/DashedCopy/DashedCopy";
import DrinkCardGrid from "../../components/DrinkCardGrid/DrinkCardGrid";
import { useFadeIn } from "../../hooks/useFadeIn";
import ScrollRevealHero from "../../layout/ScrollRevealHero/ScrollRevealHero";
import content from "./content";

import "./Home.scss";

export default function Home({ loaded = true }: { loaded?: boolean }) {
    // Setup refs for fade in
    const welcomeRef = useFadeIn<HTMLDivElement>();
    // const photoGalleryRef = useFadeIn<HTMLDivElement>();
    // const ourStoryRef = useFadeIn<HTMLDivElement>();
    const quickLinksRef = useFadeIn<HTMLDivElement>();

    return (
        <>
            <ScrollRevealHero {...content.hero} />

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

            {/* <section ref={photoGalleryRef} id="photo_gallery" className="photo_gallery-section base_section">
                <ImageGrid {...photoGalleryImageGridContent}/>
            </section> */}
{/* 
            <section ref={ourStoryRef} id="our_story" className="our_story-section full_width">
                <Slant size="large" order="top" color="--black-900" />

                <div className="section-inner">
                    <CopyOnly variation="center" header="Our Story" />
                    <CopyOnly
                    styleOptions={{
                        variation: "center",
                        headingSize: "h2",
                    }}
                    {...content.quickLinks.copyOnly}
                />
                </div>

                <Slant size="large" order="bottom" color="--black-900" />
            </section> */}

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
