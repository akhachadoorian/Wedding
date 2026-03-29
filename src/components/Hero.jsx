import React from "react";
import Eyebrow from "./Eyebrow";
import HeroImg from "../assets/ArchedImage.png";

function Hero({}) {
    return (
        <section className="hero-section">
            <div className="hero-wrapper">
                <div className="hero-img">
                    <div className="img_holder">
                        <img src={HeroImg} alt="" />
                    </div>
                </div>
                <div className="hero-text">
                    <Eyebrow variation="centered" color="gold" text="Saturday Oct, 31, 2026 — Halloween" />
                    <h1>
                        Alex Khachadoorian
                        <br />& Max Paluett
                    </h1>
                </div>
            </div>
        </section>
    );
}

export default Hero;
