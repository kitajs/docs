# Quick Start

::: warning

The `npm create kita` cli command is recommended for most users, since it sets
up a lot of good defaults for you.

:::

## Automatic Installation

You can start a new Kita project with a single command:

```bash
npm create kita
```

Currently, you can choose between two templates:

- Kita: A normal backend project using [Fastify](https://fastify.dev/)

- Kita & JSX & Tailwind: A frontend project using
  [Fastify](https://fastify.dev/) and
  [@kitajs/html](https://github.com/kitajs/html)

Once done, you should see the nwely created folder in your directory.

```bash
cd project
```

Start a development server with:

```bash
npm dev
```

### Test it out!

Visit `http://localhost:1227/reference` in your browser to see the generated
OpenAPI documentation.

## Manual Installation

You can always manually install Kita by following these steps:

Initialize a new Node.js project:

In a new folder, run:

```bash
npm init -y
```

Then, install Kita:

These are all the basic packages you'll need:

```bash
npm i -D typescript @kitajs/cli @kitajs/ts-plugin @types/node
npm i @kitajs/runtime fastify @fastify/helmet @fastify/under-pressure dotenv close-with-grace concurrently
```

Init your typescript project

::: details tsconfig.json

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    "incremental": true,
    // "composite": true,
    // "tsBuildInfoFile": "./.tsbuildinfo",
    // "disableSourceOfProjectReferenceRedirect": true,
    // "disableSolutionSearching": true,
    // "disableReferencedProjectLoad": true,

    /* Language and Environment */
    "target": "ESNext",
    // "lib": [],
    // "jsx": "preserve",
    // "experimentalDecorators": true,
    // "emitDecoratorMetadata": true,
    // "jsxFactory": "",
    // "jsxFragmentFactory": "",
    // "jsxImportSource": "",
    // "reactNamespace": "",
    // "noLib": true,
    // "useDefineForClassFields": true,
    // "moduleDetection": "auto",                        ,
    "preserveWatchOutput": true,

    /* Modules */
    "module": "CommonJS",
    // "rootDir": "./",
    "moduleResolution": "Node10",
    // "baseUrl": "./",
    // "paths": {},
    // "rootDirs": [],
    // "typeRoots": [],
    // "types": [],
    // "allowUmdGlobalAccess": true,
    // "moduleSuffixes": [],
    // "allowImportingTsExtensions": true,
    // "resolvePackageJsonExports": true,
    // "resolvePackageJsonImports": true,
    // "customConditions": [],
    // "resolveJsonModule": true,
    // "allowArbitraryExtensions": true,
    // "noResolve": true,

    /* JavaScript Support */
    // "allowJs": true,
    // "checkJs": true,
    // "maxNodeModuleJsDepth": 1,

    /* Emit */
    // "declaration": true,
    // "declarationMap": true,
    // "emitDeclarationOnly": true,
    "sourceMap": true,
    // "inlineSourceMap": true,
    // "outFile": "./",
    "outDir": "./dist",
    // "removeComments": true,
    // "noEmit": true,
    "importHelpers": true,
    // "importsNotUsedAsValues": "remove",
    // "downlevelIteration": true,
    // "sourceRoot": "",
    // "mapRoot": "",
    // "inlineSources": true,
    // "emitBOM": true,
    // "newLine": "crlf",
    // "stripInternal": true,
    // "noEmitHelpers": true,
    // "noEmitOnError": true,
    // "preserveConstEnums": true,
    // "declarationDir": "./",
    // "preserveValueImports": true,

    /* Interop Constraints */
    "isolatedModules": true,
    "verbatimModuleSyntax": false,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "preserveSymlinks": true,
    "forceConsistentCasingInFileNames": true,

    /* Type Checking */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    // "noPropertyAccessFromIndexSignature": true,
    // "allowUnusedLabels": true,
    // "allowUnreachableCode": true,

    /* Completeness */
    "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "plugins": [{ "name": "@kitajs/ts-plugin" }]
  },
  "include": ["src"]
}
```

:::

Add basic `build` and `start` scripts to your `package.json`:

::: code-group

```json [package.json]
{
  "scripts": {
    "build": "kita build && tsc",
    "start": "node --enable-source-maps dist/index.js",
    "dev": "concurrently --raw --restart-tries 0 \"npm:dev:*\"",
    "dev:kita": "kita watch",
    "dev:server": "node --env-file=.env --enable-source-maps --watch dist/index.js",
    "dev:tsc": "tsc --watch --preserveWatchOutput"
  }
}
```

In development mode, we're using `--raw` to avoid adding prefixes for each
command, and `--restart-tries 0` to avoid infinite restart loops. `npm:dev:*` is
a special syntax that runs all scripts that start with `dev:`. We're using it to
run `dev:kita`, `dev:server` and `dev:tsc` at the same time.

:::

::: warning Please use Node.js v20 or higher!

Node's `--enable-source-maps`, `--watch` and other features you'll need are only
stable on **Node.js 20+**.

Check your version with `node -v` and install the latest version if needed.

:::

Add these main files:

::: code-group

```ts [src/index.ts]
import { ajvFilePlugin } from '@fastify/multipart';
import fastify from 'fastify';
import { isMainThread } from 'node:worker_threads';
import backendPlugin from './plugin';

// Ensures this file is not executed in test context
if (process.env.NODE_TEST_CONTEXT) {
  throw new Error('This file should not be executed in test context');
}

// Ensures this file is not executed in worker context
if (!isMainThread) {
  throw new Error('This file should not be executed in worker context');
}

// Ensures PORT are set
if (!process.env.PORT) {
  throw new Error('PORT must be set');
}

fastify({
  logger: { transport: { target: 'pino-pretty' } },
  ajv: { plugins: [ajvFilePlugin] }
})
  // Registers our backend
  .register(backendPlugin)
  // Starts the server
  .listen({
    port: +process.env.PORT,
    host: process.env.HOST || ''
  });
```

```ts [src/plugin.ts]
import './prelude';

import fastifyHelmet from '@fastify/helmet';
import fastifyUnderPressure from '@fastify/under-pressure';
import { Kita } from '@kitajs/runtime';
import closeWithGrace from 'close-with-grace';
import fp from 'fastify-plugin';

export default fp(async (app) => {
  // Registers the generated kita plugin
  app.register(Kita);

  // Measures process load with automatic handling of "Service Unavailable"
  app.register(fastifyUnderPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1000000000,
    maxRssBytes: 1000000000,
    maxEventLoopUtilization: 0.98
  });

  // Important security headers for Fastify
  app.register(fastifyHelmet, {
    global: true
  });

  // Add your custom stuff here
  // app.register(myPlugin)
  // ...

  // Delay is the number of milliseconds for the graceful close to finish
  const closeListeners = closeWithGrace({ delay: 500 }, async ({ err }) => {
    if (err) {
      app.log.error(err);
    }

    await app.close();
  });

  // Cancelling the close listeners
  app.addHook('onClose', async () => {
    closeListeners.uninstall();
  });
});
```

```ts [src/prelude.ts]
// This tells kita where to find the root of your project
globalThis.KITA_PROJECT_ROOT ??= __dirname;
```

:::

Create a `.env` file:

::: code-group

```js [.env]
PORT = 1227;
```

:::

Create your first route:

::: code-group

```ts [src/routes/hello.ts]
export function get() {
  return { hello: 'world' };
}
```

Run your server:

Firstly, run `build` for the first time, then run:

```bash
npm run build
```

```bash
npm run dev
```

Or build and run your server:

```bash
npm run build
npm start
```

### Test it out!

Visit `http://localhost:1227/reference` in your browser to see the generated
OpenAPI documentation.
