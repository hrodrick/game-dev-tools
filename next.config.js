/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Optional: Add a trailing slash to all paths
  trailingSlash: true,
  // Optional: Change the output directory `out` -> `dist`
  distDir: 'dist',
  // Enable React Strict Mode
  reactStrictMode: true,
  // Enable static exports for the App Router
  images: {
    unoptimized: true,
  },
  // Optional: Disable server-side rendering at build time
  // (Makes static export work with dynamic routes)
  // output: 'export',
};

module.exports = nextConfig;
