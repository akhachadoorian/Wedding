import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from './components/Navigation';

function App() {
  return (
    <main>
      <Router basename='Wedding'>
        <Navigation />

        <Routes>
          <Route path="/" />
        </Routes>

        {/* Footer */}
      </Router>
    </main>
  );
}

export default App;
