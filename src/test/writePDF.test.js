import { getDummy } from '../test/dummy';
import {
  drawDefinitionConstants,
  tournamentEngine,
  drawEngine,
  fixtures,
} from 'tods-competition-factory';
import { tournamentRecordWithParticipants } from './primitives/tournamentWithParticipants';

import { writePDF } from './primitives/writePDF';

const { SEEDING_ITF } = fixtures;
const { MAIN, ELIMINATION } = drawDefinitionConstants;

it('can generate dummy documentDefinition', () => {
  const documentDefinition = getDummy();
  expect(documentDefinition).not.toBeUndefined();
  writePDF({ documentDefinition, filename: 'dummy.pdf' });
});

it('can generate elimination draw structure', () => {
  const drawSize = 8;
  const expectedDrawSizeMatchUps = 7;

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
  const { matchUps } = drawEngine.allDrawMatchUps({ drawDefinition });
  expect(matchUps.length).toEqual(expectedDrawSizeMatchUps);

  const { roundMatchUps } = drawEngine.getRoundMatchUps({ matchUps });
  console.log({ roundMatchUps });
  expect(Object.keys(roundMatchUps).length).toEqual(3);
});
