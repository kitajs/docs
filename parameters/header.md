# Header

To use headers from your request, you can use the `Header` parameter.

**Headers are always lowercased strings.**

::: code-group

```ts {3} [routes/index.ts]
import type { Header } from '@kitajs/runtime';

export function get(token: Header) {
  return `You used the header 'Token: ${header}'!`;
}
```

## Custom names

You can also use custom names for the header you want to access.

::: code-group

```ts {4} [routes/index.ts]
import type { Header } from '@kitajs/runtime';

// Access the header named 'Auth-Token'
export function get(anything: Header<'auth-token'>) {
  return `This is your Auth-Token: ${anything}`;
}
```

:::

## Default values

Default values can be used with `Header`.

::: code-group

```ts {3} [routes/index.ts]
import type { Header } from '@kitajs/runtime';

export function get(token: Header = 'please let me in') {
  return `This is your Auth-Token: ${anything}`;
}
```

:::
