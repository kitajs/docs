# Query

You can also use query parameters within routes with the type `Query`. The
default type of a query is `string`, but you can specify a different type by
passing a generic type.

::: code-group

```ts {4} [src/routes/index.ts]
import type { Query } from '@kitajs/runtime';

// /?name=Arthur
export function get(name: Query) {
  return `Hello ${name}!`;
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
            "in": "query",
            "name": "name",
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

You can also use different types to define the format of the query.

::: code-group

```ts {4} [src/routes/index.ts]
import type { Query } from '@kitajs/runtime';

// /?option=true
export function get(option: Query<boolean>) {
  return option
    ? 'You have selected the option'
    : "You haven't selected the option";
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
            "schema": { "type": "boolean" },
            "in": "query",
            "name": "option",
            "required": true
          }
        ],
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "enum": [
                    "You didn't select the option",
                    "You selected the option"
                  ],
                  "type": "string"
                }
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

## Complex types

When defining multiple query parameters, it can be cumbersome to put several
parameters with the type `Query`. For this, you can use interfaces and types to
define the query format.

::: warning

`Query` with object types cannot be mixed with simple queries that are not
object types.

It's recommended to use `Query` for more complex types and only `QueryProp` for
simple and direct types.

:::

::: code-group

```ts {9} [src/routes/index.ts]
import type { Query } from '@kitajs/runtime';

interface CreateUserRequest {
  name: string;
  age: number;
}

// /?name=Arthur&age=20
export function get(query: Query<CreateUserRequest>) {
  return `Hello ${query.name}! You are ${query.age} years old.`;
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
            "schema": { "type": "number" },
            "in": "query",
            "name": "age",
            "required": true
          },
          {
            "schema": { "type": "string" },
            "in": "query",
            "name": "name",
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

[Learn more about exposing types.](../concepts/exposing-types.md)

## Arrays

Arrays can be defined at the top level with `Query` for simple types.

::: code-group

```ts {4} [src/routes/index.ts]
import type { Query } from '@kitajs/runtime';

// /?names[]=foo&names[]=bar
export function get(names: Query<string[]>) {
  return `Hello ${names.join(', ')}!`;
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
            "schema": { "items": { "type": "string" }, "type": "array" },
            "in": "query",
            "name": "names",
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

::: warning

When working with complex types, fields cannot be defined as arrays. Instead,
it's recommended to use [`Body`](./body.md) or [`BodyProp`](./body.md) for more
complex types.

:::

## Default values

Default values can be used with `Query` for both simple types and complex ones.

::: code-group

```ts {8,13} [src/routes/index.ts]
import type { Query } from '@kitajs/runtime';

interface CreateUserRequest {
  name: string;
}

// /?name=Arthur and /
export function get(name: Query<string, 'name'> = 'Arthur') {
  return `Hello ${name}!`;
}

// /?name=Arthur and /
export function post(content: Query<CreateUserRequest> = { name: 'Arthur' }) {
  return `Hello ${content.name}!`;
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
            "in": "query",
            "name": "name",
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
      },
      "post": {
        "operationId": "postIndex",
        "parameters": [
          {
            "schema": { "type": "string" },
            "in": "query",
            "name": "name",
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
