# Path

Routes defined with `/[variable]` are automatically registered as path parameter
routes. The value of the variable is passed as an argument to the parameter with
the type `Path`.

::: code-group

```ts [routes/[username].ts]
import type { Path } from '@kitajs/runtime';

export function get(username: Path) {
  return `Hello, ${username}!`;
}
```

:::

## Multiple path parameters

You can also combine multiple path parameters.

::: code-group

```ts [routes/[username]/[id].ts]
import type { Path } from '@kitajs/runtime';

export function get(username: Path, id: Path) {
  return `Hello, ${username}! Your ID is ${id}.`;
}
```

:::

## Custom names

Or even use a custom name for the path parameter.

::: code-group

```ts [routes/[username].ts]
import type { Path } from '@kitajs/runtime';

export function get(user: Path<'username'>) {
  return `Hello, ${user}!`;
}
```

:::
