import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { careersData } from '../utils/data';

const categories = ["All", "Saved", "Development", "Data & AI", "Design", "Cloud & DevOps", "Cybersecurity", "Emerging Tech", "Testing & QA", "Management & Content"];

export default function Careers() {
  const navigate = useNavigate();
  const { savedCareers, toggleSavedCareer, suggestedCategory } = useAppStore();
  const [activeFilter, setActiveFilter] = useState(suggestedCategory || "All");

  const filteredCareers = careersData.filter(career => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Saved") return savedCareers.includes(career.title);
    return career.category === activeFilter;
  });

  return (
    <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto pb-20 bg-[#0a0a0a] text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Explore Tech Careers</h1>
        <p className="text-gray-400">Every computer science field, organized in one premium platform matrix.</p>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-3 mb-12 pb-4 snap-x">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`snap-center flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === category 
                ? category === 'Saved' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-[#171717] border border-[#262626] text-gray-400 hover:text-white hover:bg-[#262626]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCareers.map((career) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={career.title}
              className="group relative bg-[#171717]/50 border border-[#262626] p-6 rounded-2xl hover:bg-[#171717] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full uppercase tracking-wide">
                    {career.category}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleSavedCareer(career.title); }}
                    className="p-2 -m-2 outline-none relative z-20"
                  >
                    <Heart 
                      className={`w-6 h-6 transition-colors ${
                        savedCareers.includes(career.title) ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`} 
                    />
                  </button>
                </div>

                <h2 className="text-xl font-bold mb-2 text-white">{career.title}</h2>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">{career.desc}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {career.skills.map(skill => (
                    <span key={skill} className="bg-[#0a0a0a] border border-[#262626] text-gray-300 text-xs px-2.5 py-1 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => navigate(`/career-details?career=${encodeURIComponent(career.title)}`)}
                  className="w-full py-3 bg-transparent border border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl transition-colors font-semibold text-sm"
                >
                  View Full Details & Roadmap
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredCareers.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-500 font-medium">
            {activeFilter === "Saved" ? "No saved careers yet. Click the heart icon on any career card to save it here!" : "No tracks found in this domain mesh."}
          </div>
        )}
      </motion.div>
    </div>
  );
}