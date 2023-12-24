# Modelling our data

Like any other web service, we need to have a data model and a database to work
with. We will use [Prisma](https://www.prisma.io/) to model our data and connect
to our database, simply because its easier to use and setup.

## Installing Prisma

Lets start by installing Prisma:

::: code-group

```bash [Terminal 1]
pnpm add -D prisma
pnpm add @prisma/client
pnpn prisma init
```

:::

Then, let's create a simple `User <-> Post` model:

::: code-group

```prisma [prisma/schema.prisma]
generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/prisma-client"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String

  posts Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())

  authorId Int
  author   User @relation(fields: [authorId], references: [id])
}
```

:::

We also need to add a `DATABASE_URL` to our `.env` file:

::: code-group

```properties [.env]
PORT=1228
DATABASE_URL="file:./dev.db"
```

```ts [src/env.ts]
// We could do a fancier validation here, but this is env variables, // [!code ++:5]
// so we just want to fail fast in the application startup.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

export const Env = Object.freeze({
  PORT: Number(process.env.PORT || 1228),
  DATABASE_URL: process.env.DATABASE_URL // [!code ++]
});
```

:::

Then, we can create our migration and apply it to our newly created database:

::: code-group

```bash [Terminal 1]
pnpm prisma migrate dev --name init
```

:::

Now, a `prisma/dev.db` file should have been created. Not familiar with prisma?
Check out the
[Prisma docs](https://www.prisma.io/docs/concepts/overview/what-is-prisma) and
the
[Prisma tutorial](https://www.prisma.io/docs/getting-started/quickstart-typescript).

Finally, we are ready to start coding!
