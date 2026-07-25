"use client";

import React from "react";

import { NAV_ITEMS } from "@/data/navItems";
import { LenisLink } from "@/hooks/LenisLink";

import Image from "next/image";
import "./Footer.scss";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Footer({}) {
    const footerRef = useFadeIn<HTMLDivElement>();

    return (
        <footer ref={footerRef}>
            <div className="footer-group footer-group-nav">
                <div className="footer-nav">
                    {NAV_ITEMS.map((item) => (
                        <React.Fragment key={item.text}>
                            <LenisLink
                                href={item.link}
                                className="footer-link"
                            >
                                <p className="">{item.text}</p>
                            </LenisLink>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="footer-group footer-group-links">
                <LenisLink
                    href={"/"}
                    target="_self"
                    className="footer-link"
                >
                    <p className="body-xs">alexmaxwedding.com</p>
                </LenisLink> 
            </div>
        </footer>
    );
}
