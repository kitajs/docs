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
