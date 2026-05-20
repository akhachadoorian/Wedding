import { PropsWithChildren, useEffect, useRef } from "react";

import Drinks from "../../components/Drinks/Drinks";
import { DrinkConfig, DrinkConfig2 } from "../../components/Drinks/drinks.type";
import { WithHTMLProps } from "../../types/props";
import { NonEmptyArray } from "../../types/utility";
import gsap from "gsap";

import "./ParallaxingDrinkSection.scss";
import generateSectionClass from "../../hooks/generateSectionClass";

// #region --- Default Drinks -----------------------------

// const DEFAULT_DRINKS: NonEmptyArray<DrinkConfig> = [
//     {
//         type: "martini",
//         desktopPosition: { x: "0vw", y: "-5vh", rotate: 30 },
//         mobilePosition: { x: 0, y: 0, rotate: 30 },
//     },
//     {
//         type: "wine",
//         desktopPosition: { x: "2vw", y: 0, rotate: -30 },
//         mobilePosition: { x: 0, y: 0, rotate: -30 },
//     },
//     {
//         type: "highball",
//         desktopPosition: { x: "-3.5vw", y: "80vh", rotate: -25 },
//         mobilePosition: { x: "-8vw", y: "80vh", rotate: -25 },
//     },
// ];
// TODO: mobile
const DEFAULT_DRINKS: NonEmptyArray<DrinkConfig2> = [
    {
        type: "martini",
        desktopPosition: { top: "-5%", left: 0, rotate: 30 },
        mobilePosition: { top: "-5%", left: 0, rotate: 30 },
    },
    {
        type: "wine",
        desktopPosition: { top: '15%', left: '10%', rotate: -30 },
        mobilePosition: { top: '15%', left: '10%', rotate: -30 },
    },
    {
        type: "highball",
        desktopPosition: { top: "80%", left: "90%", rotate: -25 },
        mobilePosition:  { top: "80%", left: "90%", rotate: -25 },
    },
];

const DEFAULT_DRINK_SIZE = {
    size: { minSize: 150, desiredSize: 225, maxSize: 275 },
};

const PARALLAX_SPEED = 60;

// #endregion ---------------------------------------------

type ParallaxingDrinkSectionProps = WithHTMLProps &
    PropsWithChildren & {
        drinks?: NonEmptyArray<DrinkConfig2>;
        sectionPrefix?: string;
    };

export default function ParallaxingDrinkSection({
    drinks = DEFAULT_DRINKS,

    sectionPrefix,

    children,
    id,
    className,
    ...htmlProps
}: ParallaxingDrinkSectionProps) {
    const drinksRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const tweens = drinks.map((drink, i) => {
            const el = drinksRefs.current[i];
            if (!el) return null;

            const pos = window.matchMedia("(min-width: 750px)").matches ? drink.desktopPosition : drink.mobilePosition;
            gsap.set(el, { top: pos.top, left: pos.left, rotation: pos.rotate, willChange: "transform" });

            return gsap.to(el, {
                y: `+=${PARALLAX_SPEED}`,
                ease: "none",
                scrollTrigger: {
                    trigger: ".parallaxing_drink-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        });

        return () => {
            tweens.forEach((t) => t?.scrollTrigger?.kill());
        };
    }, []);

    const outerClass = className && sectionPrefix ? generateSectionClass({sectionPrefix: sectionPrefix, className:className}) : className ? className : sectionPrefix ? `${sectionPrefix}-section` : '';

    return (
        <section 
            {...htmlProps} 
            id={id ? id : sectionPrefix ? sectionPrefix : ''} 
            className={`parallaxing_drink-section ${outerClass}`}
        >
            <div className="parallaxing_drink-drinks">
            {drinks.map((drink, i) => (
                    <Drinks 
                        key={drink.type} 
                        className="parallaxing_drink-drink" 
                        ref={(el) => {
                            drinksRefs.current[i] = el;
                        }}
                        type={drink.type} 
                        size={DEFAULT_DRINK_SIZE} 
                    />
            ))}
            </div>

            <div className={`parallaxing_drink-content ${sectionPrefix ?? ''}`}>{children}</div>
        </section>
    );
}
