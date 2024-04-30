import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import ts from 'typescript';
import { defineConfig } from 'vitepress';

const description = 'Performant and type-safe Fastify router';
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
      dark: 'rose-pine-moon',
      light: 'rose-pine-dawn'
    },

    codeTransformers: [
      transformerTwoslash({
        jsdoc: true,
        throws: false,
        explicitTrigger: false,
        twoslashOptions: {
          compilerOptions: {
            types: ['@fastify/swagger', '@kitajs/runtime', '@kitajs/html'],
            jsx: ts.JsxEmit.ReactJSX,
            jsxImportSource: '@kitajs/html'
          }
        }
      })
    ]
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
      `(() => {const restore=(e,s,t=!1)=>{let n=localStorage.getItem(e);(n?"false"!==n&&new Date<n:t)&&document.documentElement.classList.add(s)};restore("header-warning","banner-dismissed");})();`
    ],

    ['meta', { name: 'theme-color', content: '#1B1B1F' }],
    ['meta', { charset: 'utf-8' }],
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover'
      }
    ],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'title', content: 'Kita' }],
    ['meta', { name: 'description', content: description }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'nodejs, api, fast, framework, typescript, generator, backend, minimal, code, open, fastify'
      }
    ],

    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:title', content: 'Kita' }],
    ['meta', { property: 'og:site_name', content: 'Kita' }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: `${url}/banner.png` }],

    // Twitter
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:url', content: url }],
    ['meta', { property: 'twitter:title', content: 'Kita' }],
    ['meta', { property: 'twitter:site', content: 'Kita' }],
    ['meta', { property: 'twitter:site', content: 'Kita' }],
    ['meta', { property: 'twitter:description', content: description }],
    ['meta', { property: 'twitter:image', content: `${url}/banner.png` }]
  ],

  sitemap: {
    hostname: url
  },

  themeConfig: {
    logo: '/logo.svg',

    outline: 'deep',

    nav: [
      {
        link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `I just found @kitajsorg, a performant and type-safe Fastify router!\n\nYou should check it out at:\n${url}`
        )}`,
        text: '<img alt="github.com/kitajs Org stars" src="https://img.shields.io/twitter/follow/ktiajsorg?style=flat&logo=x&label=Tweet%20about%20us&labelColor=black">',
        noIcon: true
      },
      {
        text: '<img alt="github.com/kitajs Org stars" src="https://img.shields.io/github/stars/kitajs/kitajs?style=flat&logo=github&label=Star%20us!&color=%23b58d88">',
        link: 'https://github.com/kitajs/kitajs',
        noIcon: true
      },
      {
        text: '🇧🇷',
        link: 'https://github.com/arthurfiorette',
        noIcon: true
      }
    ],

    search: {
      provider: 'algolia',
      options: {
        appId: 'M1H2IJBACA',
        apiKey: '65899940aba852b54cb61fe118dee0d4',
        indexName: 'kita-js'
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
        base: '/',
        items: [
          {
            text: 'What is Kita?',
            link: 'what-is-kita.md'
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
        text: 'Principal concepts',
        base: '/concepts/',
        items: [
          { text: 'Routing', link: 'routing.md' },
          { text: 'Serialization', link: 'serialization.md' },
          { text: 'Exposing types', link: 'exposing-types.md' },
          { text: 'JSDocs', link: 'jsdocs.md' }
        ]
      },
      {
        text: 'Routing',
        base: '/routing/',
        items: [
          { text: 'Rest Routes', link: 'index.md' },
          { text: 'Html Routes', link: 'html.md' },
          { text: 'Configuration', link: 'configuration.md' }
        ]
      },
      {
        text: 'Parameters',
        base: '/parameters/',
        items: [
          {
            text: 'Body',
            link: 'body.md'
          },
          {
            text: 'FastifyInstance',
            link: 'fastify.md'
          },
          {
            text: 'FastifyRequest',
            link: 'request-reply.md'
          },
          {
            text: 'FastifyReply',
            link: 'request-reply.md'
          },
          {
            text: 'Http Errors',
            link: 'http-errors.md'
          },
          {
            text: 'Cookie',
            link: 'cookie.md'
          },
          {
            text: 'File',
            link: 'file.md'
          },
          {
            text: 'Header',
            link: 'header.md'
          },
          {
            text: 'Path',
            link: 'path.md'
          },
          {
            text: 'Query',
            link: 'query.md'
          }
        ].sort((a, b) => a.text.localeCompare(b.text))
      },
      {
        text: 'Providers',
        base: '/providers/',
        items: [
          { text: 'What is a provider', link: 'index.md' },
          { text: 'Provider Hooks', link: 'hooks.md' },
          { text: 'Schema Provider', link: 'schema.md' }
        ]
      },
      {
        text: 'Clients',
        base: '/clients/',
        items: [
          { text: 'Type-safe HTTP client', link: 'orval.md' },
          { text: 'API Reference', link: 'scalar.md' }
        ]
      },
      {
        text: 'Recipes',
        base: '/recipes/',
        items: [
          { text: 'Prisma', link: 'prisma.md' },
          { text: 'Authentication', link: 'authentication.md' },
          { text: 'Environment variables', link: 'env-variables.md' },
          { text: 'Graceful shutdown', link: 'graceful-shutdown.md' },
          { text: 'Migrating existing projects', link: 'migration.md' },
          { text: 'Development server', link: 'dev-server.md' },
          { text: 'Logging', link: 'logging.md' }
        ].sort((a, b) => a.text.localeCompare(b.text))
      },
      {
        text: 'Other',
        base: '/other/',
        items: [
          { text: 'Feature your company', link: 'feature-your-company.md' },
          { text: 'Analytics', link: 'analytics.md' },
          { text: 'Branding', link: 'branding.md' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://kita.js.org/discord' },
      { icon: 'github', link: 'https://github.com/kitajs' },
      { icon: 'twitter', link: 'https://twitter.com/kitajsorg' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@kitajs/cli' }
    ],

    externalLinkIcon: true,

    editLink: {
      pattern: 'https://github.com/kitajs/docs/edit/main/:path'
    }
  }
});
