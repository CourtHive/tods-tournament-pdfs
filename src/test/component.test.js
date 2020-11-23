import { writePDF } from './primitives/writePDF';
import { eliminationStructure } from '../components/tables/eliminationStructure';

import {
  round1Profile as sr1,
  round2Profile as sr2,
} from './mocks/singlesRoundProfiles';
import {
  round1Profile as dr1,
  round2Profile as dr2,
} from './mocks/doublesRoundProfiles';

it('can generate doubles elimination draw', () => {
  const roundProfiles = [sr1, sr2];
  const structure = eliminationStructure({ roundProfiles });

  const documentDefinition = {
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [22, 22, 22, 22],
    defaultStyle: { fontSize: 10 },
    content: [structure],
  };

  expect(documentDefinition).not.toBeUndefined();
  writePDF({ documentDefinition, filename: 'singlesMainDraw.pdf' });
});

it('can generate doubles elimination draw', () => {
  const roundProfiles = [dr1, dr2];
  const structure = eliminationStructure({ roundProfiles });

  const documentDefinition = {
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [22, 22, 22, 22],
    defaultStyle: { fontSize: 10 },
    content: [structure],
  };

  expect(documentDefinition).not.toBeUndefined();
  writePDF({ documentDefinition, filename: 'doublesMainDraw.pdf' });
});
