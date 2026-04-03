
import LineSeparatedContent from "../components/LineSeparatedContent/LineSeparatedContent";

import CopyOnly from "../components/CopyOnly/CopyOnly";
import OffsetHero from "../components/heros/OffsetHero/OffsetHero";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import HomeHero from "../components/heros/HomeHero/HomeHero";

function Wedding({loaded}) {
    const infoRef = useFadeInOnScroll();

    return (
        <div className="wedding">
            <HomeHero  loaded={loaded} />
            {/* <OffsetHero loaded={loaded} /> */}

            <section ref={infoRef} className="info-section w_padding">
                <CopyOnly 
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

        </div>
    );
}

export default Wedding;
