import { CopyOnlyProps } from "../../../components/CopyOnly/CopyOnly";
import { ImageCalloutProps } from "../../../components/ImageCallout/ImageCallout";
import { TextOnlyHeroProps } from "../../../layout/TextOnlyHero/TextOnlyHero";

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

// ----- Honeymoon -----------------------------------------------

const honeymoonFund: Omit<ImageCalloutProps, 'styleOptions'> = {
    eyebrow: 'Honeymoon',
    header: 'Money Towards the Honeymoon',
    subtitle: 'Lorem ipsum dolor sit amet',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.',
    buttons: [
        {
            type: 'link',
            text: 'contribute',
            link: '/registry', // FIXME: add link
            // target: '_blank'
        }
    ],
    image: {
        src: '/images/HoneyMoonLocal.jpg',
        alt: 'Log cabins in the snow'
    }
}



// ----- Content -----------------------------------------------

const registryContent = {
    hero: hero,
    thanks: thanksCopyOnly,
    honeymoon: honeymoonFund
};

export default registryContent;