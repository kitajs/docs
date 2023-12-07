import { defineConfig } from 'vitepress';

const description = 'Performant and type safe Fastify router';
const url = 'https://kita.js.org';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Kita',
  description,

  cleanUrls: true,
  appearance: true,
  lastUpdated: true,

  markdown: {
    lineNumbers: false,
    typographer: true
  },

  head: [
    ['link', { rel: 'icon', href: 'favicon.svg', type: 'image/x-icon' }],

    //
    [
      'script',
      {
        defer: '',
        'data-domain': 'kita.js.org',
        src: 'https://plausible.io/js/script.js'
      },
      '/* This site metrics are public available at https://plausible.io/kita.js.org */'
    ]
  ],
  
  sitemap: {
    hostname: url,
    lastmodDateOnly: true
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Learn', link: '/learn' },
      { text: 'Reference', link: '/reference' },
      { text: 'Templating', link: '/templating' },
      { text: 'Integration', link: '/integration' }
    ],

    search: {
      provider: 'local',
      options: {}
    },

    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },

    footer: {
      message: 'Made with ❤️ by Arthur Fiorette',
      copyright: 'Copyright (c) 2022-present Arthur Fiorette & Kita Contributors'
    },

    sidebar: [
      // {
      //   text: 'Guide',
      //   base: '/guide/',
      //   items: [{ text: '🛠️', link: 'guide.md' }]
      // },
      {
        text: 'Learn',
        base: '/learn/',
        items: [
          { text: 'What we will build', link: 'index.md' },
          { text: 'Setting things up', link: 'setup.md' },
          { text: 'Creating our first route', link: 'first-route.md' }
        ]
      },
      // {
      //   text: 'Reference',
      //   base: '/reference/',
      //   items: [{ text: '🛠️', link: 'guide.md' }]
      // },
      // {
      //   text: 'Templating',
      //   base: '/templating/',
      //   items: [{ text: '🛠️', link: 'guide.md' }]
      // },
      // {
      //   text: 'Integration',
      //   base: '/integration/',
      //   items: [
      //     { text: 'Authentication', link: 'guide.md' },
      //     { text: 'Database', link: 'guide.md' },
      //     { text: 'Logging', link: 'guide.md' }
      //   ]
      // },
      {
        text: 'Other',
        base: '/other/',
        items: [{ text: 'Feature your company', link: 'feature-your-company.md' }]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/kitajs' }],

    editLink: {
      pattern: 'https://github.com/kitajs/docs/edit/main/:path'
    }
  }
});
