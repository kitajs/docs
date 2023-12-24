# Project setup

Start by creating a new folder for your project, then run `pnpm init` to create
a new `package.json` file.

::: code-group

```bash [Terminal 1]
# Create a new folder and enter it
mkdir keddit && cd keddit

# Setup a new node project
pnpm init

# Also some basic dependencies:
pnpm add -D typescript @kitajs/cli @kitajs/ts-plugin
pnpm add @kitajs/runtime fastify
```

:::

::: details Dependencies explained

- [`@kitajs/cli`](https://www.npmjs.com/package/@kitajs/cli) provides access to
  kita features as a CLI,
- [`@kitajs/ts-plugin`](https://www.npmjs.com/package/@kitajs/ts-plugin) enables
  in-editor type checking and auto-completion,
- [`@kitajs/runtime`](https://www.npmjs.com/package/@kitajs/runtime) is
  everything you need at runtime
  [(actually nothing)](https://github.com/kitajs/kitajs/blob/main/packages/runtime/index.js)
  to run your app
- [`fastify`](https://www.npmjs.com/package/fastify) is the web server.

:::

Start by creating `package.json` and `tsconfig.json` file should be created.

::: code-group

```jsonc [package.json]
{
  "scripts": {
    "build": "kita build && tsc",
    "start": "node --enable-source-maps dist/index.js"
  }
}
```

```jsonc [tsconfig.json]
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "sourceMap": true,
    "incremental": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "plugins": [{ "name": "@kitajs/ts-plugin" }]
  },
  "include": ["src"]
}
```

:::

::: warning Please use Node.js v20 or higher!

`--enable-source-maps` and other features you'll need are only stable on
**Node.js 20+**.

Check your version with `node -v` and install the latest version if needed.

:::

And create a `src/index.ts` main file:

::: code-group

```ts [src/index.ts]
// This is required to tell Kita which folder is the root of your project
globalThis.KITA_PROJECT_ROOT = __dirname;

import { Kita } from '@kitajs/runtime';
import fastify from 'fastify';

const app = fastify();

app.register(Kita);

app.listen({ port: 1228 }).then((address) => {
  console.log(`Server listening on ${address}`);
});
```

:::

You can then run `pnpm build` and `pnpm start` to test your setup.

::: code-group

```bash {2,5} [Terminal 1]
pnpm build
#> <omitted build logs...>

pnpm start
#> Server listening on http://127.0.0.1:1228
```

:::

Opening your browser or using curl to access `http://127.0.0.1:1228` will return
you a `404` error, this is because we haven't created any routes yet.

::: code-group

```bash {2} [Terminal 2 👈]
curl http://127.0.0.1:1228
#> {"message":"Route GET:/ not found","error":"Not Found","statusCode":404}
```

:::
