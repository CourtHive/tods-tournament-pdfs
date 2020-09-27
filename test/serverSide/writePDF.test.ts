import { getDummy } from '../../src/generators/dummy';
import pdfmake from 'pdfmake';
import fs from 'fs';

const roboto = './node_modules/roboto-fontface/fonts/roboto';

const fonts = {
  Roboto: {
    normal: `${roboto}/Roboto-Regular.woff`,
    bold: `${roboto}/Roboto-Medium.woff`,
    italics: `${roboto}/Roboto-Italic.woff`,
    bolditalics: `${roboto}/Roboto-MediumItalic.woff`,
  },
};

const pdfDir = './test/serverSide/pdfs';

it('can generate dummy documentDefinition', () => {
  const documentDefinition = getDummy();
  expect(documentDefinition).not.toBeUndefined();

  const printer = new pdfmake(fonts);
  const pdfDoc = printer.createPdfKitDocument(documentDefinition);

  const filename = 'dummy.pdf';
  const filepath = `${pdfDir}/${filename}`;
  pdfDoc.pipe(fs.createWriteStream(filepath));
  pdfDoc.end();
});
