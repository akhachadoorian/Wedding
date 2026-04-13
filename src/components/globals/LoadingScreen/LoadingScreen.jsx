import { useEffect, useState } from "react";
import "./LoadingScreen.scss";

function LoadingScreen({ onComplete }) {
    const [phase, setPhase] = useState("visible"); // "visible" | "fadeOut" | "done"

      useEffect(() => {
        // Hold for 2s, then fade out over 0.8s
        const hold = setTimeout(() => setPhase("fadeOut"), 2000);
        const done = setTimeout(() => {
          setPhase("done");
          onComplete?.();
        }, 2800);

        return () => {
          clearTimeout(hold);
          clearTimeout(done);
        };
      }, [onComplete]);

    if (phase === "done") return null;

    const Diamond = () => (
        <svg className="diamond" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11.707 0.707153L22.707 11.7072L11.707 22.7072L0.707031 11.7072L11.707 0.707153Z" stroke="var(--gold-500)" />
            <path opacity="0.6" d="M11.707 6.20715L17.207 11.7072L11.707 17.2072L6.20703 11.7072L11.707 6.20715Z" fill="var(--gold-500)" />
        </svg>
    );

    return (
        <div className={`loader-wrapper ${phase === "fadeOut" ? "loader--out" : ""}`}>
            <div className="loader-rays">
                {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="loader-ray" style={{ "--i": i }} />
                ))}
            </div>

            <div className="loader-content">
                <div className="loader-monogram">
                    <p>Max</p>
                    {/* <div className="loader-diamond" /> */}
                    <p className="loader-and">&</p>
                    <p>Alex</p>
                </div>
                <div className="loader-bar-wrapper">
                    <Diamond />
                    <div className="loader-bar">
                        <div className="loader-bar-fill" />
                    </div>
                    <Diamond />
                </div>

                <p className="loader-label eyebrow">October 31, 2026 — Halloween</p>
            </div>
        </div>
    );
}

export default LoadingScreen;
