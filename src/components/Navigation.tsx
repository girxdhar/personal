import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface NavigationProps {
  currentSection: number;
  currentGalleryTab?: string;
  onNavigate: (index: number) => void;
  onSetGalleryTab?: (tab: string) => void;
  totalSections: number;
}

export default function Navigation({ currentSection, currentGalleryTab, onNavigate, onSetGalleryTab, totalSections }: NavigationProps) {
  const navItems = [
    { label: 'HOME', type: 'section', index: 0 },
    { label: 'ABOUT', type: 'section', index: 1 },
    { label: 'PHOTOGRAPHY', type: 'gallery', index: 2, tab: 'photos' },
    { label: 'POETRY', type: 'gallery', index: 2, tab: 'poetry' },
    { label: 'THE ARCHIVE', type: 'section', index: 3 },
    { label: 'PRO PROFILE', type: 'external', href: 'https://girxdhar.github.io/pro' }
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (item: any) => {
    if (item.type === 'external') {
      window.location.href = item.href;
      return;
    }
    onNavigate(item.index);
    if (item.type === 'gallery' && onSetGalleryTab) {
      onSetGalleryTab(item.tab);
    }
    setMenuOpen(false);
  };

  const isActive = (item: any) => {
    if (item.type === 'external') return false;
    if (item.type === 'section') return currentSection === item.index;
    if (item.type === 'gallery') return currentSection === item.index && currentGalleryTab === item.tab;
    return false;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-5 lg:px-8 py-5 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="text-white text-2xl font-['Anton'] lowercase origin-left cursor-pointer"
          style={{ transform: 'scaleX(1.15)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => handleNavClick(navItems[0])}
        >
          {/* giridhar. */}
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden lg:flex gap-2 xl:gap-4 items-center bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-1.5">
          {navItems.map((item, index) => {
            const active = isActive(item);
            return (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item)} 
                className={`font-['Space_Mono'] text-[9px] xl:text-[10px] tracking-[0.18em] transition-all duration-200 uppercase px-3 py-2 border ${
                  item.type === 'external' ? 'border-white/40 text-white hover:bg-white hover:text-black ml-2' :
                  active ? 'border-white/30 text-white bg-white/[0.05]' : 'border-transparent text-white/40 hover:text-white/80 hover:border-white/15 hover:bg-white/[0.02]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <motion.button
          className="lg:hidden flex flex-col gap-[5px] p-2 z-50 bg-black/50 backdrop-blur-sm border border-white/10"
          onClick={() => setMenuOpen((v) => !v)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-5 h-[1.5px] bg-white origin-center"
            animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-5 h-[1.5px] bg-white"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-[1.5px] bg-white origin-center"
            animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden"
            style={{ background: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 32px) 32px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 32px) 32px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 32px) 32px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center gap-6 w-full max-w-xs">
              {navItems.map((item, index) => {
                const active = isActive(item);
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className={`w-full relative group px-6 py-4 border transition-all duration-300 ${
                      item.type === 'external' ? 'border-white/40 text-white mt-4 hover:bg-white hover:text-black' :
                      active ? 'border-white/30 text-white bg-white/[0.05]' : 'border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/[0.02]'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <span
                      className="text-xl sm:text-2xl tracking-[0.1em]"
                      style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Counter at bottom */}
            <div className="absolute bottom-10 text-white/20 text-[10px] tracking-[0.3em] font-mono">
              GIRIDHAR.DEV // 2025
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}