import {EditorView} from "@codemirror/view"
import {HighlightStyle, syntaxHighlighting} from "@codemirror/language"
import {styleTags, Tag, tags as t} from "@lezer/highlight"

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

const cTags = {
    headerMark: Tag.define(),
    linkTitle: Tag.define(),
    paragraph: Tag.define(),
    link: Tag.define()
}


const cTagsMark = {
    HeaderMark: cTags.headerMark,
    LinkTitle: cTags.linkTitle,
    Paragraph: cTags.paragraph,
    Link: cTags.link
}

const chalky = "#e5c07b",
  coral = "#e06c75",
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
  cursor = "#528bff"

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
  cursor
}

/// The editor theme styles for One Dark.
export const oneDarkTheme = EditorView.theme({
  "&": {
    color: ivory,
    padding: '24px',
    backgroundColor: background
  },

  ".cm-content": {
    caretColor: cursor
  },

  ".cm-cursor, .cm-dropCursor": {borderLeftColor: cursor},
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {backgroundColor: selection},

  ".cm-panels": {backgroundColor: darkBackground, color: ivory},
  ".cm-panels.cm-panels-top": {borderBottom: "2px solid black"},
  ".cm-panels.cm-panels-bottom": {borderTop: "2px solid black"},

  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f"
  },

  ".cm-activeLine": {backgroundColor: "#6699ff0b"},
  ".cm-selectionMatch": {backgroundColor: "#aafe661a"},

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847"
  },

  ".cm-gutters": {
    backgroundColor: background,
    color: stone,
    border: "none"
  },

  ".cm-activeLineGutter": {
    backgroundColor: highlightBackground
  },

  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd"
  },

  ".cm-tooltip": {
    border: "none",
    backgroundColor: tooltipBackground
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: tooltipBackground,
    borderBottomColor: tooltipBackground
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: highlightBackground,
      color: ivory
    }
  }
}, {dark: true})

/// The highlighting style for code in the One Dark theme.
export const oneDarkHighlightStyle = HighlightStyle.define([
    {
        tag: cTags.link,
        color: "#f12345"
    },
  {tag: t.keyword,
   color: violet},
  {tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
   color: coral},
  {tag: [t.function(t.variableName), t.labelName],
   color: malibu},
  {tag: [t.color, t.constant(t.name), t.standard(t.name)],
   color: whiskey},
  {tag: [t.definition(t.name), t.separator],
   color: ivory},
  {tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
   color: chalky},
  {tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
   color: cyan},
  {tag: [t.meta, t.comment],
   color: stone},
  {tag: t.strong,
   fontWeight: "bold"},
  {tag: t.emphasis,
   fontStyle: "italic"},
  {tag: t.strikethrough,
   textDecoration: "line-through"},
  {tag: t.link,
   color: stone,
   textDecoration: "underline"},
    {
        tag: t.heading1,
        fontSize: '1.6em',
        fontWeight: "bold",
   color: coral
      },
      {
        tag: t.heading2,
        fontSize: '1.4em',
        fontWeight: "bold",
        color: coral
      },
      {
        tag: t.heading3,
        fontSize: '1.2em',
        fontWeight: "bold",
        color: coral
      },
  {tag: [t.atom, t.bool, t.special(t.variableName)],
   color: whiskey },
  {tag: [t.string, t.processingInstruction, t.inserted],
   color: sage},
{
    tag: cTags.headerMark,
    color: coral
},
{
    tag: cTags.linkTitle,
    color: '#0000ff'
},
  {tag: t.invalid,
   color: invalid},
])


/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const tweakedOneDark = [oneDarkTheme, syntaxHighlighting(oneDarkHighlightStyle)]
export { cTags, cTagsMark }