import React, { useLayoutEffect, useRef } from "react";

import gsap from "gsap";

import "./Marquee.scss";

const MARQUEE_TEXT = ["Max & Alex", "October 31st, 2026", "Halloween", "5 PM - 10:30 PM", "The Clay Theatre", "Green Cove Springs, Florida"];

const SolidDiamond = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.19994 0L14.3999 7.2L7.19994 14.4L-6.10352e-05 7.2L7.19994 0Z" fill="#E6E2DA" />
    </svg>
);

export default function Marquee() {
    const marqueeWrapperRef = useRef(null);
    const marqueeRef = useRef(null);

    const speed = 30;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                marqueeWrapperRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: "power2.out" }
            );

            gsap.to(marqueeRef.current, {
                x: "-100%",
                repeat: -1,
                duration: speed,
                ease: "linear",
                delay: 0.5,
            });
        });
        

        return () => ctx.kill();
    }, [speed]);

    return (
        <div ref={marqueeWrapperRef} className="marquee-wrapper">
            <div ref={marqueeRef} className="marquee-inner">
                {MARQUEE_TEXT.map((text, idx) => (
                    <div className="marquee-text" key={idx}>
                        <p className="eyebrow">{text}</p>

                        <SolidDiamond />
                    </div>
                ))}

                {MARQUEE_TEXT.map((text, idx) => (
                    <div className="marquee-text" key={idx}>
                        <p className="eyebrow">{text}</p>

                        <SolidDiamond />
                    </div>
                ))}
            </div>
        </div>
    );
}
