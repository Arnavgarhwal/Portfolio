"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // 2.5 seconds total loading phase
    const updateInterval = 50; 
    const steps = duration / updateInterval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      
      // Add slight easing to the number itself as it approaches 100
      const easedProgress = newProgress === 100 
        ? 100 
        : newProgress + (Math.random() * 2);

      setProgress(Math.min(easedProgress, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 600); // 600ms hold at 100% before triggering exit animation
      }
    }, updateInterval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ y: 0 }}
        exit={{ 
          y: "-100vh", 
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
        }}
        className="fixed inset-0 z-[100] bg-black text-[#FF9541] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Abstract animated central element */}
        <div className="relative flex items-center justify-center w-full max-w-sm mb-[10vh]">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute w-[200px] h-[200px] border border-orange-500/20 rounded-full"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute w-[150px] h-[150px] border border-orange-500/40 rounded-full"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="absolute w-[100px] h-[100px] bg-orange-500/10 border border-orange-500 rounded-full shadow-[0_0_30px_rgba(255,149,65,0.4)]"
          />

          {/* Typewriter text inside the circle */}
          <div className="absolute z-10 flex flex-col items-center">
            <motion.h1 
              className="text-white text-xl font-bold tracking-[0.2em] uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Arnav<span className="text-[#FF9541]">.</span>
            </motion.h1>
          </div>
        </div>

        {/* Loading Progress Bar & Counter at the bottom */}
        <div className="absolute bottom-20 left-0 right-0 px-12 md:px-32 flex flex-col items-start w-full max-w-7xl mx-auto">
          <div className="flex justify-between w-full mb-4 items-end">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-neutral-500 text-sm tracking-widest uppercase font-mono"
            >
              Initializing Sequence
            </motion.span>
            
            <motion.span 
              className="text-5xl md:text-7xl font-black text-white tracking-tighter"
            >
              {Math.floor(progress)}%
            </motion.span>
          </div>

          <div className="w-full h-[2px] bg-neutral-900 overflow-hidden rounded-full">
            <motion.div 
              className="h-full bg-[#FF9541] shadow-[0_0_15px_rgba(255,149,65,0.8)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
