# Parameters

Simple routes like `export function get() {}` are not very useful. To make your
routes dynamic and powerful, you need to access request and response objects,
along with parameters, query strings, body content, files uploaded, headers, and
more.

Kita allows you to handle various types of parameters in your route handlers,
simplifying the interaction with and validation of incoming data. Parameters are
specified using types from the `@kitajs/runtime` module, and Kita automatically
validates requests based on the specified types. This validation is achieved by
generating valid objects, following the principles of
[Fastify's Validation and Serialization](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/).

## Using Parameters

In the example below, Kita understands and builds a route expecting a `POST`
request to `/users` with a JSON body containing `name`, `age`, and an `email`
field, along with a `user-agent` header. Missing or invalid parameters will
automatically result in a `400 Bad Request` error. **Sending a request with
anything other than a number in the `age` field will also be rejected.**

::: code-group

```ts [src/routes/users.ts]
import type { Body, Header } from '@kitajs/runtime';

// Creates a new user
export function post(
  data: Body<{ name: string; email: string; age: number }>,
  userAgent: Header<'user-agent'>,
  rawRequest: FastifyRequest
) {
  // ...
}
```

:::

::: tip

The order of parameters is **NOT important**; Kita will automatically inject the
correct values in the correct order.

:::

This seamless functionality is made possible by
[`ts-json-schema-generator`](https://github.com/vega/ts-json-schema-generator),
a project that transforms TypeScript types into JSON schemas, and
[`ajv`](https://github.com/ajv-validator/ajv), which validates the request
against the generated schema. The JSON schema is generated during `kita build`,
and the
[validation is performed at runtime by Fastify](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#core-concepts).

Moreover, automatic validation enables Kita to effortlessly generate Swagger
specifications, providing detailed documentation for your API. This makes it
easier for developers to understand how to interact with your routes.

By utilizing these parameter types, you can enhance the readability,
maintainability, and security of your Kita applications. As you define and use
these types, Kita handles the heavy lifting, allowing you to focus on building
robust and efficient APIs.

## Creating Your Own Parameters (Providers)

While built-in parameters cover many use cases, Kita recognizes that custom
needs arise. For this reason, Kita introduces providers, allowing you to create
your own parameters.

Providers link a type to a function that returns a value of the same type, and
they can be automatically called by adding that type as a route parameter.
Providers are defined inside the `src/providers` folder and are automatically
loaded by Kita.

Here's an example provider that returns the user agent of the request:

::: code-group

```ts [src/providers/user-agent.ts]
export default function (request: FastifyRequest) {
  return request.headers['user-agent'];
}
```

:::

Providers offer several advantages over simple route parameters, such as
defining their own schemas (parameters, return types, etc.), reuse across
multiple routes without code duplication, registration of application and
lifecycle hooks, and more.

[For detailed information, refer to the respective sections on providers.](../providers/index.md)
