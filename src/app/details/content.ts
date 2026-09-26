import { AccordionGridProps } from "@/components/Accordions";
import { FrameCardGridProps } from "@/components/CardGrid/FrameCardGrid";
import { ThreeColumnCopyProps } from "@/components/ThreeColumnCopy";
import { TimelineElementProps } from "@/components/Timeline";
import { WatermarkTextProps } from "@/components/WatermarkText";
import { arrowLink, heroImage, iconLink } from "@/content/builders";
import { EVENT } from "@/content/event";
import { parkingModalButton, rideshareNote } from "@/content/shared";
import {
    ComingSoonPageContent,
    ComingSoonSectionContent,
    CopyContent,
    HeroContent,
} from "@/content/types";
import { NonEmptyArray } from "@/types/utility";
import { MapTrifoldIcon, VanIcon } from "@phosphor-icons/react";

const { couple, wedding, venue, rehearsal, rsvp, dressCode } = EVENT;

// #region --- Hero ---

const hero: HeroContent = {
    image: heroImage,
    eyebrow: "The Details",
    header: "When & Where",
    body: "The venue, the timeline, what to wear, and the extra details around the weekend — everything you need to know.",
    buttons: [
        arrowLink("Venue Details", "/details#venue"),
        arrowLink("View Timeline", "/details#timeline"),
        arrowLink("Rehearsal Mixer Details", "/details#rehearsal"),
    ],
};

// #endregion ---

// #region --- Venue ---

const venueWatermark: WatermarkTextProps = {
    watermarkText: venue.shortName,
    subheader: "the Venue",
    captions: {
        left: {
            orientation: "center",
            lines: ["SHUTTLE SERVICE", "FOR CERTAIN HOTELS"],
            button: iconLink("Transportation", "/accommodations#transportation", VanIcon),
        },
        center: {
            orientation: "center",
            lines: [venue.street, venue.cityStateZip],
            button: iconLink("View Directions", venue.mapsUrl, MapTrifoldIcon),
        },
        right: {
            orientation: "center",
            lines: ["VENUE PARKING", "INFORMATION"],
            button: { ...parkingModalButton, text: "parking" },
        },
    },
};

// #endregion ---

// #region --- Timeline ---

const timelineIntro: CopyContent = {
    eyebrow: "Wedding Day",
    header: "Day of Schedule",
    body: "From first look to last dance — here's how our day will unfold.",
};

const timelineEvents: NonEmptyArray<TimelineElementProps> = [
    {
        time: wedding.doorsOpen,
        title: "Guest Arrival",
        body: "Arrive a little early to say hello and find your spot before things get started.",
    },
    {
        time: wedding.ceremony,
        title: "Ceremony Starts",
        body: "Please be seated as we begin the ceremony and exchange our vows.",
    },
    {
        time: wedding.cocktailHour,
        title: "Cocktail Hour",
        body: "Time to unwind. Grab a cocktail and enjoy the company.",
    },
    {
        time: wedding.reception,
        title: "Reception & Dinner",
        body: "Take your seat — dinner, toasts, and celebration are about to begin.",
    },
    {
        time: wedding.end,
        title: "Reception Ends",
        body: "That's a wrap! Thank you for dancing the night away with us.",
    },
];

// #endregion ---

// #region --- Dress Code ---

const dressCodeIntro: CopyContent = {
    eyebrow: "Dress Code",
    header: "What to Wear",
    subtitle: dressCode.name,
    body: `${dressCode.name} invites formal attire, but with a little more room to breathe than traditional black tie.`,
};

const dressCodeCards: FrameCardGridProps = {
    frameCards: [
        {
            title: "Ladies",
            subtitle: dressCode.ladies,
            body: "As the bride will be wearing black, we kindly ask that our lovely ladies avoid this color.",
        },
        {
            title: "Gentlemen",
            subtitle: dressCode.gentlemen,
            body: "Please wear a tuxedo or a dark, formal suit (black, navy, or charcoal) with a tie.",
        },
    ],
};

// #endregion ---

// #region --- FAQs ---

