'use client';

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { WithEventProps, WithHTMLProps } from "../../types/props";
import { NonEmptyArray } from "../../types/utility";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

import "./Modal.scss";
import { XIcon } from "@phosphor-icons/react";

type ModalContentProps = {
    title: string;
    body: string;
};

export type ModalProps = WithHTMLProps &
    WithEventProps & {
        header: string;
        content: NonEmptyArray<ModalContentProps>;

        isOpen: boolean;
        onClose: () => void;
    };

export default function Modal({
    header,
    content,

    isOpen,
    onClose,

    id,
    className,
    ...rest
}: ModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) setIsVisible(true);
    }, [isOpen]);

    const handleClose = () => setIsVisible(false); // triggers exit animation


    const lenis = useLenis();

    useEffect(() => {
        isOpen ? lenis?.stop() : lenis?.start();
        return () => {
            lenis?.start();
        };
    }, [isOpen, lenis]);

    return createPortal(
        <AnimatePresence onExitComplete={onClose}>
            {isVisible && (
                <motion.div
                    style={{ overflow: "hidden" }}
                    initial={{ translateX: '100dvw', opacity: 0 }}
                    animate={{ translateX: "0dvw", opacity: 1 }}
                    exit={{ translateX: '100dvw', opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    // onAnimationComplete={onClose}
                    {...rest}
                    id={id}
                    className={`modal ${className ?? ""} ${isVisible ? "modal-open" : "modal-closed"}`}
                >
                    {/* overlay */}
                    <div className="modal-overlay" onClick={handleClose}></div>

                    <div className="modal-inner">
                        <div className="modal-top">
                            <h6 className="modal-top-header">{header}</h6>
                            <button className="modal-close" onClick={handleClose}>
                                <XIcon color={"var(--cream-500)"} size={30} />
                            </button>
                        </div>

                        <div className="modal-content">
                            {content.map((c, idx) => (
                                <div className="modal-content-section" key={idx}>
                                    <p className="modal-content-title eyebrow">{c.title}</p>
                                    <p className="modal-content-body">{c.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
