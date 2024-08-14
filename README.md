## Description

This project contains sample web applications using the [monero-ts](https://github.com/woodser/monero-ts) library.

## How to Run in a Browser

1. Download and install [Monero CLI](https://getmonero.org/downloads/)
2. Start monerod with authentication and CORS access.  For example: `./monerod --testnet --rpc-access-control-origins http://localhost:8080`
3. Start monero-wallet-rpc with authentication and CORS access.  For example: `./monero-wallet-rpc --daemon-address http://localhost:28081 --testnet --rpc-bind-port 28084 --rpc-login rpc_user:abc123 --rpc-access-control-origins http://localhost:8080 --wallet-dir ./`
4. `git clone https://github.com/woodser/xmr-sample-app`
5. `cd xmr-sample-app`
6. `npm install`
7. If using Node.js >16, set OpenSSL legacy provider:
    - Unix: `export NODE_OPTIONS=--openssl-legacy-provider`
    - Windows: `set NODE_OPTIONS=--openssl-legacy-provider`
8. `./bin/build_browser_app.sh`
9. Access web app at http://localhost:8080