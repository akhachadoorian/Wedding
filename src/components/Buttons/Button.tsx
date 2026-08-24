"use client";

import { CSSProperties, useState } from "react";

import Modal from "@/components/Modal/CenteredModal";
import { Icon } from "@phosphor-icons/react";
import { LenisLink } from "../../hooks/LenisLink";
import {
    BTN_DECORATION_SIZE,
    BtnDecoration,
    BtnSize,
    ButtonProps,
    DecorationSide,
    LinkButtonSettings,
    ModalButtonSettings,
    NativeButtonSettings,
    VisualButtonSettings,
    resolveHoverScheme,
} from "../../types/buttons";
import ArrowBox, { ArrowDirectionProps } from "../ArrowBox/ArrowBox";

import { ColorSchemeMap } from "../../classes/ColorSchemeMap";
import { CssColor } from "../../classes/CssColor";
import { cn } from "../../utils/cn";
import "./Button.scss";
import { buttonVariants } from "./button.variants";
import { VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui/slot";

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
    const resolvedHoverScheme = resolveHoverScheme(
        variant,
        colorScheme,
        hoverScheme,
    );

    // self-hover "flip" state: colorScheme and hoverScheme resolve to the same
    // scheme, so the button's own fill/text relationship inverts (see SELF_HOVER_TEXT
    // in button.variants.ts) — decoration should flip along with it. Excludes `lines`,
    // whose hover options are self-only for every scheme (not a special "flip" state).
    const isFlipped =
        variant !== "lines" && resolvedHoverScheme === colorScheme;

    const decorationColor = ColorSchemeMap.DECORATION.get(colorScheme, variant);
    const decorationHoverColor = isFlipped
        ? (ColorSchemeMap.DECORATION.tryGet(colorScheme, `${variant}-flip`) ??
          decorationColor)
        : (ColorSchemeMap.DECORATION_HOVER.tryGet(colorScheme, variant) ??
          decorationColor);

    const btnClass = cn(
        "btn",
        // `btn-variant-${variant}`,
        // `btn-color_scheme-${colorScheme}`,
        buttonVariants({
            variant,
            colorScheme,
            hoverScheme: resolvedHoverScheme,
            size,
        }),
        fullWidth && "w-full justify-center",
        // size === "small" ? "btn-size-small" : "btn-size-default",
        className,
    );

    switch (btnSettings.type) {
        case "modal":
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
        case "link":
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
        case 'native':
            return (
                <NativeButton
                    btnClass={btnClass}
                    btnSettings={btnSettings}
                    decorationColor={decorationColor}
                    decorationHoverColor={decorationHoverColor}
                    size={size}
                    {...rest}
                />
            )
        
        case 'visual':
        default:
            return (
                <VisualButton
            btnClass={btnClass}
            btnSettings={btnSettings}
            decorationColor={decorationColor}
            decorationHoverColor={decorationHoverColor}
            size={size}
            {...rest}
        />
            )
    }

}
// #region --- Button Types Rendering ---------------------------------------------

interface ButtonVariantComponentProps {
    btnClass: string;
    // btnSettings: ButtonSettingProps;
    decorationColor: CssColor;
    decorationHoverColor: CssColor;
    size: BtnSize;
}

function ModalButton({
    btnClass,
    btnSettings,
    decorationColor,
    decorationHoverColor,
    size,
    ...rest
}: ButtonVariantComponentProps & {
    btnSettings: ModalButtonSettings;
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
    btnSettings: LinkButtonSettings;
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
    btnSettings: VisualButtonSettings;
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

function NativeButton({
    btnClass,
    btnSettings,
    decorationColor,
    decorationHoverColor,
    size,
    ...rest
}: ButtonVariantComponentProps & {
    btnSettings: NativeButtonSettings;
}) {
    const { text, decoration, type: _type, htmlType, ...nativeProps } = btnSettings;

    return (
        <button
            {...rest}
            {...nativeProps}
            type={htmlType ?? "button"}
            className={btnClass}
        >
            <ButtonInner
                text={text}
                decoration={decoration}
                decorationColor={decorationColor}
                decorationHoverColor={decorationHoverColor}
                size={size}
            />
        </button>
    );
}

// #endregion ---------------------------------------------------------

// #region --- Button Inner Rendering ---------------------------------------------

export const BTN_TEXT_CLASSES =
    "btn-text font-sans font-medium leading-[130%] tracking-wide uppercase";

interface ButtonInnerProps {
    text: string;
    decoration?: BtnDecoration;
    decorationColor: CssColor;
    decorationHoverColor: CssColor;
    // decorationSize: number;
    size: BtnSize;
}

function ButtonInner({
    text,
    decoration,
    decorationColor,
    decorationHoverColor,
    size,
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
                arrowSize={decSize["arrow"]}
            />
        );

    if (decoration?.type === "icon")
        return (
            <IconButtonInner
                text={text}
                icon={decoration.icon}
                iconColor={decorationColor}
                iconHoverColor={decorationHoverColor}
                iconSize={decSize["icon"]}
                iconSide={decoration.iconSide ?? 'left'}
            />
        );

    return <p className={BTN_TEXT_CLASSES}>{text}</p>;
}

function IconButtonInner({
    text,
    icon,
    iconColor,
    iconHoverColor,
    iconSize,
    iconSide
}: {
    text: string;
    icon: Icon;
    iconColor: CssColor;
    iconHoverColor: CssColor;
    iconSize?: number;
    iconSide: DecorationSide
}) {
    const IconComponent = icon;

    // Named "-base"/"-hover" (not "--btn-icon-color" itself) so the hover swap, done in
    // Button.scss via a stylesheet rule on `--btn-icon-color`, isn't shadowed by this
    // inline style — inline styles always beat stylesheet rules, :hover included.
    const wrapperStyle = {
        "--btn-icon-color-base": iconColor.toCssVar(),
        "--btn-icon-color-hover": iconHoverColor.toCssVar(),
    } as CSSProperties;

    return (
        <>
        {iconSide === 'left' && (<span className="btn_icon-wrapper flex justify-center items-center" style={wrapperStyle}>
                <IconComponent size={iconSize} color="var(--btn-icon-color)" />
            </span>)}
            
            <p className={BTN_TEXT_CLASSES}>{text}</p>

            {iconSide === 'right' && (<span className="btn_icon-wrapper flex justify-center items-center" style={wrapperStyle}>
                <IconComponent size={iconSize} color="var(--btn-icon-color)" />
            </span>)}
            
        </>
    );
}

function ArrowButtonInner({
    text,
    arrowSide,
    arrowDirection,
    arrowColor,
    arrowHoverColor,
    arrowSize,
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
