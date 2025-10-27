import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Static front-end build. Deployed to GitHub Pages under a project subpath,
// so `base` must match the repository name.
export default defineConfig({
  base: "/GTUElearningAccessible/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
