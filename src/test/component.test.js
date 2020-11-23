import { writePDF } from './primitives/writePDF';
import { eliminationStructure } from '../components/tables/eliminationStructure';

import { roundProfile, roundProfile2 } from './mocks/roundProfile';

it('can generate documentDefinition', () => {
  const roundProfiles = [roundProfile, roundProfile2];
  const structure = eliminationStructure({ roundProfiles });

  const documentDefinition = {
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [22, 22, 22, 22],
    defaultStyle: { fontSize: 10 },
    content: [structure],
  };

  expect(documentDefinition).not.toBeUndefined();
  writePDF({ documentDefinition, filename: 'mainDraw.pdf' });
});
