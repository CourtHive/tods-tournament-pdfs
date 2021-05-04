import {
  mocksEngine,
  tournamentEngine,
  drawDefinitionConstants,
  eventConstants,
  genderConstants,
} from 'tods-competition-factory';

import { eliminationDocDefinition } from '../../generators/draws/elimination';

const { ELIMINATION } = drawDefinitionConstants;
const { SINGLES } = eventConstants;
const { MALE } = genderConstants;

export function dummyDocDefinition() {
  const drawSize = 8;
  const participantsProfile = {
    participantsCount: 5,
    sex: MALE,
  };
  const drawProfiles = [
    {
      drawSize,
      eventType: SINGLES,
      participantsCount: 5,
      drawType: ELIMINATION,
    },
  ];
  const {
    tournamentRecord,
    drawIds: [drawId],
  } = mocksEngine.generateTournamentRecord({
    drawProfiles,
    participantsProfile,
    completeAllMatchUps: true,
  });

  tournamentEngine.setState(tournamentRecord);

  const { matchUps } = tournamentEngine.allEventMatchUps({
    participants: tournamentRecord.participants,
    inContext: true,
    drawId,
  });

  return eliminationDocDefinition({ matchUps });
}
