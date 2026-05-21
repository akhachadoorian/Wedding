import React from "react";
import TextOnlyHero from "../../layout/TextOnlyHero/TextOnlyHero";
import './Registry.scss';
import content from './content';
import DraggableHero from "../../layout/DraggableHero/DraggableHero";
import { useFadeIn } from "../../hooks/useFadeIn";
import CopyOnly from "../../components/CopyOnly/CopyOnly";

export default function Registry({ loaded = true }: { loaded?: boolean })  {
    const Ref = useFadeIn<HTMLDivElement>();

    return (
        <>
            <DraggableHero 
                loaded={loaded} 
                {...content.hero} 
            />

            <section className="base_section thanks-section">
                <CopyOnly
                    styleOptions={{
                        headingSize: 'h2',
                        variation: 'center'
                    }} 
                    {...content.thanks}
                />                  
            </section>
        </>
    )
}