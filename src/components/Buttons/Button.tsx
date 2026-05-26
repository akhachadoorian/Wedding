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
    colorScheme = "gold",
    fullWidth = false,

    className, // pulled out because this components constructs it for LenisLink
    ...rest // includes a11yProps and HTMLProps
}: ButtonProps) {

    const decorationColor = ColorSchemeMap.DECORATION.get(colorScheme, variant);


    const btnClass = `btn btn-variant-${variant} btn-color_scheme-${colorScheme} ${className ?? ""} ${fullWidth ? "btn-full_width" : ""}`;

    if (btnSettings.type === "modal") return <ModalButton btnClass={btnClass} btnSettings={btnSettings} decorationColor={decorationColor} {...rest} />;

    if (btnSettings.type === 'link') return <LinkButton btnClass={btnClass} btnSettings={btnSettings} decorationColor={decorationColor} {...rest} /> 

    return <VisualButton btnClass={btnClass} btnSettings={btnSettings} decorationColor={decorationColor} {...rest} /> 

}
// #region --- Button Types Rendering ---------------------------------------------

function ModalButton({ btnClass, btnSettings, decorationColor, ...rest }: { btnClass: string; btnSettings: ModalButtonSettings; decorationColor: CssColor }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button {...rest} className={btnClass} onClick={() => setModalOpen(true)}>
                <ButtonInner text={btnSettings.text} decoration={btnSettings.decoration} decorationColor={decorationColor} />
            </button>

            <Modal {...btnSettings.modalContent} id={btnSettings.modalID} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}

function LinkButton({ btnClass, btnSettings, decorationColor, ...rest }: { btnClass: string; btnSettings: LinkButtonSettings; decorationColor: CssColor }) {
    return (
        <LenisLink {...rest} className={btnClass} to={btnSettings.link} target={btnSettings.target ?? "_self"}>
            <ButtonInner text={btnSettings.text} decoration={btnSettings.decoration} decorationColor={decorationColor} />
        </LenisLink>
    );
}

function VisualButton({ btnClass, btnSettings, decorationColor, ...rest }: { btnClass: string; btnSettings: VisualButtonSettings; decorationColor: CssColor }) {
    return (
        <div {...rest} className={btnClass}>
            <ButtonInner text={btnSettings.text} decoration={btnSettings.decoration} decorationColor={decorationColor} />
        </div>
    )
}

// #endregion ---------------------------------------------------------

// #region --- Button Inner Rendering ---------------------------------------------

function ButtonInner({ text, decoration, decorationColor }: { text: string; decoration?: BtnDecoration; decorationColor: CssColor }) {
    if (decoration?.type === "arrow") return <ArrowButtonInner text={text} arrowColor={decorationColor} arrowSide={decoration.arrowSide ?? 'right'} arrowDirection={decoration.arrowDirection ? decoration.arrowDirection : decoration.arrowSide === 'left' ? 'left' : 'top-right' } /> ;

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

function ArrowButtonInner({ text, arrowSide, arrowDirection, arrowColor }: { text: string; arrowSide: "left" | "right"; arrowDirection: ArrowDirectionProps; arrowColor: CssColor }) {
    return (
        <>
            {arrowSide === "left" && <ArrowBox color={arrowColor} arrowDirection={arrowDirection} />}

            <p className="btn-text">{text}</p>

            {arrowSide === "right" && <ArrowBox color={arrowColor} arrowDirection={arrowDirection} />}
        </>
    );
}

// #endregion ---------------------------------------------------------
