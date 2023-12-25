# Serialization principles

Fastify's performance is enhanced by solving the serialization problem using
`JSON.stringify` and `JSON.parse`. For a deep dive into this topic, you can
watch Matteo Collina's talk:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/AcO6JgNkO_M?si=5mCthSHttWQ6HI3p&amp;start=556" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

::: warning

This is a Fastify feature utilized by Kita to its full potential, automatically
managing serialization.

Before continuing, it's recommended to read the
[Fastify Serialization and Validation](https://www.fastify.io/docs/latest/Validation-and-Serialization/)
docs.

:::

As Kita runs at build time, it infers all possible return types for your
endpoints and generates a JSON schema. This enables Fastify to use a faster
serializer
([fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify)) and
compiler ([ajv](https://www.npmjs.com/package/ajv)).

## Validating types

All types used in parameters and responses can be validated by Fastify. You can
also use JSDocs for strict type validation. Check the
[available `@formats <format>`s](https://ajv.js.org/guide/formats.html) and
[available `@<keyword> <value>`s](https://ajv.js.org/json-schema.html).

::: details Some common examples

```ts
interface Example {
  /**
   * @minLength 3
   * @maxLength 20
   */
  name: string;

  /** @format email */
  email: string;

  /**
   * @minimum 0
   * @maximum 150
   */
  age: number;

  /**
   * @minItems 1
   * @maxItems 10
   * @uniqueItems
   */
  items: string[];

  /**
   * @minProperties 1
   * @maxProperties 10
   */
  properties: Record<string, string>;
}
```

:::

## Parsing the request

The combination of `ts-json-schema-generator` and `ajv` allows powerful
validation of inputs using JSDocs and TypeScript types.

```ts
interface CreateUser {
  /**
   * The name of the user
   *
   * @minLength 3
   * @maxLength 20
   */
  name: string;

  /**
   * The email of the user
   *
   * @format email
   */
  email: string;

  /**
   * The age of the user
   *
   * @minimum 0
   * @maximum 150
   */
  age: number;
}
```

You can use the above interface inside a route handler:

```ts
export function post(data: Body<CreateUser>) {}
```

Kita incorporates all this information into the generated schema for validation
by Fastify. This is done at build/startup time, ensuring it doesn't impact your
application's runtime performance.

You can confidently use types to define your routes, and Kita will handle the
validation for you. Ajv, the library used underneath, is trusted by
[millions of developers and multiple big companies](https://ajv.js.org/#who-uses-ajv)
for its speed and reliability.
