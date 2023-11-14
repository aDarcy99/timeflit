const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const mode = 'development';

module.exports = {
  mode,
  entry: {
    index: './src/app.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      // This loader allows us to use babel to transpile JSX or ES6 JS to a version of JS that most browsers can use

      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },

      ///
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' }, // to inject the result into the DOM as a style block
          // { loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                // TODO: remove 'module' in bundled className by creating a custom function for the localIndentName. Check documentation (e.g. task-module-root -> task-root)
                localIdentName: '[name]-[local]__[hash:base64:5]',
              },
            },
          }, // to convert the resulting CSS to Javascript to be bundled (modules:{localIndentname} to rename CSS classes in output to , except if wrapped in a :global(...) pseudo class)
          { loader: 'sass-loader' }, // to convert SASS to CSS
          // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: false,
    }),
    // NOTE: https://www.developerhandbook.com/blog/webpack/how-to-configure-scss-modules-for-webpack/
    new MiniCssExtractPlugin({
      filename: mode === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: mode === 'development' ? '[id].css' : '[id].[hash].css',
    }),
  ],
  resolve: {
    extensions: ['.*', '.ts', '.tsx', '.js', '.jsx', '.scss'],
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
};
