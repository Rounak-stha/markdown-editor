import { useState, useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { placeholder } from "@codemirror/view";
import MarkdownExtensions from "../lib/mdExtensions";

const customPlaceholder = `# Note Heading

Note Body

**Bold Text**

***Italic Text***

![ImageName](URL)

[Name](URL "I am link title")

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Item     | Item     | Item     |

- List Item 1
- List Item 2
- List Item 3
`;

/* const doc = `# Heading 1
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

 */

export function useMDEditor(
  onChange: (updatedEditorText: string) => void,
  initialDoc = "",
  placeholderText = ""
): [React.RefObject<HTMLDivElement>, EditorView | undefined] {
  const [Editor, setEditor] = useState<EditorView>();
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refContainer.current) return;

    let editor = new EditorView({
      state: EditorState.create({
        doc: initialDoc && initialDoc,
        extensions: [
          ...MarkdownExtensions,
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
