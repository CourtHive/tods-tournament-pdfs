import {
  mocksEngine,
  tournamentEngine,
  drawDefinitionConstants,
  eventConstants,
  genderConstants,
} from 'tods-competition-factory';

import { eliminationStructure } from '../../components/tables/eliminationStructure';
import { getRoundPresentationProfile } from '../../generators/roundProfile';

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
      outcomes: [[1, 2, '6-2 6-1', 1]], // this will not reliably work since bye can be in different positions
    },
  ];
  const {
    tournamentRecord,
    drawIds: [drawId],
  } = mocksEngine.generateTournamentRecord({
    drawProfiles,
    participantsProfile,
  });

  tournamentEngine.setState(tournamentRecord);

  const { matchUps } = tournamentEngine.allEventMatchUps({
    participants: tournamentRecord.participants,
    inContext: true,
    drawId,
  });

  const { roundPresentationProfile } = getRoundPresentationProfile({
    matchUps,
  });

  const multiplier = [0, 1, 3, 7, 15, 31, 63, 127];
  const bracketScale = {
    '2': { fontSize: 9, rows: 3, scaleFactor: 88 },
    '4': { fontSize: 9, rows: 2, scaleFactor: 44 },
    '8': { fontSize: 9, rows: 1, scaleFactor: 33 },
    '16': { fontSize: 9, rows: 1, scaleFactor: 33 },
    '32': { fontSize: 8, rows: 0, scaleFactor: 19.75 },
    '64': { fontSize: 4.5, rows: 0, scaleFactor: 11.55 }, // 2.56666666
    '128': { fontSize: 2, rows: 0, scaleFactor: 5.685 }, // 2.8425
    '256': { fontSize: 0.8, rows: 0, scaleFactor: 2.875 }, // exact  3.59375
  };

  const scaleFactor = bracketScale[drawSize].scaleFactor;
  const roundProfiles = roundPresentationProfile.map(profile => {
    const bracketProfile = {
      columnMargin: 0,
      participantType: 'INDIVIDUAL',
      rows: bracketScale[drawSize].rows,
      fontSize: bracketScale[drawSize].fontSize,
      bracketMargin: scaleFactor * multiplier[profile.columnFactor],
    };
    return Object.assign({}, profile, { bracketProfile });
  });

  const structure = eliminationStructure({ roundProfiles });
  const documentDefinition = {
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [22, 22, 22, 22],
    defaultStyle: { fontSize: 9 },
    content: [structure],
  };

  return documentDefinition;
}
