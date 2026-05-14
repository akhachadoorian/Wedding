import React from "react";

import './Accommodations.scss';
import content from './content';
import TextOnlyHero from "../../layout/TextOnlyHero/TextOnlyHero";

export default function Accommodations({ loaded = true }: { loaded?: boolean })  {

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

            <section className="base_section placeholder">

            </section>
        </>
    )
}