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
copy node_modules\monero-ts\dist\monero.worker.js browser_build\monero.worker.js
copy node_modules\monero-ts\dist\monero.worker.js.map browser_build\monero.worker.js.map
xcopy src browser_build

rem start server
bin\start_dev_server.bat