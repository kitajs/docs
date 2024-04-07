# Development Server

Obviously, having to shut down your server every time you make a code change is
a pain. And since Kita requires a compilation step before `tsc`, setting up the
development server can be a bit tricky.

::: info

This is a known hurdle, and we are working to improve the experience. Do you
have any suggestions for a dev server?
[Open an issue](https://github.com/kitajs/kitajs/issues/new/choose)

:::

For now, the best way to set up a dev server is manually using the package
[concurrently](https://www.npmjs.com/package/concurrently).

It allows you to separate each command into a script in the `package.json` and
run them all in parallel.

Start by installing the package:

::: code-group

```sh [Terminal]
npm i -D concurrently
```

:::

Now, add the root concurrent script to your `package.json`:

::: code-group

```json [package.json]
{
  "scripts": {
    "dev": "concurrently --raw --restart-tries 0 \"npm:dev:*\"" // [!code focus]
  }
}
```

:::

This command will run all scripts that match `dev:*` in parallel.

After that, you can add the dev server scripts:

::: code-group

```json [package.json]
{
  "scripts": {
    "dev": "concurrently --raw --restart-tries 0 \"npm:dev:*\"",
    "dev:kita": "kita watch", // [!code ++:3] // [!code focus:3]
    "dev:tsc": "tsc --watch --preserveWatchOutput",
    "dev:server": "node --watch dist/index.js"
  }
}
```

:::

There you go! Now, when you run `npm run dev`, your server will automatically
restart every time Kita updates or the code changes.

## Running Only TypeScript

We recommend that during testing and development, you streamline your build
pipeline as much as possible.

One of these steps is to replace `tsc` and `node dist/index.js` with a way to
directly run your TypeScript code.

::: warning

It is not recommended to make this change when running in production, as
`swc-node/register` will increase your server's memory consumption.

In production, always prefer to make as many optimizations as possible during
the build to only run a `node dist/index.js` at startup.

:::

This can be achieved using [SWC](https://swc.rs/), a super-fast transpiler that
just works.

Start by installing the package:

::: code-group

```sh [Terminal]
npm i -D @swc-node/register @swc/helpers
```

:::

After that, you just need to add a `-r` flag to your `node` command and change
the target from `dist/index.js` to `src/index.ts`.

::: code-group

```json [package.json]
{
  "scripts": {
    "dev": "concurrently --raw --restart-tries 0 \"npm:dev:*\"",
    "dev:kita": "kita watch",
    "dev:tsc": "tsc --watch --preserveWatchOutput",
    "dev:server": "node --watch dist/index.js", // [!code --] // [!code focus:2]
    "dev:server": "node --watch -r @swc-node/register src/index.ts" // [!code ++]
  }
}
```

:::

::: info

SWC is one of the tools that doesn't like code before imports, so when using it,
you'll need to
[adjust your `src/index.ts` to use the prelude](../concepts/routing.md#using-a-prelude-file).

:::
