import React from "react";
import TextOnlyHero from "../../layout/TextOnlyHero/TextOnlyHero";
import './Registry.scss';
import content from './content';
import DraggableHero from "../../layout/DraggableHero/DraggableHero";

export default function Registry({ loaded = true }: { loaded?: boolean })  {

    return (
        <>
            <DraggableHero 
                loaded={loaded} 
                {...content.hero} 
            />
        </>
    )
}