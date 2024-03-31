# Fastify

Since Kita uses Fastify under the hood, the request and reply types can be
accessed directly using `FastifyRequest` and `FastifyReply`.

::: warning

Direct interactions with these types are not recommended, as Kita may not be
able to infer the input and output types correctly.

**Only use them in places where Kita does not provide native support.**

:::

::: code-group

```ts {4} [routes/index.ts]
import type { FastifyReply, FastifyRequest } from 'fastify';

export function get(request: FastifyRequest, reply: FastifyReply) {
  return true;
}
```
