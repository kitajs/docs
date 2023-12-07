# Project setup

Start by creating a new folder for your project, then run `pnpm init` to create a new
`package.json` file.

```bash
mkdir keddit
cd keddit

pnpm init
```

Let's install some basic dependencies we will need:

```bash
pnpm add -D typescript @kitajs/cli @kitajs/ts-plugin
pnpm add @kitajs/runtime fastify
```

Summary:

- `@kitajs/cli` provides access to kita features as a CLI,
- `@kitajs/ts-plugin` enables in-editor type checking and auto-completion,
- `@kitajs/runtime` is everything you need at runtime
  [(actually nothing)](https://github.com/kitajs/kitajs/blob/main/packages/runtime/index.js)
  to run your app
- `fastify` is the web server.

Typescript is also needed, so create a `tsconfig.json` file:

```jsonc
// tsconfig.json

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

<!-- creates some package json scripts -->

In your `package.json` file, add the following scripts:

```jsonc
// package.json

{
  "scripts": {
    "build": "kita build && tsc",
    "start": "node --enable-source-maps dist/index.js"
  }
}
```

::: warning Please use Node.js v20 or higher!

`--enable-source-maps` and other features you'll need are only stable on **Node.js 20+**.

Check your version with `node -v` and install the latest version if needed.

:::

And create a `src/index.ts` main file:

```ts
// src/index.ts

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

You can then run `pnpm build` and `pnpm start` to test your setup.

```bash
pnpm build
pnpm start

#> <build logs...>
#> Server listening on http://127.0.0.1:1228
```

Opening your browser or using curl to access `http://127.0.0.1:1228` will return you a
`404` error, this is because we haven't created any routes yet.

```bash
curl http://127.0.0.1:1228
#> {"message":"Route GET:/ not found","error":"Not Found","statusCode":404}
```
