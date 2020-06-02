#!/bin/bash

curl -sLO https://github.com/woodser/xmr-sample-app/archive/master.zip
unzip master.zip
cd xmr-sample-app-master
npm install --save monero-javascript
npm install
./bin/build_browser_app.sh
