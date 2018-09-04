echo deploying...

xcopy .\dist ..\www /c /e /y

cd ..

cordova build android
