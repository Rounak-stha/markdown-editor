import { EditorSelection } from "@codemirror/state";
import type { Command } from "@codemirror/view";

/**
 * ref_1: https://codemirror.net/examples/change/
 * ref_2: https://codemirror.net/examples/selection/
 * ref_3: https://codemirror.net/docs/ref/#view.KeyBinding
 */

export const insertCodeQuote: Command = (ev) => {
  ev.dispatch({
    changes: [
      {
        from: ev.state.selection.main.from,
        insert: "\n```<language>\n// Code\n```\n",
      },
    ],
    // Make the cursor move to proper place inside code quotev
    selection: EditorSelection.create([
      EditorSelection.range(
        ev.state.selection.main.from + 14,
        ev.state.selection.main.from + 14
      ),
    ]),
  });
  return true;
};

export const insertTable: Command = (ev) => {
  ev.dispatch({
    changes: [
      {
        from: ev.state.selection.ranges[0].from,
        insert: `| <Col_Name>  | <Col_Name>  | <Col_Name>  |
| :---        |    :----:   |        ---: |
| Item        | Item        |  Item       |
| Item        | Item        |  Item       |`,
      },
    ],
    // Make the cursor move to the end of the first column name
    selection: EditorSelection.create([
      EditorSelection.range(
        ev.state.selection.main.from + 12,
        ev.state.selection.main.from + 12
      ),
    ]),
  });
  return true;
};

/**
 * We usually do not bold an entire paragraph
 * In a general sense, a segment of paragraph or a sentence is bold
 * considering this, if the length of segment of text the user wants to bold is greater then 100
 * this keymap won't do anything
 */
export const makeBold: Command = (ev) => {
  console.log("making Bold");
  let selectionText = ev.state.doc
    .slice(ev.state.selection.main.from, ev.state.selection.main.to)
    .line(1).text;
  if (selectionText.length > 100) return false;

  const selectionFrom = ev.state.selection.main.from;
  const selectionTo = ev.state.selection.main.to;

  ev.dispatch({
    changes: [
      {
        from: selectionFrom,
        insert: "**",
      },
      {
        from: selectionTo,
        insert: "**",
      },
    ],
    selection: EditorSelection.create([
      EditorSelection.range(
        ev.state.selection.main.to + (selectionFrom === selectionTo ? 2 : 4),
        ev.state.selection.main.to + (selectionFrom === selectionTo ? 2 : 4)
      ),
    ]),
  });
  return true;
};

export const makeItalic: Command = (ev) => {
  console.log("Making Italic");
  let selectionText = ev.state.doc
    .slice(ev.state.selection.main.from, ev.state.selection.main.to)
    .line(1).text;

  if (selectionText.length > 100) return false;

  const selectionFrom = ev.state.selection.main.from;
  const selectionTo = ev.state.selection.main.to;

  ev.dispatch({
    changes: [
      {
        from: selectionFrom,
        insert: "***",
      },
      {
        from: selectionTo,
        insert: "***",
      },
    ],
    selection: EditorSelection.create([
      EditorSelection.range(
        ev.state.selection.main.to + (selectionFrom === selectionTo ? 3 : 6),
        ev.state.selection.main.to + (selectionFrom === selectionTo ? 3 : 6)
      ),
    ]),
  });
  return true;
};

export const makeHeadings: Command = (ev) => {
  // check to see if the selection text is already a heading
  // Support Upto Heading 6
  let selectionText = ev.state.doc
    .slice(ev.state.selection.main.from, ev.state.selection.main.to)
    .line(1).text;
  let possibleHeadingMarker = selectionText.split(" ")[0];
  const alreadyHeading = (() => {
    if (possibleHeadingMarker.length > 6) return false;
    if (!possibleHeadingMarker.split("").every((t) => t === "#")) return false;
    return true;
  })();

  if (alreadyHeading && possibleHeadingMarker.length === 6) return true;

  ev.dispatch({
    changes: [
      {
        from: ev.state.selection.ranges[0].from,
        insert: alreadyHeading ? "#" : "# ",
      },
    ],
    selection: EditorSelection.create([
      EditorSelection.range(
        ev.state.selection.ranges[0].from,
        ev.state.selection.ranges[0].to + (alreadyHeading ? 1 : 2)
      ),
    ]),
  });
  return true;
};
