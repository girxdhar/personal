import { motion } from 'motion/react';

interface ScrollIndicatorProps {
  currentSection: number;
  totalSections: number;
  onNavigate: (index: number) => void;
}

export default function ScrollIndicator({ currentSection, totalSections, onNavigate }: ScrollIndicatorProps) {
  const canGoUp = currentSection > 0;
  const canGoDown = currentSection < totalSections - 1;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
      {/* Up arrow */}
      <button
        onClick={() => canGoUp && onNavigate(currentSection - 1)}
        className={`transition-opacity ${canGoUp ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}
        disabled={!canGoUp}
      >
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <path d="M10 0L20 12H0L10 0Z" fill="white" />
        </svg>
      </button>

      {/* Oval with animated dot */}
      <div className="relative w-8 h-16 rounded-full border-2 border-white/40 bg-black/20 backdrop-blur-sm overflow-hidden">
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-[#6B8E6F] left-1/2 -translate-x-1/2"
          animate={{
            y: canGoDown ? [8, 44, 8] : [20, 20],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Down arrow */}
      <button
        onClick={() => canGoDown && onNavigate(currentSection + 1)}
        className={`transition-opacity ${canGoDown ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}
        disabled={!canGoDown}
      >
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <path d="M10 12L0 0H20L10 12Z" fill="white" />
        </svg>
      </button>
    </div>
  );
}
