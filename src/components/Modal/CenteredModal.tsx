"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";

import { XIcon } from "@phosphor-icons/react";
import Button from "../Buttons/Button";
import { ModalProps } from "./Modal";
import { cn } from "@/utils/cn";

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
                    className={cn(
                        "fixed top-0 left-0 box-border flex items-center justify-center w-dvw h-svh p-200 md:p-300",
                        className,
                        isVisible ? "opacity-100 z-999 pointer-events-auto" : "opacity-0 -z-1 pointer-events-none",
                    )}
                >
                    <div className="absolute inset-0 bg-[rgba(16,17,17,0.35)]" onClick={handleClose}></div>

                    <motion.div
                        className="relative z-1 flex flex-col w-[min(100%,34rem)] max-h-[85svh] bg-[var(--cream-100)] rounded-[6px] shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
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
                        <div className="flex-[0_0_auto] flex items-start justify-between gap-300 pt-300 px-300 pb-200 md:pt-400 md:px-400 md:pb-300">
                            <h5 className="text-cabernet heading-s">
                                {header}
                            </h5>
                            <button
                                className="flex-[0_0_auto] flex items-center justify-center size-[34px] rounded-full bg-transparent border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-[var(--cream-600)]"
                                onClick={handleClose}
                                aria-label="Close"
                            >
                                <XIcon color="var(--wine-800)" size={20} weight="bold" />
                            </button>
                        </div>

                        <div className="flex-[1_1_auto] min-h-0 overflow-y-auto flex flex-col gap-300 px-300 pb-300 md:px-400 md:pb-400">
                            {content.map((c, idx) => (
                                <div className="flex flex-col gap-100 not-last-of-type:pb-300 not-last-of-type:border-b not-last-of-type:border-[color:var(--cream-700)]" key={idx}>
                                    <p className="text-cabernet eyebrow">
                                        {c.title}
                                    </p>
                                    <p className="text-[color:var(--black-700)] font-sans">
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
