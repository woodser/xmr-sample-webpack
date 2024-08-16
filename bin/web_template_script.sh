#!/bin/bash

curl -sLO https://github.com/woodser/xmr-sample-webpack/archive/master.zip
unzip master.zip
cd xmr-sample-webpack-master
npm install --save monero-ts
npm install
./bin/build_browser_app.sh
