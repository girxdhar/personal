import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PhotographySection from './components/PhotographySection';
import Navigation from './components/Navigation';

// Lazy load the Poetry Desktop to avoid loading all its dependencies upfront
const PoetryDesktopSection = lazy(() => import('./components/win95Desktop/PoetryDesktopSection'));

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [shouldLoadPoetry, setShouldLoadPoetry] = useState(false);
  const [galleryTab, setGalleryTab] = useState('photos');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const totalSections = 4;

  const scrollToSection = (index: number) => {
    if (index < 0 || index >= totalSections) return;

    const container = scrollContainerRef.current;

    const targetElement = document.getElementById(`section-${index}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      let currentIdx = 0;
      const windowHeight = window.innerHeight;

      for (let i = 0; i < totalSections; i++) {
        const el = document.getElementById(`section-${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section's top has crossed the middle of the screen
          if (rect.top <= windowHeight / 2) {
            currentIdx = i;
          }
        }
      }

      if (currentIdx !== currentSection) {
        setCurrentSection(currentIdx);
      }
    };

    // Trigger once to setup initial state
    handleScroll();

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen overflow-y-scroll snap-y snap-proximity scroll-smooth"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <Navigation
        currentSection={currentSection}
        currentGalleryTab={galleryTab}
        onNavigate={scrollToSection}
        onSetGalleryTab={setGalleryTab}
        totalSections={totalSections}
      />

      <HeroSection scrollToNext={() => scrollToSection(1)} />

      <AboutSection />

      <PhotographySection activeTab={galleryTab} onTabChange={setGalleryTab} />

      {/* Poetry Desktop Section */}
      <div id="section-3" className="w-full h-screen snap-start snap-always relative z-10 flex flex-col items-center justify-center bg-black overflow-hidden border-b-[24px] border-[#0a0a0a]">
        {!shouldLoadPoetry ? (
          <div className="text-center flex flex-col items-center gap-6 p-6">
            <p className="font-mono text-white/50 text-xs tracking-widest uppercase">Windows 95 Experience</p>
            <style>{`
              @keyframes boot-shadow-pulse {
                0% { box-shadow: 0 0 10px rgba(255,255,255,0.02), inset 0 0 5px rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.1); }
                50% { box-shadow: 0 0 20px rgba(255,255,255,0.08), inset 0 0 10px rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.25); }
                100% { box-shadow: 0 0 10px rgba(255,255,255,0.02), inset 0 0 5px rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.1); }
              }
              .boot-btn-animate {
                animation: boot-shadow-pulse 4s ease-in-out infinite;
              }
              .boot-btn-animate:hover {
                animation: none;
                box-shadow: 0 0 25px rgba(255,255,255,0.15), inset 0 0 15px rgba(255,255,255,0.1);
                border-color: rgba(255,255,255,0.4);
              }
            `}</style>
            <button
              onClick={() => setShouldLoadPoetry(true)}
              className="boot-btn-animate relative px-10 py-4 bg-[#0a0a0a] text-white/80 hover:text-white font-['Space_Mono'] text-[11px] font-bold tracking-[0.25em] uppercase border border-white/10 transition-all duration-300 flex items-center gap-3 group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_#34d399] transition-all duration-300"></div>
              <span>BOOT SYSTEM</span>
            </button>
          </div>
        ) : (
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center bg-teal-800">
            </div>
          }>
            <PoetryDesktopSection isActive={currentSection === 3} />
          </Suspense>
        )}
      </div>
    </div>
  );
}