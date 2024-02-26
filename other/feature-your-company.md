# How to be featured here

Is your organization using Kita? That's great!

If you would like your organization to have its logo featured in the main page
list, here's how you do it! You can submit your organization, your logo and
other few relevant details by following these steps:

1. Fork the [Kita documentation repository](https://github.com/kitajs/docs) on
   GitHub.
2. Add the logo in the `public/companies` folder.

Please make sure that your logo complies to the following specs:

- Encoded in SVG (Scalable Vector Graphics) format.
- Be reasonably optimized/minified _(you can use
  [imageOptim](https://imageoptim.com/))_.
- Make sure image "width" or "height" are explicitly specified in the "svg" tag.

Update the `index.md` file with a new entry next to other companies following
this example:

```html
<a href="MYCOMPANY HTTPS URL" alt="MYCOMPANY NAME" target="_blank">
  <img src="/companies/MYCOMPANY-LOGO.svg" alt="MYCOMPANY NAME logo" />
</a>
```

**Submit the PR!**

As soon as your PR is reviewed and merged, your awesome logo will appear in the
main page!
