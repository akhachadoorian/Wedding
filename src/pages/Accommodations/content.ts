import { TextOnlyHeroProps } from "../../layout/TextOnlyHero/TextOnlyHero";

// ----- Hero -----------------------------------------------


const hero: Omit<TextOnlyHeroProps, "loaded" | "styleOptions"> = {
    eyebrow: 'Accommodations',
    header: "Where to Stay & How to Get There",
    body: "The venue is in Green Cove Springs, a beautiful small town about 30 minutes south of Jacksonville.  Below you'll find our hotel recommendations, transportation details, and everything else you need to feel prepared for the weekend."
}

// ----- Content -----------------------------------------------

const accommodationsContent = {
    hero: hero,

};

export default accommodationsContent;