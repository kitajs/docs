# Configuration

Sometimes you need to define some configuration for a specific route, such as a
middleware or a validation schema. For that, you can use the `this: Use`
parameter.

The `Use` parameter is a type that receives one or multiple `RouteMapper`s and
returns the same configuration with the modifications made.

All route mappers must be exported within the route file itself so that it can
be accessed by Kita later.

::: code-group

```ts [src/routes/index.ts]
import type { RouteMapper, Use } from '@kitajs/runtime';

export function get(this: Use<typeof config>) {
  return true;
}

export const config: RouteMapper = (config) => {
  config.bodyLimit = 1024 * 1024 * 1024;
  return config;
};
```

:::

The example above would be the same as defining the configuration directly on a
pure Fastify instance.

```ts
app.route({
  url: '/',
  method: 'GET',
  bodyLimit: 1024 * 1024 * 1024,
  async handler(req, res) {
    return true;
  }
});
```

## Using Multiple Configurations

You can use multiple `RouteMapper`s to define different configurations.

The execution order will be the same as the order of definition within the `Use`
array.

::: code-group

```ts [src/routes/index.ts]
import type { RouteMapper, Use } from '@kitajs/runtime';

export function get(this: Use<[typeof config1, typeof config2]>) {
  return true;
}

export const config1: RouteMapper = (config) => {
  config.bodyLimit = 1024 * 1024 * 1024;
  return config;
};

export const config2: RouteMapper = (config) => {
  config.prefixTrailingSlash = 'both';
  return config;
};
```

## Reusing Configurations

There's no rule about defining the configuration function within the same route
file. You can export the configuration function and reuse it in other routes.

::: code-group

```ts [src/routes/index.ts]
import type { Use } from '@kitajs/runtime';
import { config } from '../config';

export function get(this: Use<typeof config>) {
  return true;
}

// You still need to export the config function
export { config } from '../config';
```

:::
