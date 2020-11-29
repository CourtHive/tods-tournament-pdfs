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
  const drawSize = 16;
  const expectedDrawSizeMatchUps = drawSize - 1;

  const { tournamentRecord, participants } = tournamentRecordWithParticipants({
    startDate: '2020-01-01',
    endDate: '2020-01-06',
    participantsCount: 32,
  });
  expect(participants.length).toEqual(32);

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

  const roundProfiles = roundPresentationProfile.map((profile, index) => {
    const bracketProfile = {
      rows: 0,
      fontSize: 9,
      bracketMargin: 10 + index * 32,
      participantType: 'INDIVIDUAL',
    };
    return Object.assign({}, profile, { bracketProfile });
  });
  console.log(roundProfiles);

  const structure = eliminationStructure({ roundProfiles });
  const documentDefinition = {
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [22, 22, 22, 22],
    defaultStyle: { fontSize: 10 },
    content: [structure],
  };

  writePDF({ documentDefinition, filename: 'drawTest.pdf' });
});
