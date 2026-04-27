
import CopyOnly from "../components/CopyOnly/CopyOnly";
import DashedCopyGrid from "../components/DashedCopy/DashedCopy";
import LineSeparatedContent from "../components/DashedCopy/DashedCopy";
import DrinkCardGrid from "../components/DrinkCardGrid/DrinkCardGrid";
import HomeHero from "../components/heros/HomeHero/HomeHero";
import ImageGrid from "../components/ImageGrid/ImageGrid";
import { heroHomeHeroContent, photoGalleryImageGridContent, quickNavigationCardsDrinkCardGridContent, quickNavigationCopyCopyOnlyContent, welcomeCopyCopyOnlyContent, welcomeInfoDashedCopyGridContent } from "../generated/home.content";
import { useFadeIn } from "../hooks/useFadeIn";


function Wedding({ loaded = true }: { loaded?: boolean }) {
    // Setup refs for fade in
    const welcomeRef = useFadeIn<HTMLDivElement>();
    const photoGalleryRef = useFadeIn<HTMLDivElement>();
    const ourStoryRef = useFadeIn<HTMLDivElement>();
    const quickLinksRef = useFadeIn<HTMLDivElement>();

    return (
        <div className="wedding">
            <HomeHero  
                loaded={loaded} 
                {...heroHomeHeroContent}
            />

            <section ref={welcomeRef} id="welcome" className="welcome-section base_section">

                <CopyOnly 
                    variation="left"
                    headingSize="h2"
                    {...welcomeCopyCopyOnlyContent}
                />

                <DashedCopyGrid 
                    {...welcomeInfoDashedCopyGridContent}
                />
            </section>

            <section ref={photoGalleryRef} id="photo_gallery" className="photo_gallery-section base_section">
                <ImageGrid {...photoGalleryImageGridContent}/>
            </section>

            <section ref={ourStoryRef} id="our_story" className="our_story-section ">
                {/* TODO: figure out our story & make sure to fix maxwidth*/}
            </section>

            <section ref={quickLinksRef} id="quick_links" className="quick_links-section base_section">
                <CopyOnly variation="center" headingSize="h2" {...quickNavigationCopyCopyOnlyContent} />

                <DrinkCardGrid {...quickNavigationCardsDrinkCardGridContent} />
            </section>

        </div>
    );
}

export default Wedding;
