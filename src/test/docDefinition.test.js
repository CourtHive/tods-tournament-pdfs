import { dummyDocDefinition } from './primitives/dummyDocDefinition';
import { writePDF } from './primitives/writePDF';

it.only('can generate dummy documentDefinition', () => {
  const documentDefinition = dummyDocDefinition();
  expect(documentDefinition).not.toBeUndefined();
  writePDF({ documentDefinition, filename: 'dummyDocDefinition.pdf' });
});
