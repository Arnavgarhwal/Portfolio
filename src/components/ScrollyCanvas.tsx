"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120; // 0 to 119

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, "0");
      const basePath = process.env.NODE_ENV === "production" ? "/Portfolio" : "";
      img.src = `${basePath}/sequence/frame_${num}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const drawImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // object-fit: cover logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let renderWidth = canvas.width;
    let renderHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - renderHeight) / 2;
    } else {
      renderWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  // Draw first frame when images load or canvas resizes
  useEffect(() => {
    if (images.length > 0) {
      const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          // Redraw current frame based on scroll position
          const currentFrame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(scrollYProgress.get() * FRAME_COUNT)));
          if (images[currentFrame]) {
            drawImage(images[currentFrame]);
          }
        }
      };
      
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas(); // initial draw
      
      return () => window.removeEventListener('resize', resizeCanvas);
    }
  }, [images, scrollYProgress]);

  // Scrub through animation on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    let frameIndex = Math.floor(latest * FRAME_COUNT);
    if (frameIndex >= FRAME_COUNT) frameIndex = FRAME_COUNT - 1;
    if (frameIndex < 0) frameIndex = 0;
    
    // Use requestAnimationFrame for smooth drawing
    requestAnimationFrame(() => {
      if (images[frameIndex]) {
        drawImage(images[frameIndex]);
      }
    });
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
