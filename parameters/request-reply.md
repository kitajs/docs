# Fastify

Since Kita uses Fastify under the hood, the request and reply types can be
accessed directly using `FastifyRequest` and `FastifyReply`.

::: warning

Direct interactions with these types are not recommended, as Kita may not be
able to infer the input and output types correctly.

**Only use them in places where Kita does not provide native support.**

:::

::: code-group

```ts {3} [src/routes/index.ts]
import type { FastifyReply, FastifyRequest } from 'fastify';

export function get(request: FastifyRequest, reply: FastifyReply) {
  return {
    method: `Request method is ${request.method}`,
    status: `Reply status is ${reply.statusCode}`
  };
}
```

```json [Route Schema]
{
  "components": {
    "schemas": {
      "GetIndexResponse": {
        "additionalProperties": false,
        "properties": {
          "method": { "type": "string" },
          "status": { "type": "string" }
        },
        "required": ["method", "status"],
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

:::
