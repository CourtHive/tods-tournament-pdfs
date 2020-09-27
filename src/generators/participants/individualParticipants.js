import { styles } from '../styles';

export function individualParticipants(args) {
  const {
    participants = [],
    gender,

    rowsPerPage = 34,
    minimumEmpty = 0,
    pageSize = 'A4',
    pageHeader = '',
    extraPages = 0,
  } = args;

  const dummy = [
    { border: [false, false, false, false], text: ' ' },
    { border: [false, false, false, false], text: ' ' },
    { border: [false, false, false, false], text: ' ' },
    { border: [false, false, false, false], text: ' ' },
    { border: [false, false, false, false], text: ' ' },
    { border: [false, false, false, false], text: ' ' },
    { border: [false, false, false, false], text: ' ' },
    { border: [false, false, false, false], text: ' ' },
  ];

  const headerRow = [
    { text: '#', style: 'centeredTableHeader' },
    { text: 'Last Name', style: 'tableHeader' },
    { text: 'First Name', style: 'tableHeader' },
    { text: 'Club', style: 'centeredTableHeader' },
    { text: 'Rank', style: 'centeredTableHeader' },
    { text: 'Status', style: 'centeredTableHeader' },
    { text: 'Order', style: 'centeredTableHeader' },
    { text: 'Signature', style: 'tableHeader' },
  ];

  const genderedPlayers = gender
    ? participants.filter(f => f.sex === gender)
    : participants;
  const empty = x => Array.from({ length: x }, () => undefined);
  let emptyRows = rowsPerPage - (genderedPlayers.length % rowsPerPage);
  if (extraPages && emptyRows < minimumEmpty) emptyRows += rowsPerPage;
  let rows = [].concat(...genderedPlayers, ...empty(emptyRows));

  rows = rows
    .map((row, i) => {
      if (row) {
        return [
          { text: i + 1, style: 'centeredColumn' },
          { text: row.last_name.toUpperCase().trim() },
          { text: row.first_name },
          {
            text: row.club_code || row.country || ' ',
            style: row.club_code ? 'centeredColumn' : 'italicCenteredColumn',
          },
          { text: row.category_ranking || '', style: 'centeredColumn' },
          { text: ' ', style: 'centeredColumn' },
          { text: ' ', style: 'centeredColumn' },
          { text: ' ' },
        ];
      } else {
        return [
          { text: i + 1, style: 'centeredColumn' },
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
          ' ',
        ];
      }
    })
    .filter(f => f);

  const playerRows = [].concat([pageHeader], [dummy], [headerRow], rows);

  const tableRows = {
    fontSize: 10,
    table: {
      headerRows: 3,
      widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 35, '*'],
      body: playerRows,
    },
  };

  const docDefinition = {
    pageSize,
    pageOrientation: 'portrait',

    content: [tableRows],
    styles,
  };

  return { docDefinition };
}
