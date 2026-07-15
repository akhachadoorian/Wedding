import { CopyOnlyProps } from "@/components/CopyOnly/CopyOnly";
import { ImageCalloutProps } from "@/components/ImageCallout/ImageCallout";
import { DEFAULT_IMAGE } from "@/data/defaultImage";
import { ImageOverlayHeroProps } from "@/layout/ImageOverlayHero/ImageOverlayHero";
import { TextOnlyHeroProps } from "@/layout/TextOnlyHero/TextOnlyHero";

// #region --- Hero -----------------------------------------------
const heroText: Omit<TextOnlyHeroProps, "loaded" | "styleOptions"> = {
    eyebrow: "Registry",
    header: "Gifts & Celebrations",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};

const hero: Omit<ImageOverlayHeroProps, "loaded" | "styleOptions"> = {
    image: {
        ...DEFAULT_IMAGE,
        imgPositionResponsive: {
            desktop: "center 25%",
            mobile: "35% center",
        },
    },
    eyebrow: "Registry",
    header: "Gifts & Celebrations",
    body: "Everything you need to celebrate with us, from our honeymoon fund and registry favorites to a special cat-approved pick.",
    // subtitle: "Your presence is the greatest gift we could ask for",
    // body: "We are so grateful to celebrate this next chapter surrounded by the people we love most. Your presence is truly the greatest gift, but for those who would like to contribute, we have included a few meaningful ways to help us begin married life together (plus one very important cat-approved option).",
}

// #endregion ---------------------------------------

// #region --- Thank You -----------------------------------------------

const thanksCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "With Love & Gratitude",
    header: "Your presence is the greatest gift we could ask for",
    body: "We are so grateful to celebrate this next chapter surrounded by the people we love most. Your presence is truly the greatest gift, but for those who would like to contribute, we have included a few meaningful ways to help us begin married life together.",
};

// #endregion ---------------------------------------

// #region --- Honeymoon -----------------------------------------------

const honeymoonFundImgCallout: Omit<ImageCalloutProps, 'styleOptions'> = {
    eyebrow: 'Honeymoon',
    header: 'Money Towards the Honeymoon',
    subtitle: 'Lorem ipsum dolor sit amet',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.',
    buttons: [
        {
            type: 'link',
            text: 'contribute',
            link: 'https://www.zola.com/registry/collection-item/6a3b3c84a5548d58919a7165', // FIXME: add link
            target: '_blank'
        }
    ],
    image: {
        src: '/images/HoneyMoonLocal.jpg',
        alt: 'Log cabins in the snow',
        fill: true,
        sizes: "100dvw",
        style: { objectFit: "cover" },
    }
}

const honeymoonFundCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Honeymoon",
    header: "Money Towards the Honeymoon",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};

const honeymoonFund = {
    copyOnly: honeymoonFundCopyOnly
}
// #endregion ---------------------------------------

// #region --- Registry Links ---------------------

const registryLinksCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "With Love & Gratitude",
    header: "Your presence is the greatest gift we could ask for",
    body: "We are so grateful to celebrate this next chapter surrounded by the people we love most. Your presence is truly the greatest gift, but for those who would like to contribute, we have included a few meaningful ways to help us begin married life together.",
};

const registryLinks = {
    copyOnly: registryLinksCopyOnly
}

// #endregion ---------------------------------------

// #region --- Content -----------------------------------------------

const registryContent = {
    hero: hero,
    thanks: thanksCopyOnly,
    honeymoon: honeymoonFund,
    registryLinks: registryLinks
};

export default registryContent;

// #endregion ---------------------------------------