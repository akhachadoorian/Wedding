/**
 * Hotel room blocks. Used by the Accommodations page cards/modals.
 */

export type Hotel = {
    /** Short name used on the Accommodations cards. */
    name: string;
    /** Full name used in the RSVP form hotel options. */
    fullName: string;
    street: string;
    cityStateZip: string;
    bookingUrl: string;
    groupCode: string;
};

/**
 * Keys are stored with RSVP answers (Airtable `stayingAt`) — don't rename them.
 */
export const HOTELS = {
    homewoodSuites: {
        name: "Homewood Suites",
        fullName: "Homewood Suites By Hilton",
        street: "10434 Midtown Parkway",
        cityStateZip: "Jacksonville, FL 32246",
        bookingUrl:
            "https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=JAXHWHW&groupCode=CHWKPW&arrivaldate=2026-10-30&departuredate=2026-11-01&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT",
        groupCode: "CHWKPW",
    },
    hyattPlace: {
        name: "Hyatt Place",
        fullName: "Hyatt Place",
        street: "4742 Town Center Parkway",
        cityStateZip: "Jacksonville, FL 32246",
        bookingUrl:
            "https://www.hyatt.com/shop/rooms/jaxzs?checkinDate=2026-10-30&checkoutDate=2026-11-01&rooms=1&adults=1&kids=0&corp_id=G-PAKH&accessibilityCheck=false",
        groupCode: "G-PAKH",
    },
    acHotel: {
        name: "AC Hotel",
        fullName: "AC Hotel",
        street: "5323 Big Island Drive",
        cityStateZip: "Jacksonville, FL 32246",
        bookingUrl: 
            "https://www.marriott.com/event-reservations/reservation-link.mi?id=1769721428537&key=GRP&app=resvlink&_branch_match_id=1523737832059623201&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi3OyczLtgdK2ALZZSCOWmaKraG5maW5kaGJkYWpsbladmqlrXtQgFpdUWpaKlB3Xnp8UlF%2BeXFqka1zRlF%2BbioAZ5DLjmAAAAA%3D",
        groupCode: "GRP",
    },
} as const satisfies Record<string, Hotel>;

export type HotelKey = keyof typeof HOTELS;

export const HOTEL_KEYS = Object.keys(HOTELS) as HotelKey[];

/** One-line address, e.g. for cards and modals. */
export const hotelAddress = (hotel: Hotel) => `${hotel.street}, ${hotel.cityStateZip}`;
