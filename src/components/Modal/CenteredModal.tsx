"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";

import { XIcon } from "@phosphor-icons/react";
import "./CenteredModal.scss";
import Button from "../Buttons/Button";
import { ModalProps } from "./Modal";

export default function CenteredModal({
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

    return createPortal(
        <AnimatePresence onExitComplete={onClose}>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.25 } }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.25, delay: 0.1 },
                    }}
                    {...rest}
                    id={id}
                    className={`centered_modal ${className ?? ""} ${isVisible ? "centered_modal-open" : "centered_modal-closed"}`}
                >
                    <div className="centered_modal-overlay" onClick={handleClose}></div>

                    <motion.div
                        className="centered_modal-card"
                        initial={{ opacity: 0, scale: 0.96, translateY: 8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            translateY: 0,
                            transition: {
                                duration: 0.35,
                                ease: [0.16, 1, 0.3, 1],
                            },
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.97,
                            translateY: 6,
                            transition: {
                                duration: 0.2,
                                ease: [0.7, 0, 0.84, 0],
                            },
                        }}
                    >
                        <div className="centered_modal-top">
                            <h5 className="centered_modal-top-header heading-s">
                                {header}
                            </h5>
                            <button
                                className="centered_modal-close"
                                onClick={handleClose}
                                aria-label="Close"
                            >
                                <XIcon color="var(--wine-800)" size={20} weight="bold" />
                            </button>
                        </div>

                        <div className="centered_modal-content">
                            {content.map((c, idx) => (
                                <div className="centered_modal-content-section" key={idx}>
                                    <p className="centered_modal-content-title eyebrow">
                                        {c.title}
                                    </p>
                                    <p className="centered_modal-content-body font-sans">
                                        {c.body}
                                    </p>

                                    {c.button && (
                                        <Button
                                            btnSettings={{
                                                type: "link",
                                                ...c.button,
                                                decoration: {
                                                    type: "arrow",
                                                },
                                            }}
                                            variant="solid"
                                            colorScheme="cabernet"
                                            hoverScheme="burgundy"
                                            size="small"
                                        />
                                    )}
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
