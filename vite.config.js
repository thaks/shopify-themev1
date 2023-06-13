import shopify from "vite-plugin-shopify";
import shopifyModules from "vite-plugin-shopify-modules";

export default {
  build: {
    emptyOutDir: process.env.VITE_WATCH !== "true",
    sourcemap: true,
    watch: process.env.VITE_WATCH === "true" && {
      exclude: [
        "assets/*",
        "snippets/vite-*.liquid",
        "config/settings_schema.json",
      ],
    },
  },
  plugins: [
    shopify({
      additionalEntrypoints: ["modules/**/*.js"],
    }),
    shopifyModules(),
  ],
};
