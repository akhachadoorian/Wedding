import logo from "./logo.svg";
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/globals/Navigation";
import Wedding from "./pages/Wedding";

import Lenis from "lenis";
import "lenis/dist/lenis.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./components/globals/Footer";

import { LenisContext } from "./context/LenisContext";

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [lenisInstance, setLenisInstance] = useState(null);

    useEffect(() => {
        const lenis = new Lenis({
            // autoRaf: true  ← remove this
            lerp: 0.1,
            duration: 1.2,
        });

        setLenisInstance(lenis);

        // Give GSAP control of the loop
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisInstance}>
            <Router>
                <Navigation /> {/* renders <nav> */}
                <main>
                    <Routes>
                        <Route path="/" element={<Wedding />} />
                    </Routes>
                </main>
                <Footer /> {/* renders <footer> */}
            </Router>
        </LenisContext.Provider>
    );
}

export default App;
