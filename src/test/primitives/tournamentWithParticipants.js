import {
  tournamentEngine,
  resultConstants,
  eventConstants,
  mocksEngine,
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

  const { participants } = mocksEngine.generateParticipants({
    participantsCount,
    matchUpType,
  });
  expect(participants.length).toEqual(participantsCount);

  const result = tournamentEngine.addParticipants({ participants });
  expect(result).toMatchObject(SUCCESS);

  return { tournamentRecord: tournamentEngine.getState(), participants };
}
