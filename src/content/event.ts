/**
 * Single source of truth for wedding facts.
 *
 * Any date, time, place or link that appears on more than one page lives here —
 * change it once and every page picks it up.
 */

const mapsUrl = (destination: string) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

const venueStreet = "326 Walnut St";
const venueCityStateZip = "Green Cove Springs, FL 32043";

const rehearsalPlace = "Maggiano's Little Italy";
const rehearsalArea = "St. Johns Town Center";

export const EVENT = {
    couple: {
        bride: "Alex",
        groom: "Max",
    },

    wedding: {
        weekday: "Saturday",
        date: "October 31st",
        year: "2026",
        doorsOpen: "4:30 PM",
        ceremony: "5:00 PM",
        /** Compact form for tight spaces like the home hero. */
        ceremonyShort: "5pm",
        cocktailHour: "5:30 PM",
        reception: "6:30 PM",
        end: "11:00 PM",
    },

    venue: {
        name: "The Clay Theatre",
        shortName: "Clay Theatre",
        city: "Green Cove Springs, FL",
        /** Compact form for tight spaces like the home hero. */
        cityShort: "Green Cove, FL",
        street: venueStreet,
        cityStateZip: venueCityStateZip,
        mapsUrl: mapsUrl(`${venueStreet}, ${venueCityStateZip}`),
    },

    rehearsal: {
        weekday: "Friday",
        date: "October 30th",
        start: "8:30 PM",
        end: "10:30 PM",
        place: rehearsalPlace,
        area: rehearsalArea,
        mapsUrl: mapsUrl(
            `${rehearsalPlace}, 10367 Mid Town Pkwy, Jacksonville, FL 32246`,
        ),
    },

    rsvp: {
        deadline: "October 1st",
    },

    dressCode: {
        name: "Black Tie Optional",
        ladies: "Floor-Length Gowns",
        gentlemen: "Tuxedo or Dark Formal Suit",
    },

    registry: {
        url: "https://www.zola.com/registry/maxandalexoctober31",
        honeymoonFundUrl:
            "https://www.zola.com/registry/collection-item/6a3b3c84a5548d58919a7165",
    },
} as const;
