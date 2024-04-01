# Html

HTML routes are simply routes defined with the `.tsx` extension, where they use
the
[`@kitajs/fastify-html-plugin`](https://github.com/kitajs/html/tree/master/packages/fastify-html-plugin)
plugin to render the content.

::: warning

This documentation covers the @kitajs/html `4.0.0-beta` version. It's
recommended to wait for the stable release before using it in production.

:::

::: code-group

```ts [src/routes/index.tsx]
export function get() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <h1>Hello World</h1>
      </body>
    </html>
  `;
}
```

:::

Read more about what the plugin does in the
[official documentation](https://github.com/kitajs/html/tree/master/packages/fastify-html-plugin#readme)
and how to use it in your application.

The above route simply returns an HTML string with the `Content-Type` header of
`text/html; charset=utf-8`.

## JSX

A experiencia de desenvolvimento pode ser ainda melhor com o uso de JSX via
[@kitajs/html](https://github.com/kitajs/html)

## Installing

To use the `@kitajs/html` package, follow these steps:

1. Install the required npm packages, `@kitajs/html` and
   `@kitajs/ts-html-plugin`, to enable editor intellisense. Open your terminal
   and run:

   ```sh
   npm install @kitajs/html @kitajs/ts-html-plugin
   ```

2. Configure your TypeScript project to transpile TSX/JSX into JavaScript and
   using our [LSP Plugin](#editor-intellisense-and-cli-tool). Update your
   `tsconfig.json` file with the following settings:

   ```jsonc
   // tsconfig.json

   {
     "compilerOptions": {
       "jsx": "react-jsx",
       "jsxImportSource": "@kitajs/html",
       "plugins": [{ "name": "@kitajs/ts-html-plugin" }]
     }
   }
   ```

3. Append the
   [`xss-scan`](https://github.com/kitajs/html/tree/master/packages/ts-html-plugin/tree/main#running-as-cli)
   command into your test script. This CLI comes from @kitajs/ts-html-plugin,
   which catches XSS vulnerabilities that may be introduced into your codebase,
   automating the xss scanning process to run everytime you test your code, like
   inside your CI/CD environment. Open your `package.json` file and add the
   following script:

   ```jsonc
   // package.json

   {
     "scripts": {
       "test": "xss-scan"
     }
   }
   ```

4. Ensure that your code editor is using the TypeScript version from your
   project's `node_modules` instead of the globally installed TypeScript. For
   Visual Studio Code, you can configure this in your workspace settings:

   ```jsonc
   // .vscode/settings.json

   {
     "typescript.tsdk": "node_modules/typescript/lib",
     "typescript.enablePromptUseWorkspaceTsdk": true
   }
   ```

## Using JSX in Routes

To use JSX in your routes, you need to create a `.tsx` file and export a
function that returns JSX. Here's an example:

::: code-group

```tsx [src/routes/index.tsx]
export function get() {
  return (
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <h1>Hello World</h1>
      </body>
    </html>
  );
}
```

:::

## Streaming HTML

Another feature of the `@kitajs/html` package is the ability to stream HTML
content in the first render. This is useful for rendering the base template
layout while fetching data from the database or other services.

`Suspense` works by default with the `@kitajs/html` package.

::: code-group

```tsx [src/routes/index.tsx]
import { Suspense } from '@kitajs/html/suspense';
import { MyAsyncComponent } from '../components/MyAsyncComponent';

export function get({ id }: FastifyRequest) {
  return (
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <h1>Hello World</h1>
        <Suspense rid={id} fallback={<div>Loading...</div>}>
          <MyAsyncComponent />
        </Suspense>
      </body>
    </html>
  );
}
```

:::

The above example will render the initial template instantly and when the
`MyAsyncComponent`, a async component function, resolves, it will replace the
`Suspense` fallback component with the resolved content.

Read more about
[Suspense](https://github.com/kitajs/html/tree/master/packages/html#suspense-component)
and
[Async Components](https://github.com/kitajs/html/tree/master/packages/html#async-components)
in their respective documentation.

## Interacting with the server

Kita/HTML is a simple JSX -> HTML package, no reactivity or state management is
included.

It follows the widely used
[MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
concept. But other strategies can also be used, like with
[`Htmx`](https://github.com/kitajs/html/tree/master/packages/html#htmx),
[`Alpine.js`](https://github.com/kitajs/html/tree/master/packages/html#alpinejs)
or
[`Hotwire Turbo`](https://github.com/kitajs/html/tree/master/packages/html#hotwire-turbo)

Take a look at this example using `Htmx`:

::: code-group

```tsx [src/routes/index.tsx]
export function get() {
  return (
    <html>
      <head>
        <title>Hello World</title>
        <script src="https://unpkg.com/htmx.org/dist/htmx.js"></script>
      </head>
      <body>
        <button hx-post="/" hx-swap="outerHTML">
          Click Me
        </button>
      </body>
    </html>
  );
}

export function post() {
  return (
    <div>
      <h2>Data Fetched</h2>
    </div>
  );
}
```

:::

The `hx-post` attribute sends a POST request to the server, and the `hx-swap`
attribute replaces the content of the element with the response from the server.

The above will swap the `<button>` element with the `<div>` element when the
button is clicked.

Learn more about [Htmx](https://htmx.org/), **its awesome**!
