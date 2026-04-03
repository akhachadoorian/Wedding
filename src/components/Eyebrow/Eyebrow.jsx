import './Eyebrow.scss';

function Eyebrow({ variation = "left", color = "gold", text }) {
    let fill = `var(--${color})`;
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
                <div className="diamond_underline-wrapper">
                    <div className="diamond_underline"></div>
                    <Diamond />
                    <div className="diamond_underline"></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`eyebrow-wrapper left ${color}`}>
            <Diamond />
            <p className={`eyebrow ${color}`}>{text}</p>
            <div className={`diamond_underline ${color}`}></div>
        </div>
    );
}

export default Eyebrow;
