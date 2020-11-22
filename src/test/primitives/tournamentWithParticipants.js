import {
  tournamentEngine,
  resultConstants,
  eventConstants,
} from 'tods-competition-factory';

const { SUCCESS } = resultConstants;
const { SINGLES } = eventConstants;

export function tournamentRecordWithParticipants({
  startDate,
  endDate,
  participantsCount,
  matchUpType = SINGLES,
}) {
  tournamentEngine.newTournamentRecord({ startDate, endDate });

  const { participants } = tournamentEngine.generateMockParticipants({
    participantsCount,
    matchUpType,
  });
  expect(participants.length).toEqual(participantsCount);

  const result = tournamentEngine.addParticipants({ participants });
  expect(result).toMatchObject(SUCCESS);

  return { tournamentRecord: tournamentEngine.getState(), participants };
}
