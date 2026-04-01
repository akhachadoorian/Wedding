import React from "react";

import Hero from "../components/Hero";
import Copy from "../components/Copy";
import LineSeparatedContent from "../components/LineSeparatedContent";

function Wedding() {
    return (
        <div className="wedding">
            <Hero />

            <section className="info-section">
                <Copy 
                    text={"<h2>Once upon a time, we found each other, and now we're counting down the days until we say <span class='gold'>I do</span>. We would be thrilled to have you join us in this next chapter.</h2>"}
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

            <section className="timeline-section">
                <Copy 
                    text={"<h2>From the ceremony to the final farewell, here's what to expect as we share this unforgettable day together.</h2>"}
                    eyebrow={'Timeline'}
                />
            </section>
        </div>
    );
}

export default Wedding;
