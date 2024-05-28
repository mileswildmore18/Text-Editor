const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

//Adding and configuring workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name]bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generating an HTML file from a template
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Text-Editor',
      }),
      // Generating a manifest file for the PWA
      new WebpackPwaManifest({
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('images', 'logo'),
          },
        ],
      }),

      //Injecting the custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      })
    ],

    // Adding CSS loaders and babel to webpack.
    module: {
      rules: [
        //Rule for JavaScript files
        {
          test: /\.js/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        //Rule for CSS files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }
      ],
    },
  };
};
