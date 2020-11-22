import { writePDF } from './primitives/writePDF';
import { roundTableLayout } from '../generators/layouts/roundTableLayout';
import { utilities } from 'tods-competition-factory';

import {
  BORDER_BOTTOM,
  BORDER_BOTTOM_RIGHT,
  BORDER_NONE,
  BORDER_RIGHT,
} from '../constants/borders';

it.only('can generate documentDefinition', () => {
  const layout = roundTableLayout({ rowHeight: 15 });
  const borderPlayer = (role, index) => {
    if (index) {
      // event though BORDER_NONE = [0, 0, 0, 0] it doesn't work here!
      return role === 'top' ? [0, 0, 0, 0] : BORDER_RIGHT;
    } else {
      return role === 'top' ? BORDER_BOTTOM : BORDER_BOTTOM_RIGHT;
    }
  };
  const borderInfo = role => (role === 'top' ? BORDER_RIGHT : BORDER_NONE);
  const playerPosition = ({ player, role, index, fontSize = 9 }) => ({
    text: {
      text: player.name,
      bold: player.seed,
      fontSize,
    },
    border: borderPlayer(role, index),
    margin: [0, 0, 0, 1],
    noWrap: true,
  });
  const infoPosition = ({ text, role, fontSize }) => ({
    text: {
      text,
      fontSize,
    },
    border: borderInfo(role),
    noWrap: true,
  });
  const sidePlayers = ({ players, role, fontSize }) => {
    const doubles = players.length === 2;
    const playerCells = players.map((player, index) => [
      playerPosition({
        player,
        role,
        fontSize,
        index: doubles ? 1 - index : index,
      }),
    ]);
    return playerCells;
  };
  const fillSpace = ({ role, rows = 1 }) => {
    return utilities.generateRange(0, rows).map(() => {
      return [
        {
          text: {
            text: '',
            fontSize: 9,
          },
          border: role === 'top' ? [0, 0, 0, 0] : [0, 0, 1, 0],
          noWrap: true,
        },
      ];
    });
  };
  const bracketSide = ({ role = 'top', rows, info, players, fontSize = 9 }) => {
    return [
      ...fillSpace({ role, rows }),
      ...sidePlayers({ players, role, fontSize }),
      [infoPosition({ text: info, role, fontSize })],
    ];
  };
  const generateBrackets = brackets => {
    return brackets.map(def => bracket(def)).flat(1);
  };
  const bracket = ({ side1, side2, rows }) => [
    ...bracketSide({ role: 'top', rows, info: '1-2', players: side1 }),
    ...bracketSide({ role: 'bottom', rows, info: '3-4', players: side2 }),
  ];
  const roundNameRow = roundName => [
    [
      {
        text: {
          text: roundName,
          fontSize: 9,
        },
        border: [0, 0, 0, 1],
        alignment: 'left',
        noWrap: true,
      },
    ],
    [
      {
        text: '',
        border: BORDER_NONE,
        margin: [0, 0, 0, 13],
      },
    ],
  ];
  const column = (columnNumber, rows) => ({
    table: {
      widths: ['100%'],
      headerRows: 1,
      body: [
        ...roundNameRow(columnNumber),
        ...generateBrackets([
          {
            side1: [
              { name: 'A', seed: true },
              { name: 'A1', seed: true },
            ],
            side2: [{ name: 'B' }, { name: 'B1' }],
            rows,
          },
          {
            side1: [{ name: 'C' }, { name: 'C1' }],
            side2: [{ name: 'D' }, { name: 'D1' }],
            rows,
          },
        ]),
      ],
    },
    margin: [0, 0, 4, 0],
    border: [0, 0, 0, 0],
    layout: layout,
  });

  const documentDefinition = {
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [22, 22, 22, 22],
    content: [
      {
        table: {
          widths: ['25%', '25%', '25%', '25%'],
          body: [[column('1'), column('2', 4), column('3', 8), column('4')]],
        },
        layout: layout,
      },
    ],
    defaultStyle: {
      fontSize: 10,
    },
  };

  expect(documentDefinition).not.toBeUndefined();
  writePDF({ documentDefinition, filename: 'mainDraw.pdf' });
});
