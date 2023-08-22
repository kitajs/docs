::: code-group

```jsx [✅ With]
// Type safe html!
const html: string = <div>Hello World!<div>
```

```ts [❌ Without]
// NOT type safe!
const html: string = `<div>Hello World!<div>`;
```

:::

<br />

## Installing

This package just provides functions to transpile JSX to a HTML string, you can imagine doing something like this before, but now with type checking and intellisense:

::: code-group

```sh [Npm]
npm install @kitajs/html
```

```sh [Yarn]
yarn add @kitajs/html
```

```sh [Pnpm]
pnpm add @kitajs/html
```

:::

<br />

## Getting Started

Just import `html` from `@kitajs/html` and use it as you would use JSX. Remember to change your `tsconfig.json` to transpile JSX syntax.

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react",
    "reactNamespace": "html",
    "jsxFactory": "html.createElement", // optional, if you had problems
    "jsxFragmentFactory": "html.Fragment" // optional, if you had problems
  }
}
```

```jsx
import html from '@kitajs/html';

// Using as a simple html builder
console.log(<div>Hello World</div>);
prints = '<div>Hello World</div>';

// Maybe your own server-side html frontend
function route(request, response) {
  response.header('Content-Type', 'text/html');
  return response.send(<div>Hello World</div>);
}

// What about generating a static html file?
fs.writeFileSync(
  'index.html',
  <html>
    <head>
      <title>Hello World</title>
    </head>
    <body>
      <div>Hello World</div>
    </body>
  </html>
);

// Also as a component library
function Layout({ name, children }: html.PropsWithChildren<{ name: string }>) {
  return (
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <div>Hello {name}</div>
        {children}
      </body>
    </html>
  );
}

