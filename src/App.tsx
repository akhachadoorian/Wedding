import { useEffect, useRef, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";

import Footer from "./layout/Footer/Footer";
import LoadingScreen from "./layout/LoadingScreen/LoadingScreen";
import Navigation from "./layout/Navigation/Navigation";
import PageTransition from "./layout/PageTransition/PageTransition";
import { GlobalTooltip, TooltipProvider } from "./layout/GlobalTooltip/GlobalTooltip";
import { TransitionProvider } from "./context/TransitionContext";

import Accommodations from "./pages/Accommodations/Accommodations";
import Details from "./pages/Details/Details";
import RSVP from "./pages/RSVP/RSVP";
import Registry from "./pages/Registry/Registry";
import Timeline from "./pages/Timeline/Timeline";
import Home from "./pages/Home/Home";
import CustomRouter from "./routes/Router";

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
        <TooltipProvider>
            <ReactLenis root options={{ autoRaf: false, duration: 1.2, anchors: true, smoothWheel: true, syncTouch: false, naiveDimensions: true, stopInertiaOnNavigate: true }} ref={lenisRef}>
                {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
                <Router>
                    <TransitionProvider>
                        {/* FIXME: FIX NAV*/}
                        <Navigation />
                        {/* <PageTransition /> */}
                        <main>
                            <CustomRouter loaded={loaded} />
                        </main>
                        <Footer />
                    </TransitionProvider>
                </Router>
                <GlobalTooltip />
            </ReactLenis>
        </TooltipProvider>
    );
}

export default App;
