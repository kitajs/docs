# Creating our first route

Kita works by reading all files inside the `src/routes` folder and creating routes from
their exports.

<!-- TODO: Add a link to a doc explaining how to create a route -->

Let's create our first route, create a `src/routes/index.ts` file with the following
content:

```ts
// src/routes/index.ts

export function get() {
  console.log('Hello world!');
  return { hello: 'world' };
}
```

Kita can only work with the above code because we defined a `kita build` call before
running `tsc` to transpile our typescript, this is because kita reads the code content and
detects all exported functions matching `get`, `post`, `put`, `patch` and so on.

They can be async, return a object, a string, a number, a boolean, a null, an array or
even a stream, kita will handle it and document it properly.

You can now run `pnpm build` and `pnpm start` again, and you should see the following:

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

The server terminal should've logged `Hello world!` as well. In the build logs, `Kita`
probably emitted a output like this:

```log
Warming up... Ready to build!
Parsing sources... 1 routes / 1 schemas / 0 providers | 0 errors
Generating @kitajs/runtime... 6 files written.
```

This means kita found your `/` route and generated everything it needs inside the
`@kitajs/runtime` package. Lets test it out:

Running CURL or opening your browser is often hard to reproduce and debug, that's no
problem for us, as kita automatically generates a [Swagger Spec](https://swagger.io/) and
[Swagger UI](https://swagger.io/tools/swagger-ui/), you can access it at
`http://localhost:1228/documentation`

::: details Swagger UI screenshot

<img src="/learn/swagger-first-screenshot.png" />

:::

From now on, we will use the Swagger UI to test our routes.
