import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmallTextTagHero from "../components/heros/SmallTextTagHero/SmallTextTagHero";
import { dressCodeCopyOnlyContent, fAQsCopyOnlyContent, heroSmallTextTagHeroContent, timelineCopyOnlyContent, venueMediaWithCopyContent, weddingPartyCopyOnlyContent } from "../generated/details.content";
import Slant from "../components/Slant/Slant";
import CopyOnly from "../components/CopyOnly/CopyOnly";
import MediaWithCopy from "../components/MediaWithCopy/MediaWithCopy";
import { useFadeIn } from "../hooks/useFadeIn";

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
        <div className="details">
            <SmallTextTagHero loaded={loaded} {...heroSmallTextTagHeroContent} />

            <section ref={venueRef} id="venue" className="venue-section full-width">
                <Slant size="small" order="top" color="--black-900" />

                <div className="section-inner">
                    {/* TODO: get better image for venue */}
                    <MediaWithCopy 
                        mediaSide="left"
                        {...venueMediaWithCopyContent}
                    />

                    {/* TODO: add parking  */}
                    <div ref={parkingRef} className="parking_grid">
                        <div className="parking_grid-card">
                            <div className="div_line"></div>
                            <div className="parking_grid-text">
                                <p className="heading-xs">Grass Lot Parking</p>

                                <p className="body-s">Free parking is available in the grass lot connected to Clay Theatre, conveniently located right next to the venue for easy access.</p>
                            </div>
                        </div>

                        <div className="parking_grid-card">
                            <div className="div_line"></div>
                            <div className="parking_grid-text">
                                <p className="heading-xs">Grass Lot Parking</p>

                                <p className="body-s">Free parking is available in the grass lot connected to Clay Theatre, conveniently located right next to the venue for easy access.</p>
                            </div>
                        </div>

                        <div className="parking_grid-card">
                            <div className="div_line"></div>
                            <div className="parking_grid-text">
                                <p className="heading-xs">Grass Lot Parking</p>

                                <p className="body-s">Free parking is available in the grass lot connected to Clay Theatre, conveniently located right next to the venue for easy access.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Slant size="small" order="bottom" color="--black-900" />
            </section>

            <section ref={timelineRef} id="timeline" className="timeline-section base_section">
                <CopyOnly variation="center" headingSize="h2" {...timelineCopyOnlyContent}/>
            </section>

            <section ref={dressCodeRef} id="dress_code" className="dress_code-section base_section">
                <CopyOnly variation="left" headingSize="h2" {...dressCodeCopyOnlyContent}/>
            </section>

            <section id="wedding_party" className="wedding_party-section base_section">
                <CopyOnly variation="center" headingSize="h2" {...weddingPartyCopyOnlyContent}/>
            </section>

            <section id="venue" className="venue-section full-width">
                <Slant size="small" order="top" color="--black-900" inverseDirection={true} />

                {/* <div className="section-inner"> */}
                    {/* TODO: rehearsal mixer  */}
                {/* </div> */}

                <Slant size="small" order="bottom" color="--black-900" inverseDirection={true} />
            </section>

            <section id="faqs" className="faqs-section full_width_bg">
                <div className="section-inner">
                    <CopyOnly variation="center" headingSize="h2" {...fAQsCopyOnlyContent} />

                    {/* TODO: add faqs */}
                </div>
            </section>
        </div>
    )
}