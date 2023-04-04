import { cTagsMark, tweakedOneDark } from "./tweaked-one-dark-theme";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { styleTags } from "@lezer/highlight";
import { languages } from "@codemirror/language-data";
import { LanguageSupport, indentUnit } from "@codemirror/language";
import { EditorView, keymap, drawSelection } from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentLess,
  insertTab,
} from "@codemirror/commands";
import {
  insertCodeQuote,
  insertTable,
  makeBold,
  makeHeadings,
  makeItalic,
} from "./commands";
import { Prec } from "@codemirror/state";

/**
 * ref_1: https://codemirror.net/docs/ref/#view.KeyBinding
 */

const languageExtension: LanguageSupport = markdown({
  base: markdownLanguage,
  codeLanguages: languages,
  addKeymap: true,
  extensions: [
    {
      props: [styleTags(cTagsMark)],
    },
  ],
});

// Mod - Alias for Ctrl on Linux and Windows, and Cmd on Mac
const keyBindings = [
  keymap.of([...defaultKeymap, ...historyKeymap]),
  Prec.highest(
    keymap.of([
      { key: "Tab", run: insertTab, shift: indentLess },
      { key: "Mod-c", run: insertCodeQuote },
      { key: "Mod-q", run: insertTable },
      { key: "Mod-b", run: makeBold },
      { key: "Mod-i", run: makeItalic },
      { key: "Mod-h", run: makeHeadings },
    ])
  ),
];

const MarkdownExtensions = [
  languageExtension,
  tweakedOneDark,
  ...keyBindings,
  history(),
  drawSelection(),
  EditorView.lineWrapping,
  indentUnit.of("\t"),
];

export default MarkdownExtensions;
