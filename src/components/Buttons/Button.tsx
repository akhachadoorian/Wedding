"use client";

import { useState } from "react";

import Modal from "@/components/Modal/Modal";
import { Icon } from "@phosphor-icons/react";
import { LenisLink } from "../../hooks/LenisLink";
import {
    BTN_DECORATION_SIZE,
    BtnDecoration,
    BtnSize,
    ButtonProps,
    LinkButtonSettings,
    ModalButtonSettings,
    VisualButtonSettings,
    resolveHoverScheme
} from "../../types/buttons";
import ArrowBox, { ArrowDirectionProps } from "../ArrowBox/ArrowBox";

import { ColorSchemeMap } from "../../classes/ColorSchemeMap";
import { CssColor } from "../../classes/CssColor";
import { cn } from "../../utils/cn";
import "./Button.scss";
import { buttonColorVariants } from "./button.variants";

export default function Button({
    btnSettings,

    variant = "solid",
    colorScheme = "cream",
    hoverScheme,
    fullWidth = false,
    size = "default",

    className, // pulled out because this components constructs it for LenisLink
    ...rest // includes a11yProps and HTMLProps
}: ButtonProps) {
    const decorationColor = ColorSchemeMap.DECORATION.get(colorScheme, variant);
    const decorationHoverColor =
        ColorSchemeMap.DECORATION_HOVER.tryGet(colorScheme, variant) ??
        decorationColor;

    const resolvedHoverScheme = resolveHoverScheme(
        variant,
        colorScheme,
        hoverScheme,
    );

    const btnClass = cn(
        "btn",
        // `btn-variant-${variant}`,
        // `btn-color_scheme-${colorScheme}`,
        buttonColorVariants({
            variant,
            colorScheme,
            hoverScheme: resolvedHoverScheme,
            size,
        }),
        fullWidth && "w-full justify-center",
        // size === "small" ? "btn-size-small" : "btn-size-default",
        className,
    );

    if (btnSettings.type === "modal")
        return (
            <ModalButton
                btnClass={btnClass}
                btnSettings={btnSettings}
                decorationColor={decorationColor}
                decorationHoverColor={decorationHoverColor}
                size={size}
                {...rest}
            />
        );

    if (btnSettings.type === "link")
        return (
            <LinkButton
                btnClass={btnClass}
                btnSettings={btnSettings}
                decorationColor={decorationColor}
                decorationHoverColor={decorationHoverColor}
                size={size}
                {...rest}
            />
        );

    return (
        <VisualButton
            btnClass={btnClass}
            btnSettings={btnSettings}
            decorationColor={decorationColor}
            decorationHoverColor={decorationHoverColor}
            size={size}
            {...rest}
        />
    );
}
// #region --- Button Types Rendering ---------------------------------------------

interface ButtonVariantComponentProps {
    btnClass: string;
    // btnSettings: ButtonSettingProps;
    decorationColor: CssColor;
    decorationHoverColor: CssColor;
    size: BtnSize
}

function ModalButton({
    btnClass,
    btnSettings,
    decorationColor,
    decorationHoverColor,
    size,
    ...rest
}: ButtonVariantComponentProps & {
    btnSettings: ModalButtonSettings
}) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button
                {...rest}
                className={btnClass}
                onClick={() => setModalOpen(true)}
            >
                <ButtonInner
                    text={btnSettings.text}
                    decoration={btnSettings.decoration}
                    decorationColor={decorationColor}
                    decorationHoverColor={decorationHoverColor}
                    size={size}
                />
            </button>

            <Modal
                {...btnSettings.modalContent}
                id={btnSettings.modalID}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
}

function LinkButton({
    btnClass,
    btnSettings,
    decorationColor,
    decorationHoverColor,
    size,
    ...rest
}: ButtonVariantComponentProps & {
    btnSettings: LinkButtonSettings
}) {
    return (
        <LenisLink
            {...rest}
            className={btnClass}
            href={btnSettings.link}
            target={btnSettings.target ?? "_self"}
        >
            <ButtonInner
                text={btnSettings.text}
                decoration={btnSettings.decoration}
                decorationColor={decorationColor}
                decorationHoverColor={decorationHoverColor}
                size={size}
            />
        </LenisLink>
    );
}

function VisualButton({
    btnClass,
    btnSettings,
    decorationColor,
    decorationHoverColor,
    size,
    ...rest
}: ButtonVariantComponentProps & {
    btnSettings: VisualButtonSettings
}) {
    return (
        <div {...rest} className={btnClass}>
            <ButtonInner
                text={btnSettings.text}
                decoration={btnSettings.decoration}
                decorationColor={decorationColor}
                decorationHoverColor={decorationHoverColor}
                size={size}
            />
        </div>
    );
}

// #endregion ---------------------------------------------------------

// #region --- Button Inner Rendering ---------------------------------------------

const BTN_TEXT_CLASSES =
    "btn-text font-sans font-medium leading-[130%] tracking-wide uppercase";

interface ButtonInnerProps {
    text: string;
    decoration?: BtnDecoration;
    decorationColor: CssColor;
    decorationHoverColor: CssColor;
    // decorationSize: number;
    size: BtnSize
}

function ButtonInner({
    text,
    decoration,
    decorationColor,
    decorationHoverColor,
    size
}: ButtonInnerProps) {
    const decSize = BTN_DECORATION_SIZE[size];

    if (decoration?.type === "arrow")
        return (
            <ArrowButtonInner
                text={text}
                arrowColor={decorationColor}
                arrowHoverColor={decorationHoverColor}
                arrowSide={decoration.arrowSide ?? "right"}
                arrowDirection={
                    decoration.arrowDirection
                        ? decoration.arrowDirection
                        : decoration.arrowSide === "left"
                          ? "left"
                          : "top-right"
                }
                arrowSize={decSize['arrow']}
            />
        );

    if (decoration?.type === "icon")
        return (
            <IconButtonInner
                text={text}
                icon={decoration.icon}
                iconColor={decorationColor}
                iconSize={decSize['icon']}
            />
        );

    return <p className={BTN_TEXT_CLASSES}>{text}</p>;
}

function IconButtonInner({
    text,
    icon,
    iconColor,
    iconSize
}: {
    text: string;
    icon: Icon;
    iconColor: CssColor;
    iconSize?: number;
}) {
    const IconComponent = icon;
    return (
        <>
            <IconComponent size={iconSize} color={iconColor.toCssVar()} />
            <p className={BTN_TEXT_CLASSES}>{text}</p>
        </>
    );
}

function ArrowButtonInner({
    text,
    arrowSide,
    arrowDirection,
    arrowColor,
    arrowHoverColor,
    arrowSize
}: {
    text: string;
    arrowSide: "left" | "right";
    arrowDirection: ArrowDirectionProps;
    arrowColor: CssColor;
    arrowHoverColor: CssColor;
    arrowSize: number;
}) {
    return (
        <>
            {arrowSide === "left" && (
                <ArrowBox
                    color={arrowColor}
                    hoverColor={arrowHoverColor}
                    arrowDirection={arrowDirection}
                    size={arrowSize}
                />
            )}

            <p className={BTN_TEXT_CLASSES}>{text}</p>

            {arrowSide === "right" && (
                <ArrowBox
                    color={arrowColor}
                    hoverColor={arrowHoverColor}
                    arrowDirection={arrowDirection}
                    size={arrowSize}
                />
            )}
        </>
    );
}

// #endregion ---------------------------------------------------------
