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
            <div className="footer-upper footer-group">
                <LenisLink href={"/"} className="footer-upper-logo">
                    <Image
                        src="/assets/AM.svg"
                        alt="A & M logo"
                        width={306}
                        height={280}
                        className="footer-upper-logo-img"
                    />
                </LenisLink>

                <div className="footer-upper-line" />

                <div className="footer-upper-text">
                    <h6 className="footer-upper-text-header">Lets celebrate together</h6>

                    <div className="footer-upper-text-group">
                        <p className="body-s">
                            October 31st, 2026 <br />
                            Ceremony at 5pm
                        </p>
                        <p className="body-s">
                            The Clay Theatre <br />
                            Jacksonville, Fl
                        </p>
                    </div>
                </div>

                <div className="footer-upper-line" />

                <div className="footer-upper-nav">
                    {NAV_ITEMS.map((item) => (
                        <React.Fragment key={item.text}>
                            <LenisLink
                                href={item.link}
                                className="footer-upper-nav-link"
                            >
                                <p className="">{item.text}</p>
                            </LenisLink>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="footer-lower footer-group">
                <div className="footer-lower-links">
                    <LenisLink
                        href={"/"}
                        target="_self"
                        className="footer-lower-link"
                    >
                        <p className="body-xs">alexmaxwedding.com</p>
                    </LenisLink>

                    <LenisLink
                        href={"https://akhachadoorian.github.io/Resume/"}
                        target="_blank"
                        className="footer-lower-link"
                    >
                        <p className="body-xs">
                            Designed & Developed by Alex Khachadoorian
                        </p>
                    </LenisLink>
                </div>
                {/* <div className="footer-lower-lg_text-wrapper">  */}
          {/* TODO: fix */}
                <div className="footer-lower-lg_text">
                    <h6 className="">Til</h6>
                    <h6 className="">Death</h6>
                </div>
                {/* </div> */}
            </div>
        </footer>
    );
}
