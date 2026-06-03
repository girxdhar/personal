import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PhotographySection from './components/PhotographySection';
import Navigation from './components/Navigation';
import Terminal from './components/professional/Terminal';

// Lazy load the Poetry Desktop to avoid loading all its dependencies upfront
const PoetryDesktopSection = lazy(() => import('./components/win95Desktop/PoetryDesktopSection'));

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [shouldLoadPoetry, setShouldLoadPoetry] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const totalSections = 5;

  const scrollToSection = (index: number) => {
    if (index < 0 || index >= totalSections) return;
    
    const container = scrollContainerRef.current;
    
    if (container) {
      const snapElements = container.querySelectorAll('.snap-start');
      const targetElement = snapElements[index];
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;
      const section = Math.round(scrollPosition / windowHeight);
      
      if (section !== currentSection) {
        setCurrentSection(section);
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
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <Navigation 
        currentSection={currentSection} 
        onNavigate={scrollToSection}
        totalSections={totalSections}
      />
      
      <HeroSection scrollToNext={() => scrollToSection(1)} />
      
      <div className="w-full h-auto bg-black relative z-10 border-t border-white/5">
        <Terminal onSwitchView={() => {}} />
      </div>
      
      <AboutSection />
      
      <PhotographySection />
      
      {/* Poetry Desktop Section */}
      <div className="w-full h-screen snap-start flex items-center justify-center bg-[#0a0a0a] relative z-10 border-t border-white/10">
        {!shouldLoadPoetry ? (
          <div className="text-center flex flex-col items-center gap-6 p-6">
            <p className="font-mono text-white/50 text-xs tracking-widest uppercase">Windows 95 Poetry Experience</p>
            <button 
              onClick={() => setShouldLoadPoetry(true)}
              className="px-8 py-4 bg-white text-black font-['Space_Mono'] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-transparent hover:text-white border border-white transition-all duration-300"
            >
              Boot System
            </button>
          </div>
        ) : (
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center bg-teal-800">
              <div className="text-white text-lg font-mono tracking-widest">Loading OS...</div>
            </div>
          }>
            <PoetryDesktopSection isActive={currentSection === 3} />
          </Suspense>
        )}
      </div>
    </div>
  );
}