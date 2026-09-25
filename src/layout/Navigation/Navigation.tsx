"use client";

import React, { useState, useEffect } from "react";

import { NAV_ITEMS } from "@/data/navItems";
import type { NavItem, NavDropdown } from "@/types/navigation";
import ArrowBox from "@/components/ArrowBox/ArrowBox";
import { CaretDownIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { LenisLink } from "@/hooks/LenisLink";
import { useLenis } from "lenis/react";
import { cn } from "@/utils/cn";

const LINE_BEFORE = "before:bg-cream before:h-px before:w-[0px] before:absolute before:top-px before:left-px before:transition-all before:duration-300 before:ease-in-out hover:before:w-full";

const LINE_AFTER = "after:bg-cream after:h-px after:w-[0px] after:absolute after:bottom-px after:right-px after:transition-all after:duration-300 after:ease-in-out hover:after:w-full";

const NAV_TEXT = "font-sans text-base font-normal leading-[120%] tracking-[1.8px] uppercase text-cream transition-all duration-300 ease-in-out";

const CARET_WRAPPER = "flex items-center justify-center size-[18px] flex-[0_0_18px] aspect-square transition-all duration-300 ease-in-out";

const MOBILE_NAV_LINK = "flex justify-between gap-100 px-100 no-underline";

// Classes toggled on <body> while the mobile menu is open to lock page scroll
const BODY_LOCK_CLASSES = ["overflow-hidden", "h-svh!"];

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
                    className="no-underline"
                    onClick={onNavigate}
                >
                    <p className={NAV_TEXT}>{item.text}</p>
                    <div className={CARET_WRAPPER}>
                        <CaretDownIcon color="var(--cream-500)" size={16} />
                    </div>
                </LenisLink>
            </div>
        );
    }

    return (
        <LenisLink href={item.link} className={cn("relative py-100 no-underline", LINE_BEFORE, LINE_AFTER )} onClick={onNavigate}>
            <p className={NAV_TEXT}>{item.text}</p>
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
            <div className="py-400 border-b border-cream">
                <div
                    className={MOBILE_NAV_LINK}
                    onClick={() => toggleAccordion(item.text)}
                >
                    <p className="eyebrow text-cream">{item.text}</p>
                    <div className={cn(CARET_WRAPPER, isOpen && "rotate-180")}>
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
                                className={cn("flex flex-col gap-200 px-200 pt-200", isOpen ? "pointer-events-auto" : "pointer-events-none")}
                            >
                                <LenisLink
                                    href={item.link}
                                    className="arrow-hover flex justify-center gap-200 p-075 no-underline border-y border-gold"
                                    onClick={onNavigate}
                                >
                                    <p className="eyebrow text-gold">
                                        View Page
                                    </p>

                                    <ArrowBox color="--gold-500" />
                                </LenisLink>

                                {item.children.map((child) => (
                                    <LenisLink
                                        key={child.link}
                                        href={child.link}
                                        className="arrow-hover flex justify-between gap-400 px-100 py-200 no-underline border-b border-cream last-of-type:border-b-0"
                                        onClick={onNavigate}
                                    >
                                        <div>
                                            <p className="eyebrow">
                                                {child.text}
                                            </p>
                                            {child.body && (
                                                <p className="mt-100 text-[color:var(--cream-700)] body-xs">
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
            className={cn(MOBILE_NAV_LINK, "arrow-hover py-400 border-b border-cream")}
            onClick={onNavigate}
        >
            <p className="eyebrow text-cream">{item.text}</p>

            <ArrowBox />
        </LenisLink>
    );
}

export default function Navigation() {
    const lenis = useLenis();

    // Handle mobile menu open and closing
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        BODY_LOCK_CLASSES.forEach((c) => document.body.classList.toggle(c, mobileOpen));
        mobileOpen ? lenis?.stop() : lenis?.start();
        return () => {
            document.body.classList.remove(...BODY_LOCK_CLASSES);
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
        <header className="absolute top-0 z-100 flex justify-center w-dvw px-col-margin">
            <div className="relative z-10 w-full py-200 animate-fade-down transition-colors duration-300 ease-in-out md:mx-auto md:max-w-container">
                {/* <div className="navigation-upper"> */}

                <nav className="flex items-center justify-between gap-200">
                    <div className="hidden flex-1 items-center gap-200 md:flex">
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

                    <LenisLink href={"/"}>
                        <Image src="/assets/AM.svg" alt="A and M monogram" width={95} height={87} priority={true} className="aspect-[95/87] w-[60px] h-auto md:w-[95px]" />

                    </LenisLink>

                    <div className="hidden flex-1 items-center justify-end gap-200 md:flex">
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

                    <div className="relative size-5 aspect-square md:hidden" id="mobile_nav_btn" onClick={() => setMobileOpen(!mobileOpen)}>
                        <div
                            className={cn(
                                "absolute top-1/2 left-0 z-3 w-5 h-0.5 -translate-y-1/2 bg-cream transition-all duration-300 ease-in-out",
                                "before:absolute before:left-0 before:-top-2 before:block before:w-5 before:h-0.5 before:bg-cream before:transition-all before:duration-300 before:ease-in-out",
                                "after:absolute after:left-0 after:-bottom-2 after:block after:w-5 after:h-0.5 after:bg-cream after:transition-all after:duration-300 after:ease-in-out",
                                mobileOpen && "bg-transparent before:top-0 before:rotate-45 after:bottom-0 after:-rotate-45",
                            )}
                        ></div>
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

            <div
                className={cn(
                    "fixed top-0 left-0 z-5 w-screen h-svh bg-[var(--black-850)] transition-[opacity,translate] duration-300 ease-in-out md:hidden",
                    mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none",
                )}
            >
                <div className="flex flex-col py-1000 px-col-margin">
                    {NAV_ITEMS.map((item) => (
                        <React.Fragment key={item.text}>{renderMobileNavItem(item, closeMenu, openMobileAccordions, toggleMobileAccordion)}</React.Fragment>
                    ))}
                </div>
            </div>
        </header>
    );
}
