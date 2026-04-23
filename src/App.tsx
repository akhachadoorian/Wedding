import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { LenisContext } from "./context/LenisContext";

import Footer from "./components/globals/Footer/Footer";
import LoadingScreen from "./components/globals/LoadingScreen/LoadingScreen";
import Navigation from "./components/globals/Navigation/Navigation";

import Accommodations from "./pages/Accommodations";
import Details from "./pages/Details";
import RSVP from "./pages/RSVP";
import Registry from "./pages/Registry";
import Wedding from "./pages/Wedding";
import Timeline from "./pages/Timeline";

gsap.registerPlugin(ScrollTrigger);

// FIXME: toggle loader for dev
const DISABLE_LOADER = true;

function App() {
    const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
    const [loaded, setLoaded] = useState(DISABLE_LOADER);

    useEffect(() => {
        const lenis = new Lenis({
            // lerp: 0.1,
            duration: 1.2,
            anchors: true,
            smoothWheel: true,
            syncTouch: false,
            // touchMultiplier: 2,
        });

        setLenisInstance(lenis);

        lenis.on("scroll", ScrollTrigger.update);

        const update = (time:number) => {
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
                <Navigation />
                <main>
                    <Routes>
                        <Route path="/" element={<Wedding loaded={loaded} />} />
                        <Route path="/details" element={<Details loaded={loaded} />} />
                        <Route path="/accommodations" element={<Accommodations loaded={loaded} />} />
                        <Route path="/registry" element={<Registry loaded={loaded} />} />
                        <Route path="/rsvp" element={<RSVP loaded={loaded} />} />
                        <Route path="/timeline" element={<Timeline loaded={loaded} />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </LenisContext.Provider>
    );
}

export default App;
