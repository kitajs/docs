# Authentication

Adding authentication is a crucial step in any web development project. In Kita,
the preferred way to implement authentication is by using providers, a concept
introduced by Kita. Providers link a type to a function that returns a value of
that type and can be automatically called by simply adding that type as a route
parameter.

<!-- TODO: Add a link section to the provider docs -->

Let's create a simple provider to retrieve the `User-Agent` header value from a
request and modify our previous "Hello, World!" route to use it:

```ts [src/providers/user-agent.ts]
import type { FastifyRequest } from 'fastify';

/**
 * When this type is used as a route parameter, the function below will be
 * called
 */
export type UserAgent = string | undefined;

/**
 * We can also use almost any other parameter type, like FastifyRequest or even
 * other providers
 */
export default function ({ headers }: FastifyRequest): UserAgent {
  return headers['user-agent'];
}
```

```ts [src/routes/index.ts]
import type { UserAgent } from '../providers/user-agent';

/**
 * Simply adding the import here will make Kita call the provider and pass the
 * result as a parameter
 */
export function get(userAgent: UserAgent) {
  return { userAgent };
}
```

Let's ensure it's working as expected by spinning up our server and making a
request:

```bash [Terminal 1]
pnpm dev
#> <omitted build logs...>
```

```bash [Terminal 2]
curl http://localhost:1228
#> {"userAgent":"curl/7.68.0"}%
```

```tip
You can now delete the `src/providers/user-agent.ts` and `src/routes/index.ts` files.
```

## Creating the Authentication Provider

Now that we understand how providers work, let's create our authentication
workflow. To ensure security, we'll use JWT and HttpOnly cookies through their
respective Fastify plugins. We'll also add `@fastify/sensible` to provide error
classes, and we need to register them on our `app` instance:

```sh [Terminal 1]
pnpm add @fastify/jwt @fastify/cookie @fastify/sensible argon2
```

```ts [src/env.ts]
// We could do a fancier validation here, but this is env variables,
// so we just want to fail fast in the application startup.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const Env = Object.freeze({
  HOST: String(process.env.HOST ?? '0.0.0.0'),
  PORT: Number(process.env.PORT || 1228),
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET
});
```

```ts [src/index.ts]
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastifySensible from '@fastify/sensible';

app.register(fastifySensible);

app.register(fastifyCookie);

app.register(fastifyJwt, {
  secret: Env.JWT_SECRET
});
```

Most of the packages we'll use are Fastify plugins because Kita is built on and
for Fastify. We'll also create a provider to return our Prisma client instance:

::: code-group

```ts [src/providers/prisma.ts]
import { FastifyInstance } from 'fastify';
import { PrismaClient } from 'prisma-client';
import { Env } from '../env';

// Singleton is not a problem here
const prisma = new PrismaClient({
  datasourceUrl: Env.DATABASE_URL,
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'error' }
  ]
});

// Simply returns the prisma instance
export default function (): PrismaClient {
  return prisma;
}

// Providers can also have lifecycle hooks, this one connects and disconnects
// from the database and also binds the prisma events to the Fastify logger
export async function onReady(this: FastifyInstance) {
  prisma.$on('error', this.log.error.bind(this.log));
  prisma.$on('info', this.log.debug.bind(this.log));
  prisma.$on('query', this.log.trace.bind(this.log));
  prisma.$on('warn', this.log.warn.bind(this.log));

  await prisma.$connect();
}

// This hook is called when the server is shutting down
export async function onClose(this: FastifyInstance) {
  await prisma.$disconnect();
}
```

```ts [src/providers/authentication.ts]
import { httpErrors } from '@fastify/sensible';
import type { User } from 'prisma-client';

/**
 * Using this parameter forces the user to be authenticated, the authenticated
 * user will be passed as a parameter.
 */
export type Authorized = User;

export default async function (
  { jwt }: FastifyInstance, // added by @fastify/jwt
  { cookies }: FastifyRequest, // added by @fastify/cookie
  prisma: PrismaClient // added by our own prisma provider
): Promise<Authorized> {
  let token = cookies.token;

  // Removes Bearer prefix if present
  if (token?.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  if (!token) {
    throw httpErrors.unauthorized('Missing authorization header');
  }

  const { userId } = await verifyUserJwt(jwt, token);

  if (!userId || typeof userId !== 'number') {
    throw httpErrors.unauthorized('Invalid token');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw httpErrors.expectationFailed('User not found');
  }

  // Prisma does not have an easy way to hide fields for now...
  // https://github.com/prisma/prisma/issues/5042
  user.password = '';

  return { user };
}
```

```ts [src/features/user/auth.ts]
import { JWT } from '@fastify/jwt';
import { hash, verify } from 'argon2';
import { User } from 'prisma-client';
import { Env } from '../../env';

/** Returns a argon2 hash of the password */
export function hashUserPassword(password: string) {
  return hash(password);
}

/** Returns true if the hash matches the plain password */
export function verifyUserPassword(hash: string, plain: string) {
  return verify(hash, plain);
}

/** Creates a JWT token for the user */
export function createUserJwt(jwt: JWT, user: Pick<User, 'id'>) {
  return jwt.sign({ userId: user.id }, { expiresIn: Env.JWT_EXPIRES_SECONDS });
}

/** Verifies a JWT token and returns the payload */
export function verifyUserJwt(jwt: JWT, token: string) {
  return jwt.verify<{ userId: number }>(token);
}
```

