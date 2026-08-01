"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { WithHTMLProps } from "../../types/props";
import { NonEmptyArray } from "../../types/utility";

import { XIcon } from "@phosphor-icons/react";
import "./Modal.scss";
import { ButtonSettingProps, LinkButtonSettings } from "@/types/buttons";
import { button } from "motion/react-client";
import Button from "../Buttons/Button";

type ModalContentProps = {
    title: string;
    body: string;
    button?: Omit<LinkButtonSettings, 'type'>;
};

export type ModalProps = WithHTMLProps & {
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    if (!mounted) return null;

    console.log("header", header)

    return createPortal(
        <AnimatePresence onExitComplete={onClose}>
            {isVisible && (
                <motion.div
                    style={{ overflow: "hidden" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.3 } }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.3, delay: 0.3 },
                    }}
                    // onAnimationComplete={onClose}
                    {...rest}
                    id={id}
                    className={`modal ${className ?? ""} ${isVisible ? "modal-open" : "modal-closed"}`}
                >
                    {/* overlay */}
                    <div className="modal-overlay" onClick={handleClose}></div>

                    <motion.div
                        className="modal-inner"
                        initial={{ translateX: "100%" }}
                        animate={{
                            translateX: "0%",
                            transition: {
                                duration: 0.45,
                                delay: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            },
                        }}
                        exit={{
                            translateX: "100%",
                            transition: {
                                duration: 0.35,
                                ease: [0.7, 0, 0.84, 0],
                            },
                        }}
                    >
                        <div className="modal-top">
                            <h5 className="modal-top-header heading-l">{header}</h5>
                            <button
                                className="modal-close"
                                onClick={handleClose}
                            >
                                <XIcon color={"var(--cream)"} size={30} />
                            </button>
                        </div>

                        <div className="modal-content">
                            {content.map((c, idx) => (
                                <div
                                    className="modal-content-section"
                                    key={idx}
                                >
                                    <p className="modal-content-title eyebrow">
                                        {c.title}
                                    </p>
                                    <p className="modal-content-body">
                                        {c.body}
                                    </p>

                                    {c.button && <Button btnSettings={{type: 'link', ...c.button}} variant="outline" colorScheme="cream" size="small"/> }
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
