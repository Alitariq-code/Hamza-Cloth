/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained server build for low-RAM VM deployment (node server.js).
  output: "standalone",
  // Single in-process build worker — avoids a flaky jest-worker crash seen on
  // very new Node versions during "Collecting page data".
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  images: {
    // On the constrained VM (1GB RAM) skip server-side image optimization —
    // Cloudinary/Unsplash already serve optimized images. Enabled via env at
    // build time so local dev keeps optimization.
    unoptimized: process.env.UNOPTIMIZED_IMAGES === "true",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
