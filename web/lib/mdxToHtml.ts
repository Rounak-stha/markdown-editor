import { createElement, Fragment } from "react";
import rehypePrism from "rehype-prism";
import rehypeReact from "rehype-react/lib";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const mdxToHtml = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypePrism)
  .use(rehypeReact, { createElement, Fragment });

export default mdxToHtml;
