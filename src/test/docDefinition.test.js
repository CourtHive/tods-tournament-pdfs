import { getDummy } from './mocks/docDefinitions/dummy';

it.only('can generate dummy documentDefinition', () => {
  const documentDefinition = getDummy();
  expect(documentDefinition).not.toBeUndefined();
});
