import React from "react";
import './Buttons.scss';
import { Link } from "react-router-dom";
import ArrowBox from "../ArrowBox/ArrowBox";
import { ColorVariables } from "../../types/colors";

type ButtonProps = {
    style: 'solid' | 'outline' | "lines"
    theme: 'gold' | 'cream'
    className?: string
    btnText: string
    link: string
}

export default function Buttons({style = "solid", theme, className, btnText, link}:ButtonProps) {
    
    let arrowTheme = "--cream-500" as ColorVariables;
    if (theme == "cream") {
        if (style == "solid") {
            arrowTheme = "--gold-500" as ColorVariables;
        }
        else if (style == "outline" || style == "lines") {
            arrowTheme = "--cream-500" as ColorVariables;
        }
    }
    else if (theme == "gold") {
        if (style == "solid") {
            arrowTheme = "--cream-500" as ColorVariables;
        }
        else if (style == "outline" || style == "lines") {
            arrowTheme = "--gold-500" as ColorVariables;
        }
    }

    return (
        <div className={`btn-wrapper ${className ?? ""}`}>
            <Link to={link} className={`btn ${style} ${theme}`}>
                <p className="btn-text">{btnText}</p>

                <ArrowBox color={arrowTheme} />
            </Link>
        </div>
    )
}