import React from "react";
import { Link } from "react-router-dom";

import { useLenis } from "../../../context/LenisContext";
import { NAV_ITEMS } from "../../../data/navItems";
import Diamond from "../../Diamond/Diamond";
import Eyebrow from "../../Eyebrow/Eyebrow";
import SmallText from "../../SmallText/SmallText";

// import { NAV_ITEMS } from "../../../constants/navItems";

import "./Footer.scss";
import Marquee from "../../Marquee/Marquee";
import { useFadeIn } from "../../../hooks/useFadeIn";

function Footer({}) {
    const footerRef = useFadeIn<HTMLDivElement>();


    // Handle scrolling
    const lenis = useLenis();
    const scrollToBlockById = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;
        lenis ? lenis.scrollTo(element, { offset: 0, duration: 1.4 }) : element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer ref={footerRef}>
            <Marquee />
            <div className="footer-wrapper">
                <div className="footer-upper">
                    <div className="footer-left">
                        <Eyebrow variation="left" color="--gold-500" text="October 31st, 2026" />

                        <h5 className="heading-xl">
                            Lets celebrate <span className="gold-italic">together</span>
                        </h5>

                        <div className="footer-nav">
                            {NAV_ITEMS.map((item) => (
                                <React.Fragment key={item.text}>
                                    <Link to={item.link} className="footer-link">
                                        <p className="nav-text">{item.text}</p>
                                    </Link>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="footer-right">
                        <SmallText eyebrow="Date" title="October 31st, 2026" body="Ceremony at 5pm" variation="right"  mobileVariation="left"/>

                        <div className="art_deco_div">
                            {/* <Diamond className="tablet_only" color="--gold-500" /> */}

                            <div className="div_line"></div>

                            <Diamond color="--gold-500" />
                        </div>

                        <SmallText eyebrow="Location" title="Clay Theatre" body="Green Cove Springs, FL" variation="right"  mobileVariation="left" />
                    </div>
                </div>

                <div className="footer-lower">
                    <Link to={"/"} className="">
                        <p className="">alexmaxwedding.com</p>
                    </Link>

                    <p>Designed & Developed by Alex</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
