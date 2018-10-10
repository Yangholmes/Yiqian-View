echo deploying...

xcopy .\dist ..\framework\www /c /e /y

cd ..\framework

echo cordova build android

cordova-hcp build

echo deploy finish!
