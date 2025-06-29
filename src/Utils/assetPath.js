/**
 * Helper function to get the correct asset path that works in both development and production
 * @param {string} path - The asset path starting with '/'
 * @returns {string} The correct path with base URL if needed
 */
export const getAssetPath = (path) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development, we can use the path as is
  // In production, we need to prepend the base URL (e.g., '/game-dev-tools/')
  return `${import.meta.env.BASE_URL}${cleanPath}`.replace(/\/+$/, '');
};
