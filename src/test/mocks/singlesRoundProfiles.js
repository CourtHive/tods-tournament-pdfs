export const round1Profile = {
  fontSize: 9,
  marginBottom: 13,
  roundName: 'QF',
  bracketProfile: { rows: 1, fontSize: 9 },
  matchUps: [
    {
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
  fontSize: 9,
  marginBottom: 13,
  roundName: 'SF',
  bracketProfile: { rows: 1, offsetMargin: 24, bracketMargin: 46, fontSize: 9 },
  matchUps: [
    {
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
            score: '6-3 6-3',
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
