const docDefinition = {
  pageOrientation: 'portrait',
  content: [
    { text: 'Portrait View' },
    {
      text: 'Landscape View',
      pageOrientation: 'landscape',
      pageBreak: 'before',
    },
    {
      text: 'Landscape View 2',
      pageOrientation: 'portrait',
      pageBreak: 'after',
    },
    { text: 'Portrait View 2' },
  ],
};

export function getDummy() {
  return docDefinition;
}
