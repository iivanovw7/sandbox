import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';
import robotsTxt from "astro-robots-txt";
import { astroImageTools } from "astro-imagetools";

// https://astro.build/config
export default defineConfig({
    // base: '.', // Set a path prefix.
    site: "https://iivanovw7.org", // Use to generate your sitemap and canonical URLs in your final build.
    // Important!
    // Only official '@astrojs/*' integrations are currently supported by Astro.
    // Add 'experimental.integrations: true' to make 'astro-robots-txt' working
    // with 'astro build' command.
    markdown: {
        shikiConfig: {
            // Choose from Shiki's built-in themes (or add your own)
            // https://github.com/shikijs/shiki/blob/main/docs/themes.md
            theme: "github-dark",
        },
    },
    outDir: './build/dist',
    integrations: [
        mdx(),
        react(),
        tailwind(),
        sitemap(),
        robotsTxt(),
        astroImageTools,
    ],
});
