# File

To access files from your request, you can use the `File` parameter to consume
it as a `stream` or `SavedFile` to pump the file to disk and return a filepath.

::: warning

Requests with files are not supported in routes of type `GET`.

:::

::: info

This parameter automatically registers
[`@fastify/multipart`](https://github.com/fastify/fastify-multipart) in your
Fastify instance.

You can further configure the plugin by passing `fastifyMultipart` to the Kita
plugin options.

:::

::: code-group

```ts {5,15} [routes/index.ts]
import type { File } from '@kitajs/runtime';
import { createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';

export async function post(file: File) {
  await file.file
    // Do whatever you need to do with the file
    // For exemple, compress it and save it to disk
    .pipe(createBrotliCompress())
    .pipe(createWriteStream(file.filename + '.br'));

  return true;
}
```

You can also use the `SavedFile` type to save the file to disk and return the
path to the file.

::: code-group

```ts {3} [routes/index.ts]
import type { SavedFile } from '@kitajs/runtime';

export function post(file: SavedFile) {
  return `File saved at ${file.filepath}!`;
}
```

:::

## Custom names

You can also use dedicated names for the file and the field name.

::: code-group

```ts {3} [routes/index.ts]
import type { File } from '@kitajs/runtime';

export function post(
  anything: File<'avatar'>,
  anythingElse: SavedFile<'background'>
) {
  return true;
}
```

:::
