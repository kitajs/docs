# Routing

Routing is a fundamental concept in web development that involves directing
incoming requests to the appropriate parts of a web application based on the
request's path and method.

With Kita, _a filesystem routing framework_, the routing process is simplified
by organizing TypeScript files within a specific folder structure that exports
HTTP method-named functions.

This is a typical folder structure for a Kita application:

```sh
src/routes
├── auth.ts               (/auth)
├── posts
│   └── index.ts          (/posts)
└── users
    ├── [id]
    │   ├── index.ts      (/users/:id)
    │   ├── posts.ts      (/users/:id/posts)
    │   └── [...].ts      (/users/:id/*)
    ├── index.ts          (/users)
    └── me
        ├── index.ts      (/users/me)
        └── posts.ts      (/users/me/posts)
```

You can just export functions that represent HTTP methods (e.g., `get`,
`post`...) in your route files.

```ts [src/routes/users.ts]
// GET /users
export function get() {
  return { users: [] };
}

// POST /users
export function post() {
  return { message: 'User created' };
}

// DELETE /users (delete is a reserved keyword in TypeScript, so we use Delete)
export function Delete() {
  return { message: 'User deleted' };
}

// Same for PUT, PATCH, HEAD, OPTIONS, PROPFIND, PROPPATCH,
//  MKCOL, COPY, MOVE, LOCK, UNLOCK, TRACE, SEARCH ...
```

## `KITA_PROJECT_ROOT`

The error below is pretty common to happen when you're migrating an existing
project to Kita:

> Please define KITA_PROJECT_ROOT before importing any routes.

This error happens because Kita needs to know the root of your project to
resolve the routes correctly before any import or require statement in your
application gets executed.

To fix this error, you need to define the `KITA_PROJECT_ROOT` global variable in
the root of your application.

::: code-group

```ts [src/index.ts]
// This is required to be executed before any import or require // [!code focus:2]
globalThis.KITA_PROJECT_ROOT ??= __dirname;

//...
```

:::

### Using a prelude file

If you have a formatter or linter configured that doesn't works with code before
imports, just like we're doing with
`globalThis.KITA_PROJECT_ROOT ??= __dirname;` at the root of your main file, we
recommend that you move this line to `src/prelude.ts` and import it into your
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
