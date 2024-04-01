# Quick Start

::: warning

É melhor recomendado para iniciar um projeto com o comando `npm create kita`,
uma vez que ele gera um boilerplate com graceful shutdown, monitoramento de
recursos, e outras coisas úteis.

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

## Minimal Installation

Caso você já tenha algum projeto existente e quer apenas adicionar o Kita, aqui
está como você pode fazer isso da forma menos intrusiva possível.

1. Primeiramente, instale as dependências necessárias:

::: code-group

```sh [Terminal]
npm i -D @kitajs/cli @kitajs/ts-plugin
npm i @kitajs/runtime fastify
```

:::

2. Adicione no seu `tsconfig.json` o plugin do Kita para você ter a melhor
   experiência possível:

::: code-group

```json {3} [tsconfig.json]
{
  "compilerOptions": {
    "plugins": [{ "name": "@kitajs/ts-plugin" }]
  }
}
```

:::

3. **Caso você esteja usando o VSCode**, por padrão ele não utiliza o typescript
   instalado no seu node_modules. Para fazer isso, crie um arquivo
   `.vscode/settings.json` e adicione o seguinte conteúdo:

   Leia a
   [documentação oficial](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)
   do VSCode para mais informações.

::: code-group

```json {2,3} [.vscode/settings.json]
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

:::

4. Atualize os scripts de `build` no seu `package.json` para rodar o
   `kita build` antes de transpilar o código:

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

5. Adicione o arquivo `src/index.ts` com o seguinte conteúdo:

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

Caso você tenha algum formatter ou linter configurado que não lide bem com o
`globalThis.KITA_PROJECT_ROOT ??= __dirname;` no root do seu arquivo principal.

Recomendamos que você mova essa linha para o `src/prelude.ts` e importe ele no
seu arquivo principal:

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

5. Crie sua primeira rota em `src/routes/hello.ts`:

::: code-group

```ts [src/routes/hello.ts]
export function get() {
  return { hello: 'world' };
}
```

:::

6. 🎉

Você está pronto para rodar o seu servidor:

```bash
npm run build
npm start
```

### Test it out!

Visite `http://localhost:3000/reference` no seu navegador para ver a
documentação

::: tip

Esta instalação é minima e não inclui recursos como monitoramento de recursos e
graceful shutdown que são essenciais para um servidor de produção.

Gere um template com o comando `npm kita create` para ter um projeto completo e
faça a sua migração parcial a partir dele, caso necessário.

:::
