"use client";

import { WithHTMLProps } from "@/types/props";
import "./ImageHolder.scss";
import Image from "next/image";
import { CustomImageProps } from "@/types/images";
import { useTooltip } from "@/layout/GlobalTooltip/GlobalTooltip";
import { useState, useEffect, useCallback } from "react";

export type ImageHolderProps = WithHTMLProps & {
    img: CustomImageProps;
    includeOverlay?: boolean;
};

export default function ImageHolder({
    img,
    includeOverlay = true,

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
            className={`img-holder ${className ?? ""}`}
            style={divStyle}
        >
            <Image {...imageProps} className="img-bw" style={style} />

            {includeOverlay && <div className="img-overlay" />}
        </div>
    );
}

type ToolTipHoverImageHolderProps = ImageHolderProps & {
    makeMouseHandlers: ReturnType<typeof useTooltip>["makeMouseHandlers"];
};

export function ToolTipHoverImageHolder({
    img,
    includeOverlay = true,
    style: wrapperStyle,
    className,
    makeMouseHandlers,
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
            className={` img-tooltip_hover ${isTouched ? " is-touched" : ""} ${className ?? ""}`}
            style={wrapperStyle}
            {...(canHover && tooltipContent
                ? makeMouseHandlers(tooltipContent)
                : {})}
            onTouchEnd={toggleTap}
        >
            <div
                className="img-holder"
                style={divStyle}
            >
                <Image {...imageProps} className="img-bw" style={style} />

                {includeOverlay && <div className="img-overlay" />}
            </div>
            {img.caption && <p className="img-caption">{img.caption}</p>}
        </div>
    );
}
