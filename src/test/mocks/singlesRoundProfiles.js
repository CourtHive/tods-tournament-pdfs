export const round1Profile = {
  marginBottom: 13,
  roundName: 'QF',
  bracketProfile: {
    rows: 0,
    bracketMargin: 10,
    fontSize: 9,
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
            participantType: 'INDIVIDUAL',
            name: 'First Person',
          },
        },
        {
          sideNumber: 2,
          drawPosition: 2,
          sourceDrawPositionRange: '3-4',
          participant: {
            participantType: 'INDIVIDUAL',
            name: 'Second Person',
          },
        },
      ],
    },
    {
      sides: [
        {
          sideNumber: 1,
          drawPosition: 3,
          sourceDrawPositionRange: '5-6',
          participant: {
            participantType: 'INDIVIDUAL',
            name: 'Third Person',
          },
        },
        {
          sideNumber: 2,
          drawPosition: 4,
          sourceDrawPositionRange: '7-8',
          participant: {
            participantType: 'INDIVIDUAL',
            name: 'Fourth Person',
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
    bracketMargin: 42,
    fontSize: 9,
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
            participantType: 'INDIVIDUAL',
            name: 'First Person',
          },
          sourceMatchUp: {
            score: {
              scoreStringSide1: '6-3 6-3',
              scoreStringSide2: '3-6 3-6',
            },
            winningSide: 2,
          },
        },
        {
          sideNumber: 2,
          drawPosition: 4,
          sourceDrawPositionRange: '5-8',
          participant: {
            participantType: 'INDIVIDUAL',
            name: 'Third Person',
          },
          sourceMatchUp: {
            matchUpStatus: 'WALKOVER',
          },
        },
      ],
    },
  ],
};
