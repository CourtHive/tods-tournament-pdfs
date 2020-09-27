import * as React from 'react';
import { utilities, getDummy } from '../../src';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// (window as any).pdfMake = pdfMake;

function getWindow() {
  try {
    return window;
  } catch (e) {
    return undefined;
  }
}

const saveBlob = (blob, fileName) => {
  const w = getWindow();
  const url = w?.URL.createObjectURL(blob);

  if (url) {
    const anchorElem = document.createElement('a');
    // anchorElem.style = 'display: none';
    if (url) anchorElem.href = url;
    anchorElem.download = fileName;

    document.body.appendChild(anchorElem);
    anchorElem.click();

    document.body.removeChild(anchorElem);

    // On Edge, revokeObjectURL should be called only after
    // a.click() has completed, atleast on EdgeHTML 15.15048
    setTimeout(function() {
      w?.URL.revokeObjectURL(url);
    }, 1000);
  }
};

export const MakePDF = () => {
  const docDefinition = getDummy();
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  pdfDocGenerator.getBase64((data: any) => {
    const blob = utilities.b64toBlob(data, 'application/pdf');
    saveBlob(blob, 'test.pdf');
  });

  return <div>Exported PDF</div>;
};
