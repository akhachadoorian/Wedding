import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Accordions from "../../components/Accordions/Accordions";
import CopyOnly from "../../components/CopyOnly/CopyOnly";
import SplitInfo from "../../components/SplitInfo/SplitInfo";
import { useFadeIn } from "../../hooks/useFadeIn";
import SlantedSection from "../../layout/SlatedSection/SlantedSection";
import TextOnlyHero from "../../layout/TextOnlyHero/TextOnlyHero";
import './Details.scss';
import content from './content';
import InsetBackgroundSection from "../../layout/InsetBackgroundSection/InsetBackgroundSection";

gsap.registerPlugin(ScrollTrigger);


export default function Details({ loaded = true }: { loaded?: boolean })  {
    const venueRef = useFadeIn<HTMLDivElement>();
    const timelineRef = useFadeIn<HTMLDivElement>();
    const dressCodeRef = useFadeIn<HTMLDivElement>();
    const parkingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = parkingRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".div_line",
                { width: 0 },
                {
                    width: 100,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <TextOnlyHero 
                loaded={loaded} 
                {...content.hero} 
                styleOptions={{
                    variation: 'columns',
                    theme: 'art-deco-bg',
                    // inset: true
                }} 
            />

            <section ref={venueRef} id="venue" className="venue-section base_section">
                <SplitInfo {...content.summary} />
            </section>

            <section ref={timelineRef} id="timeline" className="timeline-section base_section">
                <CopyOnly
                    styleOptions={{
                        variation: "center",
                        headingSize: "h2",
                    }}
                    {...content.timeline.copyOnly}
                />
            </section>

            <section ref={dressCodeRef} id="dress_code" className="dress_code-section base_section">
                <CopyOnly
                    styleOptions={{
                        variation: "left",
                        headingSize: "h2",
                    }}
                    {...content.dressCode.copyOnly}
                />
            </section>

            {/* <section id="wedding_party" className="wedding_party-section base_section">
                <CopyOnly
                    styleOptions={{
                        variation: "center",
                        headingSize: "h2",
                    }}
                    {...content.weddingParty.copyOnly}
                />
            </section> */}

            <SlantedSection 
                id="rehearsal" 
                className="rehearsal-section"

                slantSettings={{
                    depth: 'large',
                    flipped: true
                }}
            >
                {/* TODO: rehearsal mixer  */}
                
                <CopyOnly 
                    styleOptions={{
                        variation: "left",
                        headingSize: "h2",
                    }}
                    {...content.rehearsalMixer.copyOnly} 
                />
            </SlantedSection>

            <InsetBackgroundSection 
                id="faqs" 
                className="faqs-section"
                backgroundImage="/assets/DiamondPattern.svg"
                backgroundSize="60vw"
                backgroundRepeat="repeat"
                backgroundPosition="center"
            >
                <CopyOnly
                    styleOptions={{
                        variation: "center",
                        headingSize: "h2",
                    }}
                    {...content.faqs.copyOnly}
                />

                <Accordions {...content.faqs.accordions} />
            </InsetBackgroundSection>
        </>
    )
}