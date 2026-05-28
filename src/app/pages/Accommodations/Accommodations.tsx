import React from "react";

import './Accommodations.scss';
import content from './content';
import TextOnlyHero from "../../layout/TextOnlyHero/TextOnlyHero";
import { useFadeIn } from "../../hooks/useFadeIn";
import SplitInfo from "../../components/SplitInfo/SplitInfo";
import ArtDecoCardGrid, { ArtDecoCard } from "../../components/ArtDecoCardGrid/ArtDecoCardGrid";
import CopyOnly from "../../components/CopyOnly/CopyOnly";

export default function Accommodations({ loaded = true }: { loaded?: boolean })  {
    const hotelsRef = useFadeIn<HTMLDivElement>();
    const transportationRef = useFadeIn<HTMLDivElement>();

    return (
        <>
            <TextOnlyHero
                loaded={loaded} 
                {...content.hero} 
                styleOptions={{
                    variation: 'left',
                    theme: 'black',
                    // inset: true
                }} 
            />

            <section id="hotels" className="base_section hotels-section" ref={hotelsRef}>
                <CopyOnly 
                    styleOptions={{
                        variation: 'center',
                        headingSize: 'h2'
                    }}
                    {...content.hotels.copyOnly}
                />
                
                <ArtDecoCardGrid
                    {...content.hotels.hotelCards}
                />
            </section>
    
            <section id="transportation" className="base_section transportation-section" ref={transportationRef}>
                <SplitInfo 
                    {...content.transportation}
                />
            </section>
        </>
    )
}