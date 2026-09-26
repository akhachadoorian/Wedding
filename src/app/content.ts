import { CardGridProps } from "@/components/CardGrid/CardGrid";
import { PhotoCollageProps } from "@/components/PhotoCollage";
import { WatermarkTextProps } from "@/components/WatermarkText";
import { arrowLink } from "@/content/builders";
import { EVENT } from "@/content/event";
import { IMAGES } from "@/content/images";
import { CopyContent } from "@/content/types";
import { GothHeroProps } from "@/layout/GothHero";

const { wedding, venue, rsvp } = EVENT;

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
    subheader: "We're getting married",
    captions: {
        left: {
            orientation: "center",
            lines: [venue.name, venue.city],
            button: arrowLink("View Venue Details", "/details#venue"),
        },
        center: {
            orientation: "center",
            lines: [`Doors open at ${wedding.doorsOpen}`, `Ceremony at ${wedding.ceremony}`],
            button: arrowLink("View Timeline", "/details#timeline"),
        },
        right: {
            orientation: "center",
            lines: ["RSVP by", rsvp.deadline],
            button: arrowLink("RSVP Now", "/rsvp"),
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
