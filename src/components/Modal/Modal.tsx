"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { WithHTMLProps } from "../../types/props";
import { NonEmptyArray } from "../../types/utility";

import { XIcon } from "@phosphor-icons/react";
import { ButtonSettingProps, LinkButtonSettings } from "@/types/buttons";
import { button } from "motion/react-client";
import Button from "../Buttons/Button";
import { cn } from "@/utils/cn";

export type ModalContentProps = {
    title: string;
    body: string;
    button?: Omit<LinkButtonSettings, "type">;
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
                    className={cn(
                        "fixed top-0 left-0 flex justify-end w-dvw h-svh",
                        className,
                        isVisible ? "opacity-100 z-999 pointer-events-auto" : "opacity-0 -z-1 pointer-events-none",
                    )}
                >
                    {/* overlay */}
                    <div className="flex-1 bg-[rgba(11,12,12,0.35)]" onClick={handleClose}></div>

                    <motion.div
                        className="flex flex-col justify-between w-[56.319vw] py-750 px-col-margin bg-cabernet"
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
                        <div className="flex items-center justify-between">
                            <h5 className="heading-l">
                                {header}
                            </h5>
                            <button
                                className="h-[38px] aspect-square p-050 bg-transparent border-none"
                                onClick={handleClose}
                            >
                                <XIcon color={"var(--cream)"} size={30} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-300">
                            {content.map((c, idx) => (
                                <div
                                    className="flex flex-col gap-200 not-last-of-type:pb-300  not-last-of-type:border-b  not-last-of-type:border-b-solid  not-last-of-type:border-b-cream"
                                    key={idx}
                                >
                                    <p className="eyebrow text-cream">
                                        {c.title}
                                    </p>
                                    <p className="text-cream font-sans">
                                        {c.body}
                                    </p>

                                    {c.button && (
                                        <Button
                                            btnSettings={{
                                                type: "link",
                                                ...c.button,
                                                decoration: {
                                                    type: 'arrow'
                                                }
                                            }}
                                            variant="outline"
                                            colorScheme="cream"
                                            hoverScheme="cream"
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
