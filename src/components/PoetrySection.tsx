import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface Poem {
  id: number;
  title: string;
  lines: string[];
}

export default function PoetrySection() {
  const shouldReduceMotion = useReducedMotion();
  const [currentPoem, setCurrentPoem] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  const poems: Poem[] = [
    {
      id: 1,
      title: 'Digital Dreams',
      lines: [
        'In the glow of midnight screens,',
        'Where pixels dance and code convenes,',
        'A world unfolds in silent streams,',
        'Of electric thoughts and digital dreams.',
        '',
        'Between the keys, my fingers fly,',
        'Creating worlds that live and die,',
        'In databases that never lie,',
        'Under the vast, eternal sky.',
      ]
    },
    {
      id: 2,
      title: 'The Maker\'s Hand',
      lines: [
        'With paper torn and edges rough,',
        'I craft my visions, raw and tough,',
        'Between the real and the imagined stuff,',
        'Where chaos reigns, yet love\'s enough.',
        '',
        'My hands create what minds conceive,',
        'In every fold, a world to weave,',
        'What others doubt, I still believe,',
        'In art that makes the heart believe.',
      ]
    },
    {
      id: 3,
      title: 'Analog Soul',
      lines: [
        'They ask for polish, clean and bright,',
        'But I give texture, shadow, light,',
        'Each flaw a feature, wrong made right,',
        'An analog soul in digital night.',
        '',
        'For in imperfection lies the truth,',
        'The raw, unfiltered proof of youth,',
        'That beauty needs no painted booth,',
        'Just honest eyes and honest truth.',
      ]
    },
  ];

  const nextPoem = () => {
    setIsRevealing(true);
    setTimeout(() => {
      setCurrentPoem((prev) => (prev + 1) % poems.length);
      setIsRevealing(false);
    }, 600);
  };

  const prevPoem = () => {
    setIsRevealing(true);
    setTimeout(() => {
      setCurrentPoem((prev) => (prev - 1 + poems.length) % poems.length);
      setIsRevealing(false);
    }, 600);
  };

  const poem = poems[currentPoem];

  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0806] via-[#1a1410] to-[#0f0c0a] flex flex-col">
      {/* Textured overlay */}
      <div className="absolute inset-0 opacity-[0.08] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIj48ZmlsdGVyIGlkPSJjIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9IjEuMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoNjAwdjYwMEgweiIgZmlsdGVyPSJ1cmwoI2MpIiBvcGFjaXR5PSIuMiIvPjwvc3ZnPg==')] pointer-events-none" />

      {/* Title Section */}
      <div className="relative z-10 pt-24 pb-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="text-[#d4af37]" size={32} />
            <h2 className="text-[#f4e4c1] text-[64px] tracking-tight font-serif">
              Poetry
            </h2>
          </div>
          <motion.div
            className="w-32 h-[2px] bg-[#d4af37] mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-[#f4e4c1]/60 mt-4 text-lg italic font-serif">
            Words from the soul
          </p>
        </motion.div>
      </div>

      {/* Poetry Display - Modern Book Style */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-12">
        <div className="w-full max-w-4xl">
          {/* Book-like container */}
          <motion.div
            className="relative bg-gradient-to-br from-[#2a2218]/80 to-[#1a1410]/80 backdrop-blur-lg border-2 border-[#d4af37]/30 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]" />

            <div className="p-16">
              {/* Poem title */}
              <motion.h3
                className="text-center text-[#f4e4c1] mb-12 text-4xl font-serif tracking-wide"
                key={`title-${currentPoem}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealing ? 0 : 1 }}
                transition={{ duration: 0.5 }}
              >
                {poem.title}
              </motion.h3>

              {/* Decorative line */}
              <motion.div
                className="w-24 h-[1px] bg-[#d4af37]/50 mx-auto mb-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isRevealing ? 0 : 1 }}
                transition={{ delay: 0.3 }}
              />

              {/* Poem lines */}
              <div className="space-y-4 text-center min-h-[280px] flex flex-col justify-center">
                {poem.lines.map((line, index) => (
                  <motion.div
                    key={`${currentPoem}-${index}`}
                    className="relative text-[#f4e4c1]/90 text-xl font-serif leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isRevealing ? 0 : 1, y: isRevealing ? 10 : 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  >
                    {line ? (
                      <span className="inline-block">{line}</span>
                    ) : (
                      <div className="h-6" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Decorative line */}
              <motion.div
                className="w-24 h-[1px] bg-[#d4af37]/50 mx-auto mt-10 mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isRevealing ? 0 : 1 }}
                transition={{ delay: 0.5 }}
              />

              {/* Page number */}
              <motion.div
                className="text-center text-[#f4e4c1]/50 text-sm font-serif italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealing ? 0 : 0.6 }}
                transition={{ delay: 0.8 }}
              >
                — {currentPoem + 1} of {poems.length} —
              </motion.div>
            </div>

            {/* Vintage paper texture overlay */}
            <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJkIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9IjIiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHR5cGU9ImZyYWN0YWxOb2lzZSIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoNDAwdjQwMEgweiIgZmlsdGVyPSJ1cmwoI2QpIi8+PC9zdmc+')]" />
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-6 mt-12">
            <motion.button
              className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#6B8E6F] to-[#5a7a5e] text-white rounded-sm shadow-xl border border-[#6B8E6F] relative overflow-hidden group disabled:opacity-50"
              onClick={prevPoem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isRevealing}
            >
              <ChevronLeft size={20} />
              <span className="relative z-10 text-sm tracking-wider uppercase">
                Previous
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </motion.button>

            <motion.button
              className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#6B8E6F] to-[#5a7a5e] text-white rounded-sm shadow-xl border border-[#6B8E6F] relative overflow-hidden group disabled:opacity-50"
              onClick={nextPoem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isRevealing}
            >
              <span className="relative z-10 text-sm tracking-wider uppercase">
                Next
              </span>
              <ChevronRight size={20} />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#d4af37]/30 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={shouldReduceMotion ? {} : {
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </section>
  );
}
