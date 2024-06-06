import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
 base: "/api/",
 plugins: [react()],
 preview: {
  port: 5000,
  strictPort: true,
 },
 server: {
  port: 5000,
  strictPort: true,
  host: true,
 },
});