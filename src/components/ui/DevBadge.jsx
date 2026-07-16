import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";

export default function DevBadge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-3">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-surface/90 backdrop-blur-md border border-surfaceHover text-white rounded-full shadow-2xl flex items-center justify-center z-10 relative group"
      >
        <Code2
          className={`w-5 h-5 transition-colors ${isOpen ? "text-primary" : "text-gray-400 group-hover:text-primary"}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-surface/90 backdrop-blur-xl shadow-2xl border border-surfaceHover rounded-full px-5 py-2.5 flex items-center gap-4"
          >
            <span className="text-sm font-semibold text-gray-200 whitespace-nowrap">
              Developed by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-extrabold">
                Manik Kori
              </span>
            </span>

            <div className="w-px h-5 bg-surfaceHover"></div>

            <div className="flex items-center gap-3">
              {/* Custom GitHub SVG */}
              <a
                href="https://github.com/manikkori"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-transform hover:scale-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              {/* Custom LinkedIn SVG */}
              <a
                href="https://www.linkedin.com/in/manik-kori/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-primary transition-transform hover:scale-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              {/* Custom Instagram SVG */}
              <a
                href="https://www.instagram.com/_the.manik"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-transform hover:scale-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
