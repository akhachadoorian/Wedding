import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useLenis } from "../../../context/LenisContext";
import { NAV_ITEMS } from "../../../data/navItems";
import type { NavItem, NavDropdown } from "../../../types/navigation";
import ArrowBox from "../../ArrowBox/ArrowBox";
import { CaretDownIcon, ListIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

import "./Navigation.scss";

function renderNavItem(item: NavItem, onNavigate: () => void, openDropdown: string | null, toggleDropdown: (name: string) => void, closeDropdown: () => void) {
    if (item.kind === "dropdown") {
        const isOpen = openDropdown === item.text;

        return (
            <div className="nav-dropdown" onMouseEnter={() => toggleDropdown(item.text)} onMouseLeave={closeDropdown}>
                <Link to={item.link} className={`nav-link has-dropdown ${isOpen ? "open" : ""}`} onClick={onNavigate}>
                    <p className="nav-text">{item.text}</p>
                    <div className={`caret-wrapper ${isOpen ? "open" : ""}`}>
                        <CaretDownIcon color="var(--cream-500)" size={16} />
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <Link to={item.link} className="nav-link" onClick={onNavigate}>
            <p className="nav-text">{item.text}</p>
        </Link>
    );
}

function renderDropdown(item: NavDropdown, onNavigate: () => void, isOpen: boolean, onMouseEnter: () => void, onMouseLeave: () => void) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }}>
                    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`dropdown ${isOpen ? "open" : ""}`} id={`dd-${item.text}`}>
                        <div className="dropdown-inner">
                            {item.children.map((child) => (
                                <Link key={child.link} to={child.link} className="dd-link" onClick={onNavigate}>
                                    <div className="dd-text_wrapper">
                                        <p className="dd-text">{child.text}</p>

                                        <ArrowBox />
                                    </div>

                                    {child.body && <p className="dd-body body-xs">{child.body}</p>}
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function renderMobileNavItem(item: NavItem, onNavigate: () => void, openAccordions: Set<string>, toggleAccordion: (name: string) => void) {
    if (item.kind === "dropdown") {
        const isOpen = openAccordions.has(item.text);

        return (
            <div className="mobile_nav-dropdown_wrapper">
                <div className={`mobile_nav-link ${isOpen ? "open" : ""}`} onClick={() => toggleAccordion(item.text)}>
                    <p className="nav-text eyebrow">{item.text}</p>
                    <div className={`caret-wrapper ${isOpen ? "open" : ""}`}>
                        <CaretDownIcon color="var(--cream-500)" size={18} />
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }}>
                            <div className={`mobile_nav-dropdown ${isOpen ? "open" : ""}`}>
                                <Link to={item.link} className="mobile_nav-view_page" onClick={onNavigate}>
                                    <p className="mobile_nav-text eyebrow">View Page</p>

                                    <ArrowBox color="--gold-500" />
                                </Link>

                                {item.children.map((child) => (
                                    <Link key={child.link} to={child.link} className="mdd-link" onClick={onNavigate}>
                                        <div className="mdd-text_wrapper">
                                            <p className="mdd-text eyebrow">{child.text}</p>
                                            {child.body && <p className="mdd-body body-xs">{child.body}</p>}
                                        </div>

                                        <ArrowBox />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <Link to={item.link} className="mobile_nav-link" onClick={onNavigate}>
            <p className="mobile_nav-text eyebrow">{item.text}</p>

            <ArrowBox />
        </Link>
    );
}

function Navigation() {
    const { pathname } = useLocation();
    const navClass = pathname === "/" ? "nav-home" : "nav-default";

    // Handle scrolling
    const lenis = useLenis();

    const scrollToBlockById = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;
        lenis ? lenis.scrollTo(element, { offset: 0, duration: 1.4 }) : element.scrollIntoView({ behavior: "smooth" });
    };

    // Handle mobile menu open and closing
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("mobile-nav-open", mobileOpen);
        mobileOpen ? lenis?.stop() : lenis?.start();
        return () => {
            document.body.classList.remove("mobile-nav-open");
            lenis?.start();
        };
    }, [mobileOpen, lenis]);

    const closeMenu = () => {
        setMobileOpen(false);
        setOpenDropdown(null);
    };

    const [openMobileAccordions, setOpenMobileAccordions] = useState<Set<string>>(new Set());
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

    return (
        <header className={navClass}>
            <div className={`navigation-wrapper ${mobileOpen ? "mobile_nav_open" : null}`}>
                <div className="navigation-upper">
                    <Link to={"/"} className="navigation-left">
                        <p className="nav-letter">M</p>
                        <p className="nav-and">&</p>
                        <p className="nav-letter">A</p>
                    </Link>

                    <nav className="desktop">
                        {NAV_ITEMS.map((item) => (
                            <React.Fragment key={item.text}>{renderNavItem(item, closeMenu, openDropdown, toggleDropdown, closeDropdown)}</React.Fragment>
                        ))}
                    </nav>

                    <ListIcon id="mobile_nav_btn" size={20} color="var(--cream-500)" onClick={() => setMobileOpen(!mobileOpen)} style={{ cursor: "pointer" }} />
                </div>

                <div className="dropdowns">
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
                </div>
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

export default Navigation;
