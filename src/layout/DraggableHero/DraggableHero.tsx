import { useEffect, useRef } from "react";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ThreeButtons } from "../../components/Buttons/ButtonGroups";
import Drinks from "../../components/Drinks/Drinks";
import Eyebrow from "../../components/Eyebrow/Eyebrow";
import { ThreeButtonsArray } from "../../types/buttons";

import { DrinkConfig } from "../../components/Drinks/drinks.type";
import { NonEmptyArray } from "../../types/utility";
import "./DraggableHero.scss";

gsap.registerPlugin(Draggable);

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

type DraggableHeroProps = {
    loaded: boolean;

    // Fields
    drinks?: NonEmptyArray<DrinkConfig>;
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
};


export default function DraggableHero({ loaded, drinks = DEFAULT_DRINKS, eyebrow, header, subtitle, body, buttons }: DraggableHeroProps) {
    const drinksRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const instances = drinks.map((drink, i) => {
            const el = drinksRefs.current[i];
            if (!el) return null;

            const pos = window.matchMedia("(min-width: 750px)").matches ? drink.desktopPosition : drink.mobilePosition;
            gsap.set(el, { x: pos.x, y: pos.y, rotation: pos.rotate });

            const [d] = Draggable.create(el, {
                type: "x,y",
                // type: 'rotation',
                bounds: sectionRef.current ?? undefined,
                edgeResistance: 0.65,
                zIndexBoost: false,
                onPress() {
                    gsap.to(el, { scale: 1.05, duration: 0.2, ease: "power2.out" });
                },
                onRelease() {
                    gsap.to(el, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
                },
            });
            return d;
        });

        return () => { instances.forEach((d) => { d?.kill(); }); };
    }, []);

    return (
        <section ref={sectionRef} className={`draggable_hero-section`}>
            <div className="draggable_hero-wrapper">
                <div className="draggable_hero ">
                    {eyebrow && <Eyebrow className={"draggable_hero-eyebrow"} text={eyebrow} styleOptions={{ variation: "left" }} />}

                    <h1 className="draggable_hero-header">{header}</h1>

                    {subtitle && <p className="subtitle draggable_hero-subtitle">{subtitle}</p>}

                    {body && <p className="draggable_hero-body body-l">{body}</p>}

                    {buttons && <ThreeButtons className="draggable_hero-btns btns" buttons={buttons ?? []} />}
                </div>

                {drinks.map((drink, i) => (
                    <div
                        key={drink.type}
                        ref={(el) => { drinksRefs.current[i] = el; }}
                        className="draggable_hero-drink"

                    >
                        <Drinks type={drink.type} size={DEFAULT_DRINK_SIZE} />
                    </div>
                ))}
            </div>
        </section>
    );
}
