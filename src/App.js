import logo from "./logo.svg";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/globals/Navigation";
import Wedding from "./pages/Wedding";

import Lenis from "lenis";
import "lenis/dist/lenis.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./components/globals/Footer";

import { LenisContext } from "./context/LenisContext";
import LoadingScreen from "./components/LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [lenisInstance, setLenisInstance] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            duration: 1.2,
        });

        setLenisInstance(lenis);

        lenis.on("scroll", ScrollTrigger.update);

        const update = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        if (!lenisInstance) return;

        if (!loaded) {
            lenisInstance.stop();
        } else {
            lenisInstance.start();
        }
    }, [loaded, lenisInstance]);

    return (
        <LenisContext.Provider value={lenisInstance}>
            {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
            <Router>
                <Navigation /> {/* renders <nav> */}
                <main>
                    <Routes>
                        <Route path="/" element={<Wedding loaded={loaded} />} />
                    </Routes>
                </main>
                <Footer /> {/* renders <footer> */}
            </Router>
        </LenisContext.Provider>
    );
}

export default App;
