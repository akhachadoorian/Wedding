"use client";

import Script from "next/script";
import PageGuard from "@/components/PageGuard";
import ComingSoon from "@/layout/ComingSoon";
import ImageOverlayHero from "@/layout/ImageOverlayHero";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Photos() {
    const photosRef = useFadeIn<HTMLDivElement>();

    return (
        <PageGuard
            route="/photos"
            fallback={<ComingSoon pageTitle="Photos" body="" />}
        >
            <ImageOverlayHero
                loaded={true}
                styleOptions={{ variation: "columns" }}
                eyebrow="Photos"
                header="Moments & Memories"
                body="We only saw our day from one spot, but you saw it from all of them. Upload your favorite photos below, from the ceremony to the last dance, and help us relive every moment."
            />

            <section ref={photosRef} className="base_section photos-section">
                <div
                    id="wedibox-embed"
                    className="h-full min-h-[60svh]"
                    data-event="dd491f01-c495-4167-be04-874123d28fde"
                />
                <Script
                    src="https://embed.wedibox.com/widget.js"
                    strategy="afterInteractive"
                />
            </section>
        </PageGuard>
    );
}
