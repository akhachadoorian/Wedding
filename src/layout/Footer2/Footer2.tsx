"use client";

import React from "react";

import { NAV_ITEMS } from "@/data/navItems";
import { LenisLink } from "@/hooks/LenisLink";

import Image from "next/image";
import "./Footer2.scss";

export default function Footer2({}) {
    // const footerRef = useFadeIn<HTMLDivElement>();

    // Handle scrolling
    // const lenis = useLenis();
    // const scrollToBlockById = (id: string) => {
    //     const element = document.getElementById(id);
    //     if (!element) return;
    //     lenis ? lenis.scrollTo(element, { offset: 0, duration: 1.4 }) : element.scrollIntoView({ behavior: "smooth" });
    // };

    return (
        <footer>
            <div className="footer-upper footer-group">
                <LenisLink href={"/"}>
                    <Image
                        src="/assets/AM.svg"
                        alt="A & M logo"
                        width={306}
                        height={280}
                        className="footer-upper-logo"
                    />
                </LenisLink>

                <div className="footer-upper-text">
                    <h6 className="heading-l">Lets celebrate together</h6>

                    <div className="footer-upper-text-group">
                        <p className="">
                            October 31st, 2026 <br />
                            Ceremony at 5pm
                        </p>
                        <p>
                            The Clay Theatre <br />
                            Jacksonville, Fl
                        </p>
                    </div>
                </div>

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
                <div className="footer-lower-lg_text">
                    <h6 className="">Til</h6>
                    <h6 className="">Death</h6>
                </div>
            </div>
        </footer>
    );
}
