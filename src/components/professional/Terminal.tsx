import { useState, useEffect } from "react";
import IDCard from "./IDCard";
import TerminalInterface from "./TerminalInterface";
import { Code2 } from "lucide-react";

export default function Terminal({ onSwitchView }) {
  const [locked, setLocked] = useState(true);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div className="w-full lg:h-screen flex flex-col lg:p-8 relative">
      <div
        className="w-full h-full max-w-7xl mx-auto flex flex-col lg:rounded-lg overflow-hidden lg:border border-[#1d1d1d] relative bg-black shadow-2xl"
        style={{ fontFamily: "'VT323','Courier New','monospace'" }}
      >
        {/* Top Floating Button */}
        <button
          disabled={locked}
          onClick={onSwitchView}
          className="fixed top-6 right-6 z-50 group disabled:opacity-40 transition-opacity hover:opacity-80"
        >
          <div className="relative bg-[#0b0f14] border border-[#30363d] rounded-full p-3 shadow-lg">
            <Code2 className="w-5 h-5 text-[#0ea5e9]" />
          </div>
        </button>

        {/* Global Terminal Header */}
        <div className="bg-[#0b0f14] px-4 py-2 flex items-center justify-between border-b border-[#252525] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <span className="text-xs text-[#8b949e] font-bold tracking-widest uppercase">Giridhar / System</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#059232] shadow-[0_0_8px_#059232] animate-pulse"></span>
              <span className="uppercase tracking-wider font-bold text-[#059232]">Sys.Online</span>
            </div>
            <div className="opacity-70 font-mono hidden sm:block">{time}</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 min-h-0 overflow-y-auto">
          {/* ID Card Column */}
          <div className="lg:col-span-1 bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-[#252525] h-[100dvh] lg:h-auto flex flex-col justify-center relative snap-start">
            <div className="lg:sticky lg:top-0 w-full h-full flex flex-col justify-center items-center p-4">
              <IDCard />
            </div>
          </div>

          {/* Terminal Interface Column */}
          <div className="lg:col-span-2 bg-[#050608] h-[100dvh] lg:h-auto flex flex-col snap-start relative">
            <TerminalInterface locked={locked} setLocked={setLocked} />
          </div>
        </div>
      </div>
    </div>
  );
}
