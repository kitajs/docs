import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Kita',
  description: 'Performant and type safe fastify router',

  themeConfig: {
    // logo: '/assets/logo.png',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: '🛠️ What is Kita', link: 'guide.md' },
          { text: '🛠️ Getting started', link: 'guide/getting-started.md' }
        ]
      },
      {
        text: 'Extensions',
        items: [{ text: 'Jsx Html', link: 'html.md' }]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/kitajs' }]
  }
});
