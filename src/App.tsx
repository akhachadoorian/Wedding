import { useEffect, useRef, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";

import Footer from "./components/globals/Footer/Footer";
import LoadingScreen from "./components/globals/LoadingScreen/LoadingScreen";
import Navigation from "./components/globals/Navigation/Navigation";
import ScrollToHash from "./hooks/ScrollToHash";

import Accommodations from "./pages/Accommodations";
import Details from "./pages/Details";
import RSVP from "./pages/RSVP";
import Registry from "./pages/Registry";
import Timeline from "./pages/Timeline";
import Wedding from "./pages/Wedding";

gsap.registerPlugin(ScrollTrigger);

// FIXME: toggle loader for dev
const DISABLE_LOADER = true;

function App() {

    const [loaded, setLoaded] = useState(DISABLE_LOADER);


    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        return () => gsap.ticker.remove(update);
    }, []);



    return (
        <ReactLenis root options={{ autoRaf: false, duration: 1.2, anchors: true, smoothWheel: true, syncTouch: false, naiveDimensions: true, stopInertiaOnNavigate: true }} ref={lenisRef}>
            {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
            <Router>
                {/* <ScrollToHash /> */}
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
        </ReactLenis>
    );
}

export default App;
