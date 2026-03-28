import React from "react";

import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";

function Navigation({}) {
    const scrollToBlockById = (id) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const nav_elements = [
        {
            text: "Timeline",
            link: "",
            scrollToBlockById: "",
        },
        {
            text: "Accommodations",
            link: "",
            scrollToBlockById: "",
        },
        {
            text: "FAQs",
            link: "",
            scrollToBlockById: "",
        },
        {
            text: "Registry",
            link: "",
            scrollToBlockById: "",
        },
        {
            text: "RSVP",
            link: "",
            scrollToBlockById: "",
        },
    ];

    const num_elements = nav_elements.length;

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
        <div className="navigation-wrapper">
            <a href="/" className="">
                <img src={Logo} alt="M and A separated by an ampersand" />
            </a>

            <nav className="">
                {nav_elements.map((n, idx) => (
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
                        {idx < nav_elements.length - 1 && <DiamondSVG />}
                    </React.Fragment>
                ))}
            </nav>
        </div>
    );
}

export default Navigation;
