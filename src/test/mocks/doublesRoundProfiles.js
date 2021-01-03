export const round1Profile = {
  marginBottom: 13,
  roundName: 'QF',
  bracketProfile: {
    rows: 0,
    fontSize: 9,
    alignment: 'left',
    bracketMargin: 10,
  },
  matchUps: [
    {
      roundPosition: 1,
      sides: [
        {
          sideNumber: 1,
          drawPosition: 1,
          sourceDrawPositionRange: '1-2',
          participant: {
            participantType: 'PAIR',
            individualParticipants: [{ name: 'A1' }, { name: 'A2' }],
          },
        },
        {
          sideNumber: 2,
          drawPosition: 2,
          sourceDrawPositionRange: '3-4',
          participant: {
            participantType: 'PAIR',
            individualParticipants: [{ name: 'B1' }, { name: 'B2' }],
          },
        },
      ],
    },
    {
      roundPosition: 2,
      sides: [
        {
          sideNumber: 1,
          drawPosition: 3,
          sourceDrawPositionRange: '5-6',
          participant: {
            participantType: 'PAIR',
            individualParticipants: [{ name: 'C1' }, { name: 'C2' }],
          },
        },
        {
          sideNumber: 2,
          drawPosition: 4,
          sourceDrawPositionRange: '7-8',
          participant: {
            participantType: 'PAIR',
            individualParticipants: [{ name: 'D1' }, { name: 'D2' }],
          },
        },
      ],
    },
  ],
};

export const round2Profile = {
  marginBottom: 13,
  roundName: 'SF',
  bracketProfile: {
    rows: 0,
    bracketMargin: 53,
    fontSize: 9,
    alignment: 'left',
  },
  matchUps: [
    {
      roundPosition: 1,
      sides: [
        {
          sideNumber: 1,
          drawPosition: 1,
          sourceDrawPositionRange: '1-4',
          participant: {
            participantType: 'PAIR',
            individualParticipants: [{ name: 'A1' }, { name: 'A2' }],
          },
          sourceMatchUp: {
            score: {
              scoreStringSide1: '6-3 6-3',
              scoreStringSide2: '3-6 3-6',
            },
            winningSide: 1,
          },
        },
        {
          sideNumber: 2,
          drawPosition: 4,
          sourceDrawPositionRange: '5-8',
          participant: {
            participantType: 'PAIR',
            individualParticipants: [{ name: 'D1' }, { name: 'D2' }],
          },
          sourceMatchUp: {
            matchUpStatus: 'WALKOVER',
          },
        },
      ],
    },
  ],
};
