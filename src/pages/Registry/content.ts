import { CopyOnlyProps } from "../../components/CopyOnly/CopyOnly";
import { TextOnlyHeroProps } from "../../layout/TextOnlyHero/TextOnlyHero";

// ----- Content -----------------------------------------------
const hero: Omit<TextOnlyHeroProps, "loaded" | "styleOptions"> = {
    eyebrow: "Registry",
    header: "Gifts & Celebrations",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};

// ----- Thank You -----------------------------------------------

const thanksCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "A Note From Us",
    header: "Your presence is the greatest gift we could ask for",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};


// ----- Content -----------------------------------------------

const registryContent = {
    hero: hero,
    thanks: thanksCopyOnly
};

export default registryContent;