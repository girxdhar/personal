import { useState, useEffect, useRef } from "react";
import { portfolioData } from "../../data/portfolioData";

export default function TerminalInterface({ locked, setLocked }) {
  const [commandHistory, setCommandHistory] = useState<{ command: string; output: string }[]>([]);
  const [input, setInput] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [booting, setBooting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const termRef = useRef<HTMLDivElement>(null);

  const bootLines = [
    "INITIALIZING SYSTEM SEQUENCE 0xA23F... OK",
    "LOADING BIOS EXTENSIONS: [0x0012,0x00AF,0x0F3D]",
    "MEMORY MAP CHECK: 640KB BASE, 63MB EXTENDED... VERIFIED",
    "SYSTEM ONLINE: NO ERRORS DETECTED"
  ];

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBooting(false);
      setLocked(false);
    }, 2500); // Faster boot
    return () => clearTimeout(bootTimer);
  }, [setLocked]);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [commandHistory, booting, input]);

  const interpret = (cmd: string) => {
    const lower = cmd.toLowerCase();
    if (["hello", "hi", "hey"].includes(lower))
      return "Hello there! Welcome to my terminal. Type 'help' to see commands.";
    if (lower === "help")
      return "Commands:\n about\n experience\n skills\n projects\n education\n certifications\n contact\n clear";
    if (lower === "clear") return "CLEAR_SCREEN";
    if (lower.includes("about")) return portfolioData.about.content;
    if (lower.includes("experience"))
      return portfolioData.experience.map((e) => `${e.title} @ ${e.company}\n${e.period}\n${e.description}`).join("\n\n");
    if (lower.includes("skills"))
      return (
        `Languages:\n  ${portfolioData.skills.languages.join(", ")}\n\n` +
        `Frameworks:\n  ${portfolioData.skills.frameworks.join(", ")}\n\n` +
        `Tools:\n  ${portfolioData.skills.tools.join(", ")}`
      );
    if (lower.includes("projects"))
      return portfolioData.projects.map((p, i) => `${i + 1}. ${p.name}\n   ${p.description}`).join("\n\n");
    if (lower.includes("education"))
      return portfolioData.education.map((e) => `${e.degree}\n${e.institution} (${e.year})`).join("\n\n");
    if (lower.includes("contact"))
      return `Email: ${portfolioData.contact.email}\nGitHub: ${portfolioData.contact.github}`;
    return `Unknown command '${cmd}'. Type 'help'.`;
  };

  const runCommand = (cmd: string) => {
    if (locked) return;
    setLocked(true);
    const output = interpret(cmd);
    if (output === "CLEAR_SCREEN") {
      setCommandHistory([]);
      setLocked(false);
      return;
    }
    
    // Typewriter effect
    let index = 0;
    const animInterval = setInterval(() => {
      setCommandHistory((prev) => {
        const last = prev[prev.length - 1];
        if (!last || last.command !== cmd) {
          return [...prev, { command: cmd, output: output.slice(0, index) }];
        } else {
          return [...prev.slice(0, prev.length - 1), { command: cmd, output: output.slice(0, index) }];
        }
      });
      index += 3; // Type faster
      if (index >= output.length + 3) {
        clearInterval(animInterval);
        setLocked(false);
      }
    }, 10);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || locked || !input.trim()) return;
    runCommand(input.trim());
    setInput("");
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#050608] text-[#d1e6d1] font-mono overflow-hidden">
      {/* Terminal Output Area */}
      <div
        ref={termRef}
        className="flex-1 p-6 overflow-y-auto scroll-smooth"
        onClick={() => inputRef.current?.focus()}
      >
        {booting ? (
          <div className="text-[#2BC20E] text-sm space-y-1">
            {bootLines.map((l, i) => (
              <div key={i} className="animate-pulse">{l}</div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quick Actions Header inline block */}
            <div className="text-sm flex items-center gap-2 flex-wrap">
              <span className="text-white">giri</span>
              <span className="text-[#58a6ff]">@ terminal :~$</span>
              <span className="text-[#d1e6d1] mr-2">ls quick_actions/</span>
              
              <div className="flex gap-4 flex-wrap">
                {["about", "experience", "skills", "projects", "clear"].map((s) => (
                  <button
                    key={s}
                    disabled={locked}
                    onClick={() => runCommand(s)}
                    className="text-[#58a6ff] hover:text-white transition-colors disabled:opacity-40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {commandHistory.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2 text-sm flex-wrap">
                  <span className="text-white">giri</span>
                  <span className="text-[#58a6ff]">@ terminal :~$</span>
                  <span className="text-white">{item.command}</span>
                </div>
                <div className="text-[#d1e6d1] whitespace-pre-wrap text-sm leading-relaxed pl-4">
                  {item.output}
                </div>
              </div>
            ))}

            {!locked && (
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <span className="text-white">giri</span>
                <span className="text-[#01b012]">@ terminal :~$</span>
                <div className="flex-1 flex items-center relative min-w-[150px]">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleEnter}
                    className="w-full bg-transparent text-white outline-none caret-transparent"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {/* Custom Cursor Overlay */}
                  <span 
                    className="absolute pointer-events-none text-[#01b012]"
                    style={{ 
                      left: `${input.length}ch`,
                      opacity: cursorVisible ? 1 : 0 
                    }}
                  >
                    █
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
