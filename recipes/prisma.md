# Prisma

Using [Prisma](https://www.prisma.io/) or any other ORM is a perfect example of
how you can use providers hooks to interact with the lifecycle of Fastify.

::: code-group

```ts [src/providers/prisma.ts]
import { FastifyInstance } from 'fastify';
import { PrismaClient } from 'prisma-client';

// Singleton is not a problem here
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
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
