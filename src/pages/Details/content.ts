import { AccordionsProps } from "../../components/Accordions/Accordions";
import { CopyOnlyProps } from "../../components/CopyOnly/CopyOnly";
import { MediaWithCopyProps } from "../../components/MediaWithCopy/MediaWithCopy";
import { SplitInfoProps } from "../../components/SplitInfo/SplitInfo";
import { SmallTextTagHeroProps } from "../../layout/SmallTextTagHero/SmallTextTagHero";
import { TextOnlyHeroProps } from "../../layout/TextOnlyHero/TextOnlyHero";

// ----- Hero -----------------------------------------------
// const hero: Omit<SmallTextTagHeroProps, "loaded"> = {
//     eyebrow: "The Details",
//     heading: "Your Guide to the Day",
//     body: "Everything from venue details to the evening timeline — so you arrive knowing exactly what to expect.",
//     smallTextTag1: {
//         eyebrow: "Date",
//         title: "October 31st, 2026",
//         body: "Ceremony at 5 PM",
//     },
//     smallTextTag2: {
//         eyebrow: "Location",
//         title: "Clay Theatre",
//         body: "Green Cove Springs, FL",
//     },
// };

const hero: Omit<TextOnlyHeroProps, "loaded" | "styleOptions"> = {
    eyebrow: "The Details",
    header: "Your Guide to the Day",
    body: "Everything from venue details to the evening timeline — so you arrive knowing exactly what to expect.",
    buttons: [
        {
            text: "Venue Details",
            link: "/details#venue",
            target: "_self",
        },
        {
            text: "View Timeline",
            link: "/details#timeline",
            target: "_self",
        },

        {
          text: 'FAQs',
          link: '/details#faqs',
          target: '_self'
        },
    ],
};

// ----- Summary / Venue -----------------------------------------------

// const venue: Omit<MediaWithCopyProps, "media_side" | "headingSize"> = {
//     eyebrow: "The Venue",
//   header: "The Clay Theatre",
//   subtitle: "326 Walnut St, Green Cove Springs, FL 32043",
//   body: "We are so excited to celebrate with you at The Clay Theatre, a beautifully restored historic venue nestled in downtown Green Cove Springs.",
//   buttons: [
//     {
//       text: "View Directions",
//       link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhIIARAuGEMYrwEYxwEYgAQYigUyDQgCEC4YgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyBggEEEUYOTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDE1NjRqMGo0qAIAsAIB&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KZ00Fx6y0OWIMRYGQ-r5b-pC&daddr=326+Walnut+St,+Green+Cove+Springs,+FL+32043",
//       target: "_blank",
//     },
//     {
//       text: "Transportation",
//       link: "/accommodations#transportation",
//       target: "_self",
//     },
//   ],
//   img: {
//     src: "/images/ClayTheatre.jpg",
//   },
//   note: {
//     icon: "warning",
//     title: "Rideshare warning",
//     body: "Please keep in mind that while you may be able to get an Uber or another rideshare service to the venue, we have been informed that it is very difficult to get an Uber back into Jacksonville.",
//   },
// };
const date = {
    eyebrow: "Wedding Day",
    header: "October 31st, 2026",
    body: "Saturday · Halloween",
    lowerText: {
      header: "Address",
      body: "326 Walnut St, Green Cove Springs, FL 32043"
    }
};

const venue = {
    eyebrow: "The Venue",
    header: "The Clay Theatre",
    body: "We are so excited to celebrate with you at The Clay Theatre, a beautifully restored historic venue nestled in downtown Green Cove Springs.",
    // buttons
    note: {
      icon: "warning" as const,
      body: "Getting a rideshare (ex: Uber) back to Jacksonville from the venue is very difficult. Please keep that in mind."
    }
};

const summary: SplitInfoProps = {
    solidContent: date,
    outlineContent: venue,
};

// ----- Timeline -----------------------------------------------

const timelineCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Wedding Day",
    header: "Day of Schedule",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};

const timeline = {
    copyOnly: timelineCopyOnly,
};

// ----- Dress Code -----------------------------------------------

const dressCodeCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Dress Code",
    header: "What to Wear",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};

const dressCode = {
    copyOnly: dressCodeCopyOnly,
};

// ----- Wedding Party -----------------------------------------------

const weddingPartyCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "Wedding Party",
    header: "The People Behind the Big Day",
    body: "Every great love story has an incredible supporting cast. Meet the special people who will be standing right there with us as we say I do.",
};

const weddingParty = {
    copyOnly: weddingPartyCopyOnly,
};

// ----- FAQs -----------------------------------------------

const fAQsCopyOnly: Omit<CopyOnlyProps, "styleOptions" | "className"> = {
    eyebrow: "FAQs",
    header: "Frequently Asked Questions",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
};

const fAQItemsAccordions: Omit<AccordionsProps, "className"> = {
    accordions: [
        {
            question: "Are children allowed?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
        },
        {
            question: "Lorem ipsum",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
        },
    ],
};

const faqs = {
    copyOnly: fAQsCopyOnly,
    accordions: fAQItemsAccordions,
};

// ----- Content -----------------------------------------------

const detailsContent = {
    hero: hero,
    summary: summary,
    timeline: timeline,
    dressCode: dressCode,
    weddingParty: weddingParty,
    faqs: faqs,
};

export default detailsContent;
