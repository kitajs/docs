# Type Safe HTTP Client

The best part of working with a schematized backend is that you can generate a
typed HTTP client from your schema.

Look at this example below of how this integration quickly validates the use of
your client:

<video width="100%" controls autoplay loop muted>
  <source src="/videos/orval-e2e.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

You can have all these benefits without forsaking widely used technologies like
[REST](https://en.wikipedia.org/wiki/REST),
[HTTP](https://en.wikipedia.org/wiki/HTTP), and
[OpenAPI](https://en.wikipedia.org/wiki/Open_API).

## Orval

Client generation is done through [Orval](https://orval.dev/), an HTTP client
generator with support for various targets.

::: details See the list with support for 9 different JavaScript technologies

These are the supported targets, as of 04/2024:

- Angular
- Axios
- Axios Functions
- React Query
- Svelte Query
- Vue Query
- SWR
- Zod
- Hono

:::

See the updated list
[here](https://orval.dev/reference/configuration/output#client).

## Swagger Codegen

Swagger Codegen is also another very popular tool for generating HTTP clients.

Since Kita generates an OpenAPI schema, any other tool that also uses this
specification can also be used to generate an HTTP client.

::: details See the list with support for over 15 different languages

These are the targets supported by Swagger Codegen, as of 04/2024:

- csharp
- csharp-dotnet2
- dart
- dynamic-html
- go
- html
- html2
- java
- javascript
- jaxrs-cxf-client
- kotlin-client
- openapi
- openapi-yaml
- php
- python
- r
- ruby
- scala
- swift3
- swift4
- swift5
- typescript-angular
- typescript-axios
- typescript-fetch

:::

Check the
[official Swagger Codegen documentation](https://swagger.io/tools/swagger-codegen/)
for more information.

## Using Orval

In this example, we'll use Orval to generate an HTTP client for our backend.

Start by installing Orval:

::: code-group

```sh [Frontend Terminal]
npm i -D orval
```

:::

Now, create a configuration file `orval.config.js`.
[Refer to the official documentation for more information.](https://orval.dev/reference/configuration/overview)

::: code-group

```js [frontend/orval.config.js]
const path = require('path');

/** @type {Record<string, import('orval').Options>} */
module.exports = {
  backend: {
    output: {
      mode: 'single',
      // Choose your client here. swt, react-query, axios...
      client: 'axios',
      prettier: true,
      target: path.resolve(__dirname, './src/query.ts'),
      packageJson: require.resolve('./package.json'),
      tsconfig: require.resolve('./tsconfig.json')
    },

    input: {
      // Path or Link to your OpenAPI schema
      target: require.resolve('../backend/openapi.json'),
      validation: false
    }
  }
};
```

:::

As you can see, Orval requires the `input.target` property, which needs to be a
path or link to your OpenAPI schema.

A good practice is to keep the OpenAPI schema in a JSON file within your
backend. To do this, we need to make a change to your server to generate this
file.

::: code-group

```ts {3,9,10,11,12,13,14} [backend/src/index.ts]
import { Kita } from '@kitajs/runtime';
import fastify from 'fastify';
import fs from 'node:fs';

const app = fastify();

app.register(Kita);

app.addHook('onListen', async () => {
  await fs.promises.writeFile(
    'openapi.json',
    JSON.stringify(app.swagger(), null, 2)
  );
});

app.listen();
```

:::

The above will update your server to generate an `openapi.json` file every time
it boots up. Since the route schema must be compiled beforehand, there's no way
to generate this file at compile time
[for now](https://github.com/fastify/fastify-swagger/issues/673).

::: tip

If you get this error:
`Property 'swagger' does not exist on type 'FastifyInstance`, you need to
manually install `@fastify/swagger`.

:::

After making all this configuration, you just need to add the Orval script to
your `package.json`.

::: code-group

```json [Frontend package.json]
{
  "scripts": {
    "generate": "orval",
    "generate:watch": "orval watch"
  }
}
```

:::

If you are using our [Development Server](../recipes/dev-server.md), you can
choose to add this script to the backend:

::: code-group

```json [Backend package.json]
{
  "scripts": {
    "dev:orval": "orval watch -c ../frontend/orval.config.js"
  }
}
```

:::

This way, when you run the `npm run dev` command, `concurrently` will also
execute Orval and it will automatically update your HTTP client whenever there
is a change in the OpenAPI schema.
