import { CopyOnlyProps } from "@/components/CopyOnly";
import { ImageCalloutProps } from "@/components/ImageCallout";
import { DEFAULT_IMAGE, IMAGE_BuckyJules } from "@/data/defaultImage";
import { ImageOverlayHeroProps } from "@/layout/ImageOverlayHero";

// #region --- Hero -----------------------------------------------

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
};

// #endregion ---------------------------------------

// #region --- Registry Links ---------------------

const registryLinksCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> =
    {
        eyebrow: "With Love & Gratitude",
        header: "Your presence is the greatest gift we could ask for",
        body: "We are so grateful to celebrate this next chapter surrounded by the people we love most. Your presence is truly the greatest gift, but for those who would like to contribute, we have included a few meaningful ways to help us begin married life together.",
        buttons: [
            {
                type: "link",
                text: "Our Honeymoon Fund",
                link: "https://www.zola.com/registry/collection-item/6a3b3c84a5548d58919a7165",
                target: "_blank",
            },
            {
                type: "link",
                text: "Our Registry",
                link: "https://www.zola.com/registry/maxandalexoctober31",
                    target: "_blank",
            },
        ],
    };

const registryLinks = {
    copyOnly: registryLinksCopyOnly,
};

// #endregion ---------------------------------------


const catImageCallout: Omit<ImageCalloutProps, 'styleOptions'> = {
    eyebrow: "They’ve dealt with lots of wedding stress",
    header: "Something for our cats, Bucky & Jules",
    image: {
        ...IMAGE_BuckyJules,
        imgPositionResponsive: {
            desktop: " center 75%"
        }
    },
    buttons: [
        {
            type: 'link',
            text: "A gift they'll appreciate",
            link: "https://www.zola.com/registry/maxandalexoctober31"
        }
    ]
}


// #region --- Content -----------------------------------------------

const registryContent = {
    hero: hero,
    registryLinks: registryLinks,
    catImageCallout: catImageCallout
};

export default registryContent;

// #endregion ---------------------------------------
