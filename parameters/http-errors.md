# Http Errors

When using the `HttpErrors` parameter, Kita reads through your route code
searching for `throw` keywords.

::: info

This parameter automatically registers
[`@fastify/sensible`](https://github.com/fastify/fastify-sensible) in your
Fastify instance.

You can further configure the plugin by passing `fastifySensible` to the Kita
plugin options.

:::

When a `throw` keyword is encountered, Kita checks if the thrown object comes
from the `HttpError` parameter of
[`@fastify/sensible`](https://github.com/fastify/fastify-sensible) and registers
the potential error thrown in the OpenAPI schema of the route.

::: code-group

```ts [src/routes/index.ts]
import type { HttpErrors } from '@fastify/sensible';

export function get(errors: HttpErrors) {
  // Something went wrong
  if (Math.random() > 0.5) {
    throw errors.notFound('Something went wrong');
  }

  return 'Success!';
}
```

```json {4,5,25,26} [Route Schema]
{
  "components": {
    "schemas": {
      // The HttpErrors type defined by the @fastify/sensible
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
          "404": {
            "description": "Default Response",
            "content": {
              "application/json": {
                // The HttpError schema is referenced here
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

The `HttpErrors` parameter can be used with any variable name, but **its a
convention to use `errors`**.

## Declaring custom errors

It's a **known limitation** that only the main route function is analyzed.

If an error is thrown from outside the main function, Kita won't be able to
catch that error.

Errors thrown that also don't come from a direct call of `HttpErrors#<error>`
won't be captured.

::: code-group

```ts [src/routes/index.ts]
import type { HttpErrors } from '@fastify/sensible';

export function get(errors: HttpErrors) {
  // Something went wrong
  if (Math.random() > 0.5) {
    // This error will NOT be captured by Kita
    throw new Error('This error will NOT be captured by Kita');
  }

  // Something went wrong again
  if (Math.random() > 0.5) {
    // Anything thrown inside `myFnThatThrows` will NOT be captured by Kita
    return myFnThatThrows(errors);
  }

  return 'Success!';
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

Both cases above can be addressed using
[`@throws`](../concepts/jsdocs.md#throws):

::: code-group

```ts [src/routes/index.ts]
import type { HttpErrors } from '@fastify/sensible';

/** @throws 500, 404 */
export function get(errors: HttpErrors) {
  return myFnThatThrows(errors);
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
      },
      "GetIndexResponse": {}
    }
  },
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "responses": {
          "404": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/HttpError" }
              }
            }
          },
          "500": {
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

:::
