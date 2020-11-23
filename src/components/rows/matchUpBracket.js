import { sideParticipants } from './sideParticipants';
import { BORDER_NONE, BORDER_RIGHT } from '../../constants/borders';
import { utilities } from 'tods-competition-factory';

const detailBorder = sideNumber =>
  sideNumber === 1 ? BORDER_RIGHT : BORDER_NONE;
const positionDetail = ({ side, bracketProfile }) => {
  const { fontSize } = bracketProfile;
  const { sideNumber, sourceDrawPositionRange, sourceMatchUp } = side;
  const detailText =
    sourceMatchUp?.score ||
    sourceMatchUp?.matchUpStatus ||
    sourceDrawPositionRange;
  return {
    text: {
      text: detailText,
      fontSize,
    },
    border: detailBorder(sideNumber),
    noWrap: true,
  };
};
const fillSpace = ({ side, bracketProfile }) => {
  const { sideNumber } = side;
  const { fontSize, rows } = bracketProfile;
  const marginBottom =
    (sideNumber === 1 && bracketProfile.offsetMargin) ||
    (sideNumber === 2 && bracketProfile.bracketMargin) ||
    0;
  return utilities.generateRange(0, rows).map(() => {
    return [
      {
        text: {
          text: '',
          fontSize,
        },
        border: sideNumber === 1 ? [0, 0, 0, 0] : [0, 0, 1, 0],
        margin: [0, 0, 0, marginBottom],
        noWrap: true,
      },
    ];
  });
};

const getSide = ({ matchUp, sideNumber }) => {
  return matchUp.sides.find(side => side.sideNumber === sideNumber);
};

const bracketSide = ({ matchUp, sideNumber, bracketProfile }) => {
  const side = getSide({ matchUp, sideNumber });
  return [
    ...fillSpace({ side, bracketProfile }),
    ...sideParticipants({ side, bracketProfile }),
    [positionDetail({ side, bracketProfile })],
  ];
};

export const matchUpBracket = ({ matchUp, bracketProfile }) => {
  return [
    ...bracketSide({
      matchUp,
      sideNumber: 1,
      bracketProfile,
    }),
    ...bracketSide({
      matchUp,
      sideNumber: 2,
      bracketProfile,
    }),
  ];
};
