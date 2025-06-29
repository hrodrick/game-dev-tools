/**
 * Helper function to get the correct asset path that works in both development and production
 * @param {string} path - The asset path (with or without leading slash)
 * @returns {string} The correct path with base URL if needed
 */
export const getAssetPath = (path) => {
  if (!path || path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  const baseUrl = window.location.origin + (import.meta.env.BASE_URL || '');
  
  return `${baseUrl}/${cleanPath}`.replace(/([^:])\/\//g, '$1/');
};
