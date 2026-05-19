import { Route, Routes } from "react-router-dom";

import { TransitionProvider } from "../context/TransitionContext";
import TransitionComponent from "../layout/PageTransition/PageTransition";

import Accommodations from "../pages/Accommodations/Accommodations";
import Details from "../pages/Details/Details";
import Home from "../pages/Home/Home";
import Registry from "../pages/Registry/Registry";
import RSVP from "../pages/RSVP/RSVP";
import Timeline from "../pages/Timeline/Timeline";

interface Props {
    loaded: boolean;
}

const CustomRouter = ({ loaded }: Props) => {
    return (
        <TransitionProvider>
            <Routes>
                <Route index element={<TransitionComponent><Home loaded={loaded} /></TransitionComponent>} />
                <Route path="/details" element={<TransitionComponent><Details loaded={loaded} /></TransitionComponent>} />
                <Route path="/accommodations" element={<TransitionComponent><Accommodations loaded={loaded} /></TransitionComponent>} />
                <Route path="/registry" element={<TransitionComponent><Registry loaded={loaded} /></TransitionComponent>} />
                <Route path="/rsvp" element={<TransitionComponent><RSVP loaded={loaded} /></TransitionComponent>} />
                <Route path="/timeline" element={<TransitionComponent><Timeline loaded={loaded} /></TransitionComponent>} />
            </Routes>
        </TransitionProvider>
    );
};

export default CustomRouter;
