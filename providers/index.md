# Providers

Providers are a way for you to inject custom parameters. When you need to repeat
some logic across multiple routes, Providers seem to be the best option.

Providers are defined within the `src/providers` folder and are injected when
used in a route.

::: code-group

```ts [src/providers/MyProvider.ts]
export type MyProvider = {
  something: boolean;
};

export default function (): MyProvider {
  return {
    something: true
  };
}
```

:::

The requirements for a provider are as follows:

1. It must export a default function.

2. The return value of this function must always be defined and must be an alias
   for a type already defined.

Once these conditions are met, you can inject the provider into a route.

::: code-group

```ts [src/routes/index.ts]
import { MyProvider } from '../providers/my-provider';

export function get(provider: MyProvider) {
  return `Hello ${provider.something ? 'World' : 'Stranger'}`;
}
```

:::

## Using Parameters

Providers work like any other route, so you can also use other parameters and
even other providers.

::: code-group

```ts [src/providers/MyProvider.ts]
import { MyAnotherProvider } from './my-another-providers';

export interface MyProvider {
  something: boolean;
  name: string;
}

export default function (
  body: Body<{ name: string }>,
  anotherProvider: MyAnotherProvider
): MyProvider {
  return {
    name: anotherProvider.name,
    age: body.name
  };
}
```

```ts [src/routes/index.ts]
import { MyProvider } from '../providers/my-provider';

export function get(provider: MyProvider) {
  return {
    message: `Hello ${provider.name}`,
    age: provider.age
  };
}
```

:::

## Extending the Route Schema

Sometimes, your provider interacts directly with the request or reply. For this,
you can extend the route schema using.

See this example below that extends the route schema with a description.

::: code-group

```ts [src/providers/description.ts]
import { RouteSchema } from '@kitajs/runtime';

export type RouteSchema = string;

export default function (): RouteSchema {
  return 'Hello World';
}

export function transformSchema(schema: RouteSchema): RouteSchema {
  schema.description = 'Overridden description';
  return schema;
}
```

```ts [src/routes/index.ts]
import { RouteSchema } from '../providers/description';

export function get(schema: RouteSchema) {
  return schema;
}
```

```json [Route Schema]
{
  "paths": {
    "/": {
      "get": {
        "operationId": "getIndex",
        "description": "Overridden description",
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": { "schema": { "type": "string" } }
            }
          }
        }
      }
    }
  }
}
```

:::

## Provider Generics

By exporting the type of the provider, you can use generics with literal types
to serve as parameters and access them via `ProviderGenerics`.

See this example:

::: code-group

```ts [src/providers/MyProvider.ts]
import { ProviderGenerics } from '@kitajs/runtime';

export interface GenericTest<
  Num extends number = number,
  Bool extends boolean = boolean,
  Str extends string = string
> {
  generics: [Num, Bool, Str];
}

export default function (
  generics: ProviderGenerics<[number, boolean, string]>
): GenericTest {
  return { generics };
}

// transformSchema function needs this parameter order
export function transformSchema(
  schema: RouteSchema,
  parameters: ProviderGenerics<[number, boolean, string]>
): RouteSchema {
  schema.description = 'Overridden description';
  return schema;
}
```

```ts [src/routes/index.ts]
import { GenericTest } from '../providers/my-provider';

export function get(provider: GenericTest<123, true, 'hello'>) {
  return provider.generics; // [123, true, 'hello']
}
```

:::
