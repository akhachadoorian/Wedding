import React from "react";

function Eyebrow({ variation = "left", color = "gold", text }) {
    let fill = `var(--${color})`;

    // const DiamondUnderline = () => (
    //     <svg xmlns="http://www.w3.org/2000/svg" width="374" height="18" viewBox="0 0 374 18" fill="none">
    //         <path d="M187 4.70709L191 8.70709L187 12.7071L183 8.70709L187 4.70709Z" fill={fill} />
    //         <path d="M0 8.70709H171M203 8.70709H374M187 0.707092L195 8.70709L187 16.7071L179 8.70709L187 0.707092ZM187 4.70709L191 8.70709L187 12.7071L183 8.70709L187 4.70709Z" stroke={fill} />
    //     </svg>
    // );

    const Diamond = () => (
        <svg className="diamond" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11.707 0.707153L22.707 11.7072L11.707 22.7072L0.707031 11.7072L11.707 0.707153Z" stroke={fill} />
            <path opacity="0.6" d="M11.707 6.20715L17.207 11.7072L11.707 17.2072L6.20703 11.7072L11.707 6.20715Z" fill={fill} />
        </svg>
    );

    if (variation == "centered") {
        return (
            <div className={`eyebrow-wrapper centered ${color}`}>
                <p className={`eyebrow ${color}`}>{text}</p>
                <div class="diamond_underline-wrapper">
                    <div class="diamond_underline"></div>
                    <Diamond />
                    <div class="diamond_underline"></div>
                </div>

                {/* <DiamondUnderline /> */}
            </div>
        );
    }

    return (
        <div className={`eyebrow-wrapper left ${color}`}>
            <Diamond />
            <p className="eyebrow">{text}</p>
        </div>
    );
}

export default Eyebrow;
