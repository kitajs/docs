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

## Example

A good example to demonstrate how hooks can be used is with
[Prisma](https://www.prisma.io/) or any other ORM that you are using.

[View the example here](../recipes/prisma.md)
