# Handling Input Data

Kita provides a robust and flexible solution for managing a wide range of input
data types within your route handlers, streamlining the process of interacting
with and validating incoming data. This includes handling data in the request
body (`Body` and `BodyProp`), query parameters (`Query`), path parameters
(`Path`), files (`File` and `SavedFile`), headers (`Header`), and cookies
(`Cookie`). By leveraging types from the `@kitajs/runtime` module, Kita
simplifies the definition of parameters and automates request validation
according to the specified types. This automatic validation ensures that only
valid objects are processed, adhering to the principles outlined in
[Fastify's Validation and Serialization](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/).
The following sections offer detailed guidance on utilizing these data types,
complete with restrictions and practical examples, to enhance your route
configurations.

## Path Parameters (`Path`)

Path parameters are parts of the route path that are variable and captured as
data. They are defined in the route's path with a colon (`:`) prefix, such as
`/users/:name/:age`.

### Example with `Path`

Consider you have a route to fetch a user's profile based on their name and age:

::: code-group

```ts [src/routes/[name]/[age]/[dash-case-name].ts]
import type { Path } from '@kitajs/runtime';

export function get(
  name: Path, // Captures the 'name' part of the URL as a string
  age: Path<number>, // Captures the 'age' part of the URL as a number
  type: Path<string, 'dash-case-name'> // Demonstrates using a string with a specific format
) {
  // Implementation here
}
```

:::

This example demonstrates how to capture parts of the request URL as function
parameters in your route handler, allowing for dynamic route matching.

## Query Parameters (`Query`)

Query parameters are key-value pairs appended to the URL after a question mark
(`?`). They are commonly used for filtering, pagination, or other modifications
to the request.

### Example with `Query`

Fetching a list of users filtered by name and age, with optional custom type
handling:

::: code-group

```ts [src/routes/users.ts]
import type { Query } from '@kitajs/runtime';

export function get(
  name: Query, // Captures 'name' query parameter as a string
  age: Query<number>, // Captures 'age' query parameter as a number
  type: Query<string, 'custom name'> // Custom handling for a query parameter
) {
  return `Fetching users with name: ${name}, age: ${age}, and type: ${type}`;
}
```

:::

This code snippet showcases handling query parameters in a GET request, offering
a way to filter or customize the response based on client input.

## Request Body (`Body` and `BodyProp`)

The request body is used for sending data from the client to the server,
typically in POST or PUT requests.

### Example with `Body` and `BodyProp`

Creating a user with a JSON body containing `name`, `age`, and an optional
`email`:

::: code-group

```ts [src/routes/users.ts]
import type { Body, BodyProp } from '@kitajs/runtime';

export function post(
  user: Body<{ name: string; age: number; email?: string }>, // A structured JSON body
  // Demonstrating `BodyProp` for individual properties
  hobby: BodyProp<string, 'hobby'> // Captures a specific part of the body
) {
  // Implementation to create a user
}
```

:::

This example highlights how to capture structured data from the request body,
facilitating the creation or updating of resources.

## File Handling (`File` and `SavedFile`)

Kita supports handling files sent through `multipart/form-data`, useful for
uploads.

### Example 1: Using `File` for In-Memory Processing

Handling file uploads in a POST request:

::: code-group

```ts [src/routes/upload.ts]
import type { File } from '@kitajs/runtime';

export function post(
  file: File, // Captures the file in memory
  named: File<'custom name'> // Captures a file in memory with a custom name
) {
  const data = await file.toBuffer(); // Access the file as a buffer
  // Process the file in memory
  // ...
}
```

:::

### Example 2: Using `SavedFile` for Disk Storage

Saving file uploads to disk:

::: code-group

```ts [src/routes/upload.ts]
import type { SavedFile } from '@kitajs/runtime';

export function post(
  file: SavedFile, // Captures the file and saves it to disk
  named: SavedFile<'custom name'> // Captures a file with a custom name and saves it to disk
) {
  const fileToRead = file.filepath;
  // Use fileToRead to access the file on disk
  // ...
}
```

:::

This demonstrates receiving and processing file uploads, either by working with
them directly in memory or by saving them to disk for later use.

## Headers (`Header`)

Headers contain additional information about the request or response. In Kita,
you can capture specific headers directly.

### Example with `Header`

Capturing the `Content-Type` header from a request:

::: code-group

```ts [src/routes/content-type.ts]
import type { Header } from '@kitajs/runtime';

export function get(
  contentType: Header<'content-type'> // Capturing the 'Content-Type' header
) {
  // Implementation based on the header
}
```

:::

This example captures a specific request header, allowing for conditional
handling based on its value.

## Cookies (`Cookie`)

Cookies are key-value pairs sent from the server to the client and then returned
by the client with each request. To effectively handle cookies in your
application, it's essential to install the @fastify/cookies library. This
library provides the necessary middleware for parsing and setting cookies in
Fastify, enabling seamless cookie management in your Kita routes.

### Example with `Cookie`

Accessing a session cookie:

::: code-group

```ts [src/routes/session.ts]
import type { Cookie } from '@kitajs/runtime';

export function get(
  session: Cookie<'session'> // Accessing the 'session' cookie
) {
  // Implementation using the cookie
}
```

:::

This snippet shows how to access cookie data in your route handler, useful for
authentication or session management.

## Using Parameters

In the example below, Kita understands and builds a route expecting a `POST`
request to `/users` with a JSON body containing `name`, `age`, and an `email`
field, along with a `user-agent` header. Missing or invalid parameters will
automatically result in a `400 Bad Request` error. **Sending a request with
anything other than a number in the `age` field will also be rejected.**

::: code-group

```ts [src/routes/users.ts]
import type { Body, Header } from '@kitajs/runtime';

// Creates a new user
export function post(
  data: Body<{ name: string; email: string; age: number }>,
  userAgent: Header<'user-agent'>,
  rawRequest: FastifyRequest
) {
  // ...
}
```

:::

::: tip

The order of parameters is **NOT important**; Kita will automatically inject the
correct values in the correct order.

:::

This seamless functionality is made possible by
[`ts-json-schema-generator`](https://github.com/vega/ts-json-schema-generator),
a project that transforms TypeScript types into JSON schemas, and
[`ajv`](https://github.com/ajv-validator/ajv), which validates the request
against the generated schema. The JSON schema is generated during `kita build`,
and the
[validation is performed at runtime by Fastify](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#core-concepts).

Moreover, automatic validation enables Kita to effortlessly generate Swagger
specifications, providing detailed documentation for your API. This makes it
easier for developers to understand how to interact with your routes.

By utilizing these parameter types, you can enhance the readability,
maintainability, and security of your Kita applications. As you define and use
these types, Kita handles the heavy lifting, allowing you to focus on building
robust and efficient APIs.

## Creating Your Own Parameters (Providers)

While built-in parameters cover many use cases, Kita recognizes that custom
needs arise. For this reason, Kita introduces providers, allowing you to create
your own parameters.

Providers link a type to a function that returns a value of the same type, and
they can be automatically called by adding that type as a route parameter.
Providers are defined inside the `src/providers` folder and are automatically
loaded by Kita.

Here's an example provider that returns the user agent of the request:

::: code-group

```ts [src/providers/user-agent.ts]
export default function (request: FastifyRequest) {
  return request.headers['user-agent'];
}
```

```ts [src/routes/users.ts]
import UserAgent from '../providers/user-agent';

export function get(
  userAgent: UserAgent // Automatically calls the UserAgent provider
) {
  console.log(userAgent);
  // Implementation using the user agent
}
```

:::

Providers offer several advantages over simple route parameters, such as
defining their own schemas (parameters, return types, etc.), reuse across
multiple routes without code duplication, registration of application and
lifecycle hooks, and more.

[For detailed information, refer to the respective sections on providers.](../providers/index.md)
