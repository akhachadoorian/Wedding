"use client";

import ImageCallout from "@/components/ImageCallout";
import PageGuard from "@/components/PageGuard";
import { useFadeIn } from "@/hooks/useFadeIn";
import ComingSoon from "@/layout/ComingSoon";
import ImageOverlayHero from "@/layout/ImageOverlayHero";
import "./Registry.scss";
import content from "./content";
import CopyOnly from "@/components/CopyOnly";

export default function Registry({ loaded = true }: { loaded?: boolean }) {
    const registryLinksRef = useFadeIn<HTMLDivElement>();
    const catGiftRef = useFadeIn<HTMLDivElement>();

    return (
        <PageGuard
            route="/registry"
            fallback={<ComingSoon {...content.comingSoon.page} />}
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
                    {...content.registryLinks.intro}
                />
            </section>

            <ImageCallout
                {...content.catGift}
                styleOptions={{
                    variation: "inset",
                    textLayout: "center",
                }}
                className="cat_gift-section"
                id="cat_gift"
                ref={catGiftRef}
            />

        </PageGuard>
    );
}
