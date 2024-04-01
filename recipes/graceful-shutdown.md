# Graceful Shutdown

When you need to stop a running application, you should do so gracefully. This
means that you should allow the application to finish processing any requests
that it is currently handling before shutting down. This can help prevent data
loss or corruption, and ensure that the application shuts down cleanly.

This can be done by using
[`close-with-grace`](https://github.com/mcollina/close-with-grace)

Firstly, istall the package:

```sh
npm i close-with-grace
```

Then modify your `src/plugin.ts` file to use the `closeWithGrace` function:

```ts
import closeWithGrace from 'close-with-grace';

// ...

// Delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async ({ err }) => {
  if (err) {
    app.log.error(err);
  }

  await app.close();
});

// Cancelling the close listeners
app.addHook('onClose', async () => {
  closeListeners.uninstall();
});
```

This will ensure that your application shuts down gracefully when you stop it.

Providers hooks will be called when the server is shutting down, so you can use
them to clean up any resources that your application is using.

`close-with-grace` adds a global listeners to the events:

- `process.once('SIGTERM')`
- `process.once('SIGINT')`
- `process.once('uncaughtException')`
- `process.once('unhandledRejection')`

In case one of them is emitted, it will call the given function. If it is
emitted again, it will terminate the process abruptly.
