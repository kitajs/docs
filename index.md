---
layout: home

hero:
  name: 'Kita'
  text: 'Performant and type safe Fastify router'
  tagline: Build fast end-to-end APIs with ZERO abstraction cost!
  actions:
    - theme: brand
      text: Write the FUTURE →
      link: /guide
    - theme: alt
      text: View on GitHub
      link: https://github.com/kitajs
  image:
    src: /logo.svg
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
      Kita is able to statically analyze your function types and generate routes, validate
      input types and inject dependencies.

  - icon: 🛞
    title: No wheel reinvention
    details:
      Kita uses industry standard libraries like Fastify, Ajv and OpenAPI to provide a
      seamless experience.

  - icon: 🧩
    title: Hassle free
    details: Good defaults. No magic. Kita does not require any configuration whatsoever.

  - icon: TS
    title: TypeScript!
    details:
      Embrace the power of runtime type safety, meta programming and code generation.

  - icon:  🚀
    title: Fastify serialization
    details:
      All routes are automatically serialized using Fastify's super fast serialization and
      deserialization flow.

  - icon: 📖
    title: Open API
    details: All your functions are automatically documented using Open API 3.0.

  - icon: 🏇
    title: Ready for your workflow!
    details: Kita provides tutorials for integrating with loggers, databases and more.
---

<script setup>
  import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme';

  const members = [
    {
      avatar: 'https://github.com/arthurfiorette.png',
      name: 'Arthur Fiorette',
      title: 'Creator',
      links: [
        { icon: 'github', link: 'https://github.com/arthurfiorette' },
        { icon: 'twitter', link: 'https://twitter.com/arthurfiorette' },
        { icon: 'instagram', link: 'https://instagram.com/arthurfiorette' }
      ]
    },
    {
      avatar: 'https://github.com/mesquitaviana.png',
      name: 'Gabriel Mesquita',
      title: 'Core Contributor',
      links: [
        { icon: 'github', link: 'https://github.com/mesquitaviana' },
        { icon: 'instagram', link: 'https://www.instagram.com/eummesquita' }
      ]
    },
    {
      avatar: 'https://github.com/devzolo.png',
      name: 'Devzolo',
      title: 'Core Contributor',
      links: [
        { icon: 'github', link: 'https://github.com/devzolo' },
        { icon: 'twitter', link: 'https://twitter.com/devzolo' }
      ]
    }
  ];
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title> Trusted by companies </template>
    <template #lead>
      Kita is proudly powering a large ecosystem of organizations and products worldwide.
    </template>
  </VPTeamPageTitle>

  <div id="trusted-by-wrapper">
    <div id="trusted-by">
      <a href="https://www.cargill.com" alt="Cargill" target="_blank">
        <img src="/companies/cargill.svg" alt="Cargill logo" />
      </a>
      <a href="https://home.kascosys.com.br" alt="Kasco R&D" target="_blank">
        <img src="/companies/kasco.svg" alt="Kasco logo" />
      </a>
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
    <template #title> Our Team </template>
    <template #lead>
      The Kita's development team is composed of a diverse group of people from all over
      the world.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members" />

  <small id="small-text">
    You can be part of this team too!
    <br />
    Contributing to a feature to <a href="https://github.com/kitajs/kitajs" target="_blank">our repository</a> makes you eligible for a spotlight in this space.
  </small>
</VPTeamPage>
