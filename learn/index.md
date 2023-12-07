# What we will build

The best way to learn something is to build a project with it. So, let's build a Reddit
clone with Kita!

Kita is a framework designed to build restful APIs, so we will follow this path, but it
also provides a awesome way to build backend-driven web applications.

::: details Swagger UI screenshot

<img src="/learn/keddit-swagger.png" />

:::

::: details Frontend build with KitaJS + Htmx

<video controls>
  <source src="/learn/keddit-preview.webm"  type="video/webm"  >
</video>

:::

All this code is available on [GitHub](https://github.com/kitajs/keddit), however I
strongly recommend you to follow this guide step by step instead of forking the repository
and trying to run it.

## Prerequisites

Before we start, you need to have [Node.js](https://nodejs.org/en/) installed on your
machine. If you don't have it, you can download it.

We'll use [pnpm](https://pnpm.io/) as package manager, but you can use npm or yarn
instead.

## Tech stack

Keddit will be a fullstack application, **feel free to use whatever you want, this guide
will only focus on teaching Kita**, below is the tech stack we will use:

- [Typescript](https://www.typescriptlang.org/) - Typescript is a superset of Javascript
  that adds types to the language, **it's also the only current requirement to use Kita**.
- [Fastify](https://www.fastify.io/) - Kita is built on top of Fastify, most concepts and
  libraries used will be Fastify plugins.
- [Prisma](https://www.prisma.io/) - Prisma is an ORM, we will use it to connect to our
  database because it's easy to use and setup.
- [SQLite](https://www.sqlite.org/index.html) - SQLite is a simple SQL database, its only
  being used because no extra setup aside from a file.db is required.
- [Htmx](https://htmx.org/) - Htmx is a library that allows you to create backend-driven
  web applications, we will use it to create our frontend, if you also chose to follow the
  frontend steps.
- [PicoCSS](https://picocss.com/) - PicoCSS is a tiny CSS framework, were not here to
  teach or make beautiful UIs, Pico lets us just use html tags without `.classes` while
  keeping a decent and consistent look.
