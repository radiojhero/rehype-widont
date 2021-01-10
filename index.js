var visit = require("unist-util-visit");
var selectAll = require("hast-util-select").selectAll;

module.exports = widont;

var ws = /\s/;

function widont(options) {
  var selector =
    (options && options.selector) || "p, h1, h2, h3, h4, h5, h6, li, dt, dd";

  return visitor;

  function visitor(tree) {
    selectAll(selector, tree).forEach(visitNodes);
  }
}

function visitNodes(node) {
  var textNodes = [];

  visit(
    node,
    "text",
    function (node) {
      textNodes.push(node);
    },
    true
  );

  for (var index = 0; index < textNodes.length; index++) {
    var textNode = textNodes[index];

    if (/\s/.test(textNode.value)) {
      textNode.value = insertNbSp(
        textNode.value,
        !index,
        index === textNodes.length - 1
      );
      break;
    }
  }
}

function insertNbSp(value, atEnd, atStart) {
  var index = value.length - 1;
  var start = -1;

  if (atStart) {
    var temporary = value.replace(/^\s*/, "");
    start = index - temporary.length;
  }

  if (atEnd) {
    while (index > start) {
      if (!ws.test(value[index])) {
        break;
      }

      index--;
    }
  }

  while (index > start) {
    if (ws.test(value[index])) {
      break;
    }

    index--;
  }

  if (index === start) {
    return value;
  }

  return [value.slice(0, index), "\u00A0", value.slice(index + 1)].join("");
}
