import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import heroImage from 'figma:asset/6f9b7f9852bbe3fb9f9c10e365db54c7aea49f54.png';

interface HeroSectionProps {
  scrollToNext: () => void;
}

// Motion graphic line drawing text animation
const DrawText = ({ text, delay = 0, charDelay = 0.1, color = 'white' }: { text: string; delay?: number; charDelay?: number; color?: string }) => (
  <>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        className="inline-block relative"
        style={{
          WebkitTextStroke: `2px ${color}`,
          WebkitTextFillColor: 'transparent',
        }}
        initial={{ 
          opacity: 0,
          scale: 0.8,
          WebkitTextStrokeWidth: '2px',
          WebkitTextFillColor: 'transparent',
        }}
        animate={{ 
          opacity: [0, 1, 1, 1],
          scale: [0.8, 1.05, 1],
          WebkitTextStrokeWidth: ['2px', '2px', '0px'],
          WebkitTextFillColor: ['transparent', 'transparent', color],
        }}
        transition={{ 
          delay: delay + i * charDelay,
          duration: 1.2,
          times: [0, 0.3, 0.7, 1],
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </>
);

export default function HeroSection({ scrollToNext }: HeroSectionProps) {
  const [typedText, setTypedText] = useState('');
  const fullText = "Hello world! I'm giridhar";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="h-screen w-full snap-start relative z-0 overflow-hidden bg-black flex items-center justify-center">
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Motion graphic title - line drawing reveal */}
        <motion.div
          className="mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 
            className="text-center text-white text-[5.5vw] sm:text-[4.5vw] lg:text-[3.8vw] xl:text-[3.2vw] leading-none tracking-tighter font-serif whitespace-nowrap flex justify-center items-center gap-1 sm:gap-2"
          >
            <span className="inline-flex">
              <DrawText text="Art is " delay={0.5} charDelay={0.05} />
              <DrawText text="violence" delay={0.85} charDelay={0.05} color="#cc0000" />
            </span>
            <span className="inline-block italic pr-1">
              <DrawText text="that learned restraint." delay={1.4} charDelay={0.05} />
            </span>
          </h1>
        </motion.div>

        {/* Hero image with green oval behind */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Green oval glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[500px] rounded-full blur-3xl -z-10"
            style={{ background: 'radial-gradient(ellipse, rgba(107, 142, 111, 0.4) 0%, transparent 70%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 0.8, 0.6],
            }}
            transition={{
              duration: 2,
              delay: 1,
              ease: "easeOut"
            }}
          />
          
          <div className="relative">
            <img
              src={heroImage}
              alt="Workspace"
              className="max-w-[700px] w-full h-auto"
            />
            
            {/* Typing text on monitor */}
            <div className="absolute top-[32%] right-[29%] w-[38%] h-[25%] flex items-start justify-start p-4">
              <motion.div 
                className="text-green-400 text-xs font-mono font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                style={{ color: 'rgba(120, 255, 150, 0.85)', fontSize: 'clamp(0.4rem, 1.5vw, 0.65rem)' }}
              >
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                >
                  |
                </motion.span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Subtitle - simple elegant fade in */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
        >
          <p
            className="text-white tracking-wide whitespace-nowrap text-[3.5vw] sm:text-xl md:text-3xl px-4"
            style={{ fontFamily: 'Didot, Georgia, serif' }}
          >
            A creative portfolio where art meets code
          </p>
        </motion.div>
      </div>
    </section>
  );
}