:::

Extracting the authorization logic into a dedicated file will make it easier to
test and reuse, and also makes our `authentication` provider much simpler.

::: tip

Splitting by feature or by type is a common debate, however splitting by type in
_large/complex_ production applications usually leads to confusion and repeated
`../` imports.

As **Kita is designed to be used in production applications**, we strongly
recommend to split by feature even in small applications because you never know
when it will grow.

:::

## Creating the user

We currently can ensure routes are for authorized users only, but no actual way
of creating a user or logging in, lets create a `POST /users` route to create a
user and a `POST /auth` route to login:

A user service should also be created to handle password hashing and inserting
it into the database. The way you actually splits your files inside a feature is
up to you, as this project is small, we will just create a `service.ts` file:

::: code-group

```ts [src/features/user/model.ts]
export interface CreateUser {
  /** @minLength 3 */
  name: string;

  /** @format email */
  email: string;

  /**
   * @minLength 8
   * @format password
   */
  password: string;
}
```

```ts [src/features/user/service.ts]
import { PrismaClient } from 'prisma-client';
import { hashUserPassword } from './auth';
import { CreateUser } from './model';

/** Creates a new user and hashes his password */
export async function createUser(prisma: PrismaClient, body: CreateUser) {
  try {
    const password = await hashUserPassword(body.password);

    const user = await prisma.user.create({
      data: {
        email: body.email.trim(),
        name: body.name.trim(),
        password
      }
    });

    return [null, user] as const;
  } catch (error: any) {
    return [error, null] as const;
  }
}
```

```ts [src/routes/users/index.ts]
import { HttpErrors } from '@fastify/sensible';
import { Body } from '@kitajs/runtime';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from 'prisma-client';
import { CreateUser } from '../../../features/user/model';
import { createUser } from '../../../features/user/service';

// JSdocs comments in the post function adds documentation to the final open api spec.
/**
 * Creates a user and returns it
 *
 * @tag Users
 * @summary Create a user
 * @operationId createUser
 */
export async function post(
  // our prisma provider
  prisma: PrismaClient,
  // the logger instance for this request
  { log }: FastifyRequest,
  // an integration with @fastify/sensible
  errors: HttpErrors,
  // used to set the status code of the response
  reply: FastifyReply,
  // a Kita type responsible for extracting, validating and documenting the
  // request body
  body: Body<CreateUser>
) {
  // Calls our service
  const [error, user] = await createUser(prisma, body);

  // User created, lets just return it
  if (user) {
    // Prisma does not have an easy way to hide fields for now...
    // https://github.com/prisma/prisma/issues/5042
    user.password = '';

    reply.status(201);

    return user;
  }

  // Prisma code when a unique constraint is violated
  if (error.code === 'P2002') {
    throw errors.conflict('Email already registered!');
  }

  log.error(error);
  throw errors.internalServerError('Something went wrong!');
}
```

:::

Yes, you didn't read it wrong, Kita is able to read **JSDocs comments inside
interface's fields and correctly validates them** when used inside a http route.
Simply by adding `/** @format email */` to a field, Kita and Fastify ensures the
actual value is a string and is also a valid email.

The user service simply hashes the password and inserts it into the database,
returning the user if everything went well or an error if something went wrong.

Kita focus is to build
[stateless web services](https://blog.dreamfactory.com/stateful-vs-stateless-web-app-design),
by defining root functions without having to instantiate singleton classes or
similar APIs, you are a step closer to a stateless application.

Inside large applications, returning a typed error object will save you ours of
debugging an edge case where you forget that X function may throw Y error but
you didn't handle it.

## Logging in

Now that we have a way to create users, lets create a way to login:

::: code-group

```ts [src/routes/auth.ts]
import { HttpErrors } from '@fastify/sensible';
import { Body } from '@kitajs/runtime';
import { FastifyInstance, FastifyReply } from 'fastify';
import { PrismaClient } from 'prisma-client';
import { Env } from '../../env';
import { createUserJwt, verifyUserPassword } from '../../features/user/auth';
import { EmailAndPassword } from '../../features/user/model';

/**
 * Authenticates a user and returns a JWT token via http only cookie
 *
 * @tag Auth
 * @summary Login
 * @operationId login
 */
export async function post(
  { jwt }: FastifyInstance,
  prisma: PrismaClient,
  reply: FastifyReply,
  body: Body<EmailAndPassword>,
  errors: HttpErrors
) {
  const user = await prisma.user.findUnique({
    where: { email: body.email }
  });

  if (
    // user not found
    !user ||
    // Invalid password
    !(await verifyUserPassword(user.password, body.password))
  ) {
    reply.clearCookie('token');
    throw errors.unauthorized('Invalid email or password');
  }

  // Creates the JWT token from our provider
  const token = createUserJwt(jwt, user);

  // Defines our HTTP only cookie
  reply.setCookie('token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: Env.JWT_EXPIRES_SECONDS
  });

  // Prisma does not have an easy way to hide fields for now...
  // https://github.com/prisma/prisma/issues/5042
  user.password = '';

  return { user };
}
```

```ts [src/features/user/model.ts]
// [!code ++:11]
export interface EmailAndPassword {
  /** @format email */
  email: string;
  /**
   * @minLength 8
   * @format password
   */
  password: string;
}
```

:::

The `login` route is very similar to the `createUser` route, the only difference
is that it returns a JWT token via http only cookie.
