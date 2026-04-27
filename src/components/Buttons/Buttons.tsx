import React from "react";
import { Link } from "react-router-dom";

import { BtnStyles, BtnThemes, ButtonProps, ThreeButtonsProps } from "../../types/buttons";
import { ColorVariables } from "../../types/colors";
import ArrowBox from "../ArrowBox/ArrowBox";

import "./Buttons.scss";

export default function Buttons({ style = "solid", theme, className, btnSettings, includeArrow = true, arrowSettings }: ButtonProps) {
    const arrowThemeMap: Record<string, Record<string, ColorVariables>> = {
        cream: { solid: "--gold-500", outline: "--cream-500", lines: "--cream-500" },
        gold: { solid: "--cream-500", outline: "--gold-500", lines: "--gold-500" },
    };
    const arrowTheme = (arrowThemeMap[theme]?.[style] ?? "--cream-500") as ColorVariables;

    return (
        <div className={`btn-wrapper ${className ?? ""}`}>
            <Link to={btnSettings.link} className={`btn ${style} ${theme}`}>
                {includeArrow && arrowSettings?.arrowSide === "left" && <ArrowBox color={arrowTheme} arrowDirection={arrowSettings?.arrowDirection} />}

                <p className="btn-text">{btnSettings.btnText}</p>

                {includeArrow && arrowSettings?.arrowSide != "left" && <ArrowBox color={arrowTheme} arrowDirection={arrowSettings?.arrowDirection} />}
            </Link>
        </div>
    );
}

export function ThreeButtons({ buttons, className }: ThreeButtonsProps) {
    if (buttons === undefined || buttons?.length == 0) return;

    const styleMap: Array<BtnStyles> = [
        'solid', 'outline', 'lines'
    ];

    const themeMap: Array<BtnThemes> = [
        "gold", "gold", "cream"
    ];

    return (
        <div className={`btns ${className}`}>
            {buttons?.map((btn, idx) => {
                return (
                    <Buttons
                        className=""
                        style={styleMap[idx]}
                        theme={themeMap[idx]}
                        btnSettings={{
                            btnText: btn.btnText,
                            link: btn.link,
                            target: btn.target ?? "_self",
                        }}
                        includeArrow={true}
                    />
                );
            })}
        </div>
    );
}
