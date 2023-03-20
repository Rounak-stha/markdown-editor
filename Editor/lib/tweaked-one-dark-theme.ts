import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { Tag, tags as t } from "@lezer/highlight";
import type { Extension } from "@codemirror/state";

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

const cTags = {
  headerMark: Tag.define(),
  linkTitle: Tag.define(),
  paragraph: Tag.define(),
  linkName: Tag.define(),
  imageName: Tag.define(),
};

const cTagsMark = {
  HeaderMark: cTags.headerMark,
  LinkTitle: cTags.linkTitle,
  Paragraph: cTags.paragraph,
  Link: cTags.linkName,
  Image: cTags.imageName,
};

const chalky = "#e5c07b",
  coral = "#e06c75",
  darkCoral = "#5a2b2f",
  cyan = "#56b6c2",
  invalid = "#ffffff",
  ivory = "#abb2bf",
  stone = "#7d8799", // Brightened compared to original to increase contrast
  malibu = "#61afef",
  sage = "#98c379",
  whiskey = "#d19a66",
  violet = "#c678dd",
  darkBackground = "#21252b",
  highlightBackground = "#2c313a",
  background = "#1d2125",
  tooltipBackground = "#353a42",
  selection = "#3E4451",
  cursor = "#528bff";

/// The colors used in the theme, as CSS color strings.
export const color = {
  chalky,
  coral,
  cyan,
  invalid,
  ivory,
  stone,
  malibu,
  sage,
  whiskey,
  violet,
  darkBackground,
  highlightBackground,
  background,
  tooltipBackground,
  selection,
  cursor,
};

/// The editor theme styles for One Dark.
export const oneDarkTheme = EditorView.theme(
  {
    "&": {},

    ".cm-scroller": {
      fontFamily: "inherit",
      lineHeight: 1.4,
    },

    // PaddingRight here inside ensures that the scrollbar is out of the padding area
    // for uniform spacing with non-editor-related elements
    ".cm-content": {
      caretColor: cursor,
      paddingRight: "24px",
    },

    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      { backgroundColor: selection },

    ".cm-panels": { backgroundColor: darkBackground, color: ivory },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },

    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f",
    },

    ".cm-activeLine": { backgroundColor: "#6699ff0b" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },

    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847",
    },
  },
  { dark: true }
);

/// The highlighting style for code and custom tags
export const oneDarkHighlightStyle = HighlightStyle.define([
  { tag: cTags.linkName, color: malibu },
  { tag: cTags.imageName, color: malibu },
  { tag: cTags.linkTitle, color: stone },
  { tag: t.url, color: "#0074D9" },
  { tag: t.processingInstruction, color: sage },
  { tag: t.keyword, color: violet },
  { tag: [t.function(t.variableName), t.labelName], color: malibu },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey },
  { tag: [t.definition(t.name), t.separator], color: ivory },
  { tag: [t.meta, t.comment], color: stone },
  { tag: t.strong, fontWeight: "bold" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.link, color: stone, textDecoration: "underline" },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey },
  { tag: [t.string, t.inserted], color: sage },
  { tag: t.invalid, color: invalid },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: coral,
  },
  {
    tag: [
      t.typeName,
      t.className,
      t.number,
      t.changed,
      t.annotation,
      t.modifier,
      t.self,
      t.namespace,
    ],
    color: chalky,
  },
  {
    tag: [
      t.operator,
      t.operatorKeyword,
      t.escape,
      t.regexp,
      t.link,
      t.special(t.string),
    ],
    color: cyan,
  },
  {
    tag: t.heading1,
    fontWeight: "bold",
    color: coral,
    fontSize: "1.8rem",
  },
  {
    tag: t.heading2,
    fontWeight: "bold",
    color: coral,
    fontSize: "1.5rem",
  },
  {
    tag: t.heading3,
    fontSize: "1.25rem",
  },
  {
    tag: t.heading,
    fontWeight: "bold",
    color: coral,
  },
  // Order matters
  { tag: cTags.headerMark, color: darkCoral },
]);

/// Extension to enable the One Dark Tweaked Theme (both the editor theme and
/// the highlight style).
export const tweakedOneDark: Extension[] = [
  oneDarkTheme,
  syntaxHighlighting(oneDarkHighlightStyle),
];
export { cTags, cTagsMark };
