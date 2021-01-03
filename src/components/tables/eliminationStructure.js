import { createLayout } from '../layouts/createLayout';
import { utilities } from 'tods-competition-factory';
import { roundColumn } from './roundColumn';

export const eliminationStructure = ({ roundProfiles = [], halfWidth }) => {
  if (roundProfiles.length < 2) roundProfiles.push({});
  if (halfWidth) {
    utilities
      .generateRange(0, roundProfiles.length)
      .forEach(() => roundProfiles.push({}));
  }
  const widthPercentage = 100 / roundProfiles.length;
  const widths = utilities
    .generateRange(0, roundProfiles.length)
    .map(() => `${widthPercentage}%`);
  const roundsRow = roundProfiles.map(roundColumn);

  return {
    table: {
      widths,
      body: [roundsRow],
    },
    layout: createLayout(),
  };
};
