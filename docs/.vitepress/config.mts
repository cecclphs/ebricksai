import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/ebricksai/" : "/",
  title: "eBricks-AI",
  description: "A Discovery-Based Learning Journey with eBricks-AI",

  markdown: {
    config: (md) => {
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
