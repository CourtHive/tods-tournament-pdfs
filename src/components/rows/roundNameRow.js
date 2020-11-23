import { BORDER_NONE } from '../../constants/borders';

export const roundNameRow = roundName => [
  [
    {
      text: {
        text: roundName,
        fontSize: 9,
      },
      border: roundName ? [0, 0, 0, 1] : BORDER_NONE,
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
