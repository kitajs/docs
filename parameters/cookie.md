# Cookie

To access cookies from your request, you can use the `Cookie` parameter.

::: info

This parameter automatically registers
[`@fastify/cookie`](https://github.com/fastify/fastify-cookie) in your Fastify
instance.

You can further configure the plugin by passing `fastifyCookie` to the Kita
plugin options.

:::

Cookies are always of type `string`.

::: code-group

```ts {3} [src/routes/index.ts]
import type { Cookie } from '@kitajs/runtime';

export function get(cookie: Cookie) {
  return `You used the header 'Cookie: cookie=${cookie}'!`;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "string" } }
            }
          }
        }
      }
    }
  }
}
```

:::

## Custom name

You can customize the name of the cookie you want to access by passing a string
literal as an argument to the `Cookie` parameter.

::: code-group

```ts {4} [src/routes/index.ts]
import type { Cookie } from '@kitajs/runtime';

// Access the cookie named 'token'
export function get(anything: Cookie<'token'>) {
  return `This is your token: ${anything}`;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "string" } }
            }
          }
        }
      }
    }
  }
}
```

:::

## Default values

Default values can be used with `Cookie`.

::: code-group

```ts {3} [src/routes/index.ts]
import type { Cookie } from '@kitajs/runtime';

export function get(cookie: Cookie = 'Arthur') {
  return `Hello ${cookie}!`;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "string" } }
            }
          }
        }
      }
    }
  }
}
```

:::
