'use client'

import './Registry.scss';
import content from './content';
import DraggableHero from "@/layout/DraggableHero/DraggableHero";
import { useFadeIn } from "@/hooks/useFadeIn";
import CopyOnly from "@/components/CopyOnly/CopyOnly";
import ImageCallout from "@/components/ImageCallout/ImageCallout";
import ComingSoon from "@/layout/ComingSoon/ComingSoon";
import PageGuard from "@/components/PageGuard/PageGuard";

export default function Registry({ loaded = true }: { loaded?: boolean }) {
    const thanksRef = useFadeIn<HTMLDivElement>();
    const honeymoonRef = useFadeIn<HTMLDivElement>();

    return (
        <PageGuard
            route="/registry"
            fallback={<ComingSoon pageTitle="Registry" />}
        >
            <DraggableHero loaded={loaded} {...content.hero} />

            <section ref={thanksRef} className="base_section thanks-section">
                <CopyOnly
                    styleOptions={{
                        headingSize: "h2",
                        variation: "center",
                    }}
                    {...content.thanks}
                />
            </section>

            <ImageCallout
                ref={honeymoonRef}
                className="honeymoon-section"
                {...content.honeymoon}
                styleOptions={{
                    variation: "inset",
                    textLayout: "left",
                }}
            />
        </PageGuard>
    );
}
