import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, Bot, ChevronLeft, Download } from "lucide-react";
import { careersData, marketStats } from "../utils/data";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export default function CareerDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const careerTitle = searchParams.get("career");

  const [career, setCareer] = useState(null);
  const [stats, setStats] = useState(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const foundCareer = careersData.find((c) => c.title === careerTitle);
    if (foundCareer) {
      setCareer(foundCareer);
      setStats(
        marketStats[foundCareer.category] || {
          salary: "₹5L - '12L+",
          sPercentage: "50%",
          demand: "85%",
        },
      );
      setMessages([
        {
          role: "ai",
          content: `Hi! I am your AI Mentor. I see you're exploring the **${foundCareer.title}** path. How can I help you?`,
        },
      ]);
    } else {
      navigate("/careers");
    }
  }, [careerTitle, navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: `You are a helpful AI Tech Career Counselor for TechNav. CRITICAL: If asked who created you or the site, say it was developed by Manik Kori. Keep answers short, friendly (max 3 sentences) and structured as plain text without markdown stars.`,
              },
              {
                role: "user",
                content: `User is viewing: "${career.title}". User says: ${userText}`,
              },
            ],
            temperature: 0.7,
            max_tokens: 150,
          }),
        },
      );

      const data = await response.json();
      if (response.ok && data.choices) {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: data.choices[0].message.content },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content:
              "⚠️ API Configuration error. Please verify VITE_GROQ_API_KEY value inside environment layers.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "❌ Network gateway timeout. Check your internet connection.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!career || !stats)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-semibold">
        Loading Architecture Matrix...
      </div>
    );

  const roadmapSteps = [
    {
      title: "Clear the Foundational Principles",
      desc: `Grasp core logic, platform mechanics, and standard workflows specific to ${career.category} architectures.`,
    },
    {
      title: `Master Core Stack: ${career.skills[0] || "Primary Module"}`,
      desc: `Focus heavily on syntax execution. Spend 8-10 weeks building isolated mini-projects utilizing strictly this tool layer.`,
    },
    {
      title: `Integrate Framework Arrays: ${career.skills[1] || "Secondary Core"}`,
      desc: `Transition into asynchronous processing structures, advanced environment routers, and collaborative source version repositories.`,
    },
    {
      title: "Develop High-Impact Real-World Portfolios",
      desc: "Construct 2-3 complex end-to-end applications designed around production parameters. Host live instances and compile precise repository readme files.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-6xl mx-auto relative bg-[#0a0a0a] text-white">
      <button
        onClick={() => navigate("/careers")}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Careers
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 bg-[#171717]/40 border border-[#262626] p-8 md:p-10 rounded-3xl backdrop-blur-md"
        >
          <span className="text-sm font-bold text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full uppercase tracking-wide">
            {career.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-6 mb-4 text-white">
            {career.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
            {career.desc}
          </p>
        </motion.div>

        {/* GLOWING TIMELINE ROADMAP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-[#171717]/20 border border-[#262626] p-8 md:p-10 rounded-3xl backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="flex justify-between items-center mb-10 relative z-10">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-cyan-400" /> Execution Roadmap
            </h2>
            <button className="hidden sm:flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-[#0a0a0a] px-4 py-2 rounded-lg border border-[#262626] transition-colors">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>

          <div className="relative border-l-2 border-white/10 ml-4 space-y-12 pb-4 z-10">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="relative pl-10 group cursor-default">
                <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-[#0a0a0a] border-2 border-[#262626] group-hover:border-cyan-400 group-hover:bg-cyan-400/20 group-hover:shadow-[0_0_20px_#22d3ee] transition-all duration-300"></div>
                <div className="bg-[#171717]/30 border border-[#262626] group-hover:border-white/20 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-4">
                    <span className="text-blue-400 font-mono text-sm opacity-70 bg-blue-500/10 px-2 py-1 rounded">
                      STEP 0{idx + 1}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-500/10 border border-blue-500/20 p-8 rounded-3xl backdrop-blur-md"
          >
            <h3 className="text-xl font-bold mb-4 text-white">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#0a0a0a] border border-[#262626] px-3 py-1.5 rounded-lg text-sm font-medium text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#171717]/40 border border-[#262626] p-8 rounded-3xl backdrop-blur-md flex-grow"
          >
            <h3 className="text-xl font-bold mb-6 text-white">
              Market Insights
            </h3>
            <div className="mb-6">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-gray-400">Salary Scope</span>
                <span className="text-blue-400">{stats.salary}</span>
              </div>
              <div className="w-full bg-[#0a0a0a] rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: stats.sPercentage }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="bg-blue-500 h-full rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-gray-400">Market Demand</span>
                <span className="text-purple-400">{stats.demand}</span>
              </div>
              <div className="w-full bg-[#0a0a0a] rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: stats.demand }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  className="bg-purple-500 h-full rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FIXED AI MENTOR COMPONENT WITH LIQUID CORE ORB */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="w-[350px] h-[450px] bg-[#171717]/95 backdrop-blur-xl border border-[#262626] shadow-2xl rounded-2xl mb-4 flex flex-col overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-wide">
                    TechNav AI Mentor
                  </span>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="hover:bg-white/20 p-1 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 no-scrollbar bg-[#0a0a0a]/30">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-[#0a0a0a] border border-[#262626] text-gray-200 rounded-tl-none"
                      }`}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: msg.content.replace(
                            /\*\*(.*?)\*\*/g,
                            "<strong>$1</strong>",
                          ),
                        }}
                      />
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex w-full justify-start">
                    <div className="p-3 rounded-2xl bg-[#0a0a0a] border border-[#262626] text-gray-400 rounded-tl-none flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75" />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-3 bg-[#0a0a0a] border-t border-[#262626] flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask a question..."
                  className="flex-grow bg-[#171717] border border-[#262626] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isTyping}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="relative w-16 h-16 flex items-center justify-center group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
          <div className="absolute inset-1 bg-[#0a0a0a] rounded-full border border-gray-700/50 z-10 shadow-inner"></div>
          <div
            className="absolute inset-2 bg-gradient-to-tr from-blue-500 via-cyan-400 to-purple-500 rounded-full z-20 animate-[spin_4s_linear_infinite]"
            style={{ filter: "blur(3px)" }}
          ></div>
          <div className="absolute inset-[10px] bg-[#0a0a0a] rounded-full z-30 flex items-center justify-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white font-black text-sm tracking-tighter">
              AI
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
