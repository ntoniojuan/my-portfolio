"use client";

import { useState, useEffect, useRef } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Moon, Sun, Briefcase, Code, FileText, Terminal, X, Download } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="min-h-screen flex flex-col items-center p-6 md:p-12 transition-colors duration-300">
        <Navbar />
        <Hero />
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="w-full max-w-4xl flex justify-between items-center mb-16 p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-200 dark:border-zinc-800 transition-colors">
      <div className="font-bold text-lg dark:text-white">Aj Norona</div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-md bg-slate-100 dark:bg-zinc-800 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <div className="text-center max-w-2xl mb-16">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 dark:text-white">Aj Norona</h1>
      <h2 className="text-xl font-medium text-slate-600 dark:text-zinc-400 mb-6">
        QA Engineer | CE Manager | Automation Advocate
      </h2>
      <p className="text-lg text-slate-500 dark:text-zinc-500 italic">
        "I build systems that make teams faster and processes cleaner."
      </p>
    </div>
  );
}

function Dashboard() {
  const { theme } = useTheme();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const cards = [
    { id: "experience", title: "Experience", icon: <Briefcase size={24} /> },
    { id: "tech", title: "Tech Stack", icon: <Code size={24} /> },
    { id: "resume", title: "Resume", icon: <FileText size={24} /> },
  ];

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => setActiveModal(card.id)}
            className="flex flex-col items-center p-8 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all dark:text-white shadow-sm"
          >
            <div className="text-slate-400 mb-4">{card.icon}</div>
            <h3 className="font-semibold">{card.title}</h3>
          </button>
        ))}
      </div>

      {activeModal && (
        <TerminalModal
          section={activeModal}
          onClose={() => setActiveModal(null)}
          isDark={theme === "dark"}
        />
      )}
    </div>
  );
}

function TerminalModal({ section, onClose, isDark }: { section: string, onClose: () => void, isDark: boolean }) {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(!isDark);
  const [history, setHistory] = useState([`Type "open ${section}" to view content.`]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isDark && !unlocked) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isDark, unlocked]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput("");
    
    if (cmd === `open ${section}`) {
      setUnlocked(true);
    } else {
      setHistory([...history, `> ${cmd}`, `Error: Invalid command. Try "open ${section}"`]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-3 border-b border-slate-200 dark:border-zinc-800 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            {isDark && !unlocked && <Terminal size={16} />}
            <span className="text-sm font-mono">{isDark && !unlocked ? 'aj-terminal ~' : `Viewing: ${section}`}</span>
          </div>
          <button onClick={onClose} className="hover:text-slate-500 transition-colors"><X size={20} /></button>
        </div>

        <div className="p-6 h-96 overflow-y-auto">
          {isDark && !unlocked && (
            <div className="font-mono text-sm space-y-2 text-slate-300">
              {history.map((line, i) => <div key={i}>{line}</div>)}
              <form onSubmit={handleCommand} className="flex mt-4">
                <span className="text-emerald-500 mr-2">guest@aj:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-white flex-grow caret-emerald-500"
                  spellCheck="false"
                  autoComplete="off"
                />
              </form>
            </div>
          )}

          {unlocked && (
            <div className="dark:text-white animate-in fade-in duration-500">
              {section === "experience" && (
                <div>
                  <h3 className="text-xl font-bold">MedGrocer</h3>
                  <p className="text-blue-500 font-medium">QA Engineer / CE Manager</p>
                  <p className="text-sm text-slate-500 mt-1 mb-4">2023 – Present</p>
                  <ul className="list-disc ml-5 space-y-2 text-slate-600 dark:text-zinc-400">
                    <li>Led QA automation initiatives</li>
                    <li>Built Airtable and Make automations</li>
                    <li>Standardized web testing structure</li>
                  </ul>
                </div>
              )}
              {section === "tech" && (
                <div className="flex flex-wrap gap-2">
                  {["Playwright", "Next.js", "Make", "Airtable", "JavaScript", "Tailwind"].map(t => (
                    <span key={t} className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-full text-sm border border-slate-200 dark:border-zinc-700">{t}</span>
                  ))}
                </div>
              )}
              {section === "resume" && (
                <div className="flex flex-col items-center justify-center mt-10">
                  <FileText size={48} className="text-slate-400 mb-4" />
                  <button className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-lg">
                    <Download size={18} /> Download PDF
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
