import {
  BORDER_LEFT,
  BORDER_RIGHT,
  BORDER_BOTTOM,
  BORDER_BOTTOM_LEFT,
  BORDER_BOTTOM_RIGHT,
} from '../../constants/borders';

import { participantConstants } from 'tods-competition-factory';
const { PAIR } = participantConstants;

const participantBorder = ({ bracketProfile, sideNumber, index }) => {
  const { alignment } = bracketProfile;
  const sideBorder = alignment === 'right' ? BORDER_LEFT : BORDER_RIGHT;
  const sideBottomBorder =
    alignment === 'right' ? BORDER_BOTTOM_LEFT : BORDER_BOTTOM_RIGHT;
  if (index) {
    // event though BORDER_NONE = [0, 0, 0, 0] it doesn't work here!
    return sideNumber === 1 ? [0, 0, 0, 0] : sideBorder;
  } else {
    return sideNumber === 1 ? BORDER_BOTTOM : sideBottomBorder;
  }
};

const sideParticipant = ({ player, sideNumber, index, bracketProfile }) => ({
  text: {
    text: player.name,
    bold: player.seed,
    fontSize: bracketProfile.fontSize,
  },
  border: participantBorder({ bracketProfile, sideNumber, index }),
  margin: [0, 0, 0, 1],
  alignment: bracketProfile.alignment,
  noWrap: true,
});

export const sideParticipants = ({ side, bracketProfile }) => {
  const { sideNumber } = side;
  const { fontSize } = bracketProfile;
  const { participantType } = side.participant;
  const doubles = participantType === PAIR;
  const participants = doubles
    ? side.participant.individualParticipants
    : [side.participant];
  const playerCells = participants.map((player, index) => [
    sideParticipant({
      player,
      sideNumber,
      bracketProfile,
      fontSize,
      index: doubles ? 1 - index : index,
    }),
  ]);
  return playerCells;
};
