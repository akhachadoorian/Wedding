import { PropsWithChildren, useEffect, useRef } from "react";

import Drinks from "../../components/Drinks/Drinks";
import { DrinkConfig } from "../../components/Drinks/drinks.type";
import { WithHTMLProps } from "../../types/props";
import { NonEmptyArray } from "../../types/utility";
import gsap from "gsap";

import "./ParallaxingDrinkSection.scss";

// #region --- Default Drinks -----------------------------

const DEFAULT_DRINKS: NonEmptyArray<DrinkConfig> = [
    {
        type: "martini",
        desktopPosition: { x: 0, y: 0, rotate: 0 },
        mobilePosition: { x: 0, y: 0, rotate: 0 },
    },
    {
        type: "wine",
        desktopPosition: { x: "14vw", y: "-5.5vw", rotate: 12 },
        mobilePosition: { x: "21vw", y: "11vw", rotate: 8 },
    },
    {
        type: "highball",
        desktopPosition: { x: "-3.5vw", y: "8vw", rotate: -8 },
        mobilePosition: { x: "-8vw", y: "21vw", rotate: -5 },
    },
];

const DEFAULT_DRINK_SIZE = {
    size: { minSize: 150, desiredSize: 225, maxSize: 275 },
};

// #endregion ---------------------------------------------

type ParallaxingDrinkSectionProps = WithHTMLProps & PropsWithChildren & {
    drinks?: NonEmptyArray<DrinkConfig>;
};

export default function ParallaxingDrinkSection({ 
    drinks = DEFAULT_DRINKS,

    children, 
    className, 
    ...htmlProps }: ParallaxingDrinkSectionProps) {
    const drinksRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => { // FIXME: finish this
        const instances = drinks.map((drink, i) => {
            const el = drinksRefs.current[i];
            if (!el) return null;

            const pos = window.matchMedia("(min-width: 750px)").matches ? drink.desktopPosition : drink.desktopPosition;
            gsap.set(el, { x: pos.x, y: pos.y, rotation: pos.rotate });

            gsap.to(drink, {
                ease: "none",
                scrollTrigger: {
                    trigger: ".parallaxing_drink-section",
                    start: "top bottom", // Start when top of container hits bottom of viewport
                    end: "bottom top", // End when bottom of container leaves top of viewport
                    scrub: true, // Smoothly link to scroll
                },
            });
        });

        return () => {
            // instances.forEach((d) => {
            //     // d?.kill();
            // });
        };
    }, []);

    return (
        <section {...htmlProps} className={`parallaxing_drink-section ${className ?? ""}`}>
            {drinks.map((drink, i) => (
                <div
                    key={drink.type}
                    ref={(el) => {
                        drinksRefs.current[i] = el;
                    }}
                    className="parallaxing_drink-drink"
                >
                    <Drinks type={drink.type} size={DEFAULT_DRINK_SIZE} />
                </div>
            ))}

            <div className="parallaxing_drink">{children}</div>
        </section>
    );
}
