# Body

To access the contents of the request body, you need to add a parameter in the
route with the base type `Body<T>`, where `T` is the type of the request body.

::: warning

Requests with bodies are not supported in routes of type `GET`.

:::

Simply add a parameter of type `Body<T>` in any position in the route's
parameter list.

::: code-group

```ts {8} [routes/index.ts]
import type { Body } from '@kitajs/runtime';

/**
 * Creates a new user.
 *
 * @operationId createUser
 */
export function post(content: Body<{ name: string }>) {
  return true;
}
```

:::

You can also use types and interfaces to define the format of the request body.

::: code-group

```ts {12} [routes/index.ts]
import type { Body } from '@kitajs/runtime';

interface CreateUserRequest {
  name: string;
}

/**
 * Creates a new user.
 *
 * @operationId createUser
 */
export function post(content: Body<CreateUserRequest>) {
  return true;
}
```

:::

## Using `BodyProp`

When the request body is something simple, you can use the type `BodyProp` to
define fields directly.

::: warning

`BodyProp` cannot be used simultaneously with `Body`. It is recommended to use
`Body` for more complex types and interfaces and only `BodyProp` for simple and
straightforward types.

**Use them in the way that you find most readable and organized.**

:::

::: code-group

```ts {3} [routes/index.ts]
import type { BodyProp } from '@kitajs/runtime';

export function post(name: BodyProp<string>) {
  return true;
}
```

:::

The example above is equivalent to the [previous example](#body), but with a
simpler and more straightforward request body.

The parameter name is inferred from the variable name declared in the function,
but it can also be explicitly defined.

::: code-group

```ts {3} [routes/index.ts]
import type { BodyProp } from '@kitajs/runtime';

export function post(anything: BodyProp<string, 'name'>) {
  return true;
}
```
