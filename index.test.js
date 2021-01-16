const rehype = require("rehype");
const widont = require(".");

const defaultProcessor = rehype()
  .data("settings", { fragment: true })
  .use(widont);

const customProcessor = rehype()
  .data("settings", { fragment: true })
  .use(widont, { selector: 'div' });

async function process(value, processor = defaultProcessor) {
  const vfile = await processor.process(value);
  return vfile.toString();
}

const fixtures = [
  [
    "inserts a nbsp before the last word",
    "<p>This shall be just fine.</p>",
    "<p>This shall be just\u00A0fine.</p>",
  ],
  [
    "doesn't change single word items",
    "<p>Supercalifragilisticexpialidocious</p>",
    "<p>Supercalifragilisticexpialidocious</p>",
  ],
  [
    "doesn't change single word items (li)",
    "<ul><li>Supercalifragilisticexpialidocious</li></ul>",
    "<ul><li>Supercalifragilisticexpialidocious</li></ul>",
  ],
  [
    "doesn't replace leading whitespace",
    "<p> Supercalifragilisticexpialidocious</p>",
    "<p> Supercalifragilisticexpialidocious</p>",
  ],
  [
    "doesn't replace leading whitespace (li)",
    "<ul><li> Supercalifragilisticexpialidocious</li></ul>",
    "<ul><li> Supercalifragilisticexpialidocious</li></ul>",
  ],
  [
    "doesn't replace trailing whitespace",
    "<p>Supercalifragilisticexpialidocious </p>",
    "<p>Supercalifragilisticexpialidocious </p>",
  ],
  [
    "doesn't replace trailing whitespace (li)",
    "<ul><li>Supercalifragilisticexpialidocious </li></ul>",
    "<ul><li>Supercalifragilisticexpialidocious </li></ul>",
  ],
  [
    "handles multiple paragraphs",
    "<p>This is pagragraph one</p><p>This is paragraph two</p>",
    "<p>This is pagragraph\u00A0one</p><p>This is paragraph\u00A0two</p>",
  ],
  [
    "handles list items",
    "<ul><li>This is item 1</li><li>This is item 2</li></ul>",
    "<ul><li>This is item\u00A01</li><li>This is item\u00A02</li></ul>",
  ],
  [
    "handles paragraphs inside list items",
    "<ul><li><p>This is item 1</p></li></ul>",
    "<ul><li><p>This is item\u00A01</p></li></ul>",
  ],
  [
    "handles nested tags",
    "<p>This shall be <em>just fine</em>.</p>",
    "<p>This shall be <em>just\u00A0fine</em>.</p>",
  ],
  [
    "handles nested tags (2)",
    "<p>This is <em>very</em> nice.</p>",
    "<p>This is <em>very</em>\u00A0nice.</p>",
  ],
  [
    "handles nested tags, keeps trailing whitespace",
    "<p>This shall be <em>just fine</em>. </p>",
    "<p>This shall be <em>just\u00A0fine</em>. </p>",
  ],
  [
    "handles custom tags",
    "<div>This shall be just fine.</div>",
    "<div>This shall be just\u00A0fine.</div>",
    customProcessor,
  ],
];

for (const [description, before, after, customProcessor] of fixtures) {
  test(description, async () => {
    expect(await process(before, customProcessor)).toBe(after);
  });
}
