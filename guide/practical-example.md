# Practical Example

> A line of code is worth a thousand words.

No matter how good we are at explaining, nothing is better than an example to
prove to you how powerful Kita is in just a few lines of code.

Below is the simplest Fastify server you've ever seen:

::: code-group

```ts{6} [src/index.ts]
import { Kita } from '@kitajs/runtime';
import fastify from 'fastify';

const app = fastify();

app.register(Kita);

app.listen({ port: 1227 }).then(console.log);
```

:::

Just by creating a file in the `src/routes` folder named `index.ts` and
exporting a function, you already have a `GET` route registered in Fastify.

::: code-group

```ts [src/routes/index.ts]
export function get() {
  return { hello: 'world' };
}
```

:::

## Running the Server

As Kita runs at compile time, you need to run the `kita build` command before
running or compiling your code:

::: code-group

```sh [Terminal]
npx kita build
```

```js [Output]
Thanks for using Kita! 🎉

Searching runtime... Found!
Warming up... Ready to build!
Parsing sources... 1 routes / 1 schemas / 1 providers | 0 errors
Generating @kitajs/runtime... 6 files written.

Runtime is ready to use!
```

:::

Now, run your server:

::: code-group

```sh [Terminal]
$ npx ts-node src/index.ts
# npx tsc && node dist/index.js is also valid
http://0.0.0.0:1227
```

:::

## Testing the Route

Done! Your server is already running and you can access the `GET` route at
`http://localhost:1227`.

::: code-group

```sh [Terminal]
$ curl http://localhost:1227
{ "hello": "world" }
```

:::

## Viewing the Documentation

**But wait, there's more!** Kita, along with [Scalar](https://scalar.com/),
generates a graphical interface for you to visualize, edit, and test your API:

<a href="/swagger/practical-example" target="_blank">Click here to launch the
Scalar Editor</a>

::: details Or view it through an iframe:

<iframe src="/swagger/practical-example.html" style="width: 100%; aspect-ratio: 3/4; resize: vertical;"></iframe>

:::

## OpenAPI Documentation

Also, by default, everything that
[@fastify/swagger](https://github.com/fastify/fastify-swagger) needs is defined
and configured, which also automatically generates a valid OpenAPI json for your
API.

::: code-group

```json [OpenAPI Spec]
{
  "openapi": "3.1.0",
  "info": {
    "title": "API Reference",
    "description": "Powered by [Scalar](https://scalar.com/) & Generated by [KitaJS](https://kita.js.org/)",
    "version": "1.1.22"
  },
  "components": {
    "schemas": {
      "GetIndexResponse": {
        "additionalProperties": false,
        "properties": { "hello": { "type": "string" } },
        "required": ["hello"],
        "type": "object"
      }
    }
  },
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/GetIndexResponse" }
              }
            }
          }
        }
      }
    }
  }
}
```