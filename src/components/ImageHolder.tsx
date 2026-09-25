"use client";

import { WithHTMLProps } from "@/types/props";
import Image from "next/image";
import { CustomImageProps } from "@/types/images";
import { useTooltip } from "@/layout/GlobalTooltip";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/utils/cn";

// `img-holder` stays as a hook for the global image styles in _utilities.scss. The focal
// point needs `!` to beat that file's unlayered `.img-holder img { object-position }`.
const IMG_HOLDER =
    "img-holder cursor-pointer [&_img]:object-(--img-object-position-mobile)! md:[&_img]:object-(--img-object-position)!";

const IMG_BORDER_FRAME = "absolute border-3 border-cabernet";

export interface ImageHolderProps extends WithHTMLProps {
    img: CustomImageProps;
    customImageClass?: string;
    includeOverlay?: boolean;
    customOverlayClass?: string;
}

export default function ImageHolder({
    img,
    customImageClass,
    includeOverlay = true,
    customOverlayClass,

    className,
    style: wrapperStyle,
    ...htmlProps
}: ImageHolderProps) {
    const { caption, imgPositionResponsive, style, ...imageProps } = img;

    const divStyle = {
        "--img-object-position": imgPositionResponsive?.desktop ?? "center",
        "--img-object-position-mobile":
            imgPositionResponsive?.mobile ??
            imgPositionResponsive?.desktop ??
            "center",
        ...wrapperStyle,
    } as React.CSSProperties;

    return (
        <div
            {...htmlProps}
            className={cn(IMG_HOLDER, className)}
            style={divStyle}
        >
            <Image
                {...imageProps}
                className={`img-bw ${customImageClass ?? ""}`}
                style={style}
            />

            {includeOverlay && (
                <div className={`img-overlay ${customOverlayClass ?? ""}`} />
            )}

            <div className="img-border"></div>
            <div className="img-border2"></div>
        </div>
    );
}

export function ImageHolderBorder({
    img,
    customImageClass,
    includeOverlay = true,
    customOverlayClass,

    className,
    style: wrapperStyle,
    ...htmlProps
}: ImageHolderProps) {
    return (
        <div
            {...htmlProps}
            className={cn("relative w-full aspect-[4/5] m-300", className)}
            style={wrapperStyle}
        >
            <div className={cn(IMG_BORDER_FRAME, "-top-300 right-300 bottom-300 -left-300")} />
            <div className={cn(IMG_BORDER_FRAME, "top-300 -right-300 -bottom-300 left-300")} />

            <div className="absolute inset-0 z-2">
                <ImageHolder
                    img={img}
                    includeOverlay={includeOverlay}
                    customImageClass={customImageClass}
                    customOverlayClass={customOverlayClass}
                    className="w-full h-full"
                />
            </div>
        </div>
    );
}

interface ToolTipHoverImageHolderProps extends ImageHolderProps {
    makeMouseHandlers: ReturnType<typeof useTooltip>["makeMouseHandlers"];
}

export function ToolTipHoverImageHolder({
    img,
    customImageClass,
    includeOverlay = true,
    customOverlayClass,

    style: wrapperStyle,
    className,
    makeMouseHandlers,
    ...htmlProps
}: ToolTipHoverImageHolderProps) {
    const [isTouched, setIsTouched] = useState(false);
    const [canHover, setCanHover] = useState(true);

    const { caption, imgPositionResponsive, style, ...imageProps } = img;

    const divStyle = {
        "--img-object-position": imgPositionResponsive?.desktop ?? "center",
        "--img-object-position-mobile":
            imgPositionResponsive?.mobile ??
            imgPositionResponsive?.desktop ??
            "center",
    } as React.CSSProperties;

    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");

        setCanHover(mq.matches); // set initial value

        const handleChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
        mq.addEventListener("change", handleChange);

        return () => mq.removeEventListener("change", handleChange);
    }, []);

    const toggleTap = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
        // touchend fires before click on iOS; preventDefault stops the
        // synthetic click from also firing and double-toggling
        if (e.cancelable) e.preventDefault();
        setIsTouched((prev) => !prev);
    }, []);

    const tooltipContent = img.caption
        ? { type: "text" as const, caption: img.caption }
        : null;

    return (
        <div
            {...htmlProps}
            className={cn("group/tip relative flex flex-col p-200", className)}
            style={wrapperStyle}
            {...(canHover && tooltipContent
                ? makeMouseHandlers(tooltipContent)
                : {})}
            onTouchEnd={toggleTap}
        >
            <div
                className={cn(IMG_HOLDER, "absolute! top-0 left-0 w-full h-full")}
                style={divStyle}
            >
                {/* Hovering (fine pointers) or tapping reveals the photo in color. `!` beats the global `.img-bw` filter. */}
                <Image
                    {...imageProps}
                    style={style}
                    className={cn(
                        "img-bw pointer-fine:group-hover/tip:grayscale-0!",
                        isTouched && "grayscale-0!",
                        customImageClass,
                    )}
                />

                {includeOverlay && (
                    <div
                        className={cn(
                            "img-overlay pointer-fine:group-hover/tip:opacity-0",
                            isTouched && "opacity-0",
                            customOverlayClass,
                        )}
                    />
                )}
            </div>
            {img.caption && (
                <p
                    className={cn(
                        "absolute left-1/2 -bottom-[25px] z-10 w-full max-w-[calc(100%-var(--space-150)*2-var(--space-200)*2)] mx-100",
                        "bg-black text-[color:var(--cream-500)] font-sans text-xs font-semibold leading-normal tracking-[0.6px] uppercase text-center",
                        "px-150 py-075 rounded-[6px] border border-white/8 shadow-[0_4px_16px_rgba(0,0,0,0.5)]",
                        "-translate-x-1/2 transition-[opacity,translate] duration-200 ease-[ease] md:hidden",
                        isTouched ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
                    )}
                >
                    {img.caption}
                </p>
            )}
        </div>
    );
}
