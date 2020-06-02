ECHO OFF

curl -sLO https://github.com/woodser/xmr-sample-app/archive/master.zip
tar -xf master.zip
cd xmr-sample-app-master
npm install --save monero-javascript
npm install
bin\build_browser_app.bat
