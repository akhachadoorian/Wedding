import { useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { SwitchTransition, Transition } from "react-transition-group";
import gsap from "gsap";

import TransitionContext from "../../context/TransitionContext";
import "./PageTransition.scss";

const TransitionComponent = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const { toggleCompleted } = useContext(TransitionContext);
    const nodeRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    return (
        <SwitchTransition>
            <Transition
                key={location.pathname}
                nodeRef={nodeRef}
                timeout={{ enter: 800, exit: 600 }}
                onEnter={() => {
                    const node = nodeRef.current;
                    const overlay = overlayRef.current;
                    if (!node || !overlay) return;
                    toggleCompleted(false);
                    // Page + overlay start off-screen right together
                    gsap.set(node, { xPercent: 100, autoAlpha: 1, scale: 1 });
                    gsap.set(overlay, { xPercent: 0 });
                    gsap.timeline({ paused: true, onComplete: () => toggleCompleted(true) })
                        .to(node, { xPercent: 0, duration: 0.5, ease: "power2.inOut" })
                        // Overlay sweeps left to reveal content slightly before page lands
                        .to(overlay, { xPercent: -100, duration: 0.4, ease: "power2.inOut" }, "-=0.2")
                        .play();
                }}
                onExit={() => {
                    const node = nodeRef.current;
                    const overlay = overlayRef.current;
                    if (!node || !overlay) return;
                    // Overlay sweeps in from right to cover, then both exit left
                    gsap.set(overlay, { xPercent: 100 });
                    gsap.timeline({ paused: true })
                        .to(overlay, { xPercent: 0, duration: 0.25, ease: "power2.inOut" })
                        .to(node, { xPercent: -100, duration: 0.4, ease: "power2.inOut" }, "-=0.1")
                        .play();
                }}
            >
                <div ref={nodeRef} className="page-transition-wrapper">
                    <div ref={overlayRef} className="page-transition-overlay" />
                    {children}
                </div>
            </Transition>
        </SwitchTransition>
    );
};

export default TransitionComponent;
