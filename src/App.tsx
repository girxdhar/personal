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
          <button
  onClick={() => setShouldLoadPoetry(true)}
  style={{
    position: "relative",
    overflow: "hidden",
    padding: "16px 40px",
    background: "#c0c0c0",
    color: "#000",
    borderTop: "2px solid #fff",
    borderLeft: "2px solid #fff",
    borderRight: "2px solid #808080",
    borderBottom: "2px solid #808080",
    fontFamily: '"MS Sans Serif", sans-serif',
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: ".25em",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer"
  }}
>
  {/* Moving border */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      padding: "2px",
      background:
        "conic-gradient(from var(--angle), transparent 0deg, transparent 320deg, #000 340deg, transparent 360deg)",
      animation: "spin 2s linear infinite",
      pointerEvents: "none"
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#c0c0c0"
      }}
    />
  </div>

  {/* LED */}
  <div
    style={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#00a000",
      boxShadow: "0 0 3px #00a000",
      zIndex: 1
    }}
  />

  <span style={{ zIndex: 1 }}>
    CLICK TO BOOT SYSTEM
  </span>

  <style>{`
    @property --angle {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }

    @keyframes spin {
      from {
        --angle: 0deg;
      }
      to {
        --angle: 360deg;
      }
    }
  `}</style>
</button>
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