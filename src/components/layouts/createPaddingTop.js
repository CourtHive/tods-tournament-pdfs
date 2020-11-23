import {
  TOP,
  BOTTOM,
  CENTER,
  INDEX_TOP,
  INDEX_BOTTOM,
} from '../../constants/orientation';
import { BORDER_NONE } from '../../constants/borders';

export function createPaddingTop(rowIndex, node, rowHeight) {
  const tableCell = node.table.body[rowIndex][0];
  let cellText = tableCell?.text;

  if (Array.isArray(cellText)) cellText = cellText[0];
  if (!cellText || !cellText.vAlign) return 0;
  const fontSize = cellText.fontSize || 0;

  (!tableCell._margin || tableCell._margin.length === 0) &&
    (tableCell._margin = BORDER_NONE);
  cellText.vAlign === BOTTOM &&
    rowHeight &&
    (tableCell._margin[INDEX_TOP] =
      rowHeight - fontSize - tableCell._margin[INDEX_BOTTOM]);
  cellText.vAlign === CENTER &&
    rowHeight &&
    (tableCell._margin[INDEX_TOP] = (rowHeight - fontSize) / 2);
  cellText.vAlign === TOP && (tableCell._margin[INDEX_TOP] = 2);

  return 0;
}
