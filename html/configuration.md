# Configuration

To use the `@kitajs/html` package, follow these steps:

> [!CAUTION]
>
> The Kita/Html template engine can introduce **XSS vulnerabilities** if not set
> up properly.
>
> Please strictly follow the instructions below to ensure your project is
> secure.

## Installing

Please install all required npm packages: `@kitajs/html` and
`@kitajs/ts-html-plugin`.

Open your terminal and run:

::: code-group

```sh [pnpm]
pnpm i @kitajs/html @kitajs/ts-html-plugin
```

```sh [yarn]
yarn add @kitajs/html @kitajs/ts-html-plugin
```

:::

## Tsconfig

Configure your TypeScript project to transpile TSX/JSX into JavaScript and also
use our [LSP Plugin](#editor-intellisense-and-cli-tool).

Update your `tsconfig.json` file with the following settings:

::: code-group

```jsonc [tsconfig.json]
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@kitajs/html",
    "plugins": [{ "name": "@kitajs/ts-html-plugin" }]
  }
}
```

:::

## InteliSense

You only be able to have XSS intellisense if your editor is using the TypeScript
version from your project's `node_modules` instead of the globally installed.

![Xss detection example](/html/xss-preview.png)

### VS Code

For Visual Studio Code, you can configure this in your workspace settings:

::: code-group

```jsonc [.vscode/settings.json]
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

:::

## `xss-scan` command

Besides from having a in-editor experience to detect XSS vulnerabilities, you
**MUST** also run the xss scanner tool in your CI/CD or testing environment.

Open your `package.json` file and add the following script:

::: code-group

```jsonc [package.json]
{
  "scripts": {
    // runs your tests and scans for xss automatically
    "test": "xss-scan && my-test-command"
  }
}
```

:::

::: details Cli usage

```sh
ts-html-plugin v4.0.1 - A CLI tool & TypeScript LSP for finding XSS vulnerabilities in your TypeScript code.

Usage: xss-scan         [options] <file> <file>...
       ts-html-plugin   [options] <file> <file>...

Options:
  --cwd <path>          The current working directory to use (defaults to process.cwd())
  -p, --project <path>  The path to the tsconfig.json file to use (defaults to 'tsconfig.json')
  -s, --simplified      Use simplified diagnostics
  -h, --help            Show this help message
  --version             Show the version number
  <file> <file>...      The files to check (defaults to all files in tsconfig.json)

Examples:
  $ xss-scan
  $ xss-scan --cwd src
  $ xss-scan --project tsconfig.build.json
  $ xss-scan src/index.tsx src/App.tsx

Exit codes:
  0 - No XSS vulnerabilities were found
  1 - XSS vulnerabilities were found
  2 - Only warnings were found
```

:::

This CLI comes from `@kitajs/ts-html-plugin`, which catches XSS vulnerabilities
that may be introduced into your codebase, automating the xss scanning process
to run every time you test your code, like inside your CI/CD environment.

## Ensure your project is secure

After setting everything up, please copy the below **xss-prone** code snippet
and paste it into your project to ensure the xss scanner is working correctly.

```tsx
const text: string = 'I can have <script>alert("XSS")</script> injected';
const html = <div>{text}</div>;
```

The above code should trigger a error in your editor, if not, please set up the
[IntelliSense](#intellisense) section again. Also run `xss-scan` to ensure the
CLI is working correctly, if not, please open an issue on our
[GitHub repository](https://github.com/kitajs/html).

If you have any questions or need help, please reach out to us on our
[Discord](https://kita.js.org/discord) server.

## Next steps

After installing the `@kitajs/html` package and configuring your TypeScript
project, you should be able to use JSX to generate HTML inside your .tsx files.

```tsx
const html = (
  <div>
    <h1>Hello, world!</h1>
    <p>Welcome to the KitaJS HTML package.</p>
  </div>
);
```

Next, you can:

- [Learn how to use this template engine inside a Kita route.](../routing/html.md)
- [Use it inside a raw Fastify server](./fastify.md)
- [Use with ElysiaJS](https://elysiajs.com/plugins/html.html)
