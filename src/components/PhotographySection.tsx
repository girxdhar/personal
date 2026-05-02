import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X, Camera } from 'lucide-react';
import photologo from '../assets/photographylogo.png';
import photobg from '../assets/photobg.png';

interface Photo {
  id: number;
  url: string;
  title: string;
}

export default function PhotographySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cameraPulse, setCameraPulse] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const photos: Photo[] = [
    { id: 1, url: 'https://images.unsplash.com/photo-1729011373667-cc344d939de6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Ethereal Landscape' },
    { id: 2, url: 'https://images.unsplash.com/photo-1755018237548-702af1620458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Urban Geometry' },
    { id: 3, url: 'https://images.unsplash.com/photo-1617657172340-15a0fabc3605?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Abstract Forms' },
    { id: 4, url: 'https://images.unsplash.com/photo-1760392441483-f3fe304ddb9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Timeless Portrait' },
    { id: 5, url: 'https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Gallery Silence' },
    { id: 6, url: 'https://images.unsplash.com/photo-1729011373667-cc344d939de6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Natural Wonder' },
  ];

  const scrollRef = useRef(0);
  const scrollSpeed = 0.6; // px per frame

  // Continuous smooth scrolling
  useEffect(() => {
    let frame: number;

    const step = () => {
      if (!isHovering && galleryRef.current) {
        scrollRef.current += scrollSpeed;

        const galleryWidth = galleryRef.current.scrollWidth / 2;

        if (scrollRef.current >= galleryWidth) scrollRef.current = 0;

        galleryRef.current.scrollLeft = scrollRef.current;
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isHovering]);

  // Button scroll helper
  const scrollBy = (distance: number) => {
    if (!galleryRef.current) return;

    scrollRef.current += distance;
    const galleryWidth = galleryRef.current.scrollWidth / 2;

    if (scrollRef.current >= galleryWidth) scrollRef.current = 0;
    if (scrollRef.current < 0) scrollRef.current = galleryWidth - galleryRef.current.clientWidth;

    galleryRef.current.scrollTo({ left: scrollRef.current, behavior: 'smooth' });
  };

  // Camera pulse animation
  const triggerCameraPulse = () => {
    setCameraPulse(true);
    setTimeout(() => setCameraPulse(false), 600);
  };

  return (
    <section className="relative h-screen bg-[#000000] flex flex-col items-center overflow-hidden px-6">
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />

      {/* Full-width subtle camera-top background (photobg)
          Positioned so it visually sits behind the title and stretches to container width */}
      <motion.img
        src={photobg}
        alt="camera background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.11 }}
        transition={{ duration: 1.2 }}
        className="
          absolute top-1 left-1/2 -translate-x-1/2
          w-[min(1200px,92%)] max-w-[900px]
          pointer-events-none select-none
          object-cover
          z-5
        "
        style={{ filter: 'blur(0px)' }}
      />

      {/* Rotating Background Lens Logo + subtle shining/glint overlay */}
      <div className="absolute right-20 top-45 w-[220px] h-[220px] pointer-events-none select-none opacity-30 z-10">
        {/* rotating logo */}
        <motion.img
          src={photologo}
          alt="rotating lens"
          className="absolute inset-0 w-full h-full object-contain opacity-25"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
        />
      </div>

      {/* Cameras (top-left and bottom-right) */}
      <motion.div
        className="absolute top-8 left-8 w-12 h-12 text-white/40 cursor-pointer z-20"
        animate={{ scale: cameraPulse ? [1, 1.15, 1] : 1, rotate: cameraPulse ? [0, 10, -10, 0] : 0 }}
        transition={{ duration: 0.6 }}
        onClick={triggerCameraPulse}
      >
        <Camera size={48} />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 w-14 h-14 text-black/30 cursor-pointer z-20"
        animate={{ scale: cameraPulse ? [1, 1.15, 1] : 1, rotate: cameraPulse ? [0, -10, 10, 0] : 0 }}
        transition={{ duration: 0.6 }}
        onClick={triggerCameraPulse}
      >
        <Camera size={56} />
      </motion.div>

      {/* Title */}
      <motion.div
        className="relative z-20 pt-24 flex items-center gap-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <motion.h2
            className="text-white text-[4.5rem] font-serif tracking-tight cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            Photography
          </motion.h2>

          {/* Elegant underline */}
          <motion.div
            className="h-1 rounded-full mx-auto mt-2 bg-gradient-to-r from-[#6B8E6F] via-[#A1C77C] to-[#6B8E6F]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
            style={{ transformOrigin: 'center' }}
          />
        </div>
      </motion.div>

      {/* Gallery Container */}
      <div className="relative z-20 mt-16 w-full max-w-6xl bg-[#111] p-6 rounded-2xl shadow-2xl overflow-hidden border border-white/10 flex items-center">
        {/* Left & Right Buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition"
          onClick={() => scrollBy(-300)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          &#8592;
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition"
          onClick={() => scrollBy(300)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          &#8594;
        </button>

        {/* Gallery */}
        <div
          ref={galleryRef}
          className="flex gap-8 whitespace-nowrap overflow-hidden relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {[...photos, ...photos].map((photo, idx) => (
            <motion.div
              key={idx}
              className="relative flex-shrink-0 w-96 h-96 cursor-pointer rounded-xl overflow-hidden shadow-xl border border-white/10"
              onHoverStart={() => setHoveredPhoto(photo.id)}
              onHoverEnd={() => setHoveredPhoto(null)}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-black/20 pointer-events-none" />
              <ImageWithFallback
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              {hoveredPhoto === photo.id && (
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 text-white/90 opacity-90 transition-opacity">
                  <h3 className="text-lg font-semibold">{photo.title}</h3>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Viewer */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/60 hover:text-white p-2 rounded-full"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              className="max-w-6xl max-h-[85vh] relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-6 bg-gradient-to-t from-black/90 to-transparent text-white/90 text-center rounded-t-lg">
                <h2 className="text-3xl font-serif tracking-widest drop-shadow-lg">
                  {selectedPhoto.title}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
