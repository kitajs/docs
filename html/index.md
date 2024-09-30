---
layout: home

hero:
  name: 'Kita Html'
  text: 'The fastest server side JSX runtime'
  tagline: Just like your usual template engine, but just better!
  actions:
    - theme: brand
      text: Render JSX →
      link: ./configuration.md
    - theme: alt
      text: Integrations
      link: ./integrations.md
    - theme: alt
      text: Benchmark
      link: ./benchmark.md
  image:
    src: /doug-pc-glasses.svg
    alt: Doug, Kita's turtle mascot, with glasses looking at a computer screen
---

```tsx
// this is true
typeof (<div>hello</div>) === 'string';

// Simply write JSX and write it to a file
fs.writeFileSync(
  'index.html',
  <p>
    Hello, <strong>world</strong>!
  </p>
);
```
