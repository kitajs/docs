# Migration

Not allways you will start a new project with Kita, sometimes you will need to
migrate an existing project to Kita. This guide will help you to incrementally
migrate your project to Kita.

::: tip

Migrating projects requires a good understanding of the project structure and
the Kita concepts.

Make sure to read all previous documentation to understand how Kita works.

:::

Warning: This guide is not a step-by-step guide yet, want to help us to improve
this page? Share the technical details of your migration to Kita and we will add
it here. Mail us `kita@arthur.place` or Open a Pull Request.

## Migrating from Fastify

Migrating from a already Fastify project to Kita is very simple, you just need
to follow the [installation guide](../quickstart.md) and add the Kita plugin to
your Fastify instance.

```ts
import { Kita } from '@kitajs/runtime';
import fastify from 'fastify';

const app = fastify();

// your routes and plugins
app.register(Kita);

app.listen({ port: 1227 });
```

You can later start to migrate your routes to Kita routes, following the
[Routing](../routing.md) documentation.

Just move each of your routes to their respective path inside `src/routes` and
use the correct I/O types.

::: danger

If you have any existent test suite, it's expected to continue working as before
because Kita does not changes the Fastify/server behavior, just helps you to
better declare your routes.

:::

## Migrating from Express

Migrating from Express to Kita is a little more complex, but still simple.

Fastify and Express are very different frameworks, so the migration will require
a little more work than migrating from Fastify.

Remember: **This will be a migration across different frameworks.**

First you need to migrate your project from `Express` to `Fastify`. While
migrating from, its recommended to already register Routes in the Kita way, to
reduce the amount of work needed to migrate to Kita.

::: tip

Fastify provides a
[`@fastify/express`](https://github.com/fastify/fastify-express) package to ease
this migration.

It should not be used as a long-term solution as it aims to help you have a
smooth transition from Express to Fastify, but you should migrate your Express
specific code to Fastify over time.

:::

For this migration, there are a lot of useful resources on the internet, some of
them are:

- https://sitepoint.com/express-to-fastify-migrate
- https://blog.appsignal.com/2023/06/28/migrate-your-express-application-to-fastify.html
- https://simonplend.com/learning-fastify-how-to-migrate-your-app-from-express-to-fastify

After migrating from Express to Fastify, you can follow the
[Migrating from Fastify](#migrating-from-fastify) guide.

## Add your project tutorial

If you have migrated a project and want to share your experience, please open a
pull request to add your tutorial here.
