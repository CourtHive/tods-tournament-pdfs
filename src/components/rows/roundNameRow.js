import { BORDER_NONE } from '../../constants/borders';

export const roundNameRow = roundProfile => [
  [
    {
      text: {
        text: roundProfile.roundName,
        fontSize: 9,
      },
      border: roundProfile.roundName ? [0, 0, 0, 1] : BORDER_NONE,
      alignment: 'left',
      noWrap: true,
    },
  ],
  [
    {
      text: '',
      border: BORDER_NONE,
      margin: [0, 0, 0, roundProfile.marginBottom],
    },
  ],
];
