# Path

Routes defined with `/[variable]` are automatically registered as path parameter
routes. The value of the variable is passed as an argument to the parameter with
the type `Path`.

::: code-group

```ts [src/routes/[username].ts]
import type { Path } from '@kitajs/runtime';

export function get(username: Path) {
  return `Hello, ${username}!`;
}
```

```json [Route Schema]
{
  "paths": {
    "/{username}": {
      "get": {
        "operationId": "getUsername",
        "parameters": [
          {
            "schema": { "type": "string" },
            "in": "path",
            "name": "username",
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

## Multiple path parameters

You can also combine multiple path parameters.

::: code-group

```ts [src/routes/[username]/[id].ts]
import type { Path } from '@kitajs/runtime';

export function get(username: Path, id: Path) {
  return `Hello, ${username}! Your ID is ${id}.`;
}
```

```json [Route Schema]
{
  "paths": {
    "/{username}/{id}": {
      "get": {
        "operationId": "getUsernameId",
        "parameters": [
          {
            "schema": { "type": "string" },
            "in": "path",
            "name": "id",
            "required": true
          },
          {
            "schema": { "type": "string" },
            "in": "path",
            "name": "username",
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

Or even use a custom name for the path parameter.

::: code-group

```ts [src/routes/[username].ts]
import type { Path } from '@kitajs/runtime';

export function get(user: Path<'username'>) {
  return `Hello, ${user}!`;
}
```

```json [Route Schema]
{
  "paths": {
    "/{username}": {
      "get": {
        "operationId": "getUsername",
        "parameters": [
          {
            "schema": { "type": "string", "enum": ["username"] },
            "in": "path",
            "name": "user",
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

## Wildcard routes

You can define a wildcard route by naming your file as `[...].ts`.

You can use `Path<string, '*'>` to capture the remaining path.

::: code-group

```ts [src/routes/[...].ts]
export function get(remaining: Path<string, '*'>) {
  return `Wildcard route of: ${remaining}`;
}
```

```json [Route Schema]
{
  "paths": {
    "/{*}": {
      "get": {
        "operationId": "getWildcard",
        "parameters": [
          {
            "schema": { "type": "string" },
            "in": "path",
            "name": "*",
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
