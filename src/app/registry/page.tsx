"use client";

import CopyOnly from "@/components/CopyOnly/CopyOnly";
import ImageCallout from "@/components/ImageCallout/ImageCallout";
import PageGuard from "@/components/PageGuard/PageGuard";
import { useFadeIn } from "@/hooks/useFadeIn";
import ComingSoon from "@/layout/ComingSoon/ComingSoon";
import ImageOverlayHero from "@/layout/ImageOverlayHero/ImageOverlayHero";
import "./Registry.scss";
import content from "./content";

export default function Registry({ loaded = true }: { loaded?: boolean }) {
    const registryLinksRef = useFadeIn<HTMLDivElement>();
    const catGiftRef = useFadeIn<HTMLDivElement>();

    return (
        <PageGuard
            route="/registry"
            fallback={<ComingSoon pageTitle="Registry" />}
        >
            <ImageOverlayHero
                {...content.hero}
                loaded={loaded}
                styleOptions={{ variation: "columns" }}
                id="registry-hero"
            />

            <section
                id="registry_link"
                ref={registryLinksRef}
                className="base_section registry_link-section"
            >
                <CopyOnly
                    styleOptions={{
                        headingLevel: "h2",
                        headingClass: "heading-l",
                        variation: "center",
                    }}
                    {...content.registryLinks.copyOnly}
                />
            </section>

            <ImageCallout
                {...content.catImageCallout}
                styleOptions={{
                    variation: "inset",
                    textLayout: "center",
                }}
                className="cat_gift-section"
                id="cat_gift"
                ref={catGiftRef}
            />

            {/* <section id="cat_gift" ref={catGiftRef} className="base_section cat_gift-section">
                <MediaWithCopy
                    styleOptions={{
                        mediaSide: "right",
                        headingLevel: "h2",
                        headingClass: 'heading-l'
                    }}
                    {...content.catLink}
                />
            </section> */}
        </PageGuard>
    );
}
