import { useState } from "react";
import mdxToHtml from "../lib/mdxToHtml";
// @ts-ignore
import useMDEditor from "../../Editor";

export default function Editor() {
  const [doc, setDoc] = useState("");
  const [refContainer, Editor] = useMDEditor(setDoc);

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* pr-0 is required to make it seem like the 2 divs are sized equally bc of codemirror scrollbar being inside the div */}
      {/* pr-4 is added onthe codemirror darktheme file */}
      <div className="p-6 pr-0 border-b-4 border-slate-800 md:border-none flex-1 overflow-auto">
        <div ref={refContainer}></div>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <div className="w-full prose prose-invert prose-headings:my-3 prose-hr:my-4 prose-a:text-blue-600">
          {mdxToHtml.processSync(Editor?.state.doc.toString()).result}
        </div>
      </div>
    </div>
  );
}