<Layout name='World'>I'm in the body!</Layout>;
```

<br />

## Sanitization

This package aims to be a HTML string builder, **_not an HTML sanitizer_**. This means that no children HTML content will be escaped by default.

::: code-group

```jsx [attributes.jsx]
<div style={'"&<>\''}></div>
<div style={{ backgroundColor: '"&<>\'' }}></div>
```

```html [output.html]
<div style="&#34;&amp;&lt;&gt;&#39;"></div>
<div style="background-color:&#34;&amp;&lt;&gt;&#39;;"></div>
```

:::

We provide a custom attribute called **_`safe`_** that will sanitize everything inside of it:

::: code-group

```jsx [children.jsx]
<div safe>{escaped}</div>
```

```html [output.html]
<div>&lt;script&gt;alert(&#34;hacked!&#34;)&lt;/script&gt;</div>
```

:::

You can also use the exported `html.escapeHtml` function to escape other contents arbitrarily:

::: code-group

```jsx [escapeHtml.jsx]
<div>{html.escapeHtml(untrusted)}</div>
```

```html [output.html]
<div><a></a>&lt;a&gt;&lt;/a&gt;</div>
```

:::

⚠️ **_Unsafe content WILL be rendered as is, so be careful!_**

::: code-group

```jsx [unsafe.jsx]
let untrusted = '<script>alert("hacked!")</script>';
<div>{untrusted}</div>;
```

```html [output.html]
<div>
  <script>
    alert('hacked!');
  </script>
</div>
```

:::

It's like if React's `dangerouslySetInnerHTML` was enabled by default. As we just renders JSX to raw strings, we cannot differentiate between JSX generated content and user input, we cannot escape it by default.

<br />

### The safe attribute

You should always use the `safe` attribute when you are rendering user input. This will sanitize its contents and avoid XSS attacks.

```jsx
function UserCard({ name, description, date, about }) {
  return (
    <div class='card'>
      <h1 safe>{name}</h1>
      <br />
      <p safe>{description}</p>
      <br />
      // controlled input, no need to sanitize
      <time datetime={date.toISOString()}>{date.toDateString()}</time>
      <br />
      <p safe>{about}</p>
    </div>
  );
}
```

Note that only at the very bottom of the HTML tree is where you should use the `safe` attribute, to only escape where its needed.

👉 There's an open issue to integrate this within a typescript plugin to emit warnings and alerts to use the safe attribute everywhere a variable is used. Wanna help? Check [this issue](https://github.com/kitajs/html/issues/2).

<br />

## Migrating from HTML

Migrating from plain HTML to JSX can be a pain to convert it all manually, as you will find yourself hand placing quotes and closing void elements. Luckily for us, there's a tool called [htmltojsx](https://magic.reactjs.net/htmltojsx.htm) that can help us with that.

::: code-group

```html [input.html]
<!-- Hello world -->
<div class="awesome" style="border: 1px solid red">
  <label for="name">Enter your name: </label>
  <input type="text" id="name" />
</div>
<p>Enter your HTML here</p>
```

```jsx [output.jsx]
<>
  {/* Hello world */}
  <div className='awesome' style={{ border: '1px solid red' }}>
    <label htmlFor='name'>Enter your name: </label>
    <input type='text' id='name' />
  </div>
  <p>Enter your HTML here</p>
</>
```

:::

<br />

## Compiling html

When you have static html, is simple to get amazing performances, just save it to a constant and reuse it. However, if you need to hydrate the html with dynamic values in a super fast way, you can use the `compile` property to compile the html and reuse it later.

::: code-group

```tsx [compiled.tsx]
import html from '@kitajs/html';

const compiled = html.compile<['param1', 'param2']>(
  <div>
    <div>$param1</div>
    <div>$param2</div>
    <div>$notFound</div>
  </div>,
  // or
  <MyComponent param1='$param1' param2='$param2' />
);

const html = compiled({ param1: 'Hello', param2: 'World!' });
```

```html [output.html]
<!-- Formatted -->
<div>
  <div>Hello</div>
  <div>World!</div>
  <div>$notFound</div>
</div>
```

:::

This makes the html generation around [**_1500_**](#performance) times faster than just using normal jsx.

Variables that were not passed to the `compile` function are ignored **silently**, this way you can reuse the result into another `compile` function or just because the your _"`$val`"_ was supposed to be a static value.

<br />

## Fragments

JSX does not allow multiple root elements, but you can use a fragment to group multiple elements:

```jsx
const html = (
  <>
    <div>1</div>
    <div>2</div>
  </>
);
```

[Learn more about JSX syntax here!](https://react.dev/learn/writing-markup-with-jsx)

<br />

## Supported HTML

All HTML elements and attributes should be supported.

- [Supported html elements](https://html.spec.whatwg.org/multipage#toc-semantics)
- [Supported html events](https://www.w3schools.com/tags/ref_eventattributes.asp)

**Missing an element or attribute?** Please create an issue or a PR to add it. It's easy to add.

<br />

### The `tag` tag

The `<tag of="">` tag is a custom internal tag that allows you to render any runtime selected tag you want. Possibly reasons to prefer this tag over extending types:

- You want to render a tag that is chosen at runtime.
- You don't want to mess up with extending globally available types.
- You are writing javascript with typechecking enabled.
- You are writing a library and should not extend types globally.
- You need to use kebab-case tags, which JSX syntax does not support.

::: code-group

```jsx [index.tsx]
<tag of="asd" />
<tag of="my-custom-KEBAB" />
```

```html [output.html]
<asd></asd> <my-custom-KEBAB></my-custom-KEBAB>
```

:::

We do recommend using [extending types](#extending-types) instead, as it will give you intellisense and type checking.

<br />

## Async Components

Sadly, we cannot allow async components in JSX and keep the same string type for everything else. Even though it should be possible to write async components you will have no real benefit from it, as you will always have to await the whole html generation
to complete before you can render it.

You should fetch async data in the following way:

```jsx
// Fetches all async code beforehand and passes its contents to the component.
async function render(name) {
  const data = await api.data(name);
  const otherData = await api.otherData(name);

  return <Layout data={data} otherData={data} />;
}
```

<br />

## Extending types

Just as exemplified above, you may also want to add custom properties to your elements. You can do this by extending the `JSX` namespace.

> ⚠️ Please follow the JSX convention and do not use `kebab-case` for your properties, use `camelCase` instead. We internally transform all `camelCase` properties to `kebab-case` to be compliant with the HTML and JSX standards.

```tsx
declare global {
  namespace JSX {
    // Adds a new element called mathPower
    interface IntrinsicElements {
      mathPower: HtmlTag & {
        // Changes properties to the math-power element
        myExponential: number;
        // this property becomes the <>{children}</> type
        children: number;
      };
    }

    // Adds hxBoost property to all elements native elements (those who extends HtmlTag)
    interface HtmlTag {
      hxBoost: boolean;
    }
  }
}

const element = (
  <mathPower myExponential={2} hxBoost>
    {3}
  </mathPower>
);
// Becomes <math-power my-exponential="2" hx-boost>3</math-power>
```

<br />

## Performance

This package is just a string builder on steroids, as you can see [how this works](#how-it-works). However we are running a benchmark with an JSX HTML with about 10K characters to see how it performs.

You can run this yourself by running `pnpm bench`.

```java
@kitajs/html:
  26 414 ops/s, ±0.87%       | 99.93% slower

@kitajs/html - compiled:
  35 267 972 ops/s, ±1.19%   | fastest

typed-html:
  9 827 ops/s, ±1.46%        | slowest, 99.97% slower
```

<br />

## How it works

This package just aims to be a drop in replacement syntax for JSX, and it works because you [tell tsc to transpile](#getting-started) JSX syntax to calls to our own `html` namespace.

```jsx
<ol start={2}>
  {[1, 2].map((i) => (
    <li>{i}</li>
  ))}
</ol>
```

Gets transpiled by tsc to plain javascript:

```js
html.createElement(
  'ol',
  { start: 2 },
  [1, 2].map((i) => html.createElement('li', null, i))
);
```

Which, when called, returns this string:

```js
'<ol start="2"><li>1</li><li>2</li></ol>';
```

<br />

## Format HTML output

This package emits HTML as a compact string, useful for over the wire environments. However, if your use case really needs the output
HTML to be pretty printed, you can use an external JS library to do so, like [html-prettify](https://www.npmjs.com/package/html-prettify).

::: code-group

```jsx [prettify.jsx]
import html from '@kitajs/html';
import prettify from 'html-prettify';

const html = (
  <div>
    <div>1</div>
    <div>2</div>
  </div>
);

console.log(html);
console.log(prettify(html));
```

```html[output.html]
<div><div>1</div><div>2</div></div>

<div>
  <div>1</div>
  <div>2</div>
</div>
```

:::

👉 There's an open PR to implement this feature natively, wanna work on it? Check [this PR](https://github.com/kitajs/html/pull/1).

<br />

## Fork credits

This repository was initially forked from [typed-html](https://github.com/nicojs/typed-html) and modified to add some features and increase performance.

Initial credits to [nicojs](https://github.com/nicojs) and [contributors](https://github.com/nicojs/typed-html/graphs/contributors) for the amazing work.

Licensed under the [Apache License, Version 2.0](https://github.com/kitajs/html/blob/master/LICENSE).

<br />
