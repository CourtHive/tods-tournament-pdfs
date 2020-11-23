export const roundProfile = {
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
export const roundProfile2 = {
  roundName: 'SF',
  bracketProfile: { rows: 1, fontSize: 9 },
  matchUps: [
    {
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
