import {
  BORDER_LEFT,
  BORDER_RIGHT,
  BORDER_BOTTOM,
  BORDER_BOTTOM_LEFT,
  BORDER_BOTTOM_RIGHT,
} from '../../constants/borders';

import { participantConstants } from 'tods-competition-factory';
const { PAIR } = participantConstants;

const participantBorder = ({ bracketProfile, sideNumber, bottom }) => {
  const { alignment } = bracketProfile;
  const sideBorder = alignment === 'right' ? BORDER_LEFT : BORDER_RIGHT;
  const sideBottomBorder =
    alignment === 'right' ? BORDER_BOTTOM_LEFT : BORDER_BOTTOM_RIGHT;
  if (bottom) {
    return sideNumber === 1 ? BORDER_BOTTOM : sideBottomBorder;
  } else {
    // event though BORDER_NONE = [0, 0, 0, 0] it doesn't work here!
    return sideNumber === 1 ? [0, 0, 0, 0] : sideBorder;
  }
};

const sideParticipant = ({
  participant,
  roundPosition,
  sideNumber,
  bye,
  top,
  bottom,
  bracketProfile,
}) => {
  const topMargin =
    top && sideNumber === 2
      ? bracketProfile?.bracketMargin || 0
      : top && sideNumber === 1
      ? (bracketProfile?.bracketMargin || 0) / (roundPosition === 1 ? 2 : 1)
      : 0;
  const text = bye ? 'BYE' : participant?.name;
  return {
    text: {
      text,
      bold: participant?.seed,
      fontSize: bracketProfile.fontSize,
    },
    border: participantBorder({ bracketProfile, sideNumber, bottom }),
    margin: [0, topMargin, 0, 0],
    alignment: bracketProfile.alignment,
    noWrap: true,
  };
};

export const sideParticipants = ({ roundPosition, side, bracketProfile }) => {
  const { sideNumber, bye } = side;
  const { fontSize } = bracketProfile;
  const { participantType } = side?.participant || bracketProfile;
  const doubles = participantType === PAIR;
  const participants = doubles
    ? side.participant.individualParticipants
    : [side.participant];
  const participantCells = participants.map((participant, index) => [
    sideParticipant({
      participant,
      roundPosition,
      sideNumber,
      bracketProfile,
      fontSize,
      bye,
      top: index === 0,
      bottom: (doubles ? 1 - index : index) === 0,
    }),
  ]);
  return participantCells;
};
