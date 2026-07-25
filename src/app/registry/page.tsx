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

export default function Registry({ loaded = true }: { loaded?: boolean }) {
    const thanksRef = useFadeIn<HTMLDivElement>();
    const honeymoonRef = useFadeIn<HTMLDivElement>();

    // TODO: other script for zola embed; determine if remove
    // useEffect(() => {
    //     const scriptId = "zola-wjs";

    //     if (!document.getElementById(scriptId)) {
    //         const script = document.createElement("script");
    //         script.id = scriptId;
    //         script.async = true;
    //         script.src = "https://widget.zola.com/js/widget.js";

    //         const firstScript = document.getElementsByTagName("script")[0];
    //         firstScript.parentNode?.insertBefore(script, firstScript);
    //     }
    // }, []);

    return (
        <PageGuard
            route="/registry"
            fallback={<ComingSoon pageTitle="Registry" />}
        >
            {/* <DraggableHero loaded={loaded} {...content.hero} /> */}
            <ImageOverlayHero
                {...content.hero}
                loaded={loaded}
                styleOptions={{ variation: "columns" }}
            />

            {/* <section ref={thanksRef} className="base_section thanks-section">
                <CopyOnly
                    styleOptions={{
                        headingLevel: "h2",
                        headingClass: "heading-l",
                        variation: "center",
                    }}
                    {...content.thanks}
                />
            </section> */}

            <section className="base_section -section">
                <CopyOnly
                    styleOptions={{
                        headingLevel: "h2",
                        headingClass: "heading-l",
                        variation: "center",
                    }}
                    {...content.registryLinks.copyOnly}
                />

                <div className="">
                    <a href="https://www.zola.com/registry/collection-item/6a3b3c84a5548d58919a7165" className="">test</a>
                    <a href=""></a>
                </div>
            </section>

            {/* TODO: this is Zola embed script; determine if should remove
            <section className="base_section registry-section">
                <a
                    className="zola-registry-embed"
                    href="https://www.zola.com/registry/maxandalexoctober31"
                    data-registry-key="maxandalexoctober31"
                >
                    Our Zola Wedding Registry
                </a>
            </section> */}

            {/* <section ref={honeymoonRef} className="base_section thanks-section">
                <CopyOnly
                    styleOptions={{
                        headingLevel: "h2",
                        variation: "center",
                    }}
                    {...content.honeymoon.copyOnly}
                />
            </section> */}

            {/* <ImageCallout
                ref={honeymoonRef}
                className="honeymoon-section"
                {...content.honeymoon}
                styleOptions={{
                    variation: "inset",
                    textLayout: "left",
                }}
            /> */}
        </PageGuard>
    );
}

