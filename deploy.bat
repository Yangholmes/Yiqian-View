echo deploying...

xcopy .\dist ..\framework\www /c /e /y

cd ..\framework

cordova build android
