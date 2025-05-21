/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export
  output: 'export',
  
  // Add a trailing slash to all paths
  trailingSlash: true,
  
  // Set the output directory to 'dist' for Vercel
  distDir: 'dist',
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Configure images for static export
  images: {
    unoptimized: true,
  },
  
  // Disable the default static export behavior for API routes
  // since we're using static export
  experimental: {
    appDir: false,
  },
  
  // Custom webpack configuration to ensure proper static export
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
