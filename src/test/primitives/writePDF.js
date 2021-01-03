import fs from 'fs';
import pdfmake from 'pdfmake';

// paths relative to project root
const pdfDir = './src/test/pdfs';
const roboto = './node_modules/roboto-fontface/fonts/roboto';

const fonts = {
  Roboto: {
    normal: `${roboto}/Roboto-Regular.woff`,
    bold: `${roboto}/Roboto-Medium.woff`,
    italics: `${roboto}/Roboto-Italic.woff`,
    bolditalics: `${roboto}/Roboto-MediumItalic.woff`,
  },
};

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir);
}

export function writePDF({ documentDefinition, filename }) {
  const printer = new pdfmake(fonts);
  const pdfDoc = printer.createPdfKitDocument(documentDefinition);

  const filepath = `${pdfDir}/${filename}`;
  pdfDoc.pipe(fs.createWriteStream(filepath));
  pdfDoc.end();
}
