
import CopyOnly from "../components/CopyOnly/CopyOnly";
import LineSeparatedContent from "../components/LineSeparatedContent/LineSeparatedContent";
import HomeHero from "../components/heros/HomeHero/HomeHero";
import { heroHomeHeroContent, welcomeCopyCopyOnlyContent } from "../generated/home.content";
import { useFadeIn } from "../hooks/useFadeIn";

function Wedding({ loaded = true }: { loaded?: boolean }) {
    const infoRef = useFadeIn<HTMLDivElement>();

    return (
        <div className="wedding">
            <HomeHero  
                loaded={loaded} 
                {...heroHomeHeroContent}
            />

            <section ref={infoRef} className="info-section base_section">

                <CopyOnly 
                    variation="left"
                    headingSize="h2"
                    {...welcomeCopyCopyOnlyContent}
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
