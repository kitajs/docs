# Sanitization

This package sanitizes every attribute by default. However, since the resulting
element is always a string, it's impossible to differentiate an HTML element
created by a `<tag>` or from a variable.

> [!CAUTION]
>
> The Kita/Html template engine can introduce **XSS vulnerabilities** if not set
> up properly.
>
> Please make sure you have followed the
> [configuration steps](./configuration.md)

This forces the use of the provided [`safe`](#the-safe-attribute) or manual
invocation of `escapeHtml`.

## What is XSS?

Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious
scripts are injected into otherwise benign and trusted websites. XSS attacks
occur when an attacker uses a web application to send malicious code, generally
in the form of a browser side script, to a different end user. Flaws that allow
these attacks to succeed are quite widespread and occur anywhere a web
application uses input from a user within the output it generates without
validating or encoding it.

**Source:** [OWASP](https://owasp.org/www-community/attacks/xss/)

For example, consider the following code:

::: code-group

```tsx [src/components/Username.tsx]
function Username({ name }: Props) {
  return <div>{name}</div>;
}
```

:::

It seems harmless, but if the `username` variable contains malicious code, it
will be executed when the component is rendered.

::: code-group

```tsx [src/index.tsx]
const username =
  '</div><script>getStoredPasswordAndSentToBadGuysServer()</script>';
const input = <Username name={username} />;
// Resolves into:
// '<div></div><script>getStoredPasswordAndSentToBadGuysServer()</script>'
// which will execute the malicious code when rendered in the browser!
```

:::

## Escaping content

Firstly, make sure you have followed the [configuration](./configuration.md)
steps.

You can use the `safe` attribute to render uncontrolled user input. This will
sanitize the contents and prevent XSS attacks.

::: code-group

```diff [src/components/Username.tsx]
function Username({ name }) {
-  return <div>{username}</div>;
+  return <div safe>{name}</div>;
}
```

:::

Seems tricky, but your editor should've shown a warning about your unsafe code
immediately after you wrote it:

![Xss detection example](/html/xss-preview.png)

You can also use the `escapeHtml` api to escape the content manually when you
need to manipulate a variable before rendering it or partially escaping it.

::: code-group

```tsx [src/main.ts]
import { escapeHtml } from '@kitajs/html';

export function formatUsername(username: string): JSX.Element {
  return 'Hello ' + escapeHtml(username);
}
```

If fact, the above example is perfect for another function: `escape` or its
alias `e`.

::: code-group

```tsx [src/main.ts]
import { e } from '@kitajs/html';
// import { escape } from '@kitajs/html' also works

export function formatUsername(username: string): JSX.Element {
  return e`Hello ${username}`;
}
```

:::

## The Safe Attribute

Always use the `safe` attribute when rendering uncontrolled user input. This
will sanitize the contents and prevent XSS attacks.

::: code-group

```tsx [src/main.ts]
function UserCard({ name, description, date, about }: Props) {
  return (
    <div class="card">
      <h1 safe>{name}</h1>
      <br />
      <p safe>{description}</p>
      <br />
      // Controlled input, no need to sanitize
      <time datetime={date.toISOString()}>{date.toDateString()}</time>
      <br />
      <p safe>{about}</p>
    </div>
  );
}
```

:::

Note that you should only use the `safe` attribute at the very bottom of the
HTML tree where it's needed.
