import { cTagsMark, tweakedOneDark } from "./tweaked-one-dark-theme";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { styleTags, Tag } from "@lezer/highlight";
import { languages } from "@codemirror/language-data";

const languageExtension = markdown({
  base: markdownLanguage,
  codeLanguages: languages,
  addKeymap: true,
  extensions: [
    {
      props: [styleTags(cTagsMark)],
    },
  ],
});

const MarkdownExtensions = [languageExtension, tweakedOneDark];

export default MarkdownExtensions;
