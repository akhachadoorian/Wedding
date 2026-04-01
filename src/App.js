import logo from './logo.svg';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from './components/globals/Navigation';
import Wedding from './pages/Wedding';

import { useEffect } from 'react';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  useEffect(() => {
  const lenis = new Lenis({
    // autoRaf: true  ← remove this
    lerp: 0.1,
    duration: 1.2,
  });

  // Give GSAP control of the loop
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.destroy();
  };
}, []);

  return (
    <main>
      <Router basename='/Wedding'>
        <Navigation />

        <Routes>
          <Route path="/" element={<Wedding />} />
        </Routes>

        {/* Footer */}
      </Router>
    </main>
  );
}

export default App;
