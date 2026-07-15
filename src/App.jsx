import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

// Components & Pages
import Navbar from './components/layout/Navbar';
import DevBadge from './components/ui/DevBadge';
import CursorGlow from './components/ui/CursorGlow';
import CustomCursor from './components/ui/CustomCursor';
import Home from './pages/Home';
import Careers from './pages/Careers';
import CareerDetails from './pages/CareerDetails';
import Quiz from './pages/Quiz';

function App() {
  useEffect(() => {
    // strict dark mode enforced
    document.documentElement.classList.add('dark');

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 relative">
        <CursorGlow />
        <CustomCursor />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/career-details" element={<CareerDetails />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>

        <DevBadge />
      </div>
    </Router>
  );
}

export default App;