import React from "react";
import SmallTextTagHero from "../components/heros/SmallTextTagHero/SmallTextTagHero";
import { heroSmallTextTagHeroContent } from "../generated/details.content";


export default function Details({ loaded = true }: { loaded?: boolean })  {

    return (
        <div className="details">
            <SmallTextTagHero loaded={loaded} {...heroSmallTextTagHeroContent} />
        </div>
    )
}