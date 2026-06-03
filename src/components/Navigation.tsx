import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface NavigationProps {
  currentSection: number;
  onNavigate: (index: number) => void;
  totalSections: number;
}

export default function Navigation({ currentSection, onNavigate, totalSections }: NavigationProps) {
  const sections = ['Hero', 'Terminal', 'About', 'Photography', 'Poetry'];
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (index: number) => {
    onNavigate(index);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="text-white text-2xl font-['Anton'] lowercase origin-left"
          style={{ transform: 'scaleX(1.15)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* giridhar. */}
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center">
          {sections.map((section, index) => (
            <button key={section} onClick={() => handleNavClick(index)} className="relative group">
              <motion.div
                className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                  currentSection === index ? 'text-[#6B8E6F]' : 'text-white/40 group-hover:text-white/70'
                }`}
              >
                {section}
              </motion.div>
              {currentSection === index && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#6B8E6F]"
                  layoutId="activeSection"
                />
              )}
            </button>
          ))}
        </div>

        {/* Desktop page counter */}
        <motion.div
          className="hidden md:block text-white/40 text-xs tracking-wider"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {String(currentSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
        </motion.div>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden flex flex-col gap-[5px] p-2 z-50"
          onClick={() => setMenuOpen((v) => !v)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-[1.5px] bg-white origin-center"
            animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-[1.5px] bg-white"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-[1.5px] bg-white origin-center"
            animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{ background: 'rgba(0,0,0,0.96)' }}
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 52px) 52px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 52px) 52px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 52px) 52px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center gap-10">
              {sections.map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => handleNavClick(index)}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.07 }}
                >
                  <span
                    className={`text-5xl sm:text-6xl uppercase tracking-[0.05em] transition-colors duration-200 ${
                      currentSection === index ? 'text-[#6B8E6F]' : 'text-white/50 hover:text-white'
                    }`}
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    {section}
                  </span>
                  {currentSection === index && (
                    <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#6B8E6F]" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Counter at bottom */}
            <div className="absolute bottom-10 text-white/20 text-xs tracking-[0.3em] font-mono">
              {String(currentSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}