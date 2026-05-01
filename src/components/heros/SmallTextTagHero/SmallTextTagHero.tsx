import { forwardRef, useLayoutEffect, useRef } from "react";

import { ButtonSettingProps, ThreeButtonsArray } from "../../../types/buttons";
import { ImageProps } from "../../../types/images";
import Buttons, { ThreeButtons } from "../../Buttons/Buttons";
import Diamond from "../../Diamond/Diamond";
import Eyebrow from "../../Eyebrow/Eyebrow";
import SmallText, { SmallTextProps } from "../../SmallText/SmallText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./SmallTextTagHero.scss";

export type SmallTextTagHeroProps = {
    loaded: boolean;
    eyebrow?: string;
    heading: string;
    body?: string;
    buttons?: ThreeButtonsArray;
    smallTextTag1: Omit<SmallTextProps, "variation">;
    smallTextTag2: Omit<SmallTextProps, "variation">;
};

// TODO: Figure out mobile layout
export default function SmallTextTagHero({ loaded, eyebrow, heading, body, buttons, smallTextTag1, smallTextTag2 }: SmallTextTagHeroProps) {
    const eyebrowRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef(null);

    const textRef = useRef(null);

    useLayoutEffect(() => {
        if (!loaded) return;

        // FIXME: the loading in animation is not working
        const ctx = gsap.context(() => {
            // gsap.set(textRef, {
            //         x: 0,
            //         y: 0,
            //         opacity: 1,
            //     });

            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

                

                // gsap.set(h1Ref, {
                //     x: 0,
                //     y: 0,
                //     opacity: 1,
                // });

                tl.from(
                    eyebrowRef.current,
                    {
                        y: 12,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.9",
                )
                .from(
                    h1Ref.current,
                    {
                        y: 16,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.6",
                );
        });

        return () => ctx.revert();
    }, [loaded]);

    return (
        <section className={`small_text_tag_hero-wrapper ${loaded ? "is-loaded" : "is-hidden"}`}>
            <div className="small_text_tag_hero-left" ref={textRef}>
                {eyebrow && <Eyebrow ref={eyebrowRef} className={"small_text_tag_hero-e"} text={eyebrow} color="--gold-500" variation="left"/>}

                <h1 ref={h1Ref} className="small_text_tag_hero-title">{heading}</h1>

                {body && <p className="small_text_tag_hero-body">{body}</p>}

                {(buttons && buttons?.length != 0) && (
                    <ThreeButtons className="small_text_tag_hero-btns" buttons={buttons ?? []} />
                )}
            </div>

            <div className="small_text_tag_hero-right">
                <SmallText variation="right" {...smallTextTag1} mobileVariation="left"/>

                <div className="art_deco_div">
                    <Diamond className="tablet_only" color="--gold-500" />

                    <div className="div_line"></div>

                    <Diamond color="--gold-500" />
                </div>

                <SmallText 
                    variation="right"
                    {...smallTextTag2}
                />
            </div>
        </section>
    );
}
