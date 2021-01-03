import { sideParticipants } from './sideParticipants';
import {
  BORDER_LEFT,
  BORDER_NONE,
  BORDER_RIGHT,
} from '../../constants/borders';
import { utilities } from 'tods-competition-factory';

const detailBorder = ({ bracketProfile, sideNumber }) => {
  const sideBorder =
    bracketProfile.alignment === 'right' ? BORDER_LEFT : BORDER_RIGHT;
  return sideNumber === 1 ? sideBorder : BORDER_NONE;
};
const positionDetail = ({ side, bracketProfile }) => {
  const { fontSize } = bracketProfile;
  const { sideNumber, sourceDrawPositionRange, sourceMatchUp } = side;
  const { matchUpStatus, winningSide, score } = sourceMatchUp || {};
  const scoreString = score && score[`scoreStringSide${winningSide}`];
  const status = matchUpStatus !== 'BYE' && matchUpStatus;
  const detailText = scoreString || status || sourceDrawPositionRange;
  return {
    text: {
      text: detailText,
      fontSize,
    },
    border: detailBorder({ bracketProfile, sideNumber }),
    alignment: bracketProfile.alignment,
    noWrap: true,
  };
};
const fillBorder = ({ bracketProfile, sideNumber }) => {
  const sideBorder =
    bracketProfile.alignment === 'right' ? BORDER_LEFT : BORDER_RIGHT;
  return sideNumber === 2 ? sideBorder : BORDER_NONE;
};
const fillSpace = ({ side, bracketProfile }) => {
  const { sideNumber } = side;
  const { fontSize, rows } = bracketProfile;
  return utilities.generateRange(0, rows).map(() => {
    return [
      {
        text: {
          text: '',
          fontSize,
        },
        border: fillBorder({ bracketProfile, sideNumber }),
        margin: [0, 0, 0, 0],
        noWrap: true,
      },
    ];
  });
};

const getSide = ({ matchUp, sideNumber }) => {
  return (
    matchUp.sides.find(side => side.sideNumber === sideNumber) || { sideNumber }
  );
};

const bracketSide = ({ matchUp, sideNumber, bracketProfile }) => {
  const { roundPosition } = matchUp;
  const side = getSide({ matchUp, sideNumber });
  return [
    ...fillSpace({ side, bracketProfile }),
    ...sideParticipants({ roundPosition, side, bracketProfile }),
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
