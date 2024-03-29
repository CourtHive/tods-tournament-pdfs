import { BORDER_NONE } from '../../constants/borders';

export const roundNameRow = roundProfile => [
  [
    {
      text: {
        text: roundProfile.roundName,
        fontSize: roundProfile.bracketProfile?.fontSize || 9,
      },
      border: roundProfile.roundName ? [0, 0, 0, 1] : BORDER_NONE,
      alignment: roundProfile.bracketProfile?.alignment,
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
