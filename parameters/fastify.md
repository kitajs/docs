# Fastify

Since Kita uses Fastify under the hood, the type of the instance can be accessed
directly via `FastifyInstance`.

::: warning

Direct interactions with this type are not recommended, as Kita may not be able
to infer any type of interaction with the instance directly.

**Use only in places where Kita does not provide native support.**

:::

::: code-group

```ts {3} [routes/index.ts]
import type { FastifyInstance } from 'fastify';

export function get(instance: FastifyInstance) {
  console.log(`Using Fastify version ${instance.version}!`);
  return true;
}
```
