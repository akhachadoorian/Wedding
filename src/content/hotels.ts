/**
 * Hotel room blocks. Used by the Accommodations page cards/modals.
 */

export type Hotel = {
    id: string;
    name: string;
    address: string;
    bookingUrl: string;
    groupCode: string;
};

export const HOTELS: Hotel[] = [
    {
        id: "homewood",
        name: "Homewood Suites",
        address: "10434 Midtown Parkway, Jacksonville, FL 32246",
        bookingUrl:
            "https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=JAXHWHW&groupCode=CHWKPW&arrivaldate=2026-10-30&departuredate=2026-11-01&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT",
        groupCode: "CHWKPW",
    },
    {
        id: "hyatt",
        name: "Hyatt Place",
        address: "4742 Town Center Parkway, Jacksonville, FL 32246",
        bookingUrl:
            "https://www.hyatt.com/shop/rooms/jaxzs?checkinDate=2026-10-30&checkoutDate=2026-11-01&rooms=1&adults=1&kids=0&corp_id=G-PAKH&accessibilityCheck=false",
        groupCode: "G-PAKH",
    },
    {
        id: "ac-hotel",
        name: "AC Hotel",
        address: "5323 Big Island Drive, Jacksonville, FL 32246",
        bookingUrl:
            "https://www.marriott.com/event-reservations/reservation-link.mi?id=1769721428537&key=GRP&app=resvlink&_branch_match_id=1523737832059623201&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi3OyczLtgdK2ALZZSCOWmaKraG5maW5kaGJkYWpsbladmqlrXtQgFpdUWpaKlB3Xnp8UlF%2BeXFqka1zRlF%2BbioAZ5DLjmAAAAA%3D",
        groupCode: "GRP",
    },
];
