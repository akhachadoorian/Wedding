import React from "react";

import Copy from "../components/Copy";
import LineSeparatedContent from "../components/LineSeparatedContent";
import Timeline from "../components/Timeline";

import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import HomeHero from "../components/heros/HomeHero";

function Wedding({loaded}) {
    const infoRef = useFadeInOnScroll();
    // const timelineRef = useFadeInOnScroll();

    // const timeline = [
    //     {
    //         time: '4:30 PM',

    //     }
    // ]

    return (
        <div className="wedding">
            <HomeHero  loaded={loaded} />

            <section ref={infoRef} className="info-section w_padding">
                <Copy 
                    text={"<h2>Once upon a time, we found each other, and now we're counting down the days until we say <span class='gold-italic'>I do</span>. We would be thrilled to have you join us in this next chapter.</h2>"}
                />

                <div className="lines">
                    <LineSeparatedContent 
                        left_content={"Saturday Oct, 31, 2026 — Halloween"}
                        right_content={"Guests arrive at 4:30 PM"}
                    />

                    <LineSeparatedContent 
                        left_content={"The Clay Theatre"}
                        right_content={"Green Cove Springs, Florida"}
                    />
                </div>
            </section>

            {/* <section ref={timelineRef} className="timeline-section w_padding" id="timeline">
                <Copy 
                    text={"<h2>From the ceremony to the final farewell, here's what to expect as we share this unforgettable day together.</h2>"}
                    eyebrow={'Timeline'}
                />

                <Timeline elements={timeline}/>
            </section> */}
        </div>
    );
}

export default Wedding;
