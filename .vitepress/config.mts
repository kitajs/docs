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
    lineNumbers: true,
    typographer: true,
    theme: {
      dark: 'github-dark',
      light: 'github-light'
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/x-icon' }],

    [
      'script',
      {
        defer: '',
        'data-domain': 'kita.js.org',
        src: 'https://plausible.io/js/script.js'
      },
      '/* This site metrics are public available at https://plausible.io/kita.js.org */'
    ],

    [
      'script',
      { id: 'restore-banner-preference' },
      `(() => {const restore=(e,s,t=!1)=>{let n=localStorage.getItem(e);(n?"false"!==n&&new Date<n:t)&&document.documentElement.classList.add(s)};restore("header-banner","banner-dismissed");})();`
    ]
  ],

  // FIXME: Remove when documentation is done
  ignoreDeadLinks: true,

  sitemap: {
    hostname: url,
    lastmodDateOnly: true
  },

  themeConfig: {
    logo: '/logo.svg',

    outline: 'deep',

    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Learn', link: '/learn/' },
      { text: 'Reference', link: '/reference/' },
      { text: 'Templating', link: '/templating/' },
      { text: 'Integration', link: '/integration/' }
    ],

    search: {
      provider: 'algolia',
      options: {
        appId: 'GK93WOWSB3',
        apiKey: '3fd9b69d0de15fab0e443033cbd9c573',
        indexName: 'kitajs-docs'
      }
    },

    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },

    footer: {
      message: 'Made with ❤️ by Arthur Fiorette',
      copyright:
        'Copyright (c) 2022-present Arthur Fiorette & Kita Contributors'
    },

    sidebar: [
      {
        text: 'Guide',
        base: '/guide/',
        items: [
          {
            text: 'What is Kita?',
            link: 'index.md'
          },
          {
            text: 'Practical example',
            link: 'practical-example.md'
          },
          {
            text: 'Quick start',
            link: 'quickstart.md'
          }
        ]
      },
      {
        text: 'Routing',
        base: '/routes/',
        items: [
          { text: 'Basics of routing', link: 'index.md' },
          { text: 'Handling input data', link: 'handling-input.md' },
          { text: 'Serialization principles', link: 'serialization.md' },
          { text: 'Identifying routes', link: 'identification.md' }
        ]
      },
      {
        text: 'Learn by building',
        base: '/learn/',
        items: [
          { text: 'What we will build', link: 'index.md' },
          { text: 'Setting things up', link: 'setup.md' },
          { text: 'Creating our first route', link: 'first-route.md' },
          { text: 'Improving the setup', link: 'improving-setup.md' },
          { text: 'Modelling our data', link: 'modelling-data.md' },
          { text: 'Adding authentication', link: 'authentication.md' }
        ]
      },
      {
        text: 'Templating',
        base: '/templating/',
        items: [{ text: '🛠️', link: 'guide.md' }]
      },
      {
        text: 'Recipes',
        base: '/recipes/',
        items: [{ text: 'Migrating from other projects', link: 'migration.md' }]
      },
      {
        collapsed: true,
        text: 'Other',
        base: '/other/',
        items: [
          { text: 'Feature your company', link: 'feature-your-company.md' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://kita.js.org/discord' },
      { icon: 'github', link: 'https://github.com/kitajs' },
      { icon: 'twitter', link: 'https://twitter.com/kitajsorg' }
    ],

    externalLinkIcon: true,

    editLink: {
      pattern: 'https://github.com/kitajs/docs/edit/main/:path'
    }
  }
});
