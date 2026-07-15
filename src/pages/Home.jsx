import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  ArrowRight,
  Compass,
  BrainCircuit,
  Target,
  Layout,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import SpotlightGrid from "../components/ui/SpotlightGrid";
import MagneticButton from "../components/ui/MagneticButton";

export default function Home() {
  const navigate = useNavigate();
  const heroTextRef = useRef(null);

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current.children,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" },
      );
    }
  }, []);

  const coreFeatures = [
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "40+ Tech Domains",
      desc: "Complete breakdown from Core Engineering to Management fields.",
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-purple-500" />,
      title: "Natural Interest Quiz",
      desc: "Algorithmic assessment mapping your cognitive patterns to the right tech stack.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-cyan-400" />,
      title: "Market Demands & Salaries",
      desc: "Real-time industry packages and growth stats mapped to each role.",
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-blue-500" />,
      title: "Context-Aware AI",
      desc: "Instant AI Mentor that knows exactly which career roadmap you are exploring.",
    },
  ];

  return (
    <main className="relative min-h-screen flex flex-col pt-24 px-4 overflow-hidden bg-transparent">
      {/* Background is now fully handled by SpotlightGrid */}
      <SpotlightGrid />

      <section className="flex-grow flex flex-col items-center justify-center text-center max-w-5xl mx-auto min-h-[75vh]">
        <div ref={heroTextRef} className="overflow-hidden mb-6">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl">
            Stuck in the Tech Maze?
          </h1>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Find Your Absolute Domain.
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
        >
          With over 40+ specialized fields in computer science, guessing your
          future is a trap. Take our strategic assessment to unlock your perfect
          tech trajectory backed by comprehensive roadmaps, market salaries, and
          deep AI consultation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-5 z-10"
        >
          <MagneticButton
            onClick={() => navigate("/quiz")}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl overflow-hidden transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] border border-blue-400/30"
          >
            Start the Career Quiz{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            onClick={() => navigate("/careers")}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0a0a0a]/60 backdrop-blur-md border border-[#262626] text-white font-semibold rounded-xl hover:bg-[#262626] transition-colors duration-300"
          >
            <Compass className="w-5 h-5" /> Explore 40+ Fields
          </MagneticButton>
        </motion.div>
      </section>

      <section className="py-24 max-w-7xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-blue-500 font-bold tracking-wider uppercase text-sm">
            The Platform Matrix
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-6 text-white">
            From Ultimate Confusion to a Perfect Career Strategy
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-gray-400 leading-relaxed bg-[#0a0a0a]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-md"
          >
            <p>
              Maximum students face severe anxiety trying to pick between Web
              Development, Artificial Intelligence, Cloud Architectures, or
              Cybersecurity. The data is scattered, and generic opinions lead to
              wasted semesters.
            </p>
            <p>
              <strong className="text-white">TechNav</strong> standardizes this
              transition. By tracking user cognitive responses against a mapped
              layout of development ecosystems, we highlight your baseline
              compatibility, present automated learning paths, map actual salary
              scales, and stand by with real-time AI context checking.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {coreFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#171717]/80 backdrop-blur-md border border-[#262626] p-6 rounded-3xl hover:border-blue-500/50 transition-colors shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-colors duration-500"></div>
                <div className="mb-4 relative z-10">{feat.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2 relative z-10">
                  {feat.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
