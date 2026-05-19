import { useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { SwitchTransition, Transition } from "react-transition-group";
import gsap from "gsap";

import TransitionContext from "../../context/TransitionContext";

const TransitionComponent = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const { toggleCompleted } = useContext(TransitionContext);
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <SwitchTransition>
            <Transition
                key={location.pathname}
                nodeRef={nodeRef}
                timeout={600}
                onEnter={() => {
                    const node = nodeRef.current;
                    if (!node) return;
                    toggleCompleted(false);
                    gsap.set(node, { xPercent: 100 });
                    gsap.timeline({ paused: true, onComplete: () => toggleCompleted(true) })
                        .to(node, { xPercent: 0, duration: 0.5, ease: "power2.inOut" })
                        .play();
                }}
                onExit={() => {
                    const node = nodeRef.current;
                    if (!node) return;
                    gsap.timeline({ paused: true })
                        .to(node, { xPercent: -100, duration: 0.5, ease: "power2.inOut" })
                        .play();
                }}
            >
                <div ref={nodeRef}>{children}</div>
            </Transition>
        </SwitchTransition>
    );
};

export default TransitionComponent;
