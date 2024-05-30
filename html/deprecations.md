# Deprecations

Throughout the development of `@kitajs/html`, we have made some changes that
might affect your codebase.

This document lists all the deprecations and breaking changes that have been
made.

## Global register

The `@kitajs/html/register` in favour of the `react-jsx` target `@kitajs/html`
supports, which automatically registers the JSX runtime globally.

Please update your tsconfig to use the new `jsxImportSource` option and remove
all references to `'@kitajs/html/register'` from your codebase.

```diff
{
  "compilerOptions": {
+   "jsx": "react-jsx",
+   "jsxImportSource": "@kitajs/html",
-   "jsx": "react",
-   "jsxFactory": "Html.createElement",
-   "jsxFragmentFactory": "Html.Fragment",
    "plugins": [{ "name": "@kitajs/ts-html-plugin" }],
  }
}
```

You can also remove all references to `import { Html } from '@kitajs/html'` from
your codebase.

```diff
- import { Html } from '@kitajs/html';
```

## Importing type extensions

Importing type extensions like `import '@kitajs/html/htmx'` and
`import '@kitajs/html/alpine'` have been deprecated and will be removed in the
next major version.

Please change the way you import them to either use
`/// <reference types="..." />`
[triple slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html)
or the [`types`](https://www.typescriptlang.org/tsconfig/#types) option in your
tsconfig.

```diff
- import '@kitajs/html/htmx';
+ /// <reference types="@kitajs/html/htmx" />
```

**Or** add them in the `types` option present in your tsconfig:

```diff
{
  "compilerOptions": {
+   "types": ["@kitajs/html/htmx"]
  }
}
```
