#!/bin/sh

# delete contents of old browser build
mkdir -p ./browser_build/ || exit 1
rm -r ./browser_build/ || exit 1

# build browser tests
npm run build_browser_app_unix || exit 1

# copy dependencies to browser build
cp node_modules/monero-ts/dist/monero.worker.js browser_build/monero.worker.js
cp node_modules/monero-ts/dist/monero.worker.js.map browser_build/monero.worker.js.map
cp -R src/* browser_build/

# start server
./bin/start_dev_server.sh
