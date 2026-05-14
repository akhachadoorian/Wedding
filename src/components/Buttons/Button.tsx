import { LenisLink } from "../../hooks/LenisLink";
import { ButtonProps } from "../../types/buttons";
import { ColorVariables } from "../../types/colors";
import ArrowBox, { ArrowDirectionProps } from "../ArrowBox/ArrowBox";
import { Icon } from "@phosphor-icons/react";

import "./Button.scss";

const ARROW_THEME_MAP: Record<string, Record<string, ColorVariables>> = {
    cream: { solid: "--gold-500", outline: "--cream-500", lines: "--cream-500" },
    gold: { solid: "--cream-500", outline: "--gold-500", lines: "--gold-500" },
};

const DEFAULT_ARROW_SETTINGS = {
    arrowSide: "right",
    arrowDirection: "top-right",
};

export default function Button({
    btnSettings,

    variant = "solid",
    colorScheme = "gold",
    decoration,

    className, // pulled out because this components constructs it for LenisLink
    ...rest // includes a11yProps and HTMLProps
}: ButtonProps) {
    const arrowColor = (ARROW_THEME_MAP[colorScheme]?.[variant] ?? "--cream-500") as ColorVariables;

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
                    arrowColor={arrowColor}
                    text={btnSettings.text}
                />
            ) : decoration && decoration.type === "icon" && decoration.icon ? (
                <IconButtonInner icon={decoration.icon} text={btnSettings.text} />
            ) : (
                <p className="btn-text">{btnSettings.text}</p>
            )}
        </LenisLink>
    );
}

function IconButtonInner({ text, icon }: { text: string; icon: Icon }) {
    const IconComponent = icon;
    return (
        <>
            <IconComponent size={16} />
            <p className="btn-text">{text}</p>
        </>
    );
}

function ArrowButtonInner({ text, arrowSide, arrowDirection, arrowColor }: { text: string; arrowSide: "left" | "right"; arrowDirection: ArrowDirectionProps; arrowColor: ColorVariables }) {
    return (
        <>
            {arrowSide === "left" && <ArrowBox color={arrowColor} arrowDirection={arrowDirection} />}

            <p className="btn-text">{text}</p>

            {arrowSide === "right" && <ArrowBox color={arrowColor} arrowDirection={arrowDirection} />}
        </>
    );
}
