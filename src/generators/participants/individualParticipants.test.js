import { tournamentRecordWithParticipants } from '../../test/primitives/tournamentWithParticipants';
import { individualParticipants } from './individualParticipants';
import { writePDF } from '../../test/primitives/writePDF';

it('can generate participant list', () => {
  const { tournamentRecord, participants } = tournamentRecordWithParticipants({
    startDate: '2020-01-01',
    endDate: '2020-01-06',
    participantsCount: 32,
  });
  expect(participants.length).toEqual(32);
  expect(tournamentRecord).not.toBeUndefined();

  const { documentDefinition } = individualParticipants({ participants });
  writePDF({ documentDefinition, filename: 'individualParticipants.pdf' });
});
