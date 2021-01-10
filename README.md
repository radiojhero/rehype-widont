rehype-widont
=============

This Rehype plugin prevents what is commonly called "widows" in typesetting
lingo, i.e., lines of text made of only one word. This is achieved by replacing
whitespace before the last word with a non-breaking space (U+00A0), which makes
that word and the preceding one stick together.

Although `rehype-widont` uses a different approach, it borrows the name of
[Shaun Inman's WordPress plugin](https://shauninman.com/archive/2006/08/22/widont_wordpress_plugin).


Installation
------------

```bash
npm install rehype-widont

# or, if using Yarn:
yarn add rehype-widont
```


Usage
-----

**NOTE:** `rehype-widont` inserts an actual non-breaking space character instead
of `&nbsp;`, but the entity is used in the following example for clarity's sake.

```js
var rehype = require("rehype");
var widont = require("rehype-widont");

var processor = rehype()
  .data("settings", { fragment: true })
  .use(widont);

processor.processSync("<p>This shall be just fine.</p>");
// returns "<p>This shall be just&nbsp;fine.</p>"

processor.processSync("<p>It can handle <em>nested tags</em>.</p>");
// returns "<p>It can handle <em>nested&nbsp;tags</em>.</p>"

processor.processSync("<p>See? This <em>is</em> awesome.</p>");
// returns "<p>See? This <em>is</em>&nbsp;awesome.</p>"
```


### Options

#### `selector`

Which tags to look inside and prevent widows (`string`,
default: `"p, h1, h2, h3, h4, h5, h6, li, dt, dd"`). Accepts any value that
[`hast-util-select`](https://github.com/syntax-tree/hast-util-select) does.


License
-------

MIT.
