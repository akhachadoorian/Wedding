
import CopyOnly from "../components/CopyOnly/CopyOnly";
import LineSeparatedContent from "../components/LineSeparatedContent/LineSeparatedContent";
import HomeHero from "../components/heros/HomeHero/HomeHero";
import { homeHeroContent } from "../generated/home.content";
import { useFadeIn } from "../hooks/useFadeIn";

function Wedding({ loaded = true }: { loaded?: boolean }) {
    // const infoRef = useFadeInOnScroll();
    const infoRef = useFadeIn<HTMLDivElement>();

    return (
        <div className="wedding">
            <HomeHero  
                loaded={loaded} 
                {...homeHeroContent}
            />
            {/* <OffsetHero loaded={loaded} /> */}

            <section ref={infoRef} className="info-section base_section">
                {/* <CopyOnly 
                    text={"<h2>Once upon a time, we found each other, and now we're counting down the days until we say <span class='gold-italic'>I do</span>. We would be thrilled to have you join us in this next chapter.</h2>"}
                /> */}

                <CopyOnly 
                    variation="left"
                    headingSize="h2"
                    eyebrow="Lorem ipsum"
                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    subtitle="Lorem ipsum dolor sit amet"
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus."
                    buttons={[
                        {
                            btnText: 'B1',
                            link: '/'
                        },
                        {
                            btnText: 'B2',
                            link: '/'
                        },
                        {
                            btnText: 'B3',
                            link: '/'
                        },
                    ]}
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
