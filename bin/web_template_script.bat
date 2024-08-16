ECHO OFF

curl -sLO https://github.com/woodser/xmr-sample-webpack/archive/master.zip
tar -xf master.zip
cd xmr-sample-webpack-master
npm install --save monero-ts
npm install
bin\build_browser_app.bat
