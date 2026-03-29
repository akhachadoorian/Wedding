import logo from './logo.svg';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from './components/globals/Navigation';
import Wedding from './pages/Wedding';



function App() {
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
