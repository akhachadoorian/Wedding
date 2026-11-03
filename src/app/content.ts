import { CardGridProps } from "@/components/CardGrid/CardGrid";
import { PhotoCollageProps } from "@/components/PhotoCollage";
import { WatermarkTextProps } from "@/components/WatermarkText";
import { arrowLink } from "@/content/builders";
import { EVENT } from "@/content/event";
import { IMAGES } from "@/content/images";
import { CopyContent } from "@/content/types";
import { GothHeroProps } from "@/layout/GothHero";

const { wedding, venue } = EVENT;

// #region --- Hero ---

const hero: Omit<GothHeroProps, "loaded"> = {
    img: {
        ...IMAGES.dipShot,
        imgPositionResponsive: {
            desktop: "center 25%",
            mobile: "35% center",
        },
    },
    eyebrows: {
        left: `${wedding.date}, ${wedding.year}\nCeremony at ${wedding.ceremonyShort}`,
        right: `${venue.name}\n${venue.cityShort}`,
    },
};

// #endregion ---

// #region --- Welcome ---

const welcomeWatermark: WatermarkTextProps = {
    watermarkText: wedding.date,
    subheader: "Thank you for celebrating with us",
    captions: {
        left: {
            orientation: "center",
            lines: ["Thank you for being there", "to celebrate with us"],
        },
        right: {
            orientation: "center",
            lines: ["We're so grateful", "for your love and support"],
        },
        center: {
            orientation: "center",
            lines: ["Share your favorite moments", "and see everyone else's"],
            button: arrowLink("View & Share Photos", "/photos"),
        },
    },
};

// #endregion ---

// #region --- Our Story ---

const ourStory: PhotoCollageProps = {
    header: "Our Story",
    mainImage: IMAGES.engagement,
    leftSideImages: [IMAGES.maxAlexJules, IMAGES.graduation],
    rightSideImages: [
        {
            ...IMAGES.maxHoldingBucky,
            imgPositionResponsive: {
                desktop: "center 15%",
            },
        },
        IMAGES.disney,
    ],
};

// #endregion ---

// #region --- Quick Links ---

const quickLinksIntro: CopyContent = {
    eyebrow: "quick links",
    header: "Everything you need, in one place",
};

const quickLinkCard = (
    eyebrow: string,
    title: string,
    body: string,
    link: string,
): CardGridProps["cards"][number] => ({
    text: { eyebrow, title, body },
    cardType: {
        type: "link",
        linkSettings: { link, target: "_self" },
    },
});

const quickLinksCards: CardGridProps = {
    cards: [
        quickLinkCard(
            "The Day",
            "Details",
            "Ceremony time, timeline, and what to expect on the day",
            "/details",
        ),
        quickLinkCard(
            "Accommodations",
            "Stay & Travel",
            `Hotel blocks, parking, and getting to ${venue.name}`,
            "/accommodations",
        ),
        quickLinkCard(
            "RSVP",
            "You're Invited",
            "Let us know if you are able to come!",
            "/rsvp",
        ),
    ],
};

// #endregion ---

// #region --- Content ---

const homeContent = {
    hero,
    welcome: {
        watermark: welcomeWatermark,
    },
    ourStory,
    quickLinks: {
        intro: quickLinksIntro,
        cards: quickLinksCards,
    },
};

export default homeContent;

// #endregion ---
