"use client";

import React from "react";
import { NAV_ITEMS } from "@/data/navItems";
import { LenisLink } from "@/hooks/LenisLink";
import { useFitHeadline } from "@/hooks/useFitHeadline";
import ColumnRow from "@/components/ColumnRow";
import { ColumnLink } from "@/components/Column";
import { NonEmptyArray } from "@/types/utility";

function toNavLink(item: (typeof NAV_ITEMS)[number]): ColumnLink {
    return {
        text: item.text,
        link: item.link,
    };
}

// Footer-only: tints the links (and their hover underline, via decoration-current) cream.
const FOOTER_NAV_LINK_CLASSES = "text-cream";

export default function Footer({}) {
    const { containerRef, textRef, headlineStyle } = useFitHeadline({
        lineHeight: 1,
    });

    return (
        <footer ref={containerRef} className="mt-section-padding">
            <h6
                className="bg-linear-to-b from-black-bg from-[-17.74%] to-cabernet to-[77.34%] bg-clip-text text-transparent text-center -mb-20"
                ref={textRef}
                style={headlineStyle}
            >
                Till Death
            </h6>

            <div className="bg-cabernet px-col-margin py-500">
                <ColumnRow
                    columnOne={{
                        orientation: "left",
                        links: NAV_ITEMS.slice(0, 2).map(
                            toNavLink,
                        ) as NonEmptyArray<ColumnLink>,
                        linksClassName: FOOTER_NAV_LINK_CLASSES,
                    }}
                    columnTwo={{
                        orientation: "center",
                        lines: [
                            "Saturday, October 31st",
                            "Ceremony Starts at 5pm",
                        ],
                    }}
                    columnThree={{
                        orientation: "right",
                        links: NAV_ITEMS.slice(2, 4).map(
                            toNavLink,
                        ) as NonEmptyArray<ColumnLink>,
                        linksClassName: FOOTER_NAV_LINK_CLASSES,
                    }}
                    styleOptions={{ includeStars: true, starColor: "--cream" }}
                    threshold={0}
                />
            </div>
        </footer>
    );
}
