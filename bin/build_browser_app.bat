ECHO OFF

rem delete contents of old browser build
IF EXIST browser_build (
rmdir /s /q browser_build
) ELSE (
mkdir browser_build
)

rem build browser tests
call npm run build_browser_app_windows

rem copy dependencies to browser build
copy node_modules\monero-javascript\dist\monero_wallet_full.js browser_build\monero_wallet_full.js
copy node_modules\monero-javascript\dist\monero_wallet_full.wasm browser_build\monero_wallet_full.wasm
copy node_modules\monero-javascript\dist\monero_wallet_keys.js browser_build\monero_wallet_keys.js
copy node_modules\monero-javascript\dist\monero_wallet_keys.wasm browser_build\monero_wallet_keys.wasm
copy node_modules\monero-javascript\dist\monero_web_worker.js browser_build\monero_web_worker.js
copy node_modules\monero-javascript\dist\monero_web_worker.js.map browser_build\monero_web_worker.js.map
xcopy src browser_build

rem start server
bin\start_dev_server.bat