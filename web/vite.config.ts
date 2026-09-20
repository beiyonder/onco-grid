import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 750,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "three-spatial", test: /node_modules\/three/ },
            { name: "supabase-pilot", test: /node_modules\/@supabase/ },
          ],
        },
      },
    },
  },
});
