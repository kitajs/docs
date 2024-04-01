# What is Kita?

Kita (`/ˈkitə/`) is a [meta](https://en.wikipedia.org/wiki/Metaprogramming)
router for Fastify.

::: tip Just want to try it by yourself?

Skip to the [Quickstart](./quickstart) or head over to our
[Migration Guide](./recipes/migration.md) to migrate your existing project to
Kita.

:::

Kita is a tool that analyzes your TypeScript source code for functions named
after an HTTP method (`get`, `post`, ...) within the `src/routes` folder and
automatically generates all the necessary configurations to register your routes
in Fastify.

This includes reading the typing of the parameters and the return of the
function to generate both the API documentation and the **validation of input
and output data**.

## Why use Kita?

Kita was created to facilitate the creation of APIs in TypeScript, allowing you
to focus on what really matters: **the code**. With Kita, you don't worry about
input validation, output, documentation, routing, and so on.

Its philosophy is as follows:

> **Define once, use everywhere.**

---

Normally you define an interface for the body of your endpoint, then define a
schema to validate it, then write documentation about the route, and then
register the body parse in the route. Repeat the above for `Query`, `Body`,
`Params`, `Headers`, `Response`, and `Plugins` and **before you know it you have
10 different files for just a single HTTP endpoint.**

With Kita, you do all this with **just** one exported function for each
endpoint.

**No more, no less.**

## Use Cases

- <ins>Rapid Prototyping</ins>: Create an API quickly without worrying about
  documentation and input validation. **With Kita, you create documented and
  consistent routes just by exporting functions.**

- <ins>Type Safety</ins>: All your routes will be typed and documented following
  [OpenAPI](https://www.openapis.org) standards, ensuring that the documentation
  never goes out of sync with the code. **Using Kita, your code is the
  documentation.**

- <ins>Scalability</ins>: From small teams to extremely large teams, from small
  projects to projects with thousands of routes. **Kita is scalable and flexible
  enough to adapt to any scenario.**

- <ins>End-to-End Security</ins>: With the OpenAPI specification available, you
  can use tools like [Orval.dev](https://orval.dev) or
  [Swagger Codegen](https://swagger.io/tools/swagger-codegen) to generate
  clients for your API in over 50 different languages. **APIs with Kita allow
  your frontend to consume the API in a simple, secure, and typed manner.**

- <ins>Speed</ins>: Using techniques of
  [static analysis](https://en.wikipedia.org/wiki/Static_program_analysis), Kita
  is capable of registering routes and generating functions at compile time,
  ensuring that your application runs less code at runtime. **Kita uses all the
  features of Fastify to be extremely fast and efficient.**

## Developer Experience

Kita was created to be as simple as possible and not require configuration.
Achieve excellence in API development with the least possible effort.

The point where it stands out the most is during the automatic generation of
OpenAPI documentation:

By using code generators for the client _(like [Orval.dev](https://orval.dev/)
or [Swagger Codegen](https://swagger.io/tools/swagger-codegen/))_, when making a
simple design change in the API, you can regenerate the client and ensure that
the frontend is always in sync with the backend, **showing all the lines of code
that need to be changed**.
