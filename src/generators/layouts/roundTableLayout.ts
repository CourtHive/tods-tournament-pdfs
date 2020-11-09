import { BLACK, LIGHT_GREY } from '../../constants/colors';
import { createPaddingTop } from './createPaddingTop';

const defaultLineWidth = 0.5;
export function roundTableLayout({
  rowHeight,
  vLineColors = {},
  hLineColors = { '1': BLACK },
  defaultColor = LIGHT_GREY,
  lineWidth,
  vLineWidth = {},
  hLineWidth = { '1': 1 },
}) {
  const layout = {
    vLineWidth: columnIndex => {
      return vLineWidth[columnIndex] || lineWidth || defaultLineWidth;
    },
    hLineWidth: rowIndex => {
      return hLineWidth[rowIndex] || lineWidth || defaultLineWidth;
    },
    paddingLeft: () => 0,
    paddingRight: () => 0,
    paddingTop: (rowIndex: number, node: any) => {
      return createPaddingTop(rowIndex, node, rowHeight);
    },
    paddingBottom: () => 0,
    vLineColor: (columnIndex: number) => {
      return vLineColors[columnIndex] || defaultColor;
    },
    hLineColor: (rowIndex: number) => {
      return hLineColors[rowIndex] || defaultColor;
    },
  };

  return layout;
}
