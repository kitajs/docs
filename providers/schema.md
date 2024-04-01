# Schema Providers

Another provider that can be widely used is the `Schema` provider.

This provider is a bit different from the others, as it doesn't interact with
the request or reply directly. Instead, it gets all type exports from the
`providers/schemas.ts` file and injects it into a `

::: code-group

```ts [src/providers/schemas.ts]
export type Something = {
  something: boolean;
  name: string;
};

export interface Another {
  another: boolean;
  age: number;
}

// { test: string; test2: number }
export type { MyExportedTypeSomewhere } from '../types';
```

:::

Which can later be used by importing the `KitaSchemas` constant from the
`@kitajs/runtime` package.

::: code-group

```ts [src/index.ts]
import { KitaSchemas } from '@kitajs/runtime';

console.log(KitaSchemas);
```

```json [Output]
{
  "Another": {
    "additionalProperties": false,
    "properties": {
      "age": { "type": "number" },
      "another": { "type": "boolean" }
    },
    "required": ["another", "age"],
    "type": "object"
  },
  "MyExportedTypeSomewhere": {
    "additionalProperties": false,
    "properties": {
      "test": { "type": "string" },
      "test2": { "type": "number" }
    },
    "required": ["test", "test2"],
    "type": "object"
  },
  "Something": {
    "additionalProperties": false,
    "properties": {
      "name": { "type": "string" },
      "something": { "type": "boolean" }
    },
    "required": ["something", "name"],
    "type": "object"
  }
}
```

:::

This is pretty useful for when you need json schemas of your types at runtime.

## Example

A good example to demonstrate how the provider schema can be used is using type
checked environment variables.

[View the example here](../recipes/env-variables.md)
