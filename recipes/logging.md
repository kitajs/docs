# Logging

Proper logging is an essential practice for any application. Logs are crucial,
and [Fastify](https://fastify.dev/) provides an almost perfect implementation
along with [Pino](https://github.com/pinojs/pino).

Logs are JSON-formatted objects written to a stream, typically `stdout`.

To enable Fastify logging, you need to activate the `logger` property of
Fastify.

::: code-group

```ts [src/index.ts]
import fastify from 'fastify';

const app = fastify({
  logger: true
});
```

:::

By doing this, you will automatically see logs in the console:

::: code-group

```txt [JSON Log]
{"level":30,"time":1712271794784,"pid":1026864,"hostname":"kitajs","msg":"Server listening at http://127.0.0.1:1227"}
```

:::

All logs will follow the above format. Having the JSON format is super important
for servers in production, where these logs can be collected and analyzed by
tools like [Elasticsearch](https://www.elastic.co/pt/),
[Logstash](https://www.elastic.co/pt/logstash), and
[Kibana](https://www.elastic.co/pt/kibana).

## Pretty logs

JSON is not human-readable, and during development, we need friendlier feedback.
To achieve this, it is recommended to use
[pino-pretty](https://github.com/pinojs/pino-pretty).

::: code-group

```sh [Terminal]
npm install -D pino-pretty
```

:::

::: details With/Without pino-pretty

```js
// Without pino-pretty
{"level":30,"time":1522431328992,"msg":"hello world","pid":42,"hostname":"foo","myProperty":1}

// With pino-pretty
[14:35:28.992] INFO (42): hello world
    myProperty: 1
```

:::

Formatting logs requires processing, and one thing we want to avoid is diverting
processing power that could be used to serve requests to format logs.

Therefore, it is recommended to use `pino-pretty` via
[pipelines](<https://en.wikipedia.org/wiki/Pipeline_(Unix)>).

In your development script, after using the `node` command, you can use the
`pino-pretty` command to format the logs.

::: code-group

```jsonc [package.json]
{
  "scripts": {
    // Example of a dev script.
    "dev:server": "node --watch dist/index.js | pino-pretty"
  }
}
```

:::

In production, it is still recommended to store logs as JSON, and if necessary,
you can use `pino-pretty` later to format logs in a post processing step.

Read more about [Pino](https://github.com/pinojs/pino#usage) and
[Pino Pretty](https://github.com/pinojs/pino-pretty#usage).

## Using in a route

The `FastifyRequest` interface has a `log` method that automatically includes
the `req.id` in the log to correlate logs from the same request.

::: code-group

```ts [src/routes/index.ts]
import type { FastifyRequest } from 'fastify';

export function get({ log, ip }: FastifyRequest) {
  log.info({ ip }, 'I am a log message');

  return { hello: 'Arthur!' };
}
```

:::

There you go, you automatically have correlated logs for each request:

::: code-group

```sh [Log]
[20:25:48.786] INFO (1060221): incoming request
    reqId: "req-1"
    req: {
      "method": "GET",
      "url": "/",
      "hostname": "localhost:1227",
      "remoteAddress": "127.0.0.1",
      "remotePort": 52670
    }
[20:25:48.787] INFO (1060221): I am a log message
    reqId: "req-1"
    ip: "127.0.0.1"
[20:25:48.788] INFO (1060221): request completed
    reqId: "req-1"
    res: {
      "statusCode": 200
    }
    responseTime: 1.7987719997763634
```

:::

## Filtering logs

By default, when using `logger: true`, only logs with a level of `info` or
higher are displayed.

To display logs with lower levels, such as `trace` or `debug`, you need to
change the logger level.

::: code-group

```ts [index.ts]
import fastify from 'fastify';

const app = fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'trace'
  }
});
```

:::

It is recommended to filter logs in production to avoid unnecessary logs. You
can do this by either changing the `logger.level` as demonstrated above, or by
using the `-L` flag of pino pretty:

::: code-group

```jsonc [package.json]
{
  "scripts": {
    // Shows debug+ logs
    "dev:server": "node --watch dist/index.js | pino-pretty -L debug"
  }
}
```

:::
