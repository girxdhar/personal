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
    <section id="section-0" className="h-screen w-full snap-start snap-always relative z-0 overflow-hidden bg-black flex items-center justify-center">
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
            className="text-center text-white text-[6.5vw] sm:text-[5.5vw] lg:text-[4.8vw] xl:text-[4.2vw] leading-none tracking-tighter font-serif font-bold whitespace-nowrap flex justify-center items-center gap-1 sm:gap-2"
          >
            <span className="inline-flex items-center">
              <DrawText text="Art is " delay={0.5} charDelay={0.05} />
              <span className="italic">
                <DrawText text="violence" delay={0.85} charDelay={0.05} color="#cc0000" />
              </span>
            </span>
            <span className="inline-block pr-1 not-italic">
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
            Nothing personal. Just unfinished business.
          </p>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-2"
        onClick={scrollToNext}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 1 }}
      >
        <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-mono text-white/40 uppercase select-none hover:text-white/80 transition-colors duration-300">
          Scroll Down
        </span>

        {/* Mouse/scroll indicator */}
        <div className="w-[20px] h-[34px] rounded-full border border-white/30 flex justify-center p-1 hover:border-white/60 transition-colors duration-300">
          <motion.div
            className="w-1 h-1.5 bg-white/70 rounded-full"
            animate={{
              y: [0, 10, 0],
              opacity: [1, 0.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Blinking double chevron indicator */}
        <motion.div
          className="text-white/30 hover:text-white/70 transition-colors duration-300 flex flex-col items-center -mt-0.5"
          animate={{
            opacity: [0.3, 1, 0.3],
            y: [0, 3, 0]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}