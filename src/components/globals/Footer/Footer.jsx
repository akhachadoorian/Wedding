import React from "react";
import { Link } from "react-router-dom";
import { useLenis } from "../../../context/LenisContext";
import { NAV_ITEMS } from "../../../constants/navItems";

import './Footer.scss';

function Footer({}) {
    const lenis = useLenis();

    const scrollToBlockById = (id) => {
        const element = document.getElementById(id);
        if (!element) return;

        lenis ? lenis.scrollTo(element, { offset: 0, duration: 1.4 }) : element.scrollIntoView({ behavior: "smooth" }); // fallback just in case
    };

    return (
        <footer>
            <div className="footer-wrapper">
                <div className="footer-left">
                    <h5 className="heading_xl">
                        Lets celebrate <span className="gold-italic">together</span>
                    </h5>
                </div>
                <div className="footer-right">
                    {NAV_ITEMS.map((n, idx) => (
                        <React.Fragment key={idx}>
                            <Link
                                to={n.link || "/"}
                                className="footer-link"
                                onClick={(e) => {
                                    if (!n.link && n.scrollId) {
                                        e.preventDefault();
                                        scrollToBlockById(n.scrollId);
                                    }
                                }}
                            >
                                <p>{n.text}</p>
                            </Link>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
