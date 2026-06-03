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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const totalSections = 4;

  const scrollToSection = (index: number) => {
    if (index < 0 || index >= totalSections) return;
    
    const container = scrollContainerRef.current;
    
    if (container) {
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
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
        if (section >= 3) {
          setShouldLoadPoetry(true);
        }
      }
    };

    // Trigger once to setup initial state
    handleScroll();

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

  const renderSection = (index: number, SectionComponent: React.ComponentType<any>, props = {}) => {
    // Render section if we're close to it (for smooth scrolling)
    if (currentSection >= index - 1) {
      return <SectionComponent {...props} />;
    }
    return <div className="w-full h-screen" />; // Placeholder
  };

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
      
      {renderSection(0, HeroSection, { 
        scrollToNext: () => scrollToSection(currentSection + 1) 
      })}
      
      {renderSection(1, AboutSection)}
      
      {renderSection(2, PhotographySection)}
      
      {/* Poetry Desktop Section - only loads when we reach section 3 */}
      {shouldLoadPoetry ? (
        <Suspense fallback={
          <div className="w-full h-screen flex items-center justify-center bg-teal-600">
            <div className="text-white text-2xl">Loading Poetry Desktop...</div>
          </div>
        }>
          <PoetryDesktopSection isActive={currentSection === 3} />
        </Suspense>
      ) : (
        <div className="w-full h-screen" />
      )}
    </div>
  );
}