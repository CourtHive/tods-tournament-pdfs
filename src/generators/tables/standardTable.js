export function standardTable(args) {
  const {
    rowData,
    rowProfile,

    styles,
    watermark,
    pageHeader,
    fontSize = 10,
    extraPages = 0,
    pageSize = 'A4',
    rowsPerPage = 34,
    minimumEmpty = 0,
    pageOrientation = 'portrait',
  } = args;

  const widths = rowProfile.map(column => column.width);

  const blankRow = rowProfile.map(() => ({
    border: [false, false, false, false],
    text: ' ',
  }));

  const headerRow = rowProfile.map(column => {
    const { headerStyle, headerText } = column;
    return {
      style: headerStyle || column.style,
      text: headerText || column.text,
    };
  });

  const empty = x => Array.from({ length: x }, () => undefined);
  let emptyRows = rowsPerPage - (rowData.length % rowsPerPage);
  if (extraPages && emptyRows < minimumEmpty) emptyRows += rowsPerPage;

  const newRows = [].concat(...rowData, ...empty(emptyRows)).map((row, i) => {
    const columns = rowProfile.map(column => {
      const { index, dataAttribute, dataStyle } = column;
      if (index) return { text: i + 1, style: dataStyle };
      const text = (row && dataAttribute && row[dataAttribute]) || ' ';
      return { text, style: dataStyle };
    });
    return columns;
  });

  const initialItems = [pageHeader, blankRow, headerRow]
    .filter(i => i)
    .map(i => [i]);
  const dataRows = [].concat(...initialItems, newRows);

  const tableRows = {
    fontSize,
    table: {
      headerRows: 3,
      widths,
      body: dataRows,
    },
  };

  const documentDefinition = {
    pageSize,
    watermark,
    pageOrientation,
    content: [tableRows],
    styles,
  };

  return { documentDefinition };
}