const faqsIntro: CopyContent = {
    eyebrow: "Frequently Asked Questions",
    header: "Got Questions?",
    body: "We've rounded up the answers to the most common questions — from attire to parking to what to expect on the day.",
};

const faqItems: AccordionGridProps = {
    accordions: [
        {
            question: "Are children allowed?",
            answer: "We love your little ones, but we've decided to keep our wedding adults-only. We hope this gives you a chance to relax and enjoy the night too!",
        },
        {
            question: "What time should I arrive?",
            answer: `Doors open to the venue at ${wedding.doorsOpen} and the ceremony starts at ${wedding.ceremony}. If you are traveling from Jacksonville, estimate 30-45 minutes for travel.`,
        },
        {
            question: "Is the ceremony and reception at the same location?",
            answer: `Yes, both the ceremony and the reception will take place at ${venue.name}. The ceremony will be in the outside courtyard and the reception will be inside the main building.`,
        },
        {
            question: "Can I bring a plus-one?",
            answer: "Please refer to your invitation — it will indicate whether a plus-one is included. If you have questions, feel free to reach out to us directly.",
        },
        {
            question: "What's the RSVP deadline?",
            answer: `Please submit your RSVP by ${rsvp.deadline} — our caterer needs a final headcount by this date. If you submit earlier, you're able to update your submission up until then.`,
        },
        {
            question: "What should I wear?",
            answer: `${dressCode.name}. Gentlemen: ${dressCode.gentlemen.toLowerCase()}. Ladies: ${dressCode.ladies.toLowerCase()} — as ${couple.bride} will be wearing black, we ask guests avoid that color.`,
        },
        {
            question: "Is there parking at the venue?",
            answer: `There are multiple parking options at the venue. If you're staying at one of our partner hotels, a shuttle will run to and from ${venue.name} — details are on the Accommodations page.`,
        },
        {
            question: "Is there a gift registry?",
            answer: "Your presence is the only gift we need. For those who've asked, we're registered — details are on the Registry page.",
            button: arrowLink("View Registry Page", "/registry"),
        },
    ],
};

// #endregion ---

// #region --- Rehearsal Mixer ---

const rehearsalColumns: ThreeColumnCopyProps = {
    header: "Rehearsal Mixer",
    body: "Join us the evening before the wedding for cocktails and light hors d'oeuvres.",
    button: arrowLink("View Directions", rehearsal.mapsUrl),
    columnContent: {
        leftCol: {
            orientation: "left",
            lines: [rehearsal.place, rehearsal.area],
        },
        centerCol: {
            orientation: "center",
            lines: [
                `${rehearsal.weekday}, ${rehearsal.date}`,
                `${rehearsal.start} - ${rehearsal.end}`,
            ],
        },
        rightCol: {
            orientation: "right",
            lines: ["Casual Dress Code", "No Need To Dress Up"],
        },
    },
};

// #endregion ---

// #region --- Coming Soon ---

const comingSoon = {
    page: {
        pageTitle: "Details",
        body: "This page will have information about the venue, the day-of timeline, FAQs and more.",
    },
    timeline: {
        eyebrow: "More to Come",
        title: "Day of Schedule coming soon!",
        body: "It will outline the general timeline for the day of.",
    },
    dressCode: {
        eyebrow: "More to Come",
        title: "Dress code coming soon!",
    },
    faqs: {
        eyebrow: "More to Come",
        title: "FAQs coming soon!",
    },
    rehearsal: {
        eyebrow: "More to Come",
        title: "Rehearsal mixer details coming soon!",
    },
} satisfies { page: ComingSoonPageContent } & Record<string, ComingSoonPageContent | ComingSoonSectionContent>;

// #endregion ---

// #region --- Content ---

const detailsContent = {
    hero,
    venue: {
        watermark: venueWatermark,
        note: rideshareNote,
    },
    timeline: {
        intro: timelineIntro,
        events: timelineEvents,
    },
    dressCode: {
        intro: dressCodeIntro,
        cards: dressCodeCards,
    },
    faqs: {
        intro: faqsIntro,
        items: faqItems,
    },
    rehearsal: {
        columns: rehearsalColumns,
    },
    comingSoon,
};

export default detailsContent;

// #endregion ---
