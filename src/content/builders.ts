import { CardGridProps } from "@/components/CardGrid/CardGrid";
import { LinkButtonSettings } from "@/types/buttons";
import { Icon } from "@phosphor-icons/react";
import { IMAGES } from "./images";
import { Hotel, hotelAddress } from "./hotels";
import { HeroContent } from "./types";

/** Link button with the arrow decoration. External URLs open in a new tab. */
export function arrowLink(text: string, link: string): LinkButtonSettings {
    return {
        type: "link",
        text,
        link,
        target: link.startsWith("http") ? "_blank" : "_self",
        decoration: { type: "arrow" },
    };
}

/** Link button with an icon decoration. External URLs open in a new tab. */
export function iconLink(text: string, link: string, icon: Icon): LinkButtonSettings {
    return {
        type: "link",
        text,
        link,
        target: link.startsWith("http") ? "_blank" : "_self",
        decoration: { type: "icon", icon },
    };
}

/** Standard page hero image (the dip shot) with the shared crop. */
export const heroImage: HeroContent["image"] = {
    ...IMAGES.dipShot,
    imgPositionResponsive: {
        desktop: "center 25%",
        mobile: "35% center",
    },
};

/** Card that opens a modal with the hotel's address, booking link and group code. */
export function hotelCard(key: string, hotel: Hotel): CardGridProps["cards"][number] {
    return {
        text: {
            title: hotel.name,
            body: hotelAddress(hotel),
        },
        cardType: {
            type: "modal",
            modalSettings: {
                modalID: `${key}-modal`,
                modalContent: {
                    header: hotel.name,
                    content: [
                        {
                            title: "Address",
                            body: hotelAddress(hotel),
                            button: {
                                text: "book now",
                                link: hotel.bookingUrl,
                                target: "_blank",
                            },
                        },
                        {
                            title: "Group Code",
                            body: hotel.groupCode,
                        },
                    ],
                },
            },
        },
    };
}
