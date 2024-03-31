# Improving the Setup

We already have a working "Hello, World!" application. Before we proceed to
build the actual product, let's enhance our setup.

## Watching for Changes

Building the project with `pnpm build` and running it with `pnpm start` is a bit
cumbersome, so let's add a `dev` script that recompiles the project and restarts
the server on every change.

Firstly, we need `concurrently` to run multiple commands at once. Install it
with:

::: code-group

```bash [Terminal 1]
pnpm add -D concurrently
```

:::

Then, add the following to your `package.json`:

::: code-group

```json [package.json]
{
  "scripts": {
    "build": "kita build && tsc",
    "start": "node --enable-source-maps dist/index.js",
    "dev": "concurrently --raw --restart-tries 1 \"npm:dev:*\"", // [!code ++:4]
    "dev:kita": "kita watch",
    "dev:server": "node --enable-source-maps --watch dist/index.js",
    "dev:tsc": "tsc --watch --preserveWatchOutput"
  }
}
```

:::

We're using `--raw` to avoid adding prefixes for each command, and
`--restart-tries 1` to avoid infinite restart loops. `npm:dev:*` is a special
syntax that runs all scripts that start with `dev:`. We're using it to run
`dev:kita`, `dev:server` and `dev:tsc` at the same time.

::: tip

We do not need any kind of `nodemon` or `ts-node-dev` to restart the server on
changes, as TypeScript has a built-in `--watch` flag to transpile our source,
Kita also has a `watch` mode to build routes on changes, and Node.js also has a
`--watch` flag to restart the server on changes.

:::

Now, you can run `pnpm dev` to start the server and watch for changes.

## Graceful Shutdowns

Your code, like any other code written in the world, may fail for infinite
reasons, so our server should be a bit more robust to handle a good part of
these occasions.

Firstly, install
[`close-with-grace`](https://github.com/mcollina/close-with-grace) to handle
shutdowns:

::: code-group

```bash [Terminal 1]
pnpm add close-with-grace
```

:::
[Fastify recommends using a index file pattern](https://github.com/fastify/fastify-cli?tab=readme-ov-file#migrating-out-of-fastify-cli-start)
that handles startup errors and ensures the server is closed properly. You are
free to start your app in your own way, but following standard patterns is never
a bad idea.

::: code-group

```ts [src/index.ts]
// This is required to tell Kita which folder is the root of your project
globalThis.KITA_PROJECT_ROOT = __dirname;

import { Kita } from '@kitajs/runtime';
import closeWithGrace from 'close-with-grace'; // [!code ++]
import fastify from 'fastify';

const app = fastify();

app.register(Kita);

// [!code --:4]
app.listen({ port: 1228 }).then((address) => {
  console.log(`Server listening on ${address}`);
});

// [!code ++:30]
const closeListeners = closeWithGrace({ delay: 500 }, async function ({ err }) {
  if (err) {
    app.log.error(err);
  }

  await app.close();
});

// Cancelling the close listeners
app.addHook('onClose', async () => {
  closeListeners.uninstall();
});

// Start listening.
app.listen({ port: 1228 }, async (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
```

:::

## Logging

Logging is a crucial part of any application, helping you debug and understand
what's happening, as well as providing a simple way to monitor it. The standard
way to log in Fastify is using a package called
[`pino`](https://github.com/pinojs/pino), which, fortunately, is already
installed and supported out of the box by Fastify.

::: code-group

```ts [src/index.ts]
const app = fastify({
  logger: true // [!code ++]
});
```

```bash {3} [Terminal 1]
pnpm dev

#> {"level":30,"time":1702006043610,"pid":38391,"hostname":"kita","msg":"Server listening at http://127.0.0.1:1228"}
```

:::

Pino by default does not come with any fancy transport out of the box; however,
[`pino-pretty`](https://github.com/pinojs/pino-pretty) solves this problem by
providing a pretty formatter for your logs.

You can add it in multiple ways, the easiest and least intrusive is just piping
the server output to it.

Redirecting the output through piping is a preferable option compared to
incorporating it directly into your code. This approach ensures that you
encounter aesthetically formatted logs only during development. JSON logs, being
more straightforward to parse and utilize with other tools, are the primary
choice. By using piping, a separate Node.js process is initiated, preventing the
need for the server's Node.js process to handle this task and enabling it to
focus on processing additional requests, for instance.

::: code-group

```bash [Terminal 1]
pnpm add -D pino-pretty
```

```jsonc [package.json]
{
  "scripts": {
    "dev:server": "node --enable-source-maps --watch dist/index.js", // [!code --]
    "dev:server": "node --enable-source-maps --watch dist/index.js | pino-pretty" // [!code ++]
  }
}
```

:::

Now, our logs will be pretty and colorful!

::: code-group

```bash {4} [Terminal 1]
pnpm dev

#> {"level":30,"time":1702006043610,"pid":38391,"hostname":"kita","msg":"Server listening at http://127.0.0.1:1228"}// [!code --]
#> [18:40:00.891] INFO (190875): Server listening at http://127.0.0.1:1228// [!code ++]
```

:::

## Environment Variables

Environment variables are a great way to configure your application. Node.js has
a built-in `--env-file` argument which loads from a dotenv file without any
external dependencies.

Create a `.env` file, which for now only contains the port, and add the
`--env-file` to your start and dev script.

::: code-group

```properties [.env]
PORT=1228
```

```jsonc [package.json]
{
  "scripts": {
    "start": "node --enable-source-maps dist/index.js", // [!code --]
    "start": "node --enable-source-maps --env-file=.env dist/index.js" // [!code ++]
    // ...
    "dev:server": "node --enable-source-maps --watch dist/index.js | pino-pretty", // [!code --]
    "dev:server": "node --enable-source-maps --env-file=.env --watch dist/index.js | pino-pretty" // [!code ++]
  }
}
```

:::

We should also validate these variables, a good and hassle-free way to do it is
by parsing them into an `Env` constant. Start by creating a `src/env.ts` file
and updating your `app.listen` call.

::: code-group

```ts [src/env.ts]
export const Env = Object.freeze({
  HOST: String(process.env.HOST ?? '0.0.0.0'),
  PORT: Number(process.env.PORT || 1228)
});
```

```ts [src/app.ts]
import { Env } from './env';// [!code ++]

app.listen({ port: 1228 }, async (err) => {// [!code --]
app.listen({ port: Env.PORT, host: Env.HOST }, async (err) => {// [!code ++]
```

:::

Using a default value is a good practice in case the variable is not defined in
the current shell.

**We are now ready to start building our real application!**
