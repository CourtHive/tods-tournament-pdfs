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

export const roundColumn = roundProfile => {
  const columnMargin = roundProfile.bracketProfile.columnMargin;
  return {
    table: {
      widths: ['100%'],
      headerRows: 0,
      body: [...roundNameRow(roundProfile), ...generateRound(roundProfile)],
    },
    margin: [0, 0, columnMargin, 0],
    border: [0, 0, 0, 0],
    layout: layout,
  };
};
