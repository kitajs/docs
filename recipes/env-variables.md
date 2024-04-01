# Environment variables

Env variables are a common way to configure applications, and it's important to
have them type checked. The Schema provider can be used to achieve this.

By using the [`env-schema`](https://www.npmjs.com/package/env-schema) package,
you can achieve this easily.

```sh
npm i env-schema
```

::: code-group

```ts [src/providers/schema.ts]
export interface Environment {
  /**
   * @minimum 1000
   * @maximum 65535
   */
  PORT: number;

  NODE_ENV: 'development' | 'production';

  /** @format email */
  EMAIL: string;
}
```

:::

Which can be later used in a separated file:

::: code-group

```ts [src/env.ts]
import { KitaSchemas } from '@kitajs/runtime';
import envSchema from 'env-schema';
import type { Environment } from './providers/schema';

export const Env = envSchema<Environment>({
  schema: KitaSchemas.Environment,
  dotenv: true
});
```

:::

Simply doing the above, you have type checked environment variables.

::: code-group

```ts [src/index.ts]
import Kita from '@kitajs/runtime';
import fastify from 'fastify';
import { Env } from './env';

const app = fastify();

app.register(Kita);

app
  .listen({
    // type checking works here
    port: Env.PORT
  })
  .then(console.log);
```

:::
