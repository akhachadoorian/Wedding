import Script from "next/script";
import PageGuard from "@/components/PageGuard/PageGuard";
import ComingSoon from "@/layout/ComingSoon/ComingSoon";

export default function Photos() {
    return (
        <PageGuard
            route="/photos"
            fallback={<ComingSoon pageTitle="Photos" body="" />}
        >
            <section className="base_section photos-section">
                <div
                    id="wedibox-embed"
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
