/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Enable static HTMl export for GitHub Pages
  output: "export",
  
  // Important: GitHub Pages serves from a subdirectory matching the repository name
  basePath: isProd ? "/Portfolio" : "",

  // Disable Server-Side Image Optimization since we are exporting statically
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
