import { defineConfig } from "vitepress";
import katex from 'markdown-it-katex'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/ebricksai/" : "/",
  title: "eBricks-AI",
  description: "A Discovery-Based Learning Journey with eBricks-AI",
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css' }]
  ],

  markdown: {
    config: (md) => {
      md.use(katex)
      // Task lists are enabled by default in VitePress
      // But we can ensure other markdown features are available
    },
    lineNumbers: true,
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Course", link: "/chapter0" },
      { text: "GPIO Reference", link: "/gpio-reference" },
      { text: "About eBricks-AI", link: "/about" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        collapsed: false,
        items: [
          { text: "Chapter 0: Welcome to eBricks-AI", link: "/chapter0" },
          { text: "Chapter 1: Setting Up Your Workspace", link: "/chapter1" },
          { text: "Chapter 2: Your First Program", link: "/chapter2" },
        ],
      },
      {
        text: "Foundations",
        collapsed: false,
        items: [
          { text: "Chapter 3: Digital Output", link: "/chapter3" },
          { text: "Chapter 4: Understanding Binary", link: "/chapter4" },
          { text: "Chapter 5: Digital Input", link: "/chapter5" },
          { text: "Chapter 6: Analog Input", link: "/chapter6" },
        ],
      },
            {
        text: "Output Devices",
        collapsed: false,
        items: [
          { text: "Chapter 7: Sound and Music with Buzzers", link: "/chapter7" },
          { text: "Chapter 8: The 7-Segment Display", link: "/chapter8" },
          { text: "Chapter 9: Integration - Building Complete Systems", link: "/chapter9" },
        ],
      },
      {
        text: 'eB805-45 Sensor Set',
        items: [
          { text: 'Chapter 10: Arduino Nano', link: '/chapter10' },
        ]
      },
      {
        text: "Reference",
        collapsed: true,
        items: [
          { text: "GPIO & Pin Reference", link: "/gpio-reference" },
          { text: "Quick Reference Card", link: "/quick-reference" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/ebricksai" }],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024 eBricks-AI",
    },

    search: {
      provider: "local",
    },

    outline: {
      level: [2, 3],
      label: "On this page",
    },
  },
});
