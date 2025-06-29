import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  // For production builds, use the base path, for development use '/'
  const base = command === 'build' ? '/game-dev-tools/' : '/';

  return {
    plugins: [react()],
    base,
    server: {
      // This ensures that the development server handles the SPA fallback correctly
      historyApiFallback: true,
    },
    // Ensure Vite serves the correct base URL in development
    define: command === 'serve' ? {
      'import.meta.env.BASE_URL': JSON.stringify('/')
    } : {}
  };
});
