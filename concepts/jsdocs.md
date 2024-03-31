# JSDoc

While creating routes is straightforward, it is crucial to provide essential
information about your routes.

This is achieved by adding [JSDoc](https://jsdoc.app/) comments to your route
functions.

## Operation ID and Tags

The operation ID serves as a unique identifier for each route. Swagger uses it
to distinguish routes and as the route name in the generated documentation. Kita
also relies on operation IDs to generate meaningful route names and related
information.

Tags group routes together in the generated documentation.

::: code-group

```ts [src/routes/users.ts]
/**
 * Creates a new user
 *
 * @operationId createUser
 * @tag Users
 */
export function post() {
  return true;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "post": {
        "operationId": "createUser",
        "tags": ["Users"],
        "description": "Creates a new user",
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "boolean" } }
            }
          }
        }
      }
    }
  }
}
```

:::

Although it may seem like trivial information, it is crucial to ensure all
generated code is meaningful and easily understandable.

Additionally, providing this data is necessary to adhere to the
[OpenAPI Specification](https://swagger.io/specification/).

## Additional tags

### `@security`

This tag specifies the security requirements for a route, mainly used to
document authentication requirements.

::: code-group

```ts [src/routes/users.ts]
/** @security bearerAuth */
export function post() {
  return true;
}
```

```json [Route Schema]
{
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearerAuth",
        "bearerFormat": "JWT"
      }
    }
  },
  "paths": {
    "/": {
      "post": {
        "operationId": "postIndex",
        "security": [{ "bearerAuth": [] }],
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "boolean" } }
            }
          }
        }
      }
    }
  }
}
```

:::

It's also required that all `@security` schemas are defined in the OpenAPI
config:

::: code-group

```ts [src/index.ts]
import { Kita } from '@kitajs/runtime';
import fastify from 'fastify';

const app = fastify();

app.register(Kita, {
  fastifySwagger: {
    openapi: {
      components: {
        securitySchemes: {
          // Register the bearerAuth security scheme used above
          bearerAuth: {
            type: 'http',
            scheme: 'bearerAuth',
            bearerFormat: 'JWT'
          }
        }
      }
    }
  }
});
```

:::

::: tip

Prefer using authentication through a Kita Provider and use this tag only to
document it.

:::

### `@throws`

This tag specifies errors that Kita cannot detect automatically. When throwing
manually created errors, use the [`HttpErrors`](../parameters/http-errors.md)
parameter.

:::

```ts [src/routes/users.ts]
/**
 * @throws 401
 * @throws 402
 *
 *   Or multiple errors at once
 * @throws 401, 402
 */
export function get() {
  return true;
}
```

```json [Route Schema]
{
  "components": {
    "schemas": {
      "HttpError": {
        "type": "object",
        "properties": {
          "statusCode": { "type": "number" },
          "code": { "type": "string" },
          "error": { "type": "string" },
          "message": { "type": "string" }
        }
      }
    }
  },
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "responses": {
          "401": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/HttpError" }
              }
            }
          },
          "402": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/HttpError" }
              }
            }
          },
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "boolean" } }
            }
          }
        }
      }
    }
  }
}
```

:::

### `@summary`

A brief summary of the route.

::: code-group

```ts [src/routes/users.ts]
/** @summary Creates a new user */
export function get() {
  return true;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "summary": "Creates a new user",
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "boolean" } }
            }
          }
        }
      }
    }
  }
}
```

:::

### `@description`

A more detailed description of the route.

It defaults to the text description, but `@description` can be used to provide a
more detailed explanation and hide the text description.

::: code-group

<!-- prettier-ignore -->
```ts [src/routes/users.ts]
/** Text description shown in the documentation */
export function get() {
  return true;
}

/**
 * Internal description of the code that is not shown in the documentation
 *
 * @description Text description shown in the documentation
 */
export function post() {
  return true;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "description": "Text description shown in the documentation",
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "boolean" } }
            }
          }
        }
      },
      "post": {
        "operationId": "postIndex",
        "description": "Text description shown in the documentation",
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "boolean" } }
            }
          }
        }
      }
    }
  }
}
```

:::

### `@url`

Used to change the URL of the route, especially when deviating from a filesystem
path structure.

::: warning

Using this tag is not recommended. Always follow the filesystem path for
consistency.

:::

::: code-group

```ts [src/routes/somehow-cannot-be-users.ts]
/** @url /users */
export function get() {
  return true;
}
```

```json [Route Schema]
{
  "paths": {
    "/users": {
      "get": {
        "operationId": "getIndex",
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "boolean" } }
            }
          }
        }
      }
    }
  }
}
```

:::

### `@deprecated`

Marks a route as deprecated, indicating this in the generated documentation.

::: code-group

```ts [src/routes/index.ts]
/** @deprecated */
export function get() {
  return true;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "deprecated": true,
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "boolean" } }
            }
          }
        }
      }
    }
  }
}
```

:::

### `@internal`

Marks a route as internal, hiding it from the generated documentation but can
still be used in the application.

::: code-group

```ts [src/routes/index.ts]
/** @internal */
export function get() {}
```

```json [Route Schema]
{
  // The route is not present in the generated documentation
  "paths": {}
}
```

:::
