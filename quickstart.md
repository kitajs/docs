# Quick Start

::: warning

It's best recommended to start a project with the `npm create kita` command, as
it generates a boilerplate with graceful shutdown, resource monitoring, and
other useful features.

:::

## Automatic Installation

You can start a new Kita project with a single command:

```sh
npm create kita
```

Currently, you can choose between two templates:

- Kita: A normal backend project using [Fastify](https://fastify.dev/)

- Kita & JSX & Tailwind: A frontend project using
  [Fastify](https://fastify.dev/) and
  [@kitajs/html](https://github.com/kitajs/html)

Once done, you should see the newly created folder in your directory.

```sh
cd project
```

Start a development server with:

```sh
npm dev
```

### Test it out!

Visit `http://localhost:1227/reference` in your browser to see the generated
OpenAPI documentation.

[Read our code recipes for more information on how to customize your project.](./recipes/index.md)

## Minimal Installation

If you already have an existing project and just want to add Kita, here's how
you can do it in the least intrusive way possible.

1. First, install the necessary dependencies:

::: code-group

```sh [Terminal]
npm i -D @kitajs/cli @kitajs/ts-plugin
npm i @kitajs/runtime fastify
```

:::

2. Add the Kita plugin to your `tsconfig.json` for the best possible experience:

::: code-group

```json {3} [tsconfig.json]
{
  "compilerOptions": {
    "plugins": [{ "name": "@kitajs/ts-plugin" }]
  }
}
```

:::

3. **If you're using VSCode**, by default it doesn't use the TypeScript
   installed in your `node_modules`. To do so, create a `.vscode/settings.json`
   file and add the following content:

   Refer to the
   [official documentation](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)
   for more information.

::: code-group

```json {2,3} [.vscode/settings.json]
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

:::

4. Update the `build` scripts in your `package.json` to run `kita build` before
   transpiling the code:

::: code-group

```json {3,4} [package.json]
{
  "scripts": {
    "build": "kita build && tsc",
    "start": "node dist/index.js"
  }
}
```

:::

5. Add the `src/index.ts` file with the following content:

::: code-group

```ts [src/index.ts]
// This is required to be executed before any import or require // [!code focus:2]
globalThis.KITA_PROJECT_ROOT ??= __dirname;

import { Kita } from '@kitajs/runtime'; // [!code focus]
import fastify from 'fastify';

const app = fastify();

app.register(Kita); // [!code focus]

app.listen({ port: 3000 });
```

:::

If you have a formatter or linter configured that doesn't handle
`globalThis.KITA_PROJECT_ROOT ??= __dirname;` well at the root of your main
file.

We recommend that you move this line to `src/prelude.ts` and import it into your
main file:

::: code-group

```ts [src/index.ts]
// This is required to be executed before any import or require // [!code --:2] // [!code focus:3]
globalThis.KITA_PROJECT_ROOT ??= __dirname;
import './prelude'; // [!code ++]

// ...
```

```ts [src/prelude.ts]
// This is required to be executed before any import or require // [!code ++]
globalThis.KITA_PROJECT_ROOT ??= __dirname; // [!code ++]
```

:::

5. Create your first route in `src/routes/hello.ts`:

::: code-group

```ts [src/routes/hello.ts]
export function get() {
  return { hello: 'world' };
}
```

:::

6. 🎉

You're ready to run your server:

```sh
npm run build
npm start
```

### Test it out!

Visit `http://localhost:3000/reference` in your browser to see the
documentation.

[Read our code recipes for more information on how to customize your project.](./recipes/index.md)

::: tip

This minimal installation does not include features like resource monitoring and
graceful shutdown that are essential for a production server.

Generate a template with the `npm kita create` command to have a complete
project and perform your partial migration from there if necessary.

:::
