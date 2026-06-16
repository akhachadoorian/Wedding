"use client";

import { useEffect, useRef } from "react";

import Accordions from "@/components/Accordions/Accordions";
import CopyOnly from "@/components/CopyOnly/CopyOnly";
import SimpleTable from "@/components/SimpleTable/SimpleTable";
import { SmallTextGrid } from "@/components/SmallTextGrid/SmallTextGrid";
import SplitInfo from "@/components/SplitInfo/SplitInfo";
import { useFadeIn } from "@/hooks/useFadeIn";
import InsetBackgroundSection from "@/layout/InsetBackgroundSection/InsetBackgroundSection";
import ParallaxingDrinkSection from "@/layout/ParallaxingDrinkSection/ParallaxingDrinkSection";
import SlantedSection from "@/layout/SlatedSection/SlantedSection";
import TextOnlyHero from "@/layout/TextOnlyHero/TextOnlyHero";
import content from "./content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Details.scss";
import Button from "@/components/Buttons/Button";
import ComingSoon from "@/layout/ComingSoon/ComingSoon";

gsap.registerPlugin(ScrollTrigger);

export default function Details({ loaded = true }: { loaded?: boolean }) {
    return (
        <>
            <ComingSoon
                pageTitle="Details"
                // header=""
                body="This page will have information about the venue, the day-of timeline, FAQs and more."
            />
        </>
    );
}

// export default function Details({ loaded = true }: { loaded?: boolean }) {
//     const venueRef = useFadeIn<HTMLDivElement>();
//     const timelineRef = useFadeIn<HTMLDivElement>();
//     const dressCodeRef = useFadeIn<HTMLDivElement>();
//     const rehearsalRef = useFadeIn<HTMLDivElement>();
//     const faqsRef = useFadeIn<HTMLDivElement>();

//     return (
//         <>
//             <TextOnlyHero
//                 loaded={loaded}
//                 {...content.hero}
//                 styleOptions={{
//                     variation: "columns",
//                     theme: "art-deco-bg",
//                     // inset: true
//                 }}
//             />

//             <section ref={venueRef} id="venue" className="venue-section base_section">
//                 <SplitInfo {...content.summary} />
//             </section>

//             {/* <section ref={timelineRef} id="timeline" className="timeline-section base_section">
//                 <CopyOnly
//                     styleOptions={{
//                         variation: "center",
//                         headingSize: "h2",
//                     }}
//                     {...content.timeline.copyOnly}
//                 />
//             </section> */}

//             <ParallaxingDrinkSection className="timeline-section" ref={timelineRef} id="timeline">
//                 <CopyOnly
//                     styleOptions={{
//                         variation: "center",
//                         headingSize: "h2",
//                     }}
//                     {...content.timeline.copyOnly}
//                 />

//                 <SimpleTable {...content.timeline.simpleTable} />
//             </ParallaxingDrinkSection>

//             <section ref={dressCodeRef} id="dress_code" className="dress_code-section base_section">
//                 <CopyOnly
//                     styleOptions={{
//                         variation: "left",
//                         headingSize: "h2",
//                     }}
//                     {...content.dressCode.copyOnly}
//                 />
//             </section>

//             {/* <section id="wedding_party" className="wedding_party-section base_section">
//                 <CopyOnly
//                     styleOptions={{
//                         variation: "center",
//                         headingSize: "h2",
//                     }}
//                     {...content.weddingParty.copyOnly}
//                 />
//             </section> */}

//             {/* TODO: rehearsal mixer?  */}
//             <SlantedSection
//                 ref={rehearsalRef}
//                 sectionPrefix="rehearsal"
//                 slantSettings={{
//                     depth: "large",
//                     flipped: true,
//                 }}
//             >

//                 <CopyOnly
//                     styleOptions={{
//                         variation: "left",
//                         headingSize: "h2",
//                     }}
//                     className="rehearsal-left"

//                     {...content.rehearsalMixer.copyOnly}
//                 />

//                 <div className="rehearsal-right">
//                     <Button
//                         colorScheme="gold"
//                         variant="solid"
//                         fullWidth={true}
//                         {...content.rehearsalMixer.button}
//                     />

//                     <SmallTextGrid {...content.rehearsalMixer.smallTextGrid} />

//                 </div>
//             </SlantedSection>

//             <InsetBackgroundSection
//                 sectionPrefix="faqs"
//                 ref={faqsRef}
//                 backgroundImage="/assets/DiamondPattern.svg"
//                 backgroundSize="60vw"
//                 backgroundRepeat="repeat"
//                 backgroundPosition="center"
//             >
//                 <CopyOnly
//                     styleOptions={{
//                         variation: "center",
//                         headingSize: "h2",
//                     }}
//                     {...content.faqs.copyOnly}
//                 />

//                 <Accordions {...content.faqs.accordions} />
//             </InsetBackgroundSection>
//         </>
//     );
// }
