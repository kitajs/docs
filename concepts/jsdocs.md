# JSDoc

While creating routes is straightforward, it is crucial to provide essential
information about your routes.

This is achieved by adding [JSDoc](https://jsdoc.app/) comments to your route
functions.

## Operation ID and Tags

The operation ID serves as a unique identifier for each route. Swagger uses it
to distinguish routes and as the route name in the generated documentation. Kita
also relies on operation IDs to generate meaningful route names and related
information.

Tags group routes together in the generated documentation.

```ts
/**
 * Creates a new user
 *
 * @operationId createUser
 * @tag Users
 */
export function post() {}
```

Although it may seem like trivial information, it is crucial to ensure all
generated code is meaningful and easily understandable.

Additionally, providing this data is necessary to adhere to the
[OpenAPI Specification](https://swagger.io/specification/).

## Additional tags

### `@security`

This tag specifies the security requirements for a route, mainly used to
document authentication requirements.

```ts
/** @security bearerAuth */
export function post() {}
```

::: tip

Prefer using authentication through a Kita Provider and use this tag only to
document it.

:::

### `@throws`

This tag specifies errors that Kita cannot detect automatically. When throwing
manually created errors, use the [`HttpErrors`](../parameters/http-errors.md)
parameter.

```ts
/**
 * @throws 401
 * @throws 402
 *
 *   Or multiple errors at once
 * @throws 401, 402
 */
export function get() {}
```

### `@summary`

A brief summary of the route.

```ts
/** @summary Creates a new user */
export function get() {}
```

### `@description`

A more detailed description of the route.

It defaults to the text description, but `@description` can be used to provide a
more detailed explanation and hide the text description.

```ts
/** Text description shown in the documentation */
export function get() {}

/**
 * Internal description of the code that is not shown in the documentation
 *
 * Text description shown in the documentation
 */
export function post() {}
```

### `@url`

Used to change the URL of the route, especially when deviating from a filesystem
path structure.

::: warning

Using this tag is not recommended. Always follow the filesystem path for
consistency.

:::

::: code-group

```ts [src/routes/somehow-cannot-be-users.ts]
/** @url /users */
export function get() {}
```

:::

### `@deprecated`

Marks a route as deprecated, indicating this in the generated documentation.

```ts
/** @deprecated */
export function get() {}
```

### `@internal`

Marks a route as internal, hiding it from the generated documentation but can
still be used in the application.

```ts
/** @internal */
export function get() {}
```
