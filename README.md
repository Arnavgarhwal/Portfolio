# Arnav's Sci-Fi Scrollytelling Portfolio

A premium, interactive digital portfolio built for maximum performance and visual impact. This project features a 3D-like "Scrollytelling" image sequence synced perfectly with the user's scroll position, a glassmorphism UI, and fluid animations.

## Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS (`globals.css`)
- **Animation:** Framer Motion
- **Rendering:** HTML5 Canvas (Hardware-accelerated image sequence scrubbing)
- **Icons:** Lucide React

## Key Features

1. **Scroll-Linked Image Sequence:** The background features an HTML5 Canvas that loads an optimized WebP sequence. As the user scrolls down the page, `framer-motion` hooks map the scroll progress to scrub through 119 individual image frames, creating a cinematic 3D scroll effect.
2. **Dynamic Parallax Overlays:** Text perfectly tracks and animates in relation to the canvas scrubbing, fading in left, center, and right.
3. **Admin Dashboard (Local Storage):** A hidden admin panel allows the owner to log in and dynamically mutate (Add, Edit, Delete) the list of their projects displayed on the frontend grid natively within the browser using `localStorage`.
4. **Custom Loader:** A full-screen geometric abstract loading sequence that halts user interaction until the image memory buffer is fully loaded.
5. **Glassmorphism Projects Grid:** A sleek project overview section utilizing background blurs and amber glowing hover states.

## Setup & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Highlights

This project intentionally limits dependencies to maintain high FPS during the scroll effect. The image sequence relies purely on `requestAnimationFrame` scaling over `window.innerWidth` and height to ensure "cover-like" responsiveness natively without expensive DOM repaints.

---
*Created by [Arnav Garhwal](https://github.com/Arnavgarhwal)*
