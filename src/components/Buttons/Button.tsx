'use client';

import { useState } from "react";

import { Icon } from "@phosphor-icons/react";
import { LenisLink } from "../../hooks/LenisLink";
import { BtnDecoration, ButtonProps, LinkButtonSettings, ModalButtonSettings, VisualButtonSettings } from "../../types/buttons";
import { ColorVariables } from "../../types/colors";
import ArrowBox, { ArrowDirectionProps } from "../ArrowBox/ArrowBox";
import Modal from "../Modal/Modal";

import "./Button.scss";
import { ColorSchemeMap } from "../../classes/ColorSchemeMap";
import { CssColor } from "../../classes/CssColor";

export default function Button({
    btnSettings,

    variant = "solid",
    colorScheme = "cream",
    fullWidth = false,

    className, // pulled out because this components constructs it for LenisLink
    ...rest // includes a11yProps and HTMLProps
}: ButtonProps) {

    const decorationColor = ColorSchemeMap.DECORATION.get(colorScheme, variant);
    const decorationHoverColor = ColorSchemeMap.DECORATION_HOVER.tryGet(colorScheme, variant) ?? decorationColor;


    const btnClass = `btn btn-variant-${variant} btn-color_scheme-${colorScheme} ${className ?? ""} ${fullWidth ? "btn-full_width" : ""}`;

    if (btnSettings.type === "modal") return <ModalButton btnClass={btnClass} btnSettings={btnSettings} decorationColor={decorationColor} decorationHoverColor={decorationHoverColor} {...rest} />;

    if (btnSettings.type === 'link') return <LinkButton btnClass={btnClass} btnSettings={btnSettings} decorationColor={decorationColor} decorationHoverColor={decorationHoverColor} {...rest} />

    return <VisualButton btnClass={btnClass} btnSettings={btnSettings} decorationColor={decorationColor} decorationHoverColor={decorationHoverColor} {...rest} />

}
// #region --- Button Types Rendering ---------------------------------------------

function ModalButton({ btnClass, btnSettings, decorationColor, decorationHoverColor, ...rest }: { btnClass: string; btnSettings: ModalButtonSettings; decorationColor: CssColor; decorationHoverColor: CssColor }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button {...rest} className={btnClass} onClick={() => setModalOpen(true)}>
                <ButtonInner text={btnSettings.text} decoration={btnSettings.decoration} decorationColor={decorationColor} decorationHoverColor={decorationHoverColor} />
            </button>

            <Modal {...btnSettings.modalContent} id={btnSettings.modalID} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}

function LinkButton({ btnClass, btnSettings, decorationColor, decorationHoverColor, ...rest }: { btnClass: string; btnSettings: LinkButtonSettings; decorationColor: CssColor; decorationHoverColor: CssColor }) {
    return (
        <LenisLink {...rest} className={btnClass} href={btnSettings.link} target={btnSettings.target ?? "_self"}>
            <ButtonInner text={btnSettings.text} decoration={btnSettings.decoration} decorationColor={decorationColor} decorationHoverColor={decorationHoverColor} />
        </LenisLink>
    );
}

function VisualButton({ btnClass, btnSettings, decorationColor, decorationHoverColor, ...rest }: { btnClass: string; btnSettings: VisualButtonSettings; decorationColor: CssColor; decorationHoverColor: CssColor }) {
    return (
        <div {...rest} className={btnClass}>
            <ButtonInner text={btnSettings.text} decoration={btnSettings.decoration} decorationColor={decorationColor} decorationHoverColor={decorationHoverColor} />
        </div>
    )
}

// #endregion ---------------------------------------------------------

// #region --- Button Inner Rendering ---------------------------------------------

function ButtonInner({ text, decoration, decorationColor, decorationHoverColor }: { text: string; decoration?: BtnDecoration; decorationColor: CssColor; decorationHoverColor: CssColor }) {
    if (decoration?.type === "arrow") return <ArrowButtonInner text={text} arrowColor={decorationColor} arrowHoverColor={decorationHoverColor} arrowSide={decoration.arrowSide ?? 'right'} arrowDirection={decoration.arrowDirection ? decoration.arrowDirection : decoration.arrowSide === 'left' ? 'left' : 'top-right' } /> ;

    if (decoration?.type === "icon") return <IconButtonInner text={text} icon={decoration.icon} iconColor={decorationColor} />;

    return <p className="btn-text">{text}</p>;
}

function IconButtonInner({ text, icon, iconColor }: { text: string; icon: Icon; iconColor: CssColor }) {
    const IconComponent = icon;
    return (
        <>
            <IconComponent size={24} color={iconColor.toCssVar()} />
            <p className="btn-text">{text}</p>
        </>
    );
}

function ArrowButtonInner({ text, arrowSide, arrowDirection, arrowColor, arrowHoverColor }: { text: string; arrowSide: "left" | "right"; arrowDirection: ArrowDirectionProps; arrowColor: CssColor; arrowHoverColor: CssColor }) {
    return (
        <>
            {arrowSide === "left" && <ArrowBox color={arrowColor} hoverColor={arrowHoverColor} arrowDirection={arrowDirection} />}

            <p className="btn-text">{text}</p>

            {arrowSide === "right" && <ArrowBox color={arrowColor} hoverColor={arrowHoverColor} arrowDirection={arrowDirection} />}
        </>
    );
}

// #endregion ---------------------------------------------------------
