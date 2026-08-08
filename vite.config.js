import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  // Łączymy wtyczki: Twój Tailwind oraz React (potrzebny dla plików .jsx)
  plugins: [react(), tailwindcss()],
  // Dodajemy konfigurację ścieżek dla shadcn/ui
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
