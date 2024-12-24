import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import markdoc from "@astrojs/markdoc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkToc from "remark-toc";
import rehypePrettyCode from "rehype-pretty-code";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";
import { tags } from "./src/markdoc/tags";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx({
      remarkPlugins: [
        remarkMath,
        remarkGfm,
        remarkSmartypants,
        [remarkToc, { heading: "contents" }],
        remarkReadingTime,
      ],
      rehypePlugins: [
        rehypeKatex,
        [
          rehypePrettyCode,
          {
            theme: "github-dark",
            onVisitLine(node) {
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }];
              }
            },
            onVisitHighlightedLine(node) {
              node.properties.className.push("highlighted");
            },
            onVisitHighlightedWord(node) {
              node.properties.className = ["word"];
            },
          },
        ],
      ],
      extendMarkdownConfig: true,
      gfm: true,
      frontmatter: {
        preset: "yaml",
        yaml: {
          strict: false,
        },
      },
    }),
    markdoc({
      extends: {
        tags,
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      remarkSmartypants,
      [remarkToc, { heading: "contents" }],
      remarkReadingTime,
    ],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word"];
          },
        },
      ],
    ],
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  vite: {
    ssr: {
      noExternal: ["@radix-ui/*"],
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
