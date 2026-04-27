import React from "react";
import SmallTextTagHero from "../components/heros/SmallTextTagHero/SmallTextTagHero";
import { dressCodeCopyOnlyContent, fAQsCopyOnlyContent, heroSmallTextTagHeroContent, timelineCopyOnlyContent, venueMediaWithCopyContent, weddingPartyCopyOnlyContent } from "../generated/details.content";
import Slant from "../components/Slant/Slant";
import CopyOnly from "../components/CopyOnly/CopyOnly";
import MediaWithCopy from "../components/MediaWithCopy/MediaWithCopy";
import { useFadeIn } from "../hooks/useFadeIn";


export default function Details({ loaded = true }: { loaded?: boolean })  {
    const venueRef = useFadeIn<HTMLDivElement>();
    const timelineRef = useFadeIn<HTMLDivElement>();
    const dressCodeRef = useFadeIn<HTMLDivElement>();

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