import { ImageCalloutProps } from "@/components/ImageCallout";
import { heroImage } from "@/content/builders";
import { EVENT } from "@/content/event";
import { IMAGES } from "@/content/images";
import { ComingSoonPageContent, CopyContent, HeroContent } from "@/content/types";

const { registry } = EVENT;

// #region --- Hero ---

const hero: HeroContent = {
    image: heroImage,
    eyebrow: "Registry",
    header: "Gifts & Celebrations",
    body: "Everything you need to celebrate with us, from our honeymoon fund and registry favorites to a special cat-approved pick.",
};

// #endregion ---

// #region --- Registry Links ---

const registryLinksIntro: CopyContent = {
    eyebrow: "With Love & Gratitude",
    header: "Your presence is the greatest gift we could ask for",
    body: "We are so grateful to celebrate this next chapter surrounded by the people we love most. Your presence is truly the greatest gift, but for those who would like to contribute, we have included a few meaningful ways to help us begin married life together.",
    buttons: [
        {
            type: "link",
            text: "Our Honeymoon Fund",
            link: registry.honeymoonFundUrl,
            target: "_blank",
        },
        {
            type: "link",
            text: "Our Registry",
            link: registry.url,
            target: "_blank",
        },
    ],
};

// #endregion ---

// #region --- Cat Gift ---

const catGift: Omit<ImageCalloutProps, "styleOptions"> = {
    eyebrow: "They’ve dealt with lots of wedding stress",
    header: "Something for our cats, Bucky & Jules",
    image: {
        ...IMAGES.buckyJules,
        imgPositionResponsive: {
            desktop: "center 75%",
        },
    },
    buttons: [
        {
            type: "link",
            text: "A gift they'll appreciate",
            link: registry.url,
            target: "_blank",
        },
    ],
};

// #endregion ---

// #region --- Coming Soon ---

const comingSoon = {
    page: {
        pageTitle: "Registry",
    },
} satisfies { page: ComingSoonPageContent };

// #endregion ---

// #region --- Content ---

const registryContent = {
    hero,
    registryLinks: {
        intro: registryLinksIntro,
    },
    catGift,
    comingSoon,
};

export default registryContent;

// #endregion ---
