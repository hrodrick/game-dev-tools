import { useEffect, useState } from "react";

/**
 * React hook to check if a CSS media query matches.
 * @param {string} query - Media query string, e.g. '(min-width: 768px)'
 * @returns {boolean}
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}