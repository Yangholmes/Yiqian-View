/**
 * Cordova 热更新接口
 * @file
 * @author Yangholmes 2018-10-22
 */
let cApp = {
    init() {
        return new Promise(resolve => {
            document.addEventListener('deviceready', e => {
                console.log('Device is ready!');
                resolve({code: 0, data: e, msg: 'Device is ready!'});
            }, false);
        });
    },
    checkVersion() {
        return new Promise((resolve, reject) => {
            chcp.fetchUpdate((error, data) => {
                if (error) {
                    reject({code: error.code, data: error, msg: error.description});
                }
                else {
                    resolve({code: 0, data, msg: 'New version was found!'});
                }
            });
            chcp.getVersionInfo((err, data) => {
                console.log('Current web version: ' + data.currentWebVersion);
                console.log('Previous web version: ' + data.previousWebVersion);
                console.log('Loaded and ready for installation web version: ' + data.readyToInstallWebVersion);
                console.log('Application version name: ' + data.appVersion);
                console.log('Application build version: ' + data.buildVersion);
            });
        });
    },
    installNewVersion() {
        return new Promise((resolve, reject) => {
            chcp.installUpdate(error => {
                if (error) {
                    reject({code: error.code, data: error, msg: 'Failed to install the update!'});
                }
                else {
                    resolve({code: 0, data: {}, msg: 'Update installed!'});
                }
            });
        });
    }
};

export default cApp;
//
// cApp.init().then(() => {
//     return cApp.checkVersion();
// }).then(() => {
//     return cApp.installUpdate();
// }).catch(error => {
//     console.error(error);
// });
