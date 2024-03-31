# Rest routes

Routing serves as a cornerstone in web development, facilitating the redirection
of incoming requests to the relevant sections of a web application based on the
request's path and method.

Kita, a filesystem routing framework, streamlines the routing process by
structuring TypeScript files within a designated folder arrangement, each
exporting functions named after HTTP methods.

## Filesystem Organization:

Routes are defined in TypeScript files within a folder named `routes`. Each
TypeScript file may contain one or more functions that represent HTTP methods
(e.g., `get`, `post`, `put`, `Delete`).

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

## HTTP Methods and Functions:

As Kita is only a connector between raw
[TypeScript](https://www.typescriptlang.org/) files and
[Fastify](https://fastify.dev).

Kita works with all
[supported methods by Fastify](https://github.com/fastify/fastify/blob/main/lib/httpMethods.js).

::: code-group

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

:::

::: tip

Method keywords are case-insensitive, this is useful for methods like `delete`,
that are reserved keywords in TypeScript.

:::

In fact, you can use any of the following method names: `get`, `GET`, `gET`,
`geT`, `GEt`... and they will all be mapped to the same method, **although only
one of them can be used at a time.**
