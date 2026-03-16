"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the same 500vh scroll container for syncing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1: "My Name. Creative Developer." (0% to 30%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Section 2: "I build digital experiences." (30% to 60%)
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45], [50, -50]);

  // Section 3: "Bridging design and engineering." (60% to 100%)
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.8, 1], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.8], [50, -50]);

  return (
    <div ref={containerRef} className="absolute inset-0 h-[500vh] w-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 md:px-24">
        
        {/* Section 1 - Centered */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-lg mb-4">
            Arnav<span className="text-neutral-500">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 font-light tracking-wide drop-shadow-md">
            Creative Developer
          </p>
        </motion.div>

        {/* Section 2 - Left Aligned */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-32 mix-blend-difference"
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight max-w-3xl drop-shadow-lg">
            I build digital <br/><span className="italic text-neutral-400 font-light">experiences.</span>
          </h2>
        </motion.div>

        {/* Section 3 - Right Aligned */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center px-8 md:px-32 mix-blend-difference text-right"
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight max-w-3xl drop-shadow-lg">
            Bridging design <br/>and <span className="text-neutral-400">engineering.</span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
