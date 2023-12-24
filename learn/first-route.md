# Creating Our First Route

Kita operates by scanning all files within the `src/routes` folder and creating
routes based on their exports.

<!-- TODO: Add a link to a document explaining how to create a route -->

Let's create our inaugural route by crafting a `src/routes/index.ts` file with
the subsequent content:

::: code-group

```ts [src/routes/index.ts]
export function get() {
  console.log('Hello world!');
  return { hello: 'world' };
}
```

:::

Kita can interpret the provided code snippet because we executed a `kita build`
command before running `tsc` to transpile our TypeScript. This is necessary
because Kita analyzes the code content, identifying all exported functions
matching `get`, `post`, `put`, `patch`, and similar patterns.

These functions can be asynchronous and return objects, strings, numbers,
booleans, null, arrays, or even streams. Kita intelligently handles and
documents them accordingly.

To observe the result, execute `pnpm build` and `pnpm start` again. You should
witness the following:

::: code-group

```bash {2,5} [Terminal 1]
pnpm build
#> <omitted build logs...>

pnpm start
#> Server listening on http://127.0.0.1:1228
```

```bash {2,5} [Terminal 2]
curl http://localhost:1228
#> {"hello":"world"}

curl http://localhost:1228/unexisting-route
#> {"statusCode":404,"error":"Not Found","message":"Route GET /not-index not found"}
```

:::

The server terminal should display `Hello world!`, and the build logs may
contain an output similar to:

```sh
Warming up... Ready to build!
Parsing sources... 1 routes / 1 schemas / 0 providers | 0 errors
Generating @kitajs/runtime... 6 files written.
```

This indicates that Kita identified your `/` route and generated the necessary
components inside the `@kitajs/runtime` package. Let's put it to the test:

While using CURL or a browser for testing may be challenging to replicate and
debug, Kita provides an automatic solution. It generates a
[Swagger Spec](https://swagger.io/) and
[Swagger UI](https://swagger.io/tools/swagger-ui/), accessible at
`http://localhost:1228/documentation`.

::: details Swagger UI screenshot

<img src="/learn/swagger-first-screenshot.png" />

:::

From now on, we will use the Swagger UI to test our routes.
