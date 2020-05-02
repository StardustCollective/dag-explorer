const path = require('path');
const hash = require('string-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const styledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;
const glob = require('glob');
const tsconfig = require('./tsconfig.json');

module.exports = (env = {}, argv = {}) => {
  const context = path.resolve(__dirname, './src');
  const dist = path.join(__dirname, './dist');
  const mode = argv.mode || process.env.NODE_ENV || 'development';

  return {
    context,
    mode: mode,
    entry: {
      main: path.join(context, 'index.tsx')
    },
    stats: 'minimal',
    output: {
      path: dist,
      filename: '[name].bundle.js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        ...(({ baseUrl, paths }) => {
          return Object.entries(paths).reduce((result, [alias, [pattern]]) => {
            return {
              ...result,
              ...Object.assign(
                {},
                ...glob.sync(`${pattern}/`).map(value => {
                  const relativePath = path.relative(context, value);

                  return {
                    [alias.replace(/\*.*/, relativePath)]: path.resolve(
                      context,
                      relativePath
                    ),
                  };
                })
              ),
            };
          }, {});
        })(tsconfig.compilerOptions),
      },
    },
    devServer: {
      historyApiFallback: true,
      contentBase: dist,
      host: '0.0.0.0',
      port: 3000,
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:8888',
      //     secure: false,
      //   },
      // },
      clientLogLevel: 'error',
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            'cache-loader',
            {
              loader: 'awesome-typescript-loader',
              options: {
                useCache: true,
                getCustomTransformers: program => ({
                  before: [styledComponentsTransformer()],
                }),
                reportFiles: ['src/**/*.{ts,tsx}'],
              },
            },
          ],
        },

        { test: /.html$/, use: 'raw-loader' },
        { test: /\.(s*)css$/, use: ['style-loader', 'css-loader'] },
        {
          test: /\.(?:woff|woff2)(\?.+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
          test: /\.(?:ttf|eot)(\?.+)?$/,
          use: {
            loader: 'file-loader'
          },
        },
        {
          test: /\.svg(\?.+)?$/,
          use: ({ resource }) => [
            'babel-loader',
            {
              loader: 'react-svg-loader',
              options: {
                jsx: true,
                include: path.resolve(__dirname, 'src'),
                svgo: {
                  plugins: [
                    {
                      cleanupIDs: {
                        prefix: `svg${hash(
                          path.relative(__dirname, resource)
                        )}`,
                      },
                    },
                    {
                      removeTitle: true,
                    },
                    {
                      removeDesc: true,
                    },
                    {
                      removeViewBox: false,
                    },
                    {
                      convertShapeToPath: false,
                    },
                  ],
                  floatPrecision: 2,
                },
              },
            },
          ],
        },
        {
          test: /\.(?:png|gif|jpg)$/,
          use: 'url-loader?mimetype=image/png'
        },
        {
          test: /assets\/favicon(?:[a-zA-Z0-9_-]*)?\.(?:ico|png)$/,
          use: {
            loader: 'file-loader',
            options: {
              emitFile: true,
              name: '[name].[ext]'
            }
          }
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        showErrors: true,
        title: 'Star Gazer',
        path: dist,
        hash: true,
      }),
    ],
  };
};
