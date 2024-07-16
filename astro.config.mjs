import { configDotenv } from "dotenv";
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";

configDotenv();

const prerender = process.env.PRERENDER_ENABLED;
let config;

if (prerender === "true") {
  // https://astro.build/config
  config = defineConfig();
} else {
  // https://astro.build/config
  config = defineConfig({
    output: "server",
    adapter: process.env.NETLIFY
      ? netlify()
      : node({
          mode: "standalone",
        }),
  });
}

// https://astro.build/config
export default defineConfig(config);
