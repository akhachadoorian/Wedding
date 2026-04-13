import React, { useState } from "react";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/Logo.svg";
import { NAV_ITEMS } from "../../../constants/navItems";
import { useLenis } from "../../../context/LenisContext";

import './Navigation.scss';

function Navigation({}) {
    const { pathname } = useLocation();
    const navClass = pathname === "/" ? "nav-home" : "nav-default";
    
    // Handle 
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNavClick = (e, n) => {
        if (!n.link && n.scrollId) {
            e.preventDefault();
            scrollToBlockById(n.scrollId);
        }
        setMobileOpen(false); // close menu on link click
    };
    
    // Handle scrolling if using on page navigation
    const lenis = useLenis();

    const scrollToBlockById = (id) => {
        const element = document.getElementById(id);
        if (!element) return;

        lenis ? lenis.scrollTo(element, { offset: 0, duration: 1.4 }) : element.scrollIntoView({ behavior: "smooth" }); // fallback just in case
    };


    const DiamondSVG = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <g opacity="0.5" clipPath="url(#clip0_76_517)">
                <path d="M5 0.5L9.5 5L5 9.5L0.5 5L5 0.5Z" fill="#A6824A" />
            </g>
            <defs>
                <clipPath id="clip0_76_517">
                    <rect width="10" height="10" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );

    return (
        <header className={navClass}>
        {/* <header className="nav-default"> */}
            <div className="navigation-wrapper">
                <a href="/" className="">
                    <img src={Logo} alt="M and A separated by an ampersand" />
                </a>

                <nav className="desktop">
                    {NAV_ITEMS.map((n, idx) => (
                        <React.Fragment key={idx}>
                            <Link
                                to={n.link || "/"}
                                className="nav-link"
                                onClick={(e) => {
                                    if (!n.link && n.scrollId) {
                                        e.preventDefault();
                                        scrollToBlockById(n.scrollId);
                                    }
                                }}
                            >
                                <p>{n.text}</p>
                            </Link>
                            {idx < NAV_ITEMS.length - 1 && <DiamondSVG />}
                        </React.Fragment>
                    ))}
                </nav>

                <ListIcon id="mobile_nav_btn" size={40} color="var(--cream-500)" onClick={() => setMobileOpen(true)} style={{ cursor: "pointer" }} />
            </div>

            <div className={mobileOpen ? "mobile_nav-wrapper open" : "mobile_nav-wrapper"}>
                <div className="mobile_nav-inner">
                    <XIcon className="close_icon" size={40} color="var(--cream-500)" onClick={() => setMobileOpen(false)} style={{ cursor: "pointer" }} />

                    <nav className="mobile_nav">
                        {NAV_ITEMS.map((n, idx) => (
                            <React.Fragment key={idx}>
                                <Link to={n.link || "/"} className="nav-link" onClick={(e) => handleNavClick(e, n)}>
                                    <p>{n.text}</p>
                                </Link>
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Navigation;
