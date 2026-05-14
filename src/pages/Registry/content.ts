import { TextOnlyHeroProps } from "../../layout/TextOnlyHero/TextOnlyHero";

// ----- Content -----------------------------------------------
const hero: Omit<TextOnlyHeroProps, "loaded" | "styleOptions"> = {
    eyebrow: "Registry",
    header: "Gifts & Celebrations",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};

// ----- Content -----------------------------------------------

const registryContent = {
    hero: hero
};

export default registryContent;