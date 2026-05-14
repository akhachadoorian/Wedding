import React from "react";
import './RSVP.scss';
import content from './content';
import TextOnlyHero from "../../layout/TextOnlyHero/TextOnlyHero";


export default function RSVP({ loaded = true }: { loaded?: boolean })  {

    return (
        <>
            <TextOnlyHero 
                loaded={loaded} 
                {...content.hero} 
                styleOptions={{
                    variation: 'columns',
                    theme: 'black',
                    // inset: true
                }} 
            />
        </>
    )
}