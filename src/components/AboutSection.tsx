import { motion, useReducedMotion } from 'motion/react';
import { Square, Circle, Triangle, Grid, Box, Zap, Code2, Palette, Minus, Plus } from 'lucide-react';
import portraitImg from "../assets/giridhar2.png"

const ImageWithFallback = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="min-h-screen relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center cursor-crosshair py-20 md:py-0">
      <style>{`
        section, section * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' shape-rendering='crispEdges'%3E%3Cpath d='M2 2 L2 22 L8 16 L12 24 L16 22 L12 14 L22 14 Z' fill='white' stroke='black' stroke-width='2'/%3E%3C/svg%3E") 0 0, auto !important;
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-black" />

      {/* Floating background shapes — hidden on mobile to reduce clutter */}
      <motion.div
        className="hidden md:block absolute top-20 left-[10%] w-32 h-32 border-2 border-dashed border-white/10"
        animate={{ rotate: 360, y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="hidden md:block absolute bottom-32 right-[15%] w-24 h-24 rounded-full border-2 border-dashed border-[#6B8E6F]/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="hidden md:block absolute bottom-[20%] left-[8%]"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      >
        <Triangle size={40} className="text-white/5" />
      </motion.div>

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">

        {/* ── Portrait side ── */}
        <motion.div
          className="relative w-full md:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative w-[260px] md:w-[380px]">

            {/* Dashed selection frame */}
            <motion.div
              className="relative p-3 md:p-4 border-2 border-dashed border-[#6B8E6F]/40 bg-black/20"
              animate={shouldReduceMotion ? {} : { rotate: [-0.5, 0.5, -0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Corner handles */}
              {["-top-2 -left-2", "-top-2 -right-2", "-bottom-2 -left-2", "-bottom-2 -right-2",
                "-top-2 left-1/2 -translate-x-1/2", "-bottom-2 left-1/2 -translate-x-1/2",
                "-left-2 top-1/2 -translate-y-1/2", "-right-2 top-1/2 -translate-y-1/2"
              ].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-3 h-3 md:w-4 md:h-4 bg-[#6B8E6F] border-2 border-black`} />
              ))}

              {/* Portrait image */}
              <div
                className="relative overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: '3/4',
                  height: 'clamp(320px, 50vw, 500px)',
                  clipPath: 'polygon(2% 0%,98% 1%,99% 3%,97% 8%,99% 15%,98% 25%,99% 35%,97% 45%,98% 55%,99% 65%,97% 75%,99% 85%,98% 95%,96% 99%,90% 98%,80% 99%,70% 98%,60% 99%,50% 98%,40% 99%,30% 98%,20% 99%,10% 98%,5% 99%,1% 95%,0% 85%,1% 75%,0% 65%,2% 55%,1% 45%,2% 35%,1% 25%,2% 15%,1% 8%)'
                }}
              >
                <ImageWithFallback
                  src={portraitImg}
                  alt="Portrait"
                  className="w-full h-full object-cover brightness-60 contrast-125"
                />
              </div>

              {/* Layer label */}
              <div className="absolute -top-7 left-0 bg-[#6B8E6F]/90 px-2 py-0.5 text-[9px] text-black font-mono">
                Portrait_Layer_01
              </div>
            </motion.div>

            {/* Tool bar — shapes */}
            <motion.div
              className="absolute -top-12 right-4 md:-top-14 md:right-10 flex gap-1.5 items-center bg-black/80 border border-[#6B8E6F]/30 p-1.5 backdrop-blur-sm"
              drag dragElastic={0.1}
              dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            >
              <Square size={13} className="text-[#6B8E6F]" />
              <Circle size={13} className="text-white/60" />
              <Triangle size={13} className="text-white/60" />
              <div className="w-px h-3 bg-white/20" />
              <Grid size={13} className="text-white/60" />
            </motion.div>

            {/* Zoom indicator */}
            <motion.div
              className="absolute -top-12 left-2 md:-top-14 md:left-6 flex gap-1 items-center bg-black/80 border border-white/20 px-1.5 py-0.5 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Minus size={10} className="text-white/60" />
              <span className="text-[9px] text-white/80 font-mono">100%</span>
              <Plus size={10} className="text-white/60" />
            </motion.div>

            {/* Code snippet — repositioned to not overflow on mobile */}
            <motion.div
              className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-12 w-28 md:w-36 h-20 md:h-24 bg-black border-2 border-[#6B8E6F]/50 shadow-2xl"
              style={{
                transform: 'rotate(-8deg)',
                clipPath: 'polygon(3% 5%,98% 2%,100% 90%,95% 98%,5% 95%,0% 12%)'
              }}
              drag dragElastic={0.1}
              dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
              whileDrag={{ scale: 1.08 }}
            >
              <div className="p-1.5 text-[8px] md:text-[9px] text-[#6B8E6F] font-mono leading-tight">
                const create = () =&gt; &#123;<br />
                &nbsp;&nbsp;return art;<br />
                &#125;;<br />
                <span className="text-gray-400">// Clumsy by Design ✨</span>
              </div>
            </motion.div>

            {/* Polaroid — hidden on smallest screens, shown md+ */}
            <motion.div
              className="hidden sm:block absolute bottom-[35%] -right-14 md:-right-20 w-20 md:w-24 h-24 md:h-28 bg-white shadow-2xl p-1.5 md:p-2 group cursor-pointer"
              style={{ transform: 'rotate(12deg)' }}
              animate={shouldReduceMotion ? {} : { rotate: [12, 14, 12], y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              whileHover={{ scale: 1.05, rotate: 8 }}
            >
              <div className="w-full h-16 md:h-20 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop"
                  alt="Inspiration"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="text-center text-[7px] md:text-[8px] text-black/60 mt-1">inspiration</div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 md:w-16 h-3 md:h-4 bg-yellow-100/60 shadow-sm" style={{ transform: 'rotate(2deg)' }} />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                <div className="bg-black/95 border border-[#6B8E6F]/50 px-3 py-2 rounded backdrop-blur-sm">
                  <div className="text-[#6B8E6F] text-[10px] font-mono mb-0.5">Steve Jobs</div>
                  <div className="text-white/90 text-[9px] font-light italic">
                    "Design is not just what it<br />looks like. Design is how it works."
                  </div>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/95 border-r border-b border-[#6B8E6F]/50 rotate-45" />
              </div>
            </motion.div>

            {/* Handwritten arrow — hidden on mobile */}
            <svg className="hidden md:block absolute -bottom-24 left-[20%] w-56" viewBox="0 0 220 50" fill="none">
              <motion.path d="M 10 25 Q 60 15, 110 25 T 210 25" stroke="#6B8E6F" strokeWidth="2" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} viewport={{ once: true }} />
              <motion.path d="M 200 20 L 210 25 L 200 30" stroke="#6B8E6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 2.5 }} viewport={{ once: true }} />
            </svg>
            <motion.div
              className="hidden md:block absolute -bottom-32 left-[20%] text-[#6B8E6F]/80 italic text-sm"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 3 }} viewport={{ once: true }}
            >
              chaos + craft = magic
            </motion.div>

            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(#6B8E6F 1px,transparent 1px),linear-gradient(90deg,#6B8E6F 1px,transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Color palette card — hidden on mobile */}
            <motion.div
              className="hidden md:block absolute top-[10%] -right-24 bg-black/90 border border-[#6B8E6F]/30 p-3 backdrop-blur-sm"
              drag dragElastic={0.1}
              dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
              style={{ transform: 'rotate(5deg)' }}
            >
              <div className="flex gap-1 mb-1">
                <div className="w-4 h-4 bg-[#6B8E6F]" />
                <div className="w-4 h-4 bg-white" />
                <div className="w-4 h-4 bg-black border border-white/20" />
              </div>
              <div className="text-[8px] text-white/60 font-mono">palette.hex</div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Text side ── */}
        <motion.div
          className="w-full md:w-1/2 mt-16 md:mt-0"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="relative mb-8 md:mb-12">
            <motion.div
              className="hidden md:block absolute -top-6 -left-6 text-[#6B8E6F]/40 text-xs font-mono"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}
            >
              &lt;section id="about"&gt;
            </motion.div>

            <motion.h2
              className="text-white text-5xl md:text-7xl font-bold tracking-tight relative inline-block leading-tight"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              Who I Am
              <div className="absolute -right-6 top-2 w-5 h-5 border border-dashed border-[#6B8E6F]/30" />
              <div className="absolute -left-3 bottom-4 w-2 h-2 bg-[#6B8E6F]" />
            </motion.h2>

            <motion.div
              className="mt-2 md:absolute md:-bottom-6 md:right-0 text-[#6B8E6F]/40 text-xs font-mono"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} viewport={{ once: true }}
            >
              [Designer × Developer]
            </motion.div>
          </div>

          {/* Content blocks */}
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }} viewport={{ once: true }}
          >
            {[
              { Icon: Palette, border: 'border-[#6B8E6F]/30', iconClass: 'text-[#6B8E6F]', text: 'I architect experiences where pixels meet purpose. Every interface is a canvas, every interaction a brushstroke in the larger narrative of digital craft.' },
              { Icon: Code2, border: 'border-white/20', iconClass: 'text-white/80', text: "Code isn't just logic—it's poetry. I write systems that breathe, components that dance, and algorithms that surprise. Function and beauty, inseparable." },
              { Icon: Zap, border: 'border-[#6B8E6F]/30', iconClass: 'text-[#6B8E6F]', text: 'The best work lives at the edge of chaos—where experimentation meets execution, where wild ideas collide with disciplined craft.' },
            ].map(({ Icon, border, iconClass, text }, i) => (
              <div key={i} className={`relative pl-5 md:pl-6 border-l-2 border-dashed ${border}`}>
                <Icon size={18} className={`absolute -left-[10px] top-0 ${iconClass} bg-[#0a0a0a]`} />
                <p className="text-white/90 text-base md:text-lg leading-relaxed font-light" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {text}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Process workflow */}
          <motion.div
            className="mt-8 md:mt-12 p-4 md:p-6 border-2 border-dashed border-white/10 bg-black/20 backdrop-blur-sm relative"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} viewport={{ once: true }}
          >
            <div className="absolute -top-3 left-4 bg-[#0a0a0a] px-2 text-xs text-[#6B8E6F] font-mono">
              process.workflow
            </div>
            <div className="flex items-center justify-between text-sm">
              {[
                { label: 'IDEATE', el: <Circle size={16} className="text-[#6B8E6F]" />, cls: 'rounded-full border-[#6B8E6F]/50', hover: {} },
                { label: 'BUILD', el: <div className="w-full h-full border-2 border-dashed border-white/30" />, cls: 'border-white/30', hover: {} },
                { label: 'REFINE', el: <Zap size={16} className="text-[#6B8E6F]" />, cls: 'border-[#6B8E6F]', style: { clipPath: 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)' } },
              ].map(({ label, el, cls, hover, style }, i, arr) => (
                <>
                  <div key={label} className="text-center flex-1">
                    <div className="text-white/60 mb-2 font-mono text-[10px] md:text-xs">{label}</div>
                    <motion.div
                      className={`w-10 h-10 md:w-12 md:h-12 mx-auto border-2 flex items-center justify-center ${cls}`}
                      style={style}
                      whileHover={{ scale: 1.1 }}
                    >
                      {el}
                    </motion.div>
                  </div>
                  {i < arr.length - 1 && <div key={`arrow-${i}`} className="text-white/30 text-lg md:text-xl">→</div>}
                </>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}