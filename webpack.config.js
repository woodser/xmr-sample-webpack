const path = require("path");

let configBase = {
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
                cacheDirectory: false
              }
            }
          ]
        }
      ]
    },
    devtool: 'source-map',
    externals: ['worker_threads','ws','perf_hooks', 'child_process'], // exclude nodejs
    resolve: {
      alias: {
        "fs": "html5-fs"
      },
      extensions: ['.js', '.jsx', '.css', '.json', 'otf', 'ttf', 'eot', 'svg'],
      modules: [
        'node_modules'
      ]
    },
    cache: true,
    context: __dirname
};

let configSampleCode = Object.assign({}, configBase, {
    name: "Sample code",
    entry: "./src/sample_code.js",
    output: {
      path: path.resolve(__dirname, "browser_build"),
      filename: "sample_code.dist.js"
    },
});

let configOfflineWalletGenerator = Object.assign({}, configBase, {
  name: "Offline wallet generator",
  entry: "./src/offline_wallet_generator.js",
  output: {
    path: path.resolve(__dirname, "browser_build"),
    filename: "offline_wallet_generator.dist.js"
  },
});

module.exports = [
  configSampleCode,
  configOfflineWalletGenerator
];