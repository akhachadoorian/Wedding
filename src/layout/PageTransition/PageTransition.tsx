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
                timeout={500}
                onEnter={() => {
                    const node = nodeRef.current;
                    if (!node) return;
                    toggleCompleted(false);
                    gsap.set(node, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
                    gsap.timeline({ paused: true, onComplete: () => toggleCompleted(true) })
                        .to(node, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
                        .to(node, { scale: 1, duration: 0.25 })
                        .play();
                }}
                onExit={() => {
                    const node = nodeRef.current;
                    if (!node) return;
                    gsap.timeline({ paused: true })
                        .to(node, { scale: 0.8, duration: 0.2 })
                        .to(node, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
                        .play();
                }}
            >
                <div ref={nodeRef}>{children}</div>
            </Transition>
        </SwitchTransition>
    );
};

export default TransitionComponent;
