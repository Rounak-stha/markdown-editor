import { useState, useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { indentUnit } from "@codemirror/language";
import { keymap, placeholder } from "@codemirror/view";
import {
  insertTab,
  indentLess,
  defaultKeymap,
  history,
  historyKeymap,
} from "@codemirror/commands";
import MarkdownExtensions from "../lib/mdExtensions";

const customPlaceholder = `# Note Heading

Note Body

**Bold Text**

***Italic Text***

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Item     | Item     | Item     |

- List Item 1
- List Item 2
- List Item 3
`;

const doc = `# Heading 1
---
## Heading 2
---
### Heading 3
---

![Mermaid](https://cdn-images-1.medium.com/max/1200/1*E9vOmYklTp23VYaumzHSgA.png)

[Link](http://iamlink.iam "I am link title")

${'```js\nconsole.log("hahahaha")\n```'}

**Table**
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
`;

const extensions = [
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap,
    { key: "Tab", run: insertTab },
    { key: "Shift-Tab", run: indentLess },
  ]),
  indentUnit.of("\t"),
  EditorView.lineWrapping,
  history(),
  ...MarkdownExtensions,
];

/**
 * Docs: https://codemirror.net/docs/guide/
 * @param {*} doc
 * @param {*} placeholderText
 * @returns
 */

export function useCodeMirror(placeholderText, onChange) {
  const [Editor, setEditor] = useState(null);
  const refContainer = useRef(null);

  useEffect(() => {
    if (!refContainer.current) return;

    let editor = new EditorView({
      state: EditorState.create({
        doc,
        extensions: [
          ...extensions,
          placeholder(placeholderText || customPlaceholder),
          EditorView.updateListener.of((update) => {
            if (update.changes) {
              onChange && onChange(update.state.doc.toString());
            }
          }),
        ],
      }),
      parent: refContainer.current,
    });

    setEditor(editor);

    return () => editor.destroy();
  }, [refContainer]);

  return [refContainer, Editor];
}
