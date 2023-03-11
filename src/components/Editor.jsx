import { createElement, Fragment } from "react"
import { useEffect, useState } from "react";
import rehypePrism from "rehype-prism";
import rehypeReact from "rehype-react/lib";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { useCodeMirror } from "../hooks/useCodemirror";

const mdxToHtml = unified()
.use(remarkParse)
.use(remarkGfm)
.use(remarkRehype)
.use(rehypePrism)
.use(rehypeReact, { createElement, Fragment })

export default function Editor() {
    const [doc, setDoc] = useState('')
    const [refContainer, Editor] = useCodeMirror('', setDoc)
    console.log(doc)
    return (
        <div className="h-full flex flex-col md:flex-row">
            <div className="h-full flex-1 overflow-auto">
                <div
                    ref={refContainer} 
                    className="h-full mono-font"  >
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <div className="w-full prose prose-invert prose-headings:mb-2 prose-hr:my-4 prose-a:text-blue-600 p-6">
                    {mdxToHtml.processSync(doc).result}
                </div>
            </div>
        </div>
    )
}