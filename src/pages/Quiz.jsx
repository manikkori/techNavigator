import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

const quizData = [
  {
    question: "What do you enjoy doing the most in your free time?",
    options: [
      { text: "Building new websites or apps", category: "Development" },
      { text: "Drawing, editing graphics or videos", category: "Design" },
      {
        text: "Solving puzzles or playing with numbers",
        category: "Data & AI",
      },
      {
        text: "Figuring out how gadgets and networks work",
        category: "Cybersecurity",
      },
    ],
  },
  {
    question: "If an error occurs in a project, what is your reaction?",
    options: [
      { text: "Find the bug and fix the code", category: "Development" },
      {
        text: "Think of a new way to secure the system",
        category: "Cybersecurity",
      },
      {
        text: "Try to understand the pattern of why the error occurred",
        category: "Data & AI",
      },
      {
        text: "Modify the UI so the error looks better to the user",
        category: "Design",
      },
    ],
  },
  {
    question: "Which of these tools or subjects do you find most interesting?",
    options: [
      { text: "Figma, Photoshop, or Canva", category: "Design" },
      { text: "Maths, Statistics, or Excel", category: "Data & AI" },
      { text: "VS Code, Git, and Coding Languages", category: "Development" },
      {
        text: "Linux, Networking, or Cloud Platforms",
        category: "Cloud & DevOps",
      },
    ],
  },
  {
    question: "In the future, what kind of product would you like to work on?",
    options: [
      { text: "An AI that talks like a human", category: "Data & AI" },
      { text: "A new app used by millions of people", category: "Development" },
      {
        text: "A super secure system that cannot be hacked",
        category: "Cybersecurity",
      },
      {
        text: "A website with a mind-blowing visual design",
        category: "Design",
      },
    ],
  },
  {
    question: "What is usually your role in a team?",
    options: [
      { text: "Building and coding the actual idea", category: "Development" },
      {
        text: "Working on presentations and project visuals",
        category: "Design",
      },
      {
        text: "Collecting data and building the core logic",
        category: "Data & AI",
      },
      {
        text: "Making sure everything runs without crashing",
        category: "Cloud & DevOps",
      },
    ],
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const setSuggestedCategory = useAppStore(
    (state) => state.setSuggestedCategory,
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({
    Development: 0,
    Design: 0,
    "Data & AI": 0,
    "Cloud & DevOps": 0,
    Cybersecurity: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [winningCategory, setWinningCategory] = useState("");

  const handleOptionClick = (category) => {
    // Update score
    setScores((prev) => ({ ...prev, [category]: prev[category] + 1 }));

    // Move to next question or show result
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      calculateResult(category);
    }
  };

  const calculateResult = (finalCategory) => {
    const finalScores = {
      ...scores,
      [finalCategory]: scores[finalCategory] + 1,
    };
    let highestCategory = "Development";
    let maxScore = -1;

    for (const [cat, score] of Object.entries(finalScores)) {
      if (score > maxScore) {
        maxScore = score;
        highestCategory = cat;
      }
    }

    setWinningCategory(highestCategory);
    setSuggestedCategory(highestCategory);
    setShowResult(true);
  };

  const progressPercentage = (currentIndex / quizData.length) * 100;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background Glow based on progress */}
      <div
        className="absolute inset-0 opacity-20 transition-colors duration-1000 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${
            currentIndex % 2 === 0 ? "#3b82f6" : "#8b5cf6"
          } 0%, transparent 60%)`,
        }}
      />

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-surface/60 backdrop-blur-xl border border-surfaceHover p-8 md:p-12 rounded-3xl shadow-2xl"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-400 mb-3">
                  <span>
                    Question {currentIndex + 1} of {quizData.length}
                  </span>
                  <span>{Math.round(progressPercentage)}% Completed</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{
                      width: `${((currentIndex - 1) / quizData.length) * 100}%`,
                    }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
                {quizData[currentIndex].question}
              </h2>

              <div className="space-y-4">
                {quizData[currentIndex].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionClick(option.category)}
                    className="w-full text-left p-5 rounded-2xl border border-surfaceHover bg-surface hover:bg-surfaceHover hover:border-primary transition-all duration-200 group"
                  >
                    <span className="font-medium text-gray-200 group-hover:text-white">
                      {option.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface/60 backdrop-blur-xl border border-surfaceHover p-8 md:p-12 rounded-3xl shadow-2xl text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-6 ring-4 ring-primary/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-gray-400 text-lg mb-6">
                Based on your unique profile, your ideal tech career path is:
              </p>

              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-12 py-2">
                {winningCategory}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate("/careers")}
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Explore This Path <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-transparent border border-surfaceHover text-gray-300 font-bold rounded-xl hover:bg-surfaceHover transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
