# Integrations

As Kita/Html is a simple JSX template that resolves into raw html strings,
almost every project out there can be integrated with it.

## Migrating from raw HTML templates

Migrating from plain HTML to JSX can be a pain to convert it all manually, as
you will find yourself hand placing quotes and closing void elements.

You can use [**Html To Jsx**](https://magic.reactjs.net/htmltojsx.htm).

```html
<!-- Hello world -->
<div class="awesome" style="border: 1px solid red">
  <label for="name">Enter your name: </label>
  <input type="text" id="name" />
</div>
<p>Enter your HTML here</p>
```

Results into:

```tsx
<>
  {/* Hello world */}
  <div className="awesome" style={{ border: '1px solid red' }}>
    <label html-for="name">Enter your name: </label>
    <input type="text" id="name" />
  </div>
  <p>Enter your HTML here</p>
</>
```

<br />

## Htmx

The usage of [htmx.org](https://htmx.org/) is super common with this project,
this is why we also provide type definitions for all HTMX attributes.

You just need to add this triple slash directive to the top of your file:

```tsx
/// <reference types="@kitajs/html/htmx.d.ts" />

const html = (
  // Type checking and intellisense for all HTMX attributes
  <div hx-get="/api" hx-trigger="click" hx-target="#target">
    Click me!
  </div>
);
```

Or you can use the type option in your tsconfig to import the types globally:

```json
{
  "compilerOptions": {
    "types": ["@kitajs/html/htmx.d.ts"]
  }
}
```

<br />

## Alpinejs

[Alpinejs](https://alpinejs.dev/) is commonly used with htmx.

You just need to add this triple slash directive to the top of your file:

```tsx
/// <reference types="@kitajs/html/alpine.d.ts" />

const html = (
  // Type checking and intellisense for all HTMX attributes
  <div x-data="{ open: false }">...</div>
);
```

Or you can use the type option in your tsconfig to import the types globally:

```json
{
  "compilerOptions": {
    "types": ["@kitajs/html/alpine.d.ts"]
  }
}
```

<br />

## Hotwire Turbo

This project supports the usage of [Turbo Hotwire](https://turbo.hotwired.dev/).
We provide a separate export that you can use to provide type definitions for
the elements and attributes used with Turbo Hotwire.

You just need to add this triple slash directive to the top of your file:

```tsx
/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

const html = (
  // Type checking and intellisense for all HTMX attributes
  <turbo-frame id="messages">
    <a href="/messages/expanded">Show all expanded messages in this frame.</a>

    <form action="/messages">
      Show response from this form within this frame.
    </form>
  </turbo-frame>
);
```

Or you can use the type option in your tsconfig to import the types globally:

```json
{
  "compilerOptions": {
    "types": ["@kitajs/html/hotwire-turbo.d.ts"]
  }
}
```

<br />

## Base HTML templates

Often you will have a "template" html with doctype, things on the head, body and
so on... Most users try to use them as a raw string and only use JSX for other
components, but this is a not a good idea as
[you will have problems with it](https://github.com/nicojs/typed-html/issues/46).

But you can always concatenate strings, like in this required use-case for
`<doctype>`

```tsx
import type { PropsWithChildren } from '@kitajs/html';

export function Layout(
  props: PropsWithChildren<{ head: string; title?: string }>
) {
  return (
    <>
      {'<!doctype html>'}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{props.title || 'Hello World!'}</title>
          {props.head}
        </head>
        <body>{props.children}</body>
      </html>
    </>
  );
}

const html = (
  <Layout
    head={
      <>
        <link rel="stylesheet" href="/style.css" />
        <script src="/script.js" />
      </>
    }
  >
    <div>Hello World</div>
  </Layout>
);
```
