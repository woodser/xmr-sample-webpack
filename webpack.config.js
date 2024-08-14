const path = require("path");
const webpack = require('webpack')

let configBase = {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: path.join(__dirname, 'node_modules'),
          type: "javascript/auto",
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                cacheDirectory: false
              }
            }
          ]
        }, {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ]
    },
    devtool: 'source-map',
    externals: ['worker_threads','ws','perf_hooks', 'child_process'], // exclude nodejs
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    ],
    resolve: {
      alias: {
        "fs": "memfs"
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json', 'otf', 'ttf', 'eot', 'svg'],
      modules: [
        'node_modules'
      ],
      fallback: { // browser polyfills
        assert: require.resolve('assert'),
        //buffer: require.resolve('buffer'),
        //console: require.resolve('console-browserify'),
        //constants: require.resolve('constants-browserify'),
        crypto: require.resolve('crypto-browserify'),
        //domain: require.resolve('domain-browser'),
        //events: require.resolve('events'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        //punycode: require.resolve('punycode'),
        //process: require.resolve('process/browser'),
        querystring: require.resolve('querystring-es3'),
        stream: require.resolve('stream-browserify'),
        //string_decoder: require.resolve('string_decoder'),
        //sys: require.resolve('util'),
        //timers: require.resolve('timers-browserify'),
        //tty: require.resolve('tty-browserify'),
        url: require.resolve('url'),
        util: require.resolve('util'),
        //vm: require.resolve('vm-browserify'),
        zlib: require.resolve('browserify-zlib')
      }
    },
    cache: true,
    context: __dirname
};

let configSampleCode = Object.assign({}, configBase, {
    name: "Sample code",
    entry: "./src/sample_code.ts",
    output: {
      path: path.resolve(__dirname, "browser_build"),
      filename: "sample_code.dist.js"
    },
});

let configOfflineWalletGenerator = Object.assign({}, configBase, {
  name: "Offline wallet generator",
  entry: "./src/offline_wallet_generator.ts",
  output: {
    path: path.resolve(__dirname, "browser_build"),
    filename: "offline_wallet_generator.dist.js"
  },
});

module.exports = [
  configSampleCode,
  configOfflineWalletGenerator
];