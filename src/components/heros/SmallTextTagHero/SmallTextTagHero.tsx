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
    // const GSAP_DURATION = 0.8;
    const GSAP_FROM_LEFT = {y: 12, opacity: 0, duration: 0.8};

    // const GSAP_DURATION = 0.8;
    const GSAP_FROM_RIGHT = {y: 12, opacity: 0, duration: 0.6};
    

    // Left col element refs
    const eyebrowRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef(null);
    const bodyRef = useRef(null);
    const btnsRef = useRef<HTMLDivElement>(null);

    // Right col element refs
    const stt1Ref = useRef<HTMLDivElement>(null);
    const artDecoRef = useRef(null);
    const stt2Ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!loaded) return;

        const ctx = gsap.context(() => {
            //////////////////////////////////////////
            // Left column load in animation
            //////////////////////////////////////////

                let eyebrowGSAP = gsap.from(eyebrowRef.current, GSAP_FROM_LEFT);
                let h1GSAP = gsap.from(h1Ref.current, GSAP_FROM_LEFT);
                let bodyGSAP = gsap.from(bodyRef.current, GSAP_FROM_LEFT);
                let btnsGSAP = gsap.from(btnsRef.current, GSAP_FROM_LEFT);

                const tlLeft = gsap.timeline({ defaults: { ease: "power2.out" } });
                tlLeft.add(eyebrowGSAP);
                tlLeft.add(h1GSAP, "-=0.6");
                tlLeft.add(bodyGSAP, "-=0.4");
                tlLeft.add(btnsGSAP, "-=0.2");

            //////////////////////////////////////////

            //////////////////////////////////////////
            // Right column load in animation
            //////////////////////////////////////////

                let stt1GSAP = gsap.from(stt1Ref.current, GSAP_FROM_RIGHT);
                let artDecoGSAP = gsap.from(artDecoRef.current, GSAP_FROM_RIGHT);
                let stt2GSAP = gsap.from(stt2Ref.current, GSAP_FROM_RIGHT);

                const tlRight = gsap.timeline({ defaults: { ease: "power2.out" } });
                tlRight.add(stt1GSAP);
                tlRight.add(artDecoGSAP, "-=0.4");
                tlRight.add(stt2GSAP, "-=0.2");
                
            //////////////////////////////////////////
        });

        return () => ctx.revert();
    }, [loaded]);

    return (
        <section className={`small_text_tag_hero-wrapper ${loaded ? "is-loaded" : "is-hidden"}`}>
            <div className="small_text_tag_hero-left">
                {eyebrow && <Eyebrow ref={eyebrowRef} className={"small_text_tag_hero-e"} text={eyebrow} color="--gold-500" variation="left"/>}

                <h1 ref={h1Ref} className="small_text_tag_hero-title">{heading}</h1>

                {body && <p ref={bodyRef} className="small_text_tag_hero-body">{body}</p>}

                {(buttons && buttons?.length != 0) && (
                    <ThreeButtons ref={btnsRef} className="small_text_tag_hero-btns" buttons={buttons ?? []} />
                )}
            </div>

            <div className="small_text_tag_hero-right">
                <SmallText ref={stt1Ref} variation="right" {...smallTextTag1} mobileVariation="left"/>

                <div ref={artDecoRef} className="art_deco_div">
                    <Diamond className="tablet_only" color="--gold-500" />

                    <div className="div_line"></div>

                    <Diamond color="--gold-500" />
                </div>

                <SmallText ref={stt2Ref}
                    variation="right"
                    {...smallTextTag2}
                />
            </div>
        </section>
    );
}
