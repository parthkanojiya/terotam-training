import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
          @import "./src/variables.less";  // Import variables
          @import "./src/global.less";     // Import global styles
        `,
      },
    },
  },
});
