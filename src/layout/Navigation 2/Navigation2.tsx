"use client";

import React, { useState, useEffect } from "react";

import { NAV_ITEMS } from "@/data/navItems";
import type { NavItem, NavDropdown } from "@/types/navigation";
import ArrowBox from "@/components/ArrowBox/ArrowBox";
import { CaretDownIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import "./Navigation2.scss";
import { LenisLink } from "@/hooks/LenisLink";
import { useLenis } from "lenis/react";

function renderNavItem(
    item: NavItem,
    onNavigate: () => void,
    openDropdown: string | null,
    toggleDropdown: (name: string) => void,
    closeDropdown: () => void,
) {
    if (item.kind === "dropdown") {
        const isOpen = openDropdown === item.text;

        return (
            <div
                className="nav-dropdown"
                onMouseEnter={() => toggleDropdown(item.text)}
                onMouseLeave={closeDropdown}
            >
                <LenisLink
                    href={item.link}
                    className={`nav-link has-dropdown ${isOpen ? "open" : ""}`}
                    onClick={onNavigate}
                >
                    <p className="nav-text">{item.text}</p>
                    <div className={`caret-wrapper ${isOpen ? "open" : ""}`}>
                        <CaretDownIcon color="var(--cream-500)" size={16} />
                    </div>
                </LenisLink>
            </div>
        );
    }

    return (
        <LenisLink href={item.link} className="nav-link" onClick={onNavigate}>
            <p className="nav-text">{item.text}</p>
        </LenisLink>
    );
}

function renderDropdown(
    item: NavDropdown,
    onNavigate: () => void,
    isOpen: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    style={{ overflow: "hidden" }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className={`dropdown ${isOpen ? "open" : ""}`}
                        id={`dd-${item.text}`}
                    >
                        <div className="dropdown-inner">
                            {item.children.map((child) => (
                                <LenisLink
                                    key={child.link}
                                    href={child.link}
                                    className="dd-link"
                                    onClick={onNavigate}
                                >
                                    <div className="dd-text_wrapper">
                                        <p className="dd-text">{child.text}</p>

                                        <ArrowBox />
                                    </div>

                                    {child.body && (
                                        <p className="dd-body body-xs">
                                            {child.body}
                                        </p>
                                    )}
                                </LenisLink>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function renderMobileNavItem(
    item: NavItem,
    onNavigate: () => void,
    openAccordions: Set<string>,
    toggleAccordion: (name: string) => void,
) {
    if (item.kind === "dropdown") {
        const isOpen = openAccordions.has(item.text);

        return (
            <div className="mobile_nav-dropdown_wrapper">
                <div
                    className={`mobile_nav-link ${isOpen ? "open" : ""}`}
                    onClick={() => toggleAccordion(item.text)}
                >
                    <p className="nav-text eyebrow">{item.text}</p>
                    <div className={`caret-wrapper ${isOpen ? "open" : ""}`}>
                        <CaretDownIcon color="var(--cream-500)" size={18} />
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div
                                className={`mobile_nav-dropdown ${isOpen ? "open" : ""}`}
                            >
                                <LenisLink
                                    href={item.link}
                                    className="mobile_nav-view_page"
                                    onClick={onNavigate}
                                >
                                    <p className="mobile_nav-text eyebrow">
                                        View Page
                                    </p>

                                    <ArrowBox color="--gold-500" />
                                </LenisLink>

                                {item.children.map((child) => (
                                    <LenisLink
                                        key={child.link}
                                        href={child.link}
                                        className="mdd-link"
                                        onClick={onNavigate}
                                    >
                                        <div className="mdd-text_wrapper">
                                            <p className="mdd-text eyebrow">
                                                {child.text}
                                            </p>
                                            {child.body && (
                                                <p className="mdd-body body-xs">
                                                    {child.body}
                                                </p>
                                            )}
                                        </div>

                                        <ArrowBox />
                                    </LenisLink>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <LenisLink
            href={item.link}
            className="mobile_nav-link"
            onClick={onNavigate}
        >
            <p className="mobile_nav-text eyebrow">{item.text}</p>

            <ArrowBox />
        </LenisLink>
    );
}

export default function Navigation2() {
    const lenis = useLenis();

    // Handle mobile menu open and closing
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("mobile-nav-open", mobileOpen);
        // mobileOpen ? lenis?.stop() : lenis?.start();
        return () => {
            document.body.classList.remove("mobile-nav-open");
            lenis?.start();
        };
    }, [mobileOpen, lenis]);

    const closeMenu = () => {
        setMobileOpen(false);
        setOpenDropdown(null);
    };

    const [openMobileAccordions, setOpenMobileAccordions] = useState<
        Set<string>
    >(new Set());
    const toggleMobileAccordion = (name: string) => {
        setOpenMobileAccordions((prev) => {
            const next = new Set(prev);
            next.has(name) ? next.delete(name) : next.add(name);
            return next;
        });
    };

    // Handle dropdown open and closing
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const closeDropdown = () => setOpenDropdown(null);

    const toggleDropdown = (name: string) => {
        setOpenDropdown((prev) => (prev === name ? null : name));
    };

    let halfIndex = Math.ceil(NAV_ITEMS.length / 2);
    let nav_left = [];
    let nav_right = [];

    for (let i = 0; i < halfIndex; i++) {
        nav_left.push(NAV_ITEMS[i])
    }

    for (let i = halfIndex; i < NAV_ITEMS.length; i++) {
        nav_right.push(NAV_ITEMS[i])
    }

    return (
        <header className={""}>
            <div
                className={`navigation-wrapper ${mobileOpen ? "mobile_nav_open" : ""}`}
            >
                {/* <div className="navigation-upper"> */}

                <nav>
                    <div className="side_nav-left side_nav">
                        {nav_left.map((item) => (
                            <React.Fragment key={item.text}>
                                {renderNavItem(
                                    item,
                                    closeMenu,
                                    openDropdown,
                                    toggleDropdown,
                                    closeDropdown,
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <LenisLink href={"/"} className="nav-logo">
                        <Image src="/assets/AM.svg" alt="A and M monogram" width={95} height={87} priority={true} />

                    </LenisLink>

                    <div className="side_nav-right side_nav">
                        {nav_right.map((item) => (
                            <React.Fragment key={item.text}>
                                {renderNavItem(
                                    item,
                                    closeMenu,
                                    openDropdown,
                                    toggleDropdown,
                                    closeDropdown,
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className={`mobile_nav_btn ${mobileOpen ? 'mobile_open': ''}`} id="mobile_nav_btn" onClick={() => setMobileOpen(!mobileOpen)}>
                        <div className="mobile_nav_btn-line"></div>
                    </div>
                </nav>

                {/* </div> */}

                {/* <div className="dropdowns">
                    {NAV_ITEMS.filter((item): item is NavDropdown => item.kind === "dropdown").map((item) => (
                        <React.Fragment key={item.text}>
                            {renderDropdown(
                                item,
                                closeMenu,
                                openDropdown === item.text,
                                () => toggleDropdown(item.text),
                                () => setOpenDropdown(null),
                            )}
                        </React.Fragment>
                    ))}
                </div> */}
            </div>

            <div className={mobileOpen ? "mobile_nav-wrapper open" : "mobile_nav-wrapper"}>
                <div className="mobile_nav-inner">
                    {NAV_ITEMS.map((item) => (
                        <React.Fragment key={item.text}>{renderMobileNavItem(item, closeMenu, openMobileAccordions, toggleMobileAccordion)}</React.Fragment>
                    ))}
                </div>
            </div>
        </header>
    );
}
