import { getDummy } from './mocks/docDefinitions/dummy';

import { writePDF } from './primitives/writePDF';

it('can generate dummy documentDefinition', () => {
  const documentDefinition = getDummy();
  expect(documentDefinition).not.toBeUndefined();
  writePDF({ documentDefinition, filename: 'dummy.pdf' });
});
