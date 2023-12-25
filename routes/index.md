# Basics of Routing

Routing is a fundamental concept in web development that involves directing
incoming requests to the appropriate parts of a web application based on the
request's path and method.

In the context of Kita, a filesystem routing framework, the routing process is
simplified by organizing TypeScript files within a specific folder structure
that exports HTTP method-named functions.

### Filesystem Organization:

Routes are defined in TypeScript files within a folder named `routes`. Each
TypeScript file may contain one or more functions that represent HTTP methods
(e.g., `get`, `post`, `put`, `delete`).

**Sample routes folder structure:**

```sh
src/routes
├── auth.ts               (/auth)
├── posts
│   └── index.ts          (/posts)
└── users
    ├── [id]
    │   ├── index.ts      (/users/:id)
    │   └── posts.ts      (/users/:id/posts)
    ├── index.ts          (/users)
    └── me
        ├── index.ts      (/users/me)
        └── posts.ts      (/users/me/posts)
```

::: info

The above folder structure is the one used by the [Keddit](../learn/index.md),
the application we used in our example. You should read it afterward.

:::

### HTTP Methods and Functions:

As Kita is only a connector between raw TypeScript files and Fastify,
[all allowed methods are the ones supported by Fastify](https://github.com/fastify/fastify/blob/main/lib/httpMethods.js).

They are case insensitive, so you can use `get`, `GET`, `Get`, or `gEt`, and
they will all be mapped to the same method, although only one of them can be
used at a time. This is useful for methods like `DELETE` that are reserved
keywords in TypeScript.

**Example of a routes file:**

```ts
// src/routes/users.ts

// Maps to GET /users
export function get() {
  return { users: [] };
}

// Maps to POST /users
export function post() {
  return { message: 'User created' };
}

// Maps to DELETE /users
export function Delete() {
  return { message: 'User deleted' };
}
```
