# How to be featured in our main page

Is your organization using Kita? **That's great!**

If you would like your organization to have its logo featured in the main page
list, here's how you do it! You can submit your organization, your logo and
other few relevant details by following these steps:

1. Fork the [Kita documentation repository](https://github.com/kitajs/docs) on
   GitHub.
2. Add the logo in the
   [`public/companies`](https://github.com/kitajs/docs/tree/main/public/companies)
   folder.

Please make sure that your logo complies to the following specs:

- Encoded in [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) (Scalable
  Vector Graphics) format.
- Be reasonably optimized/minified _(you can use
  [imageOptim](https://imageoptim.com/))_.
- Make sure image
  [`width`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/width) or
  [`height`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/height)
  are explicitly specified in the "svg" tag.

Update the [`index.md`](https://github.com/kitajs/docs/edit/main/index.md) file
with a new entry next to other companies following this example:

```js :line-numbers=111
const companies = [
  // ...
  {
    name: 'My Company Name',
    logo: '/companies/my-company-logo.svg',
    link: 'https://my-company.website'
  }
];
```

**Submit the PR!**

As soon as your PR is reviewed and merged, your awesome logo will appear in the
main page!
