import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const base = command === 'build' ? '/game-dev-tools/' : '/';

  return {
    plugins: [react()],
    base,
    server: {
      historyApiFallback: true,
    },
    define: {
      'import.meta.env.BASE_URL': JSON.stringify(base)
    },
  };
});
