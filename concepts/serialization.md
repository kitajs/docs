# Serialization

Fastify's performance is enhanced by solving the serialization problem when
using `JSON.stringify` and `JSON.parse`.

Deep dive into this topic by watching [Matteo Collina](https://nodeland.dev/)'s
talk:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/AcO6JgNkO_M?si=5mCthSHttWQ6HI3p&amp;start=556" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**These concepts are a
[Fastify](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/)
feature, in which Kita takes full advantage of.**

Kita runs at build time, inferring all I/O types for each route and generating
route schemas. This enables Fastify to use a
[super fast serializer](https://www.npmjs.com/package/fast-json-stringify) and
[super fast validator](https://www.npmjs.com/package/ajv).

## Parsing the request

Kita uses
[Ts Json Schema Generator](https://github.com/vega/ts-json-schema-generator)
under the hood to transform TypeScript AST TypeNodes into a JSON schema.

This is what powers the complex transformation of code types into JSON schemas.
Take a look at the following example:

::: code-group

```ts [Example definition]
export interface CreateUser {
  /**
   * The name of the user
   *
   * @minLength 3
   * @maxLength 20
   */
  name: string;

  /**
   * The email of the user
   *
   * @format email
   */
  email: string;

  /**
   * The age of the user
   *
   * @minimum 0
   * @maximum 150
   */
  age: number;
}
```

```json [Type Schema]
{
  "CreateUserRequest": {
    "additionalProperties": false,
    "properties": {
      "age": {
        "description": "The age of the user",
        "maximum": 150,
        "minimum": 0,
        "type": "number"
      },
      "email": {
        "description": "The email of the user",
        "format": "email",
        "type": "string"
      },
      "name": {
        "description": "The name of the user",
        "maxLength": 20,
        "minLength": 3,
        "type": "string"
      }
    },
    "required": ["name", "email", "age"],
    "type": "object"
  }
}
```

:::

You can use the above interface inside a route handler:

::: code-group

```ts [Example route]
export function post(data: Body<CreateUser>) {
  return true;
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
                "$ref": "#/components/schemas/CreateUserRequest"
              }
            }
          }
        },
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "boolean"
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

The above schema is handled by [Fastify](https://fastify.dev/) &
[Ajv](https://ajv.js.org/), ensuring that the request body matches the expected
types as well as the constraints defined in the interface, such as `@minLength`,
`@maxLength`, `@format`, `@minimum`, and `@maximum`.

Ajv, the library used underneath, is trusted by
[millions of developers and multiple big companies](https://ajv.js.org/#who-uses-ajv)
for its speed and reliability.
