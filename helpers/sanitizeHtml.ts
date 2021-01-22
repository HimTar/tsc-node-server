import sanitizeHtml from "sanitize-html";

export default function (dirtyString: string) {
  const cleanString = sanitizeHtml(dirtyString, {
    allowedTags: [
      "b",
      "i",
      "h1",
      "h2",
      "br",
      "strong",
      "a",
      "p",
      "ol",
      "li",
      "ul",
      "table",
    ],
    allowedAttributes: {
      a: ["href"],
    },
  });

  return cleanString;
}
