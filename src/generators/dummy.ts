const docDefinition = {
  pageOrientation: 'portrait',
  content: [
    { text: 'Text on Portrait' },
    {
      text: 'Text on Landscape',
      pageOrientation: 'landscape',
      pageBreak: 'before',
    },
    {
      text: 'Text on Landscape 2',
      pageOrientation: 'portrait',
      pageBreak: 'after',
    },
    { text: 'Text on Portrait 2' },
  ],
};

export function getDummy() {
  return docDefinition;
}
