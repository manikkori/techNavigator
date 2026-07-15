import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { useAppStore } from "./store/useAppStore";

// Components & Pages
import Navbar from "./components/layout/Navbar";
import DevBadge from "./components/ui/DevBadge";
import CursorGlow from "./components/ui/CursorGlow";
import CustomCursor from "./components/ui/CustomCursor";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import CareerDetails from "./pages/CareerDetails";
import Quiz from "./pages/Quiz";

function App() {
  const theme = useAppStore((state) => state.theme);

  // Initialize Smooth Scrolling (Lenis) & Theme on Load
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

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
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white selection:bg-blue-500/30 transition-colors duration-300 relative">
        {/* The ambient background light */}
        <CursorGlow />

        {/* The actual custom pointer replacing the default mouse */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/career-details" element={<CareerDetails />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>

        {/* Global Floating Dev Badge */}
        <DevBadge />
      </div>
    </Router>
  );
}

export default App;
