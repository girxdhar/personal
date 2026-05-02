import { motion, useReducedMotion } from 'motion/react';
import { Square, Circle, Triangle, Grid, Layers, Box, Zap, Code2, Palette, Minus, Plus, Eye, Lock } from 'lucide-react';
import portraitImg from "../assets/giridhar2.png"
const ImageWithFallback = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="h-screen relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center cursor-crosshair">
      {/* Custom Crosshair Cursor */}
      <style>
      {`
        section, section * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' shape-rendering='crispEdges'%3E%3Cpath d='M2 2 L2 22 L8 16 L12 24 L16 22 L12 14 L22 14 Z' fill='white' stroke='black' stroke-width='2'/%3E%3C/svg%3E") 0 0, auto !important;
        }
      `}
      </style>
      {/* Dark textured background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-black" />
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] pointer-events-none" />

      {/* Floating background shapes */}
      <motion.div
        className="absolute top-20 left-[10%] w-32 h-32 border-2 border-dashed border-white/10"
        animate={{ rotate: 360, y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 right-[15%] w-24 h-24 rounded-full border-2 border-dashed border-[#6B8E6F]/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[40%] right-[5%] w-16 h-16 border-2 border-white/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-2 border-dashed border-[#6B8E6F]/20 rotate-45" />
      </motion.div>
      <motion.div
        className="absolute bottom-[20%] left-[8%]"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      >
        <Triangle size={40} className="text-white/5" />
      </motion.div>
      <motion.div
        className="absolute top-[15%] right-[25%] w-20 h-20 border border-dashed border-white/10"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Additional floating elements */}
      <motion.div
        className="absolute top-[60%] left-[20%] w-12 h-12 border border-[#6B8E6F]/20"
        animate={{ rotate: [0, 90, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
      >
        <div className="absolute inset-2 border border-dashed border-white/10" />
      </motion.div>
      
      <motion.div
        className="absolute top-[25%] left-[35%]"
        animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <Box size={28} className="text-white/10" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-12 flex items-center justify-between gap-20">
        {/* Left side - Design Screen UI */}
        <motion.div
          className="relative w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Main portrait with dashed border - design screen style */}
          <div className="relative w-[380px]">
            <motion.div
              className="relative p-4 border-2 border-dashed border-[#6B8E6F]/40 bg-black/20"
              animate={shouldReduceMotion ? {} : {
                rotate: [-0.5, 0.5, -0.5],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Selection handles (design tool style) */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#6B8E6F] border-2 border-black" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#6B8E6F] border-2 border-black" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#6B8E6F] border-2 border-black" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#6B8E6F] border-2 border-black" />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#6B8E6F] border-2 border-black" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#6B8E6F] border-2 border-black" />
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#6B8E6F] border-2 border-black" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#6B8E6F] border-2 border-black" />

              {/* Image with torn edge effect */}
              <div className="relative overflow-hidden shadow-2xl aspect-[3/4] h-[500px]" style={{
                clipPath: 'polygon(2% 0%, 98% 1%, 99% 3%, 97% 8%, 99% 15%, 98% 25%, 99% 35%, 97% 45%, 98% 55%, 99% 65%, 97% 75%, 99% 85%, 98% 95%, 96% 99%, 90% 98%, 80% 99%, 70% 98%, 60% 99%, 50% 98%, 40% 99%, 30% 98%, 20% 99%, 10% 98%, 5% 99%, 1% 95%, 0% 85%, 1% 75%, 0% 65%, 2% 55%, 1% 45%, 2% 35%, 1% 25%, 2% 15%, 1% 8%)'
              }}>
                <ImageWithFallback
                  src={portraitImg}           
                  alt="Portrait"
                  className="w-full h-full object-cover brightness-60 contrast-120"
                />
              </div>

              
              {/* Layer label (design tool style) */}
              <div className="absolute -top-8 left-0 bg-[#6B8E6F]/90 px-3 py-1 text-[10px] text-black font-mono">
                Portrait_Layer_01
              </div>
            </motion.div>

            {/* UI Design symbols and shapes */}
            <motion.div
              className="absolute -top-16 right-12 flex gap-2 items-center bg-black/80 border border-[#6B8E6F]/30 p-2 backdrop-blur-sm"
              drag
              dragElastic={0.1}
              dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            >
              <Square size={16} className="text-[#6B8E6F]" />
              <Circle size={16} className="text-white/60" />
              <Triangle size={16} className="text-white/60" />
              <div className="w-[1px] h-4 bg-white/20" />
              <Grid size={16} className="text-white/60" />
            </motion.div>
            
            {/* Zoom level indicator */}
            <motion.div
              className="absolute -top-16 left-8 flex gap-1 items-center bg-black/80 border border-white/20 px-2 py-1 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Minus size={12} className="text-white/60" />
              <span className="text-[10px] text-white/80 font-mono">100%</span>
              <Plus size={12} className="text-white/60" />
            </motion.div>

            {/* Code snippet */}
            <motion.div
              className="absolute -bottom-8 -left-12 w-36 h-24 bg-black border-2 border-[#6B8E6F]/50 shadow-2xl"
              style={{
                transform: 'rotate(-8deg)',
                clipPath: 'polygon(3% 5%, 98% 2%, 100% 90%, 95% 98%, 5% 95%, 0% 12%)'
              }}
              drag
              dragElastic={0.1}
              dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
              whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
            >
              <div className="p-2 text-[9px] text-[#6B8E6F] font-mono leading-tight">
                const create = () =&gt; &#123;
                <br />
                &nbsp;&nbsp;return art;
                <br />
                &#125;;
                <br />
                <span className="text-gray-400">// Clumsy by Design.. ✨ // So Am I...</span>
              </div>
            </motion.div>

            {/* Photo polaroid with Steve Jobs */}
            <motion.div
              className="absolute bottom-[35%] -right-20 w-24 h-28 bg-white shadow-2xl p-2 group cursor-pointer"
              style={{ transform: 'rotate(12deg)' }}
              animate={shouldReduceMotion ? {} : {
                rotate: [12, 14, 12],
                y: [0, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              whileHover={{ scale: 1.05, rotate: 8 }}
            >
              <div className="w-full h-20 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop" 
                  alt="Steve Jobs" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="text-center text-[8px] text-black/60 mt-1 font-handwriting">
                inspiration
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-yellow-100/60 shadow-sm" 
                   style={{ transform: 'rotate(2deg)' }} />
              
              {/* Tooltip */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                <div className="bg-black/95 border border-[#6B8E6F]/50 px-3 py-2 rounded backdrop-blur-sm">
                  <div className="text-[#6B8E6F] text-[10px] font-mono mb-0.5">Steve Jobs</div>
                  <div className="text-white/90 text-[9px] font-light italic">
                    "Design is not just what it looks like.<br />Design is how it works."
                  </div>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/95 border-r border-b border-[#6B8E6F]/50 rotate-45" />
              </div>
            </motion.div>
           
            {/* Handwritten arrow and text */}
            <svg
              className="absolute -bottom-24 left-[20%] w-56"
              viewBox="0 0 220 50"
              fill="none"
            >
              <motion.path
                d="M 10 25 Q 60 15, 110 25 T 210 25"
                stroke="#6B8E6F"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <motion.path
                d="M 200 20 L 210 25 L 200 30"
                stroke="#6B8E6F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
                viewport={{ once: true }}
              />
            </svg>
            <motion.div
              className="absolute -bottom-32 left-[20%] text-[#6B8E6F]/80 italic text-sm font-handwriting"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 3 }}
              viewport={{ once: true }}
            >
              chaos + craft = magic
            </motion.div>

            {/* Grid overlay effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(#6B8E6F 1px, transparent 1px), linear-gradient(90deg, #6B8E6F 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Additional wireframe elements */}
            <motion.div
              className="absolute top-[20%] -left-16 w-20 h-12 border-2 border-dashed border-white/20 bg-black/30"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <div className="p-1 text-[8px] text-white/40 font-mono">
                Frame_02
              </div>
            </motion.div>
            

            
            {/* Color palette card */}
            <motion.div
              className="absolute top-[10%] -right-24 bg-black/90 border border-[#6B8E6F]/30 p-3 backdrop-blur-sm"
              drag
              dragElastic={0.1}
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

        {/* Right side - Content */}
        <motion.div
          className="w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Header with wireframe styling */}
          <div className="relative mb-12">
            <motion.div
              className="absolute -top-6 -left-6 text-[#6B8E6F]/40 text-xs font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              &lt;section id="about"&gt;
            </motion.div>
            
            <motion.h2
              className="text-white text-7xl font-bold tracking-tight relative inline-block leading-tight"
              style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              Who I Am
              <div className="absolute -right-8 top-2 w-6 h-6 border border-dashed border-[#6B8E6F]/30" />
              <div className="absolute -left-4 bottom-4 w-2 h-2 bg-[#6B8E6F]" />
            </motion.h2>

            <motion.div
              className="absolute -bottom-6 right-0 text-[#6B8E6F]/40 text-xs font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              [Designer × Developer]
            </motion.div>
          </div>

          {/* Content blocks with wireframe elements */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Block 1 */}
            <div className="relative pl-6 border-l-2 border-dashed border-[#6B8E6F]/30">
              <Palette size={20} className="absolute -left-[11px] top-0 text-[#6B8E6F] bg-[#0a0a0a]" />
              <div className="text-white/95 text-lg leading-relaxed font-light" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                I architect experiences where pixels meet purpose. Every interface is a canvas, 
                every interaction a brushstroke in the larger narrative of digital craft.
              </div>
            </div>

            {/* Block 2 */}
            <div className="relative pl-6 border-l-2 border-dashed border-white/20">
              <Code2 size={20} className="absolute -left-[11px] top-0 text-white/80 bg-[#0a0a0a]" />
              <div className="text-white/95 text-lg leading-relaxed font-light" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Code isn't just logic—it's poetry. I write systems that breathe, 
                components that dance, and algorithms that surprise. Function and beauty, inseparable.
              </div>
            </div>

            {/* Block 3 */}
            <div className="relative pl-6 border-l-2 border-dashed border-[#6B8E6F]/30">
              <Zap size={20} className="absolute -left-[11px] top-0 text-[#6B8E6F] bg-[#0a0a0a]" />
              <div className="text-white/95 text-lg leading-relaxed font-light" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                The best work lives at the edge of chaos—where experimentation meets execution, 
                where wild ideas collide with disciplined craft.
              </div>
            </div>
          </motion.div>

          {/* Process visualization */}
          <motion.div
            className="mt-12 p-6 border-2 border-dashed border-white/10 bg-black/20 backdrop-blur-sm relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-3 left-4 bg-[#0a0a0a] px-2 text-xs text-[#6B8E6F] font-mono">
              process.workflow
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="text-center flex-1">
                <div className="text-white/60 mb-2 font-mono text-xs">IDEATE</div>
                <motion.div 
                  className="w-12 h-12 mx-auto border-2 border-[#6B8E6F]/50 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, borderColor: '#6B8E6F' }}
                >
                  <Circle size={16} className="text-[#6B8E6F]" />
                </motion.div>
              </div>
              
              <div className="text-white/30 text-xl">→</div>
              
              <div className="text-center flex-1">
                <div className="text-white/60 mb-2 font-mono text-xs">BUILD</div>
                <motion.div 
                  className="w-12 h-12 mx-auto border-2 border-white/30"
                  whileHover={{ scale: 1.1, borderColor: '#fff' }}
                >
                  <div className="w-full h-full border-2 border-dashed border-white/30" />
                </motion.div>
              </div>
              
              <div className="text-white/30 text-xl">→</div>
              
              <div className="text-center flex-1">
                <div className="text-white/60 mb-2 font-mono text-xs">REFINE</div>
                <motion.div 
                  className="w-12 h-12 mx-auto border-2 border-[#6B8E6F] flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 45 }}
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                >
                  <Zap size={16} className="text-[#6B8E6F]" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -bottom-4 right-0 text-[#6B8E6F]/40 text-xs font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            viewport={{ once: true }}
          >
            &lt;/section&gt;
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}