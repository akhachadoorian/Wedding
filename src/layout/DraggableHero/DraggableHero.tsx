import { useEffect, useRef } from "react";

import { ThreeButtons } from "../../components/Buttons/Buttons";
import Drinks, { DrinkTypes } from "../../components/Drinks/Drinks";
import Eyebrow from "../../components/Eyebrow/Eyebrow";
import { ThreeButtonsArray } from "../../types/buttons";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import "./DraggableHero.scss";

gsap.registerPlugin(Draggable);

type DraggableHeroProps = {
    loaded: boolean;

    // Fields
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
};

const drinks = [
    { type: "cocktail", x: 0,   y: 0,   rotate: 0  },
    { type: "martini",  x: 200, y: -80, rotate: 12 },
    { type: "wine",     x: -50, y: 120, rotate: -8 },
] satisfies Array<{ type: DrinkTypes; x: number; y: number; rotate: number }>;

const drinkSize = {
    size: { minSize: 150, desiredSize: 225, maxSize: 275 },
};

export default function DraggableHero({ loaded, eyebrow, header, subtitle, body, buttons }: DraggableHeroProps) {
    const drinksRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const instances = drinks.map((drink, i) => {
            const el = drinksRefs.current[i];
            if (!el) return null;

            gsap.set(el, { x: drink.x, y: drink.y, rotation: drink.rotate });

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

                    {buttons && buttons?.length != 0 && <ThreeButtons className="draggable_hero-btns btns" buttons={buttons ?? []} />}
                </div>

                {drinks.map((drink, i) => (
                    <div
                        key={drink.type}
                        ref={(el) => { drinksRefs.current[i] = el; }}
                        className="draggable_hero-drink"

                    >
                        <Drinks type={drink.type} size={drinkSize} />
                    </div>
                ))}
            </div>
        </section>
    );
}
