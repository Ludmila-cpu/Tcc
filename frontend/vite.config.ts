import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist"
  },
  server: {
    port: 3000, // Porta padrão - você pode mudar para qualquer outra (ex: 3000, 8080)
    open: true
  }
});
