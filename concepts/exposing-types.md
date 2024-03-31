# Exposing types

When using types and interfaces in your routes, Kita automatically detects and
generates a JSON Schema for them. However, there is a rule you must follow to
ensure that types and interfaces are exposed in the OpenAPI.

::: warning

The following concept applies to any type or interface used by Kita, not just
for body types, as shown in the example.

:::

Consider these two example routes:

::: code-group

```ts {3} [GET]
import type { Body } from '@kitajs/runtime';

interface PostBody {
  name: string;
}

export function post(content: Body<PostBody>) {
  return true;
}
```

```ts {3} [POST]
import type { Body } from '@kitajs/runtime';

export interface PutBody {
  age: number;
}

export function put(content: Body<PutBody>) {
  return true;
}
```

:::

The only difference between the `PUT` and `POST` routes is that one exports the
used interface and the other does not, respectively.

See how this affects the generated OpenAPI:

::: code-group

```json {2,3,11,12} [POST Schema]
{
  // Components does not contain the `PostBody` type
  "components": { "schemas": {} },
  "paths": {
    "/": {
      "post": {
        "operationId": "postIndex",
        "requestBody": {
          "content": {
            "application/json": {
              // The body type was inlined here.
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
              "application/json": { "schema": { "type": "boolean" } }
            }
          }
        }
      }
    }
  }
}
```

```json {2,3,20,21} [PUT Schema]
{
  // Components contains the `PutBody` type
  "components": {
    "schemas": {
      "PutBody": {
        "additionalProperties": false,
        "properties": { "age": { "type": "number" } },
        "required": ["age"],
        "type": "object"
      }
    }
  },
  "paths": {
    "/": {
      "put": {
        "operationId": "putIndex",
        "requestBody": {
          "content": {
            "application/json": {
              // The body type is a reference to the `PutBody` type
              "schema": { "$ref": "#/components/schemas/PutBody" }
            }
          }
        },
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

As you can see, the generated OpenAPI for the `POST` route does not contain the
`PostBody` interface, while the `PUT` route contains the `PutBody` interface.
