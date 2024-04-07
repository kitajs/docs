# Authentication

Probably all applications need some kind of authentication. This is a simple
example of how to implement authentication in a web application using
`@fastify/jwt`.

Firstly, install the required packages:

```sh
npm i @fastify/jwt argon2
```

Then, create a provider that will handle the authentication logic and also an
auth service that will handle the token creation and extraction:

::: code-group

```ts [src/providers/auth.ts]
import type { RouteSchema } from '@kitajs/runtime';
import type { FastifyInstance, FastifyRequest } from 'fastify';

// Extends the FastifyJWT module to include the user object
declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: Authorized & { type: 'token' | 'refresh' };
    user: Authorized;
  }
}

// Exports the user object
export type Authorized = {
  userId: number;
  // Add more fields here
};

// Defines the authentication provider
export default async function (
  req: FastifyRequest,
  { httpErrors }: FastifyInstance
): Promise<Authorized> {
  if (!req.user) {
    try {
      await req.jwtVerify();
    } catch (error: any) {
      throw httpErrors.unauthorized(`Invalid login: ${error.message}`);
    }
  }

  return req.user;
}

// Ensures all routes have the authorization header and bearerAuth security
export function transformSchema(schema: RouteSchema): RouteSchema {
  // Merges the headers object with our auth object
  const headers = (schema.headers ??= {} as any);

  headers.$id ??= `${schema.operationId}Headers`;
  headers.properties ??= {};
  headers.required ??= [];
  headers.type = 'object';
  headers.properties.authorization = {
    type: string,
    format: 'regex',
    pattern: '^Bearer .+$'
  };

  schema.security ??= [];
  //@ts-ignore modifying readonly
  schema.security.push({ bearerAuth: [] });

  return schema;
}
```

```ts [src/services/auth.ts]
import type { FastifyJWT, JWT } from '@fastify/jwt';
import type { FastifyRequest } from 'fastify';
import { Authorized } from '../providers/authorized';

/** Extracts the token from the request */
export function extractToken(request: FastifyRequest) {
  return request.headers.authorization?.substring('Bearer '.length);
}

/** Formats the user object */
export function formatAuthUser(user: FastifyJWT['payload']): Authorized {
  return {
    userId: user.userId
    // Add more fields here
  };
}

/** Creates a token and a refresh token */
export function createTokens(jwt: JWT, userId: number) {
  return {
    token: jwt.sign(
      { userId, type: 'token' },
      { expiresIn: +process.env.JWT_TOKEN_EXPIRES }
    ),

    refresh: jwt.sign(
      { userId, type: 'refresh' },
      { expiresIn: +process.env.JWT_REFRESH_EXPIRES }
    )
  };
}
```

:::

Then, register the `@fastify/jwt` plugin and use the `bearerAuth` security
scheme and the `auth` provider:

::: code-group

```ts [src/plugin.ts]
import fastifyJwt from '@fastify/jwt';
import { extractToken, formatAuthUser } from './services/auth';

// ...

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
  verify: { extractToken },
  formatUser: formatAuthUser
});

app.register(Kita, {
  fastifySwagger: {
    openapi: {
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    }
  }
});
```

:::

## Creating login and refresh routes

To use the provider, firstly a route must define the login and refresh routes:

::: code-group

```ts [src/routes/auth/login.ts]
import { HttpErrors } from '@fastify/sensible';
import type { Body } from '@kitajs/runtime';
import { verify } from 'argon2';
import type { FastifyInstance } from 'fastify';
import db, { User } from '../db';
import { createTokens } from '../services/auth';

// Defines the login route
export interface Login {
  /** @format email */
  email: string;

  /**
   * @minLength 8
   * @maxLength 64
   */
  password: string;
}

/**
 * Logs in a user
 *
 * @tag Auth
 * @operationId login
 */
export async function post(
  { email, password }: Body<Login>,
  { jwt }: FastifyInstance,
  errors: HttpErrors
) {
  const user = await db.user.find({ email });

  if (!user) {
    throw errors.unauthorized('Invalid email or password');
  }

  const passwordCompare = await verify(user.password, password);

  if (!passwordCompare) {
    throw errors.unauthorized('Invalid email or password');
  }

  const { refresh, token } = createTokens(jwt, user.id);

  return {
    token,
    refresh,

    // Avoids returning the password to the client
    user: user as Omit<User, 'password'>
  };
}
```

```ts [src/routes/auth/refresh.ts]
import type { FastifyJWT } from '@fastify/jwt';
import { HttpErrors } from '@fastify/sensible';
import type { BodyProp } from '@kitajs/runtime';
import type { FastifyInstance } from 'fastify';
import db, { User } from '../db';
import type { Authorized } from '../providers/authorized';
import { createTokens } from '../services/auth';

/**
 * Refreshes a token
 *
 * @tag Auth
 * @operationId refreshToken
 */
export async function put(
  auth: Authorized,
  oldRefresh: BodyProp<string>,
  { jwt }: FastifyInstance,
  errors: HttpErrors
) {
  const refreshPayload = jwt.verify<FastifyJWT['payload']>(oldRefresh);

  if (
    refreshPayload.type !== 'refresh' ||
    refreshPayload.userId !== auth.userId
  ) {
    throw errors.unauthorized('Invalid refresh token');
  }

  const user = await db.user.find({ id: refreshPayload.userId });

  if (!user) {
    throw errors.unauthorized('Invalid user');
  }

  const { refresh, token } = createTokens(jwt, user.id);

  return {
    token,
    refresh,

    // Avoids returning the password to the client
    user: user as Omit<User, 'password'>
  };
}
```

:::

## Using the `auth` provider

After registering the `auth` provider, you can use it in your routes:

```ts
import { Authorized } from '#/providers/auth';

export function get({ userId }: Authorized) {
  return { userId };
}
```

The route will now require a valid JWT token to be accessed.

Or throw an error if the token is invalid:

```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Invalid login: Format is Authorization: Bearer [token]"
}
```
