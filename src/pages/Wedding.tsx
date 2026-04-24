
import CopyOnly from "../components/CopyOnly/CopyOnly";
import DashedCopyGrid from "../components/DashedCopy/DashedCopy";
import LineSeparatedContent from "../components/DashedCopy/DashedCopy";
import HomeHero from "../components/heros/HomeHero/HomeHero";
import ImageGrid from "../components/ImageGrid/ImageGrid";
import { heroHomeHeroContent, photoGalleryImageGridContent, welcomeCopyCopyOnlyContent, welcomeInfoDashedCopyGridContent } from "../generated/home.content";
import { useFadeIn } from "../hooks/useFadeIn";


function Wedding({ loaded = true }: { loaded?: boolean }) {
    const infoRef = useFadeIn<HTMLDivElement>();
    const photoGallery = useFadeIn<HTMLDivElement>();

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

                <DashedCopyGrid 
                    {...welcomeInfoDashedCopyGridContent}
                />
            </section>

            <section ref={photoGallery} className="photo_gallery-section base_section">
                <ImageGrid {...photoGalleryImageGridContent}/>
                
            </section>

        </div>
    );
}

export default Wedding;
