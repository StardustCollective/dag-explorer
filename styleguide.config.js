const path = require('path');
const { parse } = require('react-docgen-typescript');
const webpackConfig = require('./webpack.config');

module.exports = {
  title: 'DAG Explorer',
  pagePerSection: true,
  skipComponentsWithoutExample: true,
  ignore: [
    '**/*.d.ts'
  ].map(pattern => path.join(__dirname, 'src', pattern)),
  sections: [
    {
      name: 'Getting started',
      content: path.resolve(__dirname, './README.md'),
    },
    {
      name: 'Components',
      components: path.join(__dirname, 'src', 'components/*/index.{ts,tsx}'),
      sectionDepth: 1,
    },
  ],
  propsParser: parse,
  styleguideComponents: {
    Wrapper: path.resolve(__dirname, 'styleguide.tsx'),
  },
  styles: {
    StyleGuide: {
      '@global h1#section-getting-started': {
        display: 'none'
      },
      '@global h1#section-getting-started~*': {
        display: 'none'
      }
    }
  },
  moduleAliases: {
    root: path.resolve(__dirname, 'src')
  },
  styleguideDir: path.join(__dirname, './docs'),
  webpackConfig
};
