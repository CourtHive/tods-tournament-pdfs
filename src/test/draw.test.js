import {
  drawDefinitionConstants,
  tournamentEngine,
  drawEngine,
  fixtures,
} from 'tods-competition-factory';
import { eliminationStructure } from '../components/tables/eliminationStructure';
import { tournamentRecordWithParticipants } from './primitives/tournamentWithParticipants';
import { writePDF } from './primitives/writePDF';

const { SEEDING_ITF } = fixtures;
const { MAIN, ELIMINATION } = drawDefinitionConstants;

it('can generate elimination draw structure', () => {
  const drawSize = 32;
  const participantsCount = 256;
  const expectedDrawSizeMatchUps = drawSize - 1;

  const { tournamentRecord, participants } = tournamentRecordWithParticipants({
    startDate: '2020-01-01',
    endDate: '2020-01-06',
    participantsCount,
  });
  expect(participants.length).toEqual(participantsCount);

  const mainDrawParticipantIds = participants
    .slice(0, drawSize)
    .map(participant => participant.participantId);

  tournamentEngine.setState(tournamentRecord);
  drawEngine.newDrawDefinition();
  drawEngine.attachPolicy({ policyDefinition: SEEDING_ITF });
  drawEngine.setStageDrawSize({ stage: MAIN, drawSize });
  drawEngine.generateDrawType({ stage: MAIN, drawType: ELIMINATION });
  drawEngine.addDrawEntries({
    stage: MAIN,
    participantIds: mainDrawParticipantIds,
  });
  const { structures: mainStructures } = drawEngine.getDrawStructures({
    stage: MAIN,
    stageSequence: 1,
  });
  const [mainStructure] = mainStructures;
  const { structureId: mainStructureId } = mainStructure;

  drawEngine.automatedPositioning({ structureId: mainStructureId });

  const { drawDefinition } = drawEngine.getState();
  drawEngine.setParticipants(participants);
  let { matchUps } = drawEngine.allDrawMatchUps({
    drawDefinition,
    requireParticipants: true,
  });
  expect(matchUps.length).toEqual(expectedDrawSizeMatchUps);

  const matchUpId = matchUps[0].matchUpId;
  drawEngine.setMatchUpStatus({
    matchUpId,
    winningSide: 1,
    matchUpStatus: 'WALKOVER',
  });
  ({ matchUps } = drawEngine.allDrawMatchUps({
    drawDefinition,
    requireParticipants: true,
  }));

  const { roundPresentationProfile } = drawEngine.getRoundPresentationProfile({
    matchUps,
  });

  const multiplier = [0, 1, 3, 7, 15, 31, 63, 127];
  const bracketScale = {
    '2': { fontSize: 9, rows: 3, scaleFactor: 88 },
    '4': { fontSize: 9, rows: 2, scaleFactor: 44 },
    '8': { fontSize: 9, rows: 1, scaleFactor: 33 },
    '16': { fontSize: 9, rows: 1, scaleFactor: 33 },
    // '32': { fontSize: 9, rows: 0, scaleFactor: 22 },
    '32': { fontSize: 8, rows: 0, scaleFactor: 19.75 },
    // '32': { fontSize: 4.5, rows: 1, scaleFactor: 17.35 },
    // '32': { fontSize: 6, rows: 1, scaleFactor: 22.6 },
    '64': { fontSize: 4.5, rows: 0, scaleFactor: 11.55 }, // 2.56666666
    '128': { fontSize: 2, rows: 0, scaleFactor: 5.685 }, // 2.8425
    '256': { fontSize: 0.8, rows: 0, scaleFactor: 2.875 }, // exact  3.59375
    // '256': { fontSize: 1, rows: 0, scaleFactor: 3.345 }, // exact
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

  writePDF({ documentDefinition, filename: 'drawTest.pdf' });
});
