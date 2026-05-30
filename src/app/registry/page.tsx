'use client'

import React from "react";
import TextOnlyHero from "@/layout/TextOnlyHero/TextOnlyHero";
import './Registry.scss';
import content from './content';
import DraggableHero from "@/layout/DraggableHero/DraggableHero";
import { useFadeIn } from "@/hooks/useFadeIn";
import CopyOnly from "@/components/CopyOnly/CopyOnly";
import ImageCallout from "@/components/ImageCallout/ImageCallout";
import BackgroundSection from "@/layout/BackgroundSection/BackgroundSection";

export default function Registry({ loaded = true }: { loaded?: boolean })  {
    const thanksRef = useFadeIn<HTMLDivElement>();
    const honeymoonRef = useFadeIn<HTMLDivElement>();


    return (
        <>
            <DraggableHero 
                loaded={loaded} 
                {...content.hero} 
            />

            <section ref={thanksRef} className="base_section thanks-section">
                <CopyOnly
                    styleOptions={{
                        headingSize: 'h2',
                        variation: 'center'
                    }} 
                    {...content.thanks}
                />                  
            </section>

            {/* <section ref={honeymoonRef} className="base_section honeymoon-section"> */}
              <ImageCallout 
                ref={honeymoonRef}
                className="honeymoon-section"
                {...content.honeymoon}

                styleOptions={{
                    variation: 'inset',
                    textLayout:'left'
                }}
              />      
            {/* </section> */}

            {/* <BackgroundSection image={{src:"/images/HoneyMoonLocal.jpg"}} >
                <CopyOnly
                    styleOptions={{
                        headingSize: 'h2',
                        variation: 'center'
                    }} 
                    {...content.thanks}
                />  
            </BackgroundSection> */}
        </>
    )
}