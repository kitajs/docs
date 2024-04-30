# Scalar

Scalar allows you to generate interactive API documentation from Swagger files.

Kita brings it to the next level by automatically configuring everything for
you.

Simply by using Kita and navigating to `http://localhost:1227/reference`, you
will see the interactive API documentation.

All of your documentation, types, and routes will be automatically introspected
and displayed in the UI.

<a href="/swagger/scalar-petstore" target="_blank" title="You won't be able to simulate requests">
  Click here to view a STATIC DEMO of the classic Swagger Petstore
</a>

For security reasons, you can disable this interface in production by setting
`fastifyScalarUi: false` when registering Kita.

::: code-group

```ts {7,8} [src/index.ts]
import { Kita } from '@kitajs/runtime';
import fastify from 'fastify';

const app = fastify();

app.register(Kita, {
  // Disables the UI in production to prevent publicly exposing your API
  fastifyScalarUi: !process.env.isProd as false
});

app.listen(1227);
```

:::
