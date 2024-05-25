import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["vite.svg"],
  manifest: {
    name: "Just a planner",
    short_name: "Just a planner",
    start_url: "index.html",
    display: "standalone",
    orientation: "portrait-primary",
    theme_color: "#3e7bff",
    background_color: "#dde1fb",
    description: "Minimalistic daily planner and to-do list",
    icons: [
      {
        src: "/icon-48.png",
        type: "image/png",
        sizes: "48x48",
      },
      {
        src: "/icon-72.png",
        type: "image/png",
        sizes: "72x72",
      },
      {
        src: "/icon-96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        src: "/icon-128.png",
        type: "image/png",
        sizes: "128x128",
      },
      {
        src: "/icon-144.png",
        type: "image/png",
        sizes: "144x144",
      },
      {
        src: "/icon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/icon-384.png",
        type: "image/png",
        sizes: "384x384",
      },
      {
        src: "/icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
