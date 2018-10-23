echo deploying...

del /a /f /q ..\framework\www\*

xcopy .\dist ..\framework\www /c /e /y

cd ..\framework

echo cordova build android

cordova-hcp build

echo deploy finish!
