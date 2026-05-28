import React from "react";
import './RSVP.scss';
import content from './content';
import TextOnlyHero from "../../../layout/TextOnlyHero/TextOnlyHero";
import RSVPForm from "../../../components/RSVPForm/RSVPForm";


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

            <RSVPForm {...content.form} />
        </>
    )
}