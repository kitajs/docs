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
  - icon: 🛞
    title: We didn't reinvent the wheel
    details:
      Kita uses industry standard libraries like Fastify, Ajv and OpenAPI to provide a
      seamless experience.

  - icon: ⚙️
    title: Hassle free
    details: Good defaults. No magic. Kita does not require any configuration whatsoever.

  - icon: 🔗
    title: TypeScript!
    details:
      Embrace the power of runtime type safety, meta programming and code generation.

  - icon: 📦
    title: Static analyzer
    details:
      Kita is able to statically analyze your function types and generate routes, validate
      input types and inject dependencies.

  - icon: ⚡
    title: Fastify serialization
    details:
      All routes are automatically serialized using Fastify's super fast serialization and
      deserialization flow.

  - icon: 🔌
    title: Open API
    details: All your functions are automatically documented using Open API 3.0.

  - icon: 🔎
    title: In-Editor Intellisense
    details:
      Kita provides a typescript plugin to enable in-editor type checking and
      auto-completion.

  - icon: 🤖
    title: Integration ready!
    details: Kita helps with testing, CI, logging, monitoring and more!
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

 
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
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
      The Kita's development team is composed of a diverse group of people from all
      over the world.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
