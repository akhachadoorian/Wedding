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
    const { containerRef, textRef, headlineStyle } = useFitHeadline();

    return (
        <footer ref={containerRef}>
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

                {/* <div className="flex flex-col md:flex-row items-center md:items-stretch md:justify-between gap-400 md:gap-750 md:max-w-(--max-width) md:mx-auto">
                    <div className="flex gap-400 md:gap-200">
                        <div className="flex flex-wrap items-center md:justify-between gap-200">
                            {NAV_ITEMS.map((item) => (
                                <React.Fragment key={item.text}>
                                    <LenisLink
                                        href={item.link}
                                        className="underline decoration-transparent decoration-2 underline-offset-[5px] transition-all ease-in-out duration-300 h-fit hover:decoration-cream max-md:decoration-cream"
                                    >
                                        <p className="text-s not-italic font-normal leading-[120%] tracking-[1.8px] uppercase text-cream">
                                            {item.text}
                                        </p>
                                    </LenisLink>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-400 md:gap-200">
                        <LenisLink
                            href={"/"}
                            target="_self"
                            className="underline decoration-transparent decoration-2 underline-offset-[5px] transition-all ease-in-out duration-300 h-fit hover:decoration-cream max-md:decoration-cream"
                        >
                            <p className="body-xs text-s not-italic font-normal leading-[120%] tracking-[1.8px] uppercase text-cream">
                                alexmaxwedding.com
                            </p>
                        </LenisLink>
                    </div>
                </div> */}
            </div>
        </footer>
    );
}
