import { LenisLink } from "../../hooks/LenisLink";
import { ButtonProps } from "../../types/buttons";
import { ColorVariables } from "../../types/colors";
import ArrowBox, { ArrowDirectionProps } from "../ArrowBox/ArrowBox";
import { Icon } from "@phosphor-icons/react";

import "./Button.scss";

const DECORATION_COLOR_MAP: Record<string, Record<string, ColorVariables>> = {
    cream: { solid: "--gold-500", outline: "--cream-500", lines: "--cream-500" },
    gold: { solid: "--cream-500", outline: "--gold-500", lines: "--gold-500" },
};

export default function Button({
    btnSettings,

    variant = "solid",
    colorScheme = "gold",
    decoration,

    className, // pulled out because this components constructs it for LenisLink
    ...rest // includes a11yProps and HTMLProps
}: ButtonProps) {
    const decorationColor = (DECORATION_COLOR_MAP[colorScheme]?.[variant] ?? "--cream-500") as ColorVariables;

    return (
        <LenisLink
            className={`btn 
                btn-variant-${variant} 
                btn-color_scheme-${colorScheme} 
                ${className ?? ""}
            `}
            to={btnSettings.link}
            target={btnSettings.target ?? "_self"}
            {...rest}
        >
            {decoration && decoration.type === "arrow" ? (
                <ArrowButtonInner
                    arrowSide={decoration.arrowSide ?? "right"}
                    arrowDirection={decoration.arrowDirection ? decoration.arrowDirection : decoration.arrowSide === "left" ? "top-left" : "top-right"}
                    arrowColor={decorationColor}
                    text={btnSettings.text}
                />
            ) : decoration && decoration.type === "icon" && decoration.icon ? (
                <IconButtonInner icon={decoration.icon} iconColor={decorationColor} text={btnSettings.text} />
            ) : (
                <p className="btn-text">{btnSettings.text}</p>
            )}
        </LenisLink>
    );
}

function IconButtonInner({ text, icon, iconColor }: { text: string; icon: Icon, iconColor: ColorVariables }) {
    const IconComponent = icon;
    return (
        <>
            <IconComponent size={24} color={`var(${iconColor})`} />
            <p className="btn-text">{text}</p>
        </>
    );
}

function ArrowButtonInner({ text, arrowSide, arrowDirection, arrowColor }: { text: string; arrowSide: "left" | "right"; arrowDirection: ArrowDirectionProps; arrowColor: ColorVariables }) {
    return (
        <>

            <p className="btn-text">{text}</p>

            {arrowSide === "right" && <ArrowBox color={arrowColor} arrowDirection={arrowDirection} />}
        </>
    );
}
