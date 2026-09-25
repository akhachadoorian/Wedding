import Script from "next/script";
import PageGuard from "@/components/PageGuard/PageGuard";
import ComingSoon from "@/layout/ComingSoon/ComingSoon";
import ImageOverlayHero from "@/layout/ImageOverlayHero/ImageOverlayHero";

export default function Photos() {
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

            <section className="base_section photos-section">
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
