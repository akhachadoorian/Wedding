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
                header="Photos & Memories"
                body="We only saw our day from one spot, but you saw it from all of them. Upload your favorite photos below, from the ceremony to the last dance, and help us relive every moment."
            />

            <section className="base_section photos-section">
                <div
                    id="wedibox-embed"
                    className="h-full min-h-[60dvh]"
                    data-event="a5ac8186-254b-4fb3-aa4e-ef4c6bc9f08e"
                />
                <Script
                    src="https://embed.wedibox.com/widget.js"
                    strategy="afterInteractive"
                />
            </section>
        </PageGuard>
    );
}
