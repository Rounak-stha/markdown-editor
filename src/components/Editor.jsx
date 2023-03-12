import { createElement, Fragment } from "react";
import { useEffect, useState } from "react";
import rehypePrism from "rehype-prism";
import rehypeReact from "rehype-react/lib";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import useCodeMirror from "../../packages/markdown-editor";

const mdxToHtml = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypePrism)
  .use(rehypeReact, { createElement, Fragment });

export default function Editor() {
  const [doc, setDoc] = useState("");
  const [refContainer, Editor] = useCodeMirror("", setDoc);

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* pr-0 is required to make it seem like the 2 divs are sized equally bc of codemirror scrollbar being inside the div */}
      {/* pr-4 is added onthe codemirror darktheme file */}
      <div className="h-full p-6 pr-0 border-b-4 border-slate-800 md:border-none flex-1 overflow-auto">
        <div ref={refContainer} className="h-full mono-font"></div>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <div className="w-full prose prose-invert prose-headings:my-3 prose-hr:my-4 prose-a:text-blue-600">
          {mdxToHtml.processSync(doc).result}
        </div>
      </div>
    </div>
  );
}
