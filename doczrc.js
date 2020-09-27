import pkg from './package.json';

export default {
  title: 'TODS PDF Draws',
  description: pkg.description,
  base: `/${pkg.name}/`,
  dest: `/docs`,
  version: pkg.version,
  propsParser: false,
  hashRouter: true,
  typescript: true,
  themeConfig: {
    showPlaygroundEditor: false,
    colors: {
      primary: '#000000',
    },
  },
  menu: ['Readme'],
};
