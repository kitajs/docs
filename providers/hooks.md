# Hooks

Fastify allows you to listen to specific events in the application or
request/response lifecycle.

By using hooks you can interact directly with the lifecycle of Fastify.

## Available Hooks

**Request/Reply**

- [onRequest](https://fastify.dev/docs/latest/Reference/Hooks/#onrequest)
- [preParsing](https://fastify.dev/docs/latest/Reference/Hooks/#preparsing)
- [preValidation](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [preHandler](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [preSerialization](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [onError](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [onSend](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [onResponse](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [onTimeout](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [onRequestAbort](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)

**Application**

- [onReady](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [onListen](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [onClose](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [preClose](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [onRoute](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)
- [onRegister](https://fastify.dev/docs/latest/Reference/Hooks/#prevalidation)

## Registering Hooks

Hooks can be registered at providers by simply exporting a function with their
respective name.

::: code-group

```ts [src/providers/hooks.ts]
import type { FastifyReply, FastifyRequest } from 'fastify';

export type MyProvider = true;

export default function (): MyProvider {
  return true;
}

// These functions must respect their parameter signature
// read more in the official Fastify documentation
// https://fastify.dev/docs/latest/Reference/Hooks
export async function onRequest(request: FastifyRequest, reply: FastifyReply) {
  // Your logic here
}
```

:::

## Prisma example

A good example to demonstrate how hooks can be used is with
[Prisma](https://www.prisma.io/) or any other ORM that you are using.

::: code-group

```ts [src/providers/prisma.ts]
import { FastifyInstance } from 'fastify';
import { PrismaClient } from 'prisma-client';
import { Env } from '../env';

// Singleton is not a problem here
const prisma = new PrismaClient({
  datasourceUrl: Env.DATABASE_URL,
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'error' }
  ]
});

// Simply returns the prisma instance
export default function (): PrismaClient {
  return prisma;
}

// Providers can also have lifecycle hooks, this one connects and
// disconnects from the database and also binds the prisma events
// to the fastify logger
export async function onReady(this: FastifyInstance) {
  prisma.$on('error', this.log.error.bind(this.log));
  prisma.$on('info', this.log.debug.bind(this.log));
  prisma.$on('query', this.log.trace.bind(this.log));
  prisma.$on('warn', this.log.warn.bind(this.log));

  await prisma.$connect();
}

// This hook is called when the server is shutting down
export async function onClose(this: FastifyInstance) {
  await prisma.$disconnect();
}
```

:::

The above example registers a Prisma provider that connects to the database when
the server is ready and disconnects when the server is shutting down.

This is a good example of how you can use hooks to interact with the lifecycle
of Fastify and your application.

You can then just import the `PrismaClient` type in your routes and use it as a
parameter.

::: code-group

```ts [src/routes/index.ts]
import { PrismaClient } from '@prisma/client';

export function get(prisma: PrismaClient) {
  return prisma.user.findMany();
}
```

:::
