import { motion } from 'motion/react';

interface NavigationProps {
  currentSection: number;
}

export default function Navigation({ currentSection }: NavigationProps) {
  const sections = ['Hero', 'About', 'Photography', 'Poetry'];

  const scrollToSection = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-12 py-6 flex justify-between items-center">
      {/* Logo/Name */}
      <motion.div
        className="text-white text-2xl font-['Anton'] lowercase origin-left"
        style={{ transform: "scaleX(1.15)" }}  // widen slightly
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        giridhar.
      </motion.div>
      {/* Section indicators */}
      <div className="flex gap-8 items-center">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(index)}
            className="relative group"
          >
            <motion.div
              className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                currentSection === index
                  ? 'text-[#6B8E6F]'
                  : 'text-white/40 group-hover:text-white/70'
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

      {/* Page counter */}
      <motion.div
        className="text-white/40 text-xs tracking-wider"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        {String(currentSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
      </motion.div>
    </nav>
  );
}
