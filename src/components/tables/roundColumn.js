import { createLayout } from '../layouts/createLayout';
import { matchUpBracket } from '../rows/matchUpBracket';
import { roundNameRow } from '../rows/roundNameRow';

const layout = createLayout({ rowHeight: 15 });
const generateRound = roundProfile => {
  const { bracketProfile } = roundProfile;
  return (
    roundProfile.matchUps
      ?.map(matchUp => matchUpBracket({ matchUp, bracketProfile }))
      .flat(1) || []
  );
};

export const roundColumn = roundProfile => ({
  table: {
    widths: ['100%'],
    headerRows: 1,
    body: [
      ...roundNameRow(roundProfile.roundName),
      ...generateRound(roundProfile),
    ],
  },
  margin: [0, 0, 4, 0],
  border: [0, 0, 0, 0],
  layout: layout,
});
