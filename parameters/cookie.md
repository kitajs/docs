# Cookie

To access cookies from your request, you can use the `Cookie` parameter.

::: warning

This parameter automatically registers
[`@fastify/cookie`](https://github.com/fastify/fastify-cookie) in your Fastify
instance.

You can further configure the plugin by passing `fastifyCookie` to the Kita
plugin options.

:::

Cookies are always of type `string`.

::: code-group

```ts {3} [routes/index.ts]
import type { Cookie } from '@kitajs/runtime';

export function get(cookie: Cookie) {
  return true;
}
```

:::

You can customize the name of the cookie you want to access by passing a string
literal as an argument to the `Cookie` parameter.

::: code-group

```ts {4} [routes/index.ts]
import type { Cookie } from '@kitajs/runtime';

// Access the cookie named 'token'
export function get(anything: Cookie<'token'>) {
  return true;
}
```

:::
