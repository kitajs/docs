---
layout: home

hero:
  name: 'Kita'
  text: 'Performant and type-safe Fastify router'
  tagline: Build fast end-to-end APIs with ZERO abstraction cost!
  actions:
    - theme: brand
      text: Write the FUTURE →
      link: /practical-example
    - theme: alt
      text: What is Kita?
      link: /what-is-kita
    - theme: alt
      text: Html engine
      link: ./html/index.md
  image:
    src: /doug.svg
    alt: Kita brown and white lotus logo

features:
  - icon: 🔎
    title: In-Editor Intellisense
    details:
      Kita provides a typescript plugin to enable in-editor type checking and
      auto-completion.

  - icon: 🩺
    title: Static analyzer
    details:
      Kita is able to statically analyze your function types and generate
      routes, validate input types and inject dependencies.

  - icon: 🛞
    title: No wheel reinvention
    details:
      Kita uses industry standard libraries like Fastify, Ajv and OpenAPI to
      provide a seamless experience.

  - icon: 🧩
    title: Hassle-free
    details:
      Good defaults. No magic. Kita does not require any configuration
      whatsoever.

  - icon: TS
    title: TypeScript!
    details:
      Embrace the power of runtime type safety, meta programming and code
      generation.

  - icon: 🚀
    title: Safe and Fast I/O
    details:
      All routes are automatically serialized using Fastify's super fast
      serialization and deserialization flow.

  - icon: 📖
    title: Open API
    details: All your functions are automatically documented using Open API 3.1.

  - icon: 🏇
    title: Ready for your workflow!
    details:
      Kita provides tutorials for integrating with loggers, databases and more.
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme';

const members = [
  {
    avatar: 'https://github.com/arthurfiorette.png',
    name: 'Arthur Fiorette 🇧🇷',
    title: 'Creator',
    sponsor: 'https://github.com/sponsors/arthurfiorette',
    links: [
      { icon: 'github', link: 'https://github.com/arthurfiorette' },
      { icon: 'twitter', link: 'https://twitter.com/arthurfiorette' },
      { icon: 'instagram', link: 'https://instagram.com/arthurfiorette' }
    ]
  },{
    avatar: 'https://github.com/JacopoPatroclo.png',
    name: 'Jacopo Patroclo 🇮🇹',
    title: 'Member',
    org: 'Html',
    orgLink: 'https://github.com/kitajs/html',
    links: [
      { icon: 'github', link: 'https://github.com/JacopoPatroclo' },
      { icon: 'twitter', link: 'https://twitter.com/JacoMartin1994' }
    ]
  },
  {
    avatar: 'https://github.com/devzolo.png',
    name: 'Devzolo 🇧🇷',
    title: ' Member',
    links: [
      { icon: 'github', link: 'https://github.com/devzolo' },
      { icon: 'twitter', link: 'https://twitter.com/devzolo' }
    ]
  },
  {
    avatar: 'https://github.com/zmarques.png',
    name: 'Thiago Marques 🇧🇷',
    title: 'Member',
    links: [
      { icon: 'github', link: 'https://github.com/zmarques' },
      { icon: 'instagram', link: 'https://www.instagram.com/http.thiagomarques' }
    ]
  }
];

const companies = [
  {
    name: 'Cargill',
    logo: '/companies/cargill.svg',
    link: 'https://www.cargill.com'
  },
  {
    name: 'Kasco R&D',
    logo: '/companies/kasco.svg',
    link: 'https://home.kascosys.com.br'
  }
];
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title id="asd">Trusted by companies</template>
    <template #lead>Kita is proudly powering a large ecosystem of organizations and products worldwide.</template>
  </VPTeamPageTitle>

  <div id="trusted-by-wrapper">
    <div id="trusted-by">
      <template v-for="company in companies">
        <a :href="company.link" :alt="company.name" target="_blank" :title="company.name">
          <img :src="company.logo" :alt="`${company.name} logo`" />
        </a>
      </template>
    </div>
    <small id="small-text">
      The logos displayed in this page are property of the respective organizations and they are not distributed under the same license as Kita (MIT).
      <br />
      <a href="other/feature-your-company">Learn how to be featured here.</a>
    </small>
  </div>
</VPTeamPage>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Our Team</template>
    <template #lead>Kita's development team is composed of a diverse group of people from all over the world.</template>
  </VPTeamPageTitle>
  
  <VPTeamMembers :members="members" size="small" />

  <small id="small-text">
    You can be part of this team too!
    <br />
    Contributing to a feature to <a href="https://github.com/kitajs/kitajs" target="_blank">our repository</a> makes you eligible for a spotlight in this space.
  </small>
</VPTeamPage>
