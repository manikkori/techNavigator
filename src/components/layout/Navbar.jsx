import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import {
  Compass,
  Moon,
  Sun,
  ArrowRightCircle,
  Menu,
  X,
  Home,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useAppStore();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-blue-600/20 p-2 rounded-xl group-hover:bg-blue-600/30 transition-colors">
                <Compass className="w-7 h-7 text-blue-600 dark:text-blue-500 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
                TechNav
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {location.pathname !== "/careers" && (
                <Link
                  to="/careers"
                  className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  Explore Careers
                </Link>
              )}

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-800 transition-colors duration-300"></div>

              {/* RESTORED & FIXED DESKTOP THEME BUTTON */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-[#171717] border border-gray-200 dark:border-[#262626] text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 shadow-sm"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {location.pathname !== "/quiz" && (
                <Link
                  to="/quiz"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                >
                  Take Quiz <ArrowRightCircle className="w-4 h-4" />
                </Link>
              )}
            </div>

            <div className="md:hidden flex items-center gap-4">
              {/* RESTORED & FIXED MOBILE THEME BUTTON */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-[#171717] border border-gray-200 dark:border-[#262626] text-gray-600 dark:text-gray-300 transition-colors duration-300"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => setIsMobileOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white dark:bg-[#0f0f0f] border-l border-gray-200 dark:border-[#262626] z-[100] p-6 shadow-2xl flex flex-col md:hidden transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 bg-gray-100 dark:bg-[#171717] rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  to="/"
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-[#171717]/50 border border-gray-200 dark:border-[#262626] text-gray-800 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors"
                >
                  <Home className="w-5 h-5 text-blue-600 dark:text-blue-500" />{" "}
                  Home
                </Link>

                <Link
                  to="/careers"
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-[#171717]/50 border border-gray-200 dark:border-[#262626] text-gray-800 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors"
                >
                  <LayoutGrid className="w-5 h-5 text-purple-600 dark:text-purple-500" />{" "}
                  Explore Careers
                </Link>
              </div>

              <div className="mt-auto mb-8">
                <Link
                  to="/quiz"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Start Career Quiz <ArrowRightCircle className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
