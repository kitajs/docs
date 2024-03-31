# Header

To use headers from your request, you can use the `Header` parameter.

**Headers are always lowercased strings.**

::: code-group

```ts {3} [src/routes/index.ts]
import type { Header } from '@kitajs/runtime';

export function get(token: Header) {
  return `You used the header 'Token: ${token}'!`;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "parameters": [
          {
            "schema": { "type": "string" },
            "in": "header",
            "name": "token",
            "required": true
          }
        ],
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

## Custom names

You can also use custom names for the header you want to access.

::: code-group

```ts {4} [src/routes/index.ts]
import type { Header } from '@kitajs/runtime';

// Access the header named 'Auth-Token'
export function get(anything: Header<'auth-token'>) {
  return `This is your Auth-Token: ${anything}`;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "parameters": [
          {
            "schema": { "type": "string" },
            "in": "header",
            "name": "auth-token",
            "required": true
          }
        ],
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

Default values can be used with `Header`.

::: code-group

```ts {3} [src/routes/index.ts]
import type { Header } from '@kitajs/runtime';

export function get(token: Header = 'please let me in') {
  return `This is your Auth-Token: ${anything}`;
}
```

```json
{
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "parameters": [
          {
            "schema": { "type": "string" },
            "in": "header",
            "name": "token",
            "required": false
          }
        ],
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
