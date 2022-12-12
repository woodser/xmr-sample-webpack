#!/bin/sh

# delete contents of old browser build
mkdir -p ./browser_build/ || exit 1
rm -r ./browser_build/ || exit 1

# build browser tests
npm run build_browser_app_unix || exit 1

# copy dependencies to browser build
cp node_modules/monero-javascript/dist/monero_wallet_full.js browser_build/monero_wallet_full.js
cp node_modules/monero-javascript/dist/monero_wallet_full.wasm browser_build/monero_wallet_full.wasm
cp node_modules/monero-javascript/dist/monero_wallet_keys.js browser_build/monero_wallet_keys.js
cp node_modules/monero-javascript/dist/monero_wallet_keys.wasm browser_build/monero_wallet_keys.wasm
cp node_modules/monero-javascript/dist/monero_web_worker.js browser_build/monero_web_worker.js
cp node_modules/monero-javascript/dist/monero_web_worker.js.map browser_build/monero_web_worker.js.map
cp -R src/* browser_build/

# start server
./bin/start_dev_server.sh
