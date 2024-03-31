# Body

To access the contents of the request body, you need to add a parameter in the
route with the base type `Body<T>`, where `T` is the type of the request body.

::: warning

Requests with bodies are not supported in routes of type `GET`.

:::

Simply add a parameter of type `Body<T>` in any position in the route's
parameter list.

::: code-group

```ts {3} [src/routes/index.ts]
import type { Body } from '@kitajs/runtime';

export function post(content: Body<{ name: string }>) {
  return `Hello ${content.name}!`;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "post": {
        "operationId": "postIndex",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "properties": { "name": { "type": "string" } },
                "required": ["name"],
                "type": "object"
              }
            }
          },
          "required": true
        },
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

You can also use types and interfaces to define the format of the request body.

::: code-group

```ts {7} [src/routes/index.ts]
import type { Body } from '@kitajs/runtime';

interface CreateUserRequest {
  name: string;
}

export function post(content: Body<CreateUserRequest>) {
  return `Hello ${content.name}!`;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "post": {
        "operationId": "postIndex",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "properties": { "name": { "type": "string" } },
                "required": ["name"],
                "type": "object"
              }
            }
          },
          "required": true
        },
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

[Learn more about exposing types.](../concepts/exposing-types.md)

## Using `BodyProp`

When the request body is something simple, you can use the type `BodyProp` to
define fields directly.

::: warning

`BodyProp` cannot be used simultaneously with `Body`. It is recommended to use
`Body` for more complex types and interfaces and only `BodyProp` for simple and
straightforward types.

**Use them in the way that you find most readable and organized.**

:::

::: code-group

```ts {3} [src/routes/index.ts]
import type { BodyProp } from '@kitajs/runtime';

export function post(name: BodyProp<string>) {
  return `Hello ${name}!`;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "post": {
        "operationId": "postIndex",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "properties": { "name": { "type": "string" } },
                "required": ["name"],
                "type": "object"
              }
            }
          },
          "required": true
        },
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

The example above is equivalent to the [previous example](#body), but with a
simpler and more straightforward request body.

## Custom names

The parameter name is inferred from the variable name declared in the function,
but it can also be explicitly defined.

::: code-group

```ts {3} [src/routes/index.ts]
import type { BodyProp } from '@kitajs/runtime';

export function post(anything: BodyProp<string, 'name'>) {
  return `Hello ${anything}!`;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "post": {
        "operationId": "postIndex",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "properties": { "name": { "type": "string" } },
                "required": ["name"],
                "type": "object"
              }
            }
          },
          "required": true
        },
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

Default values can be used with `BodyProp` and `Body`.

::: code-group

```ts {7,11} [src/routes/index.ts]
import type { Body, BodyProp } from '@kitajs/runtime';

interface CreateUserRequest {
  name: string;
}

export function post(name: BodyProp<string, 'name'> = 'Arthur') {
  return `Hello ${name}!`;
}

export function put(content: Body<CreateUserRequest> = { name: 'Arthur' }) {
  return `Hello ${content.name}!`;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "post": {
        "operationId": "postIndex",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "properties": { "name": { "type": "string" } },
                "required": [],
                "type": "object"
              }
            }
          }
        },
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "string" } }
            }
          }
        }
      },
      "put": {
        "operationId": "putIndex",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "properties": { "name": { "type": "string" } },
                "required": ["name"],
                "type": "object"
              }
            }
          },
          "required": true
        },
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
