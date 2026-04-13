import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useLenis } from "../../../context/LenisContext";
import { NAV_ITEMS } from "../../../data/navItems";
import type { NavItem, NavDropdown } from "../../../types/navigation";
import { ListIcon, XIcon } from "@phosphor-icons/react";

import "./Navigation.scss";

function renderNavItem(item: NavItem, onNavigate: () => void, openDropdown: string | null, toggleDropdown: (name: string) => void, closeDropdown: () => void) {
    if (item.kind === "dropdown") {
        const isOpen = openDropdown === item.text;

        return (
            <div className="nav-dropdown" onMouseEnter={() => toggleDropdown(item.text)} onMouseLeave={closeDropdown}>
                <Link to={item.link} className={`nav-link has-dropdown ${isOpen ? "open" : ""}`} onClick={onNavigate}>
                    <p className="nav-text">{item.text}</p>
                    <div className={`caret-wrapper ${isOpen ? "open" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                            <path d="M11.5324 0.907405L6.2199 6.2199C6.17057 6.2693 6.11198 6.30848 6.04748 6.33522C5.98299 6.36195 5.91386 6.37571 5.84405 6.37571C5.77423 6.37571 5.7051 6.36195 5.64061 6.33522C5.57612 6.30848 5.51752 6.2693 5.46819 6.2199L0.155686 0.907405C0.0560019 0.807721 0 0.67252 0 0.531545C0 0.390571 0.0560019 0.25537 0.155686 0.155686C0.25537 0.0560016 0.390571 0 0.531545 0C0.67252 0 0.807721 0.0560016 0.907405 0.155686L5.84405 5.09299L10.7807 0.155686C10.83 0.106327 10.8886 0.0671739 10.9531 0.0404612C11.0176 0.0137486 11.0867 0 11.1565 0C11.2263 0 11.2955 0.0137486 11.36 0.0404612C11.4244 0.0671739 11.483 0.106327 11.5324 0.155686C11.5818 0.205044 11.6209 0.263642 11.6476 0.328132C11.6743 0.392622 11.6881 0.461742 11.6881 0.531545C11.6881 0.601349 11.6743 0.670469 11.6476 0.734959C11.6209 0.799449 11.5818 0.858046 11.5324 0.907405Z" fill="#E6E2DA" />
                        </svg>
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
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`dropdown ${isOpen ? "open" : ""}`} id={`dd-${item.text}`}>
            <div className="dropdown-inner">
                {item.children.map((child) => (
                    <Link key={child.link} to={child.link} className="nav-link dd-link" onClick={onNavigate}>
                        <p className="nav-text">{child.text}</p>

                        {child.body && <p className="dd-body body-xs">{child.body}</p>}
                    </Link>
                ))}
            </div>
        </div>
    );
}

function Navigation() {
    const { pathname } = useLocation();
    const navClass = pathname === "/" ? "nav-home" : "nav-default";

    // Handle mobile menu open and closing
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeMenu = () => {
        setMobileOpen(false);
        setOpenDropdown(null);
    };

    // Handle dropdown open and closing
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const closeDropdown = () => setOpenDropdown(null);

    const toggleDropdown = (name: string) => {
        setOpenDropdown((prev) => (prev === name ? null : name));
    };

    // Handle scrolling
    const lenis = useLenis();
    const scrollToBlockById = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;
        lenis ? lenis.scrollTo(element, { offset: 0, duration: 1.4 }) : element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header className={navClass}>
            <div className="navigation-wrapper">
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

                    <ListIcon id="mobile_nav_btn" size={40} color="var(--cream-500)" onClick={() => setMobileOpen(true)} style={{ cursor: "pointer" }} />
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

            {/* <div className={mobileOpen ? "mobile_nav-wrapper open" : "mobile_nav-wrapper"}>
        <div className="mobile_nav-inner">
          <XIcon
            className="close_icon"
            size={40}
            color="var(--cream-500)"
            onClick={closeMenu}
            style={{ cursor: "pointer" }}
          />
          <nav className="mobile_nav">
            {NAV_ITEMS.map((item) => (
              <React.Fragment key={item.text}>
                {renderNavItem(item, closeMenu)}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div> */}
        </header>
    );
}

export default Navigation;
