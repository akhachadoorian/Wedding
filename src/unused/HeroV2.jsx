import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroV2.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroV2() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const textRef = useRef(null);
  const mediaRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const text = textRef.current;
    const media = mediaRef.current;
    const image = imageRef.current;

    if (!section || !sticky || !text || !media || !image) return;

    const ctx = gsap.context(() => {
      gsap.set(media, {
        width: "50vw",
        borderRadius: "24px",
      });

      gsap.set(text, {
        x: 0,
        opacity: 1,
      });

      gsap.set(image, {
        scale: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.to(
        media,
        {
          width: "100vw",
          borderRadius: "0px",
          ease: "none",
          duration: 0.62,
        },
        0
      )
        .to(
          image,
          {
            scale: 1.04,
            ease: "none",
            duration: 1,
          },
          0
        )
        .to(
          text,
          {
            x: -100,
            opacity: 0,
            ease: "none",
            duration: 0.22,
          },
          0.36
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-v2">
      <div ref={stickyRef} className="hero-v2__sticky">
        <div className="hero-v2__text-shell">
          <div ref={textRef} className="hero-v2__content">
            <h1 className="hero-v2__title">
              Medium length hero heading goes here
            </h1>

            <p className="hero-v2__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </p>

            <div className="hero-v2__buttons">
              <a href="/" className="hero-v2__button hero-v2__button--primary">
                Button
              </a>
              <a href="/" className="hero-v2__button hero-v2__button--secondary">
                Button
              </a>
            </div>
          </div>
        </div>

        <div ref={mediaRef} className="hero-v2__media">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=80"
            alt="Wedding"
            className="hero-v2__image"
          />
        </div>
      </div>
    </section>
  );
}