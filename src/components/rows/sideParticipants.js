import {
  BORDER_RIGHT,
  BORDER_BOTTOM,
  BORDER_BOTTOM_RIGHT,
} from '../../constants/borders';

import { participantConstants } from 'tods-competition-factory';
const { PAIR } = participantConstants;

const participantBorder = (sideNumber, index) => {
  if (index) {
    // event though BORDER_NONE = [0, 0, 0, 0] it doesn't work here!
    return sideNumber === 1 ? [0, 0, 0, 0] : BORDER_RIGHT;
  } else {
    return sideNumber === 1 ? BORDER_BOTTOM : BORDER_BOTTOM_RIGHT;
  }
};

const sideParticipant = ({ player, sideNumber, index, fontSize = 9 }) => ({
  text: {
    text: player.name,
    bold: player.seed,
    fontSize,
  },
  border: participantBorder(sideNumber, index),
  margin: [0, 0, 0, 1],
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
      fontSize,
      index: doubles ? 1 - index : index,
    }),
  ]);
  return playerCells;
};
