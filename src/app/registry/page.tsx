"use client";

import "./Registry.scss";
import content from "./content";
import DraggableHero from "@/layout/DraggableHero/DraggableHero";
import { useFadeIn } from "@/hooks/useFadeIn";
import CopyOnly from "@/components/CopyOnly/CopyOnly";
import ImageCallout from "@/components/ImageCallout/ImageCallout";
import ComingSoon from "@/layout/ComingSoon/ComingSoon";
import PageGuard from "@/components/PageGuard/PageGuard";
import ImageOverlayHero from "@/layout/ImageOverlayHero/ImageOverlayHero";
import { useEffect } from "react";
import CardGrid from "@/components/CardGrid/CardGrid";
import MediaWithCopy from "@/components/MediaWithCopy/MediaWithCopy";

export default function Registry({ loaded = true }: { loaded?: boolean }) {
    const thanksRef = useFadeIn<HTMLDivElement>();
    const honeymoonRef = useFadeIn<HTMLDivElement>();

    return (
        <PageGuard
            route="/registry"
            fallback={<ComingSoon pageTitle="Registry" />}
        >
            <ImageOverlayHero
                {...content.hero}
                loaded={loaded}
                styleOptions={{ variation: "columns" }}
            />

            <section className="base_section registry-section">
                <CopyOnly
                    styleOptions={{
                        headingLevel: "h2",
                        headingClass: "heading-l",
                        variation: "center",
                    }}
                    {...content.registryLinks.copyOnly}
                />  
            </section>

            <section className="base_section cat-section">
                <MediaWithCopy
                    styleOptions={{
                        mediaSide: "right",
                        headingLevel: "h2",
                        headingClass: 'heading-xl'
                    }}
                    {...content.catLink}
                />
            </section>
        </PageGuard>
    );
}